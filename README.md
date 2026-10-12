# Fullstack Learning

A personal full-stack learning repository with a React dashboard for browsing the actual notes, interview questions, source code, and HTML/CSS projects.

## Run the learning site

Requires Node.js 22.12+ (or 20.19+).

```sh
npm --prefix learning-site install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

Select **Continue as demo**, or sign in with:

- Email: `demo@fullstack.dev`
- Password: `Learn@123`

This is a demo login, not production authentication. Profile, progress, bookmarks, and reading history are stored in the current browser's local storage, not on a server. Signing out preserves learning data. Settings includes a reset option.

## Learning tracks

| Track | Repository source |
| --- | --- |
| HTML | `html/` |
| CSS | `css/` |
| JavaScript | `javascript/` |
| TypeScript | `typescript/` |
| React | `reactjs/interview-ques/`, `reactjs/demo/src/`, `reactjs/learning-guide.json` |
| Node.js | `node/` |
| SQL | `sql/` |
| Dart | `dart/` |
| AWS | `aws/` |
| Nginx | `nginx/` |

The dashboard includes track filtering, workspace search, a lesson reader with original source and downloads, a code library, interview answers, HTML/CSS project previews, saved resources, completion tracking, weekly activity, a daily goal, and profile settings. It works on desktop and mobile.

## How content works

`learning-site/content.mjs` reads the learning folders. A Vite plugin imports their content into the application at development/build time. Numbered sections in plain-text notes become lessons; code files appear in the code library. Original files are preserved. Edit an existing source file to update the site; restart the development server after adding a new source file. Rebuild the production site after changing content.

Private directories, resumes, dependencies, generated builds, application configuration, and the unrelated portal application are excluded from the catalog. `.odt` and other binary documents are not imported. HTML/CSS previews preserve relative styles and image assets, use sandboxed iframes, and do not run scripts. Code examples are for reading and downloading, not execution.

The site displays the original learning notes, including any inaccuracies they contain. It does not rewrite or validate their technical claims.

## Expanded curriculum

Each technology folder also has a `learning-guide.json` containing 10 additional interview Q&As and 3 practical exercises: **100 new Q&As and 30 exercises** across the stack. These original additions include difficulty levels, topic labels, examples, and links to primary documentation from MDN, TypeScript, React, Node.js, PostgreSQL, Dart, AWS, and Nginx.

Open **Practice lab** for track, difficulty, and topic filters. Each exercise includes a problem statement, acceptance checks, starter code, expandable hints, and a worked solution. Exercises also appear in the track's **Practice** tab and support the same bookmarks and completion tracking as lessons. Completion is self-reported; the site does not execute or automatically grade code. SQL examples use PostgreSQL, and AWS/network examples explicitly identify policy designs and non-deployable architecture outlines.

To expand a guide, add an item to `questions` or `practices`. Keep its slug `id` stable so saved progress remains valid. Questions require `id`, `title`, `topic`, `difficulty`, and `answer`; optional `code` adds an example. Practices additionally require `prompt`, `hints`, `checks`, `starterCode`, `solution`, and `solutionCode`. Difficulty is `Beginner`, `Intermediate`, or `Advanced`. Each guide needs a `references` array of `{title, url}` documentation links. Invalid or duplicate entries fail the content build with their source filename. Existing plain-text notes remain supported.

## Verify and build

```sh
npm test
npm run build
```

Browser tests use a locally installed Chrome by default:

```sh
cd learning-site
npm run test:e2e
```

Alternatively install Playwright Chromium and set `PLAYWRIGHT_CHROME_PATH` to its executable. Browser tests cover demo and credential login, source-backed navigation, search, progress/bookmark persistence, project previews, settings, malformed URLs, and mobile navigation.

The production output is `learning-site/dist/`. Deploy that entire directory, including `examples/`, at the website root. Navigation uses hash routes, so it does not require server fallback routing. Preview the build with `npm --prefix learning-site run preview`.

## Repository layout

- `learning-site/`: independent React + Vite application; existing learning projects are not modified.
- Language folders: original notes, exercises, and examples.
- `codathan/`: separate coding challenge application.
- `daily-activitys/`: original daily notes, not included in the learning catalog.

Do not store access tokens, passwords, or private keys in repository files. Previously exposed tokens must be revoked through their provider; removing a file's content does not remove its Git history.
