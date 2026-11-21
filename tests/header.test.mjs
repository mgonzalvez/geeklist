/* ============================================================
   Smoke test for the header generator in app.js.
   Run with:  node tests/header.test.mjs
   Fails (exit 1) if static content drifts from the BGG template
   or if dynamic field interpolation breaks.
   ============================================================ */

import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";

const repoRoot = path.resolve(import.meta.dirname, "..");

const appSource = readFileSync(path.join(repoRoot, "app.js"), "utf8");
const template = readFileSync(
    path.join(repoRoot, "data", "Crafting_Geeklist_Header_Text_Template_updated_2026.txt"),
    "utf8"
);

// Run app.js in a sandbox with a stub DOM so its functions are callable.
// app.js only touches the DOM inside functions and the DOMContentLoaded
// handler, which never runs here.
const stubDocument = {
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    createElement: () => ({
        classList: { add: () => {}, toggle: () => {} },
        innerHTML: "",
        appendChild: () => {},
    }),
    body: { appendChild: () => {}, removeChild: () => {} },
};

const context = vm.createContext({
    document: stubDocument,
    window: {},
    navigator: {},
    localStorage: {},
    Blob: class {},
    URL: { createObjectURL: () => "", revokeObjectURL: () => {} },
    console,
    setTimeout: () => {},
});
vm.runInContext(appSource, context);

const { generateHeader, formatForPreview } = context;

let failures = 0;
const fail = (message) => {
    failures += 1;
    console.error("FAIL:", message);
};

// 1. Static links in app.js must match the template file.
const staticTokens = [...template.match(/\[(?:url|geeklist|thread|uforum|blogpost|geekurl)=[^\]]+\]/g)]
    .filter(token => !/[xX]{3,}/.test(token)); // skip placeholder tokens like [geeklist=xxxxxx]

const sample = generateHeader({
    month: "January",
    year: 2027,
    theme: "Test Theme",
    themeDescription: "A test description of the theme.",
    pnpGamesOnYourTableId: "123456",
    lastMonth: "December",
    lastYear: 2026,
    entryCount: "42",
    lastCraftingGeeklistId: "123450",
});

for (const token of staticTokens) {
    if (!sample.includes(token)) {
        fail(`Generated header is missing static token from template: ${token}`);
    }
}

// 2. Dynamic fields must be interpolated correctly.
const dynamicChecks = [
    ["January 2027", "current month/year header"],
    ["Test Theme", "theme title"],
    ["[i]A test description of the theme.[/i]", "italic theme description"],
    ["[geeklist=123456]", "PnP Games On Your Table ID"],
    ["Last month (December 2026), we contributed 42 entries", "recap line"],
    ["[geeklist=123450]", "last month crafting geeklist link"],
];
for (const [needle, label] of dynamicChecks) {
    if (!sample.includes(needle)) fail(`Missing ${label}: expected "${needle}"`);
}

// 3. Preview conversion handles the core BGG tags.
const preview = formatForPreview("[b]Bold[/b] [i]Italic[/i] [url=https://example.com]Link[/url]");
if (!preview.includes("<strong>")) fail("Preview does not convert [b] to <strong>");
if (!preview.includes("<em>")) fail("Preview does not convert [i] to <em>");
if (!preview.includes("href=\"https://example.com\"")) fail("Preview does not convert [url] to an anchor");

// 4. Fallbacks when fields are empty.
const empty = generateHeader({});
if (!empty.includes("xxxxxx")) fail("Missing geeklist placeholder when ID is not provided");

if (failures) {
    console.error(`Header smoke test failed with ${failures} issue(s).`);
    process.exit(1);
}
console.log("Header generator smoke test passed.");
