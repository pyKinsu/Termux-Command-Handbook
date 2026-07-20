const ts = require("typescript");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

// lessonSlug: route path, lessonTitle: display name, varHint: substring the
// data array's variable name is expected to contain (for sanity, not required)
const LESSONS = [
  { dir: "Basics", slug: "/Basics", title: "Basics" },
  { dir: "Lesson1", slug: "/Lesson1", title: "Core Commands" },
  { dir: "Lesson2", slug: "/Lesson2", title: "Intermediate Commands" },
  { dir: "Lesson3", slug: "/Lesson3", title: "Advanced Commands" },
  { dir: "Lesson4", slug: "/Lesson4", title: "Expert Commands" },
  { dir: "Lesson5", slug: "/Lesson5", title: "Power User Commands" },
  { dir: "Lesson6", slug: "/Lesson6", title: "Developer Commands" },
  { dir: "Lesson7", slug: "/Lesson7", title: "System Administration" },
  { dir: "Lesson8", slug: "/Lesson8", title: "Network Administration" },
  { dir: "Lesson9", slug: "/Lesson9", title: "Data Management" },
];

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getStringLiteral(node) {
  if (!node) return undefined;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  return undefined;
}

function extractFromFile(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );

  let arrayNode = null;

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      node.name &&
      ts.isIdentifier(node.name) &&
      /Commands$/.test(node.name.text) &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      arrayNode = node.initializer;
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);

  if (!arrayNode) return [];

  const results = [];
  for (const el of arrayNode.elements) {
    if (!ts.isObjectLiteralExpression(el)) continue;
    const entry = {};
    for (const prop of el.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const key = prop.name && prop.name.getText(sourceFile);
      const value = getStringLiteral(prop.initializer);
      if (key && value !== undefined) {
        entry[key] = value;
      }
    }
    if (entry.command || entry.title) {
      results.push(entry);
    }
  }
  return results;
}

const seenIds = new Set();
const output = [];

for (const lesson of LESSONS) {
  const filePath = path.join(
    ROOT,
    "src",
    "app",
    "(chapters)",
    lesson.dir,
    "page.tsx"
  );
  if (!fs.existsSync(filePath)) {
    console.warn("missing:", filePath);
    continue;
  }
  const entries = extractFromFile(filePath);
  for (const entry of entries) {
    const title = entry.title || entry.command || "Untitled";
    const command = entry.command || "";
    const description = entry.description || "";
    const category = entry.category || "General";
    let id = slugify(`${lesson.dir}-${title}`);
    let suffix = 1;
    while (seenIds.has(id)) {
      id = slugify(`${lesson.dir}-${title}-${suffix}`);
      suffix += 1;
    }
    seenIds.add(id);
    output.push({
      id,
      title,
      description,
      command,
      category,
      lessonSlug: lesson.slug,
      lessonTitle: lesson.title,
    });
  }
}

console.log(`Extracted ${output.length} commands from ${LESSONS.length} lessons`);

const outPath = path.join(ROOT, "src", "data", "commands.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log("wrote", outPath);
