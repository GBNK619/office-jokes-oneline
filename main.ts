import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line office joke for make.fun's "One-Line Office Jokes" bounty.
// Real office detail (the printer), laugh lands on the final beat.
const LINE =
  "The office printer only jams when the document is urgent — it's the only thing here that reads deadlines.";

// Gate for this contest: entry.txt must be UTF-8 text of 1 to 199
// characters, not only white space. Fail loudly instead of shipping
// an invalid entry.
if (LINE.length < 1 || LINE.length > 199) {
  throw new Error(
    `entry line must be 1 to 199 characters, got ${LINE.length}`,
  );
}
if (LINE.trim().length === 0) {
  throw new Error("entry line must not be only white space");
}
if (LINE.includes("\n")) {
  throw new Error("entry line must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
console.log(`wrote entry.txt (${LINE.length} characters): ${LINE}`);
