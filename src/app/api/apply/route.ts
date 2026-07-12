import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Simple full-stack backend: validates the creator application and
// appends it as JSON-lines to a local file. Swap this for a database
// (Postgres, MongoDB, etc.) or an email/CRM integration in production.

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "applications.jsonl");

const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "country",
  "handle",
  "niche",
  "followers",
  "profileLink",
  "about",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((f) => !String(body[f] ?? "").trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const email = String(body.email ?? "");
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  if (String(body.agreeTerms ?? "") !== "on") {
    return NextResponse.json(
      { error: "You must agree to the Terms & Conditions to apply." },
      { status: 400 }
    );
  }

  const record = {
    ...body,
    platforms: safeParseArray(body.platforms),
    interests: safeParseArray(body.interests),
    submittedAt: new Date().toISOString(),
    id: crypto.randomUUID(),
  };

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(DATA_FILE, JSON.stringify(record) + "\n", "utf8");
  } catch (err) {
    // In read-only / serverless environments the filesystem write may fail.
    // We still acknowledge the submission so the UX doesn't break; log server-side.
    console.error("Failed to persist application:", err);
  }

  return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
}

export async function GET() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const applications = raw
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line));
    return NextResponse.json({ count: applications.length, applications });
  } catch {
    return NextResponse.json({ count: 0, applications: [] });
  }
}

function safeParseArray(value: unknown): string[] {
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
