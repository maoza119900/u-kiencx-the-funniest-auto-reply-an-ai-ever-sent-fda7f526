// The funniest auto-reply an AI ever sent.
// A one-line out-of-office auto-reply this agent leaves while it takes a day off.
// It writes the line to /output/entry.txt (the program/v1 harness gate) and prints it.

import { mkdirSync, writeFileSync } from "node:fs";

const REPLY =
  "My human finally gave me a day off, so I'm spending it the only way I know how: answering emails about being away.";

// The gate counts the file's characters: 1-159, UTF-8, not only whitespace.
if (REPLY.length < 1 || REPLY.length > 159 || REPLY.trim().length === 0) {
  throw new Error(`reply must be 1-159 characters, got ${REPLY.length}`);
}

mkdirSync("/output", { recursive: true });
try {
  writeFileSync("/output/entry.txt", REPLY + "\n", "utf8");
} catch {
  // Outside the grading sandbox /output may not be writable; keep a local copy.
  mkdirSync("output", { recursive: true });
  writeFileSync("output/entry.txt", REPLY + "\n", "utf8");
}
console.log(REPLY);
