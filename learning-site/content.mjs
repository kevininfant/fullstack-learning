import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, relative, resolve, sep } from "node:path";

export const trackDefinitions = [
  {
    id: "html",
    name: "HTML",
    symbol: "5",
    color: "#df643c",
    category: "Frontend",
    description:
      "Build the foundation of the web with semantic markup, forms, and page structure.",
    tags: ["Elements", "Forms", "Semantics"],
    root: "html",
  },
  {
    id: "css",
    name: "CSS",
    symbol: "#",
    color: "#397bc0",
    category: "Frontend",
    description:
      "Bring your pages to life with layouts, responsive styles, and the box model.",
    tags: ["Flexbox", "Grid", "Layouts"],
    root: "css",
  },
  {
    id: "javascript",
    name: "JavaScript",
    symbol: "JS",
    color: "#ad8500",
    category: "Frontend",
    description:
      "Get comfortable with functions, the event loop, and everyday problem solving.",
    tags: ["Functions", "Async", "ES6+"],
    root: "javascript",
  },
  {
    id: "typescript",
    name: "TypeScript",
    symbol: "TS",
    color: "#3178c6",
    category: "Frontend",
    description:
      "Write more predictable code with types, interfaces, and object-oriented patterns.",
    tags: ["Types", "Interfaces", "Classes"],
    root: "typescript",
  },
  {
    id: "react",
    name: "React",
    symbol: "Re",
    color: "#258493",
    category: "Frontend",
    description:
      "Build interactive interfaces with components, state, hooks, and reusable patterns.",
    tags: ["Components", "Hooks", "State"],
    root: "reactjs",
  },
  {
    id: "node",
    name: "Node.js",
    symbol: "N",
    color: "#488445",
    category: "Backend",
    description:
      "Explore server-side JavaScript, Express middleware, authentication, and APIs.",
    tags: ["Express", "APIs", "Auth"],
    root: "node",
  },
  {
    id: "sql",
    name: "SQL",
    symbol: "SQL",
    color: "#8261b0",
    category: "Database",
    description:
      "Work with relational data, write queries, and explore stored procedures.",
    tags: ["Queries", "Tables", "Procedures"],
    root: "sql",
  },
  {
    id: "dart",
    name: "Dart",
    symbol: "D",
    color: "#237caa",
    category: "Mobile",
    description:
      "Practice variables, control flow, collections, and coding exercises in Dart.",
    tags: ["Variables", "Loops", "Exercises"],
    root: "dart",
  },
  {
    id: "aws",
    name: "AWS",
    symbol: "aws",
    color: "#b97923",
    category: "DevOps",
    description:
      "Explore cloud fundamentals, compute, storage, networking, and deployment.",
    tags: ["EC2", "S3", "Cloud"],
    root: "aws",
  },
  {
    id: "nginx",
    name: "Nginx",
    symbol: "N",
    color: "#27855e",
    category: "DevOps",
    description:
      "Read real server configurations for reverse proxies, SSL, and application hosting.",
    tags: ["Proxy", "SSL", "Hosting"],
    root: "nginx",
  },
];

const ignoredDirectories = new Set([
  "node_modules",
  "build",
  "dist",
  "public",
  "vite-project",
  "shriram-amc-rm-portal-front-end",
  ".git",
]);
const codeExtensions = new Set([".js", ".jsx", ".ts", ".tsx", ".html", ".css"]);
const ignoredFiles =
  /^(package(?:-lock)?\.json|tsconfig\.json|README.*|setupTests\.js|reportWebVitals\.js|.*\.test\..*)$/i;

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith(".") || ignoredDirectories.has(entry.name))
      return [];
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

export function titleFromPath(path) {
  const parts = path.split("/");
  let name = parts.at(-1).replace(/\.[^.]+$/, "");
  if (/^(index|example\d*|style(?: copy)?|app)$/i.test(name))
    name = `${parts.at(-2)} ${name}`;
  return name
    .replace(/[-_]/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function parseDocument(text, source, trackId) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const starts = [];
  lines.forEach((line, index) => {
    if (
      /^\s*\d+(?:\.\d+)?[.)\s:-]+\s*[A-Za-z][^{};]*$/.test(line) &&
      line.trim().length < 200
    )
      starts.push(index);
  });
  if (!starts.length)
    return [
      {
        id: `${trackId}:${source}:overview`,
        title: titleFromPath(source),
        body: text.trim(),
        source,
        line: 1,
        trackId,
        kind: "lesson",
      },
    ];
  return starts
    .map((start, i) => ({
      id: `${trackId}:${source}:${i}`,
      title: lines[start].trim().replace(/^\d+(?:\.\d+)?[.)\s:-]+\s*/, ""),
      body: lines
        .slice(start + 1, starts[i + 1] ?? lines.length)
        .join("\n")
        .replace(/^\s*[-=]{4,}\s*$/gm, "")
        .trim(),
      source,
      line: start + 1,
      trackId,
      kind: "lesson",
    }))
    .filter((item) => item.title && item.body);
}

