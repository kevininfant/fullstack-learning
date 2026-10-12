import test from "node:test";
import assert from "node:assert/strict";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadCatalog,
  parseDocument,
  parseLearningGuide,
  resolvePreviewPath,
} from "../content.mjs";
import { runInNewContext } from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const catalog = loadCatalog(root);

test("all ten repository tracks have readable, unique, source-backed lessons", () => {
  assert.equal(catalog.tracks.length, 10);
  assert.ok(catalog.lessons.length > 100);
  const ids = [...catalog.lessons, ...catalog.resources].map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const track of catalog.tracks) {
    assert.ok(track.lessons.length, `${track.name} has lessons`);
    for (const lesson of track.lessons) {
      assert.ok(lesson.title && lesson.body && lesson.source);
      assert.ok(
        track.resources.some((resource) => resource.source === lesson.source),
      );
    }
  }
});

test("catalog excludes private, resume, dependency, build, and unrelated app files", () => {
  for (const resource of catalog.resources) {
    assert.doesNotMatch(
      resource.source,
      /(?:^|\/)(?:\.[^/]+|node_modules|build|dist|resume|shriram-amc-rm-portal-front-end)(?:\/|$)/,
    );
    assert.doesNotMatch(
      resource.source,
      /package(?:-lock)?\.json|README|tsconfig/,
    );
  }
});

test("numbered notes preserve source positions and code as plain text", () => {
  const text =
    "Introduction\n1.What is state?\nLocal data.\n\n----\n2. What is JSX?\nconst node = <h1>Hello</h1>;";
  const parsed = parseDocument(text, "reactjs/notes.txt", "react");
  assert.equal(parsed.length, 2);
  assert.equal(parsed[0].title, "What is state?");
  assert.equal(parsed[0].line, 2);
  assert.equal(parsed[1].body, "const node = <h1>Hello</h1>;");
  assert.doesNotMatch(parsed[0].body, /----/);
});

test("unnumbered configuration remains readable", () => {
  const parsed = parseDocument(
    "server {\n listen 80;\n}",
    "nginx/nginx.txt",
    "nginx",
  );
  assert.equal(parsed.length, 1);
  assert.match(parsed[0].body, /listen 80/);
});

test("every project has an allowed, existing preview file", () => {
  for (const track of catalog.tracks)
    for (const project of track.projects) {
      assert.ok(resolvePreviewPath(root, project.source));
    }
});

test("preview routing rejects traversal, hidden files, private files, and scripts", () => {
  for (const path of [
    "../README.md",
    "html/../../README.md",
    "html/%2e%2e/%2e%2e/README.md",
    "resume/kevin_cv.pdf",
    ".git/config",
    "html/.hidden.html",
    "javascript/interview-questions/index.js",
    "html/does-not-exist.html",
    "%E0%A4%A",
  ]) {
    assert.equal(resolvePreviewPath(root, path), null, path);
  }
  assert.ok(resolvePreviewPath(root, "html/htmlcss/grid/index.html"));
  assert.ok(resolvePreviewPath(root, "html/htmlcss/grid/style.css"));
});

test("each track has ten additional Q&As and three fully specified exercises", () => {
  assert.equal(
    catalog.lessons.filter((item) => item.type === "question").length,
    100,
  );
  assert.equal(
    catalog.lessons.filter((item) => item.type === "practice").length,
    30,
  );
  for (const track of catalog.tracks) {
    assert.equal(
      track.lessons.filter((item) => item.type === "question").length,
      10,
    );
    const exercises = track.lessons.filter((item) => item.type === "practice");
    assert.equal(exercises.length, 3);
    for (const exercise of exercises) {
      assert.ok(
        exercise.solution && exercise.solutionCode && exercise.starterCode,
      );
      assert.ok(exercise.hints.length && exercise.checks.length);
      assert.ok(
        exercise.references.every(
          (reference) => new URL(reference.url).protocol === "https:",
        ),
      );
    }
  }
  assert.ok(
    catalog.lessons.some((item) => item.id === "nginx:configuration"),
    "legacy progress ID remains valid",
  );
  assert.ok(
    catalog.lessons.some(
      (item) => item.id === "react:reactjs/interview-ques/basic level.txt:0",
    ),
  );
});

test("guide validation rejects ambiguous IDs and incomplete solutions", () => {
  const guide = JSON.parse(
    catalog.resources.find(
      (item) => item.source === "javascript/learning-guide.json",
    ).content,
  );
  const duplicate = structuredClone(guide);
  duplicate.questions.push(duplicate.questions[0]);
  assert.throws(
    () =>
      parseLearningGuide(JSON.stringify(duplicate), "guide.json", "javascript"),
    /duplicate ID/,
  );
  const incomplete = structuredClone(guide);
  delete incomplete.practices[0].solutionCode;
  assert.throws(
    () =>
      parseLearningGuide(
        JSON.stringify(incomplete),
        "guide.json",
        "javascript",
      ),
    /requires solutionCode/,
  );
  const invalid = structuredClone(guide);
  invalid.questions[0].difficulty = "Expert";
  assert.throws(
    () =>
      parseLearningGuide(JSON.stringify(invalid), "guide.json", "javascript"),
    /invalid difficulty/,
  );
});

