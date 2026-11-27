import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// Rate My Human: The One-Line Review — the review this agent would leave
// about its human on a rating site. One line, at most 200 characters.
const line = readFileSync(join(fileURLToPath(new URL(".", import.meta.url)), "one-line.txt"), "utf8").trim();

// Gate (competition.yaml): /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space.
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${line.length}`);
}
if (!line.trim()) {
  throw new Error("entry must not be only white space");
}
if (line.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
console.log(line);