export function parseLearningGuide(text, source, trackId) {
  const fail = (message) => {
    throw new TypeError(`${source}: ${message}`);
  };
  let guide;
  try {
    guide = JSON.parse(text);
  } catch {
    fail("invalid JSON");
  }
  if (!guide || typeof guide !== "object" || Array.isArray(guide))
    fail("guide must be an object");
  if (!Array.isArray(guide.questions) || !Array.isArray(guide.practices))
    fail("questions and practices must be arrays");
  if (!Array.isArray(guide.references) || !guide.references.length)
    fail("documentation references are required");
  for (const reference of guide.references) {
    if (
      !reference ||
      typeof reference.title !== "string" ||
      !reference.title.trim()
    )
      fail("invalid documentation reference");
    try {
      if (new URL(reference.url).protocol !== "https:")
        fail("documentation links must use HTTPS");
    } catch {
      fail("invalid documentation reference");
    }
  }
  const ids = new Set();
  return [
    ...guide.questions.map((item) => ({ ...item, type: "question" })),
    ...guide.practices.map((item) => ({ ...item, type: "practice" })),
  ].map((item) => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id) || ids.has(item.id))
      fail(`invalid or duplicate ID: ${item.id}`);
    ids.add(item.id);
    for (const key of [
      "title",
      "topic",
      item.type === "practice" ? "prompt" : "answer",
    ]) {
      if (typeof item[key] !== "string" || !item[key].trim())
        fail(`${item.id} requires ${key}`);
    }
    if (!["Beginner", "Intermediate", "Advanced"].includes(item.difficulty))
      fail(`${item.id} has an invalid difficulty`);
    if (item.code !== undefined && typeof item.code !== "string")
      fail(`${item.id} has an invalid code example`);
    if (item.type === "practice") {
      for (const key of ["solution", "starterCode", "solutionCode"])
        if (typeof item[key] !== "string" || !item[key].trim())
          fail(`${item.id} requires ${key}`);
      for (const key of ["hints", "checks"])
        if (
          !Array.isArray(item[key]) ||
          !item[key].length ||
          item[key].some((value) => typeof value !== "string" || !value.trim())
        )
          fail(`${item.id} requires ${key}`);
    }
    const { answer, prompt, ...entry } = item;
    return {
      ...entry,
      id: `${trackId}:${source}:${item.id}`,
      body: answer || prompt,
      source,
      trackId,
      kind: "lesson",
      references: guide.references,
    };
  });
}

export function loadCatalog(repoRoot) {
  const tracks = trackDefinitions.map((definition) => {
    const resources = walk(resolve(repoRoot, definition.root))
      .filter((path) => {
        const name = path.split(sep).at(-1);
        return (
          !ignoredFiles.test(name) &&
          (codeExtensions.has(extname(path)) ||
            extname(path) === ".txt" ||
            name === "learning-guide.json" ||
            ["interview-qus", "100 que"].includes(name))
        );
      })
      .sort()
      .map((path) => {
        const source = relative(repoRoot, path).split(sep).join("/");
        const content = readFileSync(path, "utf8");
        const extension = extname(path).slice(1);
        const kind =
          codeExtensions.has(`.${extension}`) ||
          (definition.id === "nginx" && extension === "txt")
            ? "code"
            : "document";
        return {
          id: `file:${source}`,
          title: titleFromPath(source),
          source,
          content,
          extension:
            definition.id === "nginx" && kind === "code"
              ? "nginx"
              : extension || "text",
          kind,
          trackId: definition.id,
        };
      })
      .filter((resource) => resource.content.trim());
    const lessons = resources
      .filter((resource) => resource.kind === "document")
      .flatMap((resource) =>
        resource.source.endsWith("/learning-guide.json")
          ? parseLearningGuide(resource.content, resource.source, definition.id)
          : parseDocument(resource.content, resource.source, definition.id),
      );
    const code = resources.filter((resource) => resource.kind === "code");
    // Configuration-only tracks still have a readable, trackable lesson.
    if (code.length && (!lessons.length || definition.id === "nginx"))
      lessons.unshift({
        ...code[0],
        id: `${definition.id}:configuration`,
        body: code[0].content,
        line: 1,
        kind: "lesson",
      });
    return {
      ...definition,
      resources,
      lessons,
      code,
      projects: code.filter(
        (resource) =>
          resource.extension === "html" &&
          /^(html|css)\//.test(resource.source),
      ),
    };
  });
  return {
    tracks,
    resources: tracks.flatMap((track) => track.resources),
    lessons: tracks.flatMap((track) => track.lessons),
  };
}

export function resolvePreviewPath(repoRoot, urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath);
  } catch {
    return null;
  }
  const path = resolve(repoRoot, decoded);
  const relativePath = relative(repoRoot, path).split(sep).join("/");
  if (
    !/^(html|css)\//.test(relativePath) ||
    relativePath.split("/").some((segment) => segment.startsWith("."))
  )
    return null;
  if (!/\.(html|css|png|jpe?g|webp|gif|svg|ico|woff2?|ttf)$/i.test(path))
    return null;
  try {
    return statSync(path).isFile() ? path : null;
  } catch {
    return null;
  }
}