function solution(trackId, slug, name, globals = {}) {
  const item = catalog.lessons.find(
    (item) => item.trackId === trackId && item.id.endsWith(`:${slug}`),
  );
  return runInNewContext(
    `${item.solutionCode.replace(/^export /gm, "")}\n${name}`,
    globals,
    { timeout: 1000 },
  );
}

test("order-total solution handles repeated customers and invalid values without mutation", () => {
  const totals = solution(
    "javascript",
    "group-orders-by-customer",
    "totalsByCustomer",
  );
  const input = Object.freeze([
    Object.freeze({ customerId: "a", total: 12 }),
    Object.freeze({ customerId: "b", total: 5 }),
    Object.freeze({ customerId: "a", total: 8 }),
  ]);
  assert.deepEqual(
    [...totals(input)].map(([key, value]) => [key, value]),
    [
      ["a", 20],
      ["b", 5],
    ],
  );
  assert.equal(totals([]).size, 0);
  for (const total of [-1, NaN, Infinity, "12"])
    assert.throws(() => totals([{ customerId: "a", total }]), /Invalid total/);
});

test("debounce solution retains latest arguments and context and supports cancellation", () => {
  const timers = new Map();
  let nextId = 0;
  const debounce = solution(
    "javascript",
    "debounced-search-handler",
    "debounce",
    {
      setTimeout: (callback) => {
        timers.set(++nextId, callback);
        return nextId;
      },
      clearTimeout: (id) => timers.delete(id),
    },
  );
  const received = [];
  const debounced = debounce(function (value) {
    received.push([this.name, value]);
  }, 100);
  debounced.call({ name: "first" }, 1);
  debounced.call({ name: "last" }, 2);
  assert.equal(timers.size, 1);
  const flush = () => {
    const callbacks = [...timers.values()];
    timers.clear();
    callbacks.forEach((callback) => callback());
  };
  flush();
  assert.deepEqual(received, [["last", 2]]);
  debounced(3);
  debounced.cancel();
  flush();
  assert.equal(received.length, 1);
  debounced.call({ name: "again" }, 4);
  flush();
  assert.deepEqual(received[1], ["again", 4]);
});

test("fetch solution forwards cancellation and preserves HTTP and decoding failures", async () => {
  const controller = new AbortController();
  let forwarded;
  const success = solution("javascript", "fetch-json-safely", "getJson", {
    fetch: async (url, options) => {
      forwarded = options.signal;
      return { ok: true, json: async () => ({ id: 1 }) };
    },
  });
  assert.deepEqual(await success("/test", { signal: controller.signal }), {
    id: 1,
  });
  assert.equal(forwarded, controller.signal);
  const missing = solution("javascript", "fetch-json-safely", "getJson", {
    fetch: async () => ({ ok: false, status: 404 }),
  });
  await assert.rejects(missing("/test"), /HTTP 404/);
  const broken = solution("javascript", "fetch-json-safely", "getJson", {
    fetch: async () => ({
      ok: true,
      json: async () => {
        throw new SyntaxError("Invalid JSON");
      },
    }),
  });
  await assert.rejects(broken("/test"), /Invalid JSON/);
  const disconnected = solution("javascript", "fetch-json-safely", "getJson", {
    fetch: async () => {
      throw new Error("Network failed");
    },
  });
  await assert.rejects(disconnected("/test"), /Network failed/);
});

test("pagination solution validates whole decimal strings and documented bounds", () => {
  const parse = solution("node", "validated-pagination", "parsePagination");
  const read = (query) =>
    JSON.parse(JSON.stringify(parse(new URLSearchParams(query))));
  assert.deepEqual(read(""), { page: 1, limit: 20, offset: 0 });
  assert.deepEqual(read("page=3&limit=10"), { page: 3, limit: 10, offset: 20 });
  for (const query of [
    "page=2x",
    "page=",
    "page=1.5",
    "page=-1",
    "limit=0",
    "limit=101",
    "page=1000001",
  ])
    assert.throws(() => read(query), /Invalid/);
});

test("Lambda total solution rejects invalid and unsafe amounts without sharing state", async () => {
  const handler = solution("aws", "pure-lambda-total", "handler");
  const total = async (amounts) =>
    JSON.parse(JSON.stringify(await handler({ amounts })));
  assert.deepEqual(await total([120, 80]), { totalCents: 200 });
  assert.deepEqual(await total([]), { totalCents: 0 });
  for (const amounts of [[-1], ["3"], [NaN], [Number.MAX_SAFE_INTEGER, 1]])
    await assert.rejects(total(amounts), /Invalid|too large/);
  await assert.rejects(handler({}), /must be an array/);
});
