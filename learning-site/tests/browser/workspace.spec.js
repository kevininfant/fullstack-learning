import { test, expect } from "@playwright/test";

async function demo(page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Continue as demo" }).click();
  await expect(
    page.getByRole("heading", { name: "Welcome back, Alex." }),
  ).toBeVisible();
}

test("demo login, source lessons, bookmarks, completion, reload, and sign out", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await demo(page);
  await page.locator(".track-nav").filter({ hasText: "React" }).click();
  await expect(
    page.getByRole("heading", { name: "React", exact: true }),
  ).toBeVisible();
  await page
    .locator(".resource-row-main")
    .filter({ hasText: "What is React?" })
    .first()
    .click();
  await expect(
    page.getByRole("heading", { name: "What is React?" }),
  ).toBeVisible();
  await expect(page.locator(".document-body")).toContainText(
    "open-source JavaScript library",
  );
  await page
    .getByRole("button", { name: "Bookmark resource", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Mark as complete", exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Completed", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Remove bookmark", exact: true }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Source file" }).click();
  await expect(page.locator(".code-block")).toContainText("What is React?");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download source" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("basic level.txt");
  await page.getByRole("link", { name: "Overview", exact: true }).click();
  await expect(page.locator(".continue-content h2")).not.toHaveText(
    "What is React?",
  );
  await page.getByRole("link", { name: "Saved resources" }).click();
  await expect(page.locator(".resource-row")).toHaveCount(1);
  await page.getByRole("link", { name: "My progress" }).click();
  await expect(page.locator(".progress-overview")).toContainText("1 of");
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(
    page.getByRole("button", { name: "Continue as demo" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("credential login validates demo identity", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Email address").fill("wrong@example.com");
  await page.getByLabel("Password", { exact: true }).fill("wrong");
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page.getByRole("alert")).toBeVisible();
  await page.getByLabel("Email address").fill("demo@fullstack.dev");
  await page.getByLabel("Password", { exact: true }).fill("Learn@123");
  await page.getByRole("button", { name: "Show password" }).click();
  await expect(page.getByLabel("Password", { exact: true })).toHaveAttribute(
    "type",
    "text",
  );
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Welcome back, Alex." }),
  ).toBeVisible();
});

test("search, code filters, interview answers, and empty states", async ({
  page,
}) => {
  await demo(page);
  await page
    .getByRole("textbox", { name: "Search all learning resources" })
    .fill("closure");
  await page
    .getByRole("textbox", { name: "Search all learning resources" })
    .press("Enter");
  await expect(page.locator(".resource-row").first()).toBeVisible();
  await expect(page.locator(".resource-list")).toContainText("closure");
  await page.getByRole("link", { name: "Code library", exact: true }).click();
  await page.getByLabel("Filter by track").selectOption("typescript");
  await expect(page.locator(".resource-row").first()).toContainText(
    "TypeScript",
  );
  await page
    .getByRole("textbox", { name: "Search code examples..." })
    .fill("zzzz-no-results");
  await expect(
    page.getByRole("heading", { name: "No matching resources" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Interview prep", exact: true }).click();
  await page.getByLabel("Filter by track").selectOption("react");
  await page
    .getByRole("textbox", { name: "Search questions..." })
    .fill("What is React?");
  await page.locator(".question-toggle").first().click();
  await expect(page.locator(".question-answer")).toContainText(
    "open-source JavaScript library",
  );
  await page.getByRole("button", { name: "Mark as complete" }).click();
  await page.getByLabel("Not completed").check();
  await expect(
    page.getByRole("heading", { name: "No matching questions" }),
  ).toBeVisible();
});

test("HTML projects render sandboxed previews and source", async ({
  page,
  request,
}) => {
  await demo(page);
  await page.locator(".track-nav").filter({ hasText: "HTML" }).click();
  await page.getByRole("tab", { name: /Projects/ }).click();
  await page.locator(".project-card").filter({ hasText: "Grid Index" }).click();
  await page.getByRole("tab", { name: "Preview", exact: true }).click();
  const frame = page.frameLocator('iframe[title="Project live preview"]');
  await expect(frame.locator(".container > div")).toHaveCount(6);
  await expect(frame.locator(".container")).toHaveCSS("display", "grid");
  await expect(
    page.locator('iframe[title="Project live preview"]'),
  ).toHaveAttribute("sandbox", "");
  const response = await request.get("/examples/html/htmlcss/grid/style.css");
  expect(response.ok()).toBeTruthy();
  expect(await response.text()).toContain("grid");
  expect((await request.get("/examples/resume/kevin_cv.pdf")).status()).toBe(
    404,
  );
});

test("profile, daily goal, reset confirmation, and invalid routes", async ({
  page,
}) => {
  await demo(page);
  await page.getByRole("link", { name: "Settings", exact: true }).click();
  await page.getByLabel("Display name").fill("Sam Learner");
  await page.getByRole("button", { name: "Save profile" }).click();
  await page.getByLabel("Lessons per day").fill("5");
  await page.getByRole("button", { name: "Update goal" }).click();
  await page.getByRole("link", { name: "Overview", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Welcome back, Sam." }),
  ).toBeVisible();
  await expect(page.locator(".goal-count")).toContainText("/ 5 lessons");
  await page.goto("/#/lesson/%E0%A4%A");
  await expect(
    page.getByRole("heading", { name: "This page isn't in your workspace" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Settings", exact: true }).click();
  await page
    .getByRole("button", { name: "Reset learning data", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Keep my progress" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("mobile menu and key pages fit narrow viewports", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await demo(page);
  await expect(page.locator(".sidebar")).not.toBeInViewport();
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.locator(".sidebar")).toBeInViewport();
  await page
    .getByRole("link", { name: "Learning tracks", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Learning tracks", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.locator(".track-card").filter({ hasText: "TypeScript" }).click();
  await page.setViewportSize({ width: 320, height: 844 });
  await expect(
    page.getByRole("heading", { name: "TypeScript", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.locator(".resource-row-main").first().click();
  await expect(
    page.getByRole("heading", { name: "What is TypeScript?", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await expect(
    page.getByRole("button", { name: "Mark as complete" }),
  ).toBeVisible();
});

test("practice filters, hints, worked solutions, and completion persist", async ({
  page,
}) => {
  await demo(page);
  await page.getByRole("link", { name: "Practice lab", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Practice lab", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".resource-row")).toHaveCount(30);
  await page.getByLabel("Filter by track").selectOption("javascript");
  await expect(page.locator(".resource-row")).toHaveCount(3);
  await page.getByLabel("Filter by difficulty").selectOption("Intermediate");
  await page.getByLabel("Filter by topic").selectOption("Functions");
  await expect(page.locator(".resource-row")).toHaveCount(1);
  await page.locator(".resource-row-main").click();
  await expect(
    page.getByRole("heading", { name: "Implement a cancellable debounce" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Worked solution" }),
  ).not.toBeVisible();
  await expect(page.locator(".acceptance-checks")).toContainText(
    "cancel prevents",
  );
  await page.locator(".exercise-hints summary").click();
  await expect(page.locator(".exercise-hints")).toContainText(
    "Clear the previous timeout",
  );
  await page
    .getByRole("button", { name: "Show solution", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Worked solution" }),
  ).toBeVisible();
  await expect(page.locator("#worked-solution")).toContainText(
    "fn.apply(this, args)",
  );
  await page
    .getByRole("button", { name: "Bookmark resource", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Mark as complete", exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Completed", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Remove bookmark", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Show solution", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Practice lab", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Search exercises..." })
    .fill("cancellable debounce");
  await page.getByLabel("Not completed").check();
  await expect(
    page.getByRole("heading", { name: "No matching exercises" }),
  ).toBeVisible();
});

test("new Q&As are difficulty-filtered and Nginx answers render as prose", async ({
  page,
}) => {
  await demo(page);
  await page.getByRole("link", { name: "Interview prep", exact: true }).click();
  await page.getByLabel("Filter by track").selectOption("typescript");
  await page.getByLabel("Filter by difficulty").selectOption("Advanced");
  await expect(page.locator(".interview-question")).toHaveCount(1);
  await page.locator(".question-toggle").click();
  await expect(page.locator(".question-answer")).toContainText("never");
  await expect(page.locator(".reference-links a")).toHaveCount(4);
  await page.getByLabel("Filter by track").selectOption("nginx");
  await page.getByLabel("Filter by difficulty").selectOption("Beginner");
  await page
    .locator(".question-toggle")
    .filter({ hasText: "reverse proxy" })
    .click();
  await page.getByRole("link", { name: "Open lesson", exact: true }).click();
  await expect(
    page.getByRole("tab", { name: "Lesson", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".reader .document-body")).toContainText(
    "forwards selected traffic",
  );
});

test("track practice tabs and exercise readers fit a 320px screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await demo(page);
  await page.goto("/#/track/react");
  await page.getByRole("tab", { name: /^Practice/ }).click();
  await expect(page.locator(".resource-row")).toHaveCount(3);
  await page.locator(".resource-row-main").first().click();
  await expect(
    page.getByRole("heading", { name: "Build a searchable course list" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Show solution", exact: true })
    .click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("link", { name: "Practice lab", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Practice lab", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});
