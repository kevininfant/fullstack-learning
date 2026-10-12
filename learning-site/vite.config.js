import { defineConfig } from "vite";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadCatalog,
  resolvePreviewPath,
  trackDefinitions,
} from "./content.mjs";

const siteRoot = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(siteRoot, "..");
const virtualId = "virtual:learning-content";
const resolvedId = `\0${virtualId}`;
const trackPrefix = "virtual:learning-track/";
const mime = {
  html: "text/html",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  svg: "image/svg+xml",
  webp: "image/webp",
  gif: "image/gif",
};

function repositoryContent() {
  return {
    name: "repository-learning-content",
    resolveId(id) {
      if (id === virtualId) return resolvedId;
      if (
        id.startsWith(trackPrefix) &&
        trackDefinitions.some((track) => id === trackPrefix + track.id)
      )
        return `\0${id}`;
    },
    load(id) {
      if (id === resolvedId) {
        const imports = trackDefinitions
          .map(
            (track, index) =>
              `import track${index} from '${trackPrefix}${track.id}';`,
          )
          .join("\n");
        return `${imports}\nconst tracks = [${trackDefinitions.map((_, index) => `track${index}`).join(",")}];\nexport default { tracks, resources: tracks.flatMap(track => track.resources), lessons: tracks.flatMap(track => track.lessons) };`;
      }
      if (!id.startsWith(`\0${trackPrefix}`)) return;
      const catalog = loadCatalog(repoRoot);
      const track = catalog.tracks.find(
        (track) => id === `\0${trackPrefix}${track.id}`,
      );
      for (const resource of track.resources)
        this.addWatchFile(resolve(repoRoot, resource.source));
      const { resources, lessons, code, projects, ...definition } = track;
      return `const resources = ${JSON.stringify(resources)};\nconst lessons = ${JSON.stringify(lessons)};\nexport default { ...${JSON.stringify(definition)}, resources, lessons, code: resources.filter(item => item.kind === 'code'), projects: resources.filter(item => item.extension === 'html' && /^(html|css)\\//.test(item.source)) };`;
    },
    configureServer(server) {
      server.middlewares.use("/examples", (req, res, next) => {
        const path = resolvePreviewPath(
          repoRoot,
          (req.url || "").split("?")[0].replace(/^\//, ""),
        );
        if (!path) {
          res.statusCode = 404;
          res.end("Example not found");
          return;
        }
        res.setHeader(
          "Content-Type",
          mime[path.split(".").at(-1)] || "application/octet-stream",
        );
        res.end(readFileSync(path));
      });
      server.watcher.add(
        [
          "html",
          "css",
          "javascript",
          "typescript",
          "reactjs/interview-ques",
          "reactjs/demo/src",
          "node",
          "sql",
          "dart",
          "aws",
          "nginx",
        ].map((path) => resolve(repoRoot, path)),
      );
      server.watcher.on("all", (_, path) => {
        if (
          !path.startsWith(repoRoot + "/") ||
          path.includes("/learning-site/") ||
          path.includes("/node_modules/")
        )
          return;
        for (const id of [
          resolvedId,
          ...trackDefinitions.map((track) => `\0${trackPrefix}${track.id}`),
        ]) {
          const module = server.moduleGraph.getModuleById(id);
          if (module) server.moduleGraph.invalidateModule(module);
        }
        server.ws.send({ type: "full-reload" });
      });
    },
    generateBundle() {
      const emitDirectory = (directory) => {
        for (const entry of readdirSync(directory, { withFileTypes: true })) {
          const path = resolve(directory, entry.name);
          if (entry.name.startsWith(".")) continue;
          if (entry.isDirectory()) emitDirectory(path);
          else if (resolvePreviewPath(repoRoot, relative(repoRoot, path)))
            this.emitFile({
              type: "asset",
              fileName: `examples/${relative(repoRoot, path)}`,
              source: readFileSync(path),
            });
        }
      };
      for (const directory of ["html", "css"])
        emitDirectory(resolve(repoRoot, directory));
    },
  };
}

export default defineConfig({
  plugins: [repositoryContent()],
  server: { host: "0.0.0.0", fs: { strict: true, allow: [siteRoot] } },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: "vendor", test: /node_modules/ },
            {
              debugName: "learning-curriculum",
              name: (id) => `curriculum-${id.split("/").at(-1)}`,
              test: /virtual:learning-track\//,
            },
          ],
        },
      },
    },
  },
});
