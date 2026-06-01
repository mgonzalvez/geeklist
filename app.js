/* ===========================
   PnP Crafting Geeklist Generator
   Application Logic
   =========================== */

// Guest hosts data for 2026
const GUEST_HOSTS = [
    { month: "January",   year: 2026, user: "b0ardgamer",  theme: "Planes, Trains, and Automobiles. And Spaceships." },
    { month: "February",  year: 2026, user: "jamierufe",   theme: "PnP Accessories" },
    { month: "March",     year: 2026, user: "leleyx",      theme: "March Madness" },
    { month: "April",     year: 2026, user: "hammerquill", theme: "Try Something New" },
    { month: "May",       year: 2026, user: "awakener76",  theme: "Shrinkification" },
    { month: "June",      year: 2026, user: "DrHenryArmitage", theme: "Summer Fun" },
    { month: "July",      year: 2026, user: "ecoboardgeek123", theme: "Rethemes" },
    { month: "August",    year: 2026, user: "Gamecreature", theme: "Over The Top!" },
    { month: "September", year: 2026, user: null,          theme: null },
    { month: "October",   year: 2026, user: "ecoboardgeek123", theme: "Artwork" },
    { month: "November",  year: 2026, user: "DaddyDosDeuce", theme: "Culture and History" },
    { month: "December",  year: 2026, user: null,          theme: null },
];

const BGG_COLOR_HEX = "#ffdd00";
const BGG_COLOR_HEX2 = "#e0b61f";

// ===========================
// Header Generator
// ===========================

function generateHeader(data) {
    const month = data.month || "xxxx";
    const year = data.year || "xxxx";
    const theme = data.theme || "(insert theme here)";
    const pnpGamesId = data.pnpGamesOnYourTableId ? `[geeklist=${data.pnpGamesOnYourTableId}][/geeklist]` : "[geeklist=xxxxxx][/geeklist]";
    const lastMonth = data.lastMonth || "xxxx";
    const lastYear = data.lastYear || "xxxx";
    const entryCount = data.entryCount !== null && data.entryCount !== undefined ? data.entryCount : "xx";
    const lastCraftingId = data.lastCraftingGeeklistId ? `[geeklist=${data.lastCraftingGeeklistId}]Link to last month's PnP geeklist[/geeklist]` : "[geeklist=xxxx]Link to last month's PnP geeklist[/geeklist]";

    const lines = [
        `[b][size=18]Welcome to the print and play crafting geeklist for [color=${BGG_COLOR_HEX}][color=${BGG_COLOR_HEX2}][size=24]${month} ${year}[/size][/color][/color]![/size][/b].`,
        "",
    ];

    if (data.themeDescription) {
        lines.push(`[size=18]This month's theme: ${theme} — [i]${data.themeDescription}[/i] [/size]`);
    } else {
        lines.push(`[size=18]This month's theme: ${theme} [/size]`);
    }

    lines.push("========================================");
    const pnpGamesLabel = `${month} ${year}`;
    lines.push(`[size=18][b]Playing PnP games? Share your gameplays on ${pnpGamesId}PnP Games on Your Table ${pnpGamesLabel}[/geeklist][/b][/size]`);
    lines.push("========================================");
    lines.push(":chalice:[b]Print and play game design contests ongoing right now: [/b] [uforum=974620]Design contests[/uforum]");
    lines.push(":arrowE:Check out the contest [uforum=1530033]WIP threads[/uforum] to provide support, proofread rulebooks, and playtest the PnP game classics of the future.");
    lines.push("========================================");
    lines.push(`[b]Last month (${lastMonth} ${lastYear}), we contributed ${entryCount} entries to this crafting geeklist. How many PnP projects will you craft this month?[/b]`);
    lines.push(`:d6-1: ${lastCraftingId}`);
    lines.push(":d6-2: [thread=482943]Link to the subscription thread[/thread]");
    lines.push(":d6-3: [url=https://boardgamegeek.com/geeklists?domain=boardgame&userid=3545&page=1]Archive of PnP geeklists from June 2010 to October 2020[/url]");
    lines.push("========================================");
    lines.push("[b]Places to discover and get PnP games:[/b]");
    lines.push(":arrowE: [url=https://www.pnpfinder.com/]PnPFinder.com[/url]");
    lines.push(":arrowE: [url=https://launchpad.gonzhome.us/]PnP Launchpad[/url]");
    lines.push(":arrowE: [url=https://buttonshygames.itch.io/]Buttonshy Games on itch.io[/url]");
    lines.push(":arrowE: [url=https://www.thegamecrafter.com/designers/button-shy-games-s-games/]Buttonshy Games on The Gamecrafter[/url]");
    lines.push(":arrowE: [url=https://pnparcade.substack.com/]PnPArcade Substack[/url]");
    lines.push(":arrowE: [geeklist=149598]Kickstarters with PnP versions available (& other crowdfunding)[/geeklist]");
    lines.push(":arrowE: [geeklist=248640]Sites to Download Games (PnP)[/geeklist]");
    lines.push(":arrowE: [geeklist=256760]Project SHRINKO! Tiny versions of big BIG games[/geeklist]");
    lines.push(":arrowE: [geeklist=229881]PnP cousins of commercial games[/geeklist]");
    lines.push(":arrowE: [geeklist=1567]Games That Are Free To Print and Play[/geeklist]");
    lines.push("========================================");
    lines.push("[b]PnP prototyping, file layout, and formatting tools:[/b]");
    lines.push(":arrowE: Free, high quality, easy to use web app to output properly formatted PnP files: [url=https://formatter.gonzhome.us/]Martin's Card Formatter[/url]");
    lines.push(":arrowE: Extract individual card images from existing PnP PDF files: [url=https://extractor.gonzhome.us/]Martin's Card Extractor[/url]");
    lines.push(":arrowE: Lay out PnP files and fix front-back alignment: [url=http://www.pnpbuddy.com]PnPBuddy.com[/url]");
    lines.push(":arrowE: Windows-based PnP formatting tool: [thread=2490834]PnP Tool[/thread]");
    lines.push(":arrowE: Convert PnP traditional grid format to gutterfold: [url=https://foosel.github.io/cardfoldr]CardFoldr[/url]");
    lines.push(":arrowE: Make quick and dirty prototypes of cards for your PnP game designs: [url=https://prototyper.gonzhome.us/]Martin's Card Prototyper[/url]");
    lines.push(":arrowE: Freemium web app to prototype PnP games using spreadsheets: [url=https://www.dextrous.com.au/]Dextrous[/url]");
    lines.push(":arrowE: Mac-based PnP prototyping tool: [url=https://www.semicolon.com/multideck/multideck.html]Multideck[/url]");
    lines.push(":arrowE: Powerful, flexible scripting tool for rapid card protopying: [url=https://nandeck.com/]Nandeck[/url]");
    lines.push("[b]:geek_star: Comprehensive directory of PnP tools and resources: [url=https://pnptools.gonzhome.us/]PnP Tools[/url][/b]");
    lines.push("========================================");
    lines.push("[b]Engage with the PnP community online:[/b][b][b][/b][/b]");
    lines.push(":d10-1: Reddit:  [url=https://www.reddit.com/r/printandplay/]r/printandplay Subreddit[/url]");
    lines.push(":d10-2: Facebook: [url=http://www.facebook.com/groups/pnphideaway/]Print and Play Hideaway[/url]");

    return lines.join("\n");
}

function collectFormData() {
    return {
        month: document.getElementById("month").value,
        year: document.getElementById("year").value,
        theme: document.getElementById("theme").value,
        themeDescription: document.getElementById("themeDescription").value,
        pnpGamesOnYourTableId: document.getElementById("pnpGamesOnYourTableId").value,
        lastMonth: document.getElementById("lastMonth").value,
        lastYear: document.getElementById("lastYear").value,
        entryCount: document.getElementById("entryCount").value,
        lastCraftingGeeklistId: document.getElementById("lastCraftingGeeklistId").value,
    };
}

function renderOutput(data) {
    const rawCode = generateHeader(data);
    const rawOutput = document.getElementById("rawOutput");
    const formattedOutput = document.getElementById("formattedOutput");
    const outputSection = document.getElementById("outputSection");

    rawOutput.textContent = rawCode;
    formattedOutput.innerHTML = formatForPreview(rawCode);

    outputSection.classList.remove("hidden");

    // Reset to raw tab
    switchTab("raw");
}

function formatForPreview(bggCode) {
    // Convert BGG tags to HTML for preview
    let html = bggCode
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Process [b]...[/b]
    html = html.replace(/\[b\]/g, "<strong>").replace(/\[\/b\]/g, "</strong>");

    // Process [i]...[/i]
    html = html.replace(/\[i\]/g, "<em>").replace(/\[\/i\]/g, "</em>");

    // Process [size=XX]...[/size]
    html = html.replace(/\[size=(\d+)\]/g, '<span style="font-size:$1px">').replace(/\[\/size\]/g, "</span>");

    // Process [color=...]...[/color]
    html = html.replace(/\[color=([^\]]+)\]/g, '<span style="color:$1">').replace(/\[\/color\]/g, "</span>");

    // Process [url=...]...[/url]
    html = html.replace(/\[url=([^\]]+)\]([^\[]+)\[\/url\]/g, '<a href="$1" target="_blank" style="color:#e94560">$2</a>');

    // Process [geeklist=...]...[/geeklist] — handle both numeric IDs and placeholder text like "xxxx"
    html = html.replace(/\[geeklist=([^\]]+)\]([^\[]*)\[\/geeklist\]/g, function(match, id, label) {
        const displayLabel = label || 'Geeklist ' + id;
        return '<a href="https://boardgamegeek.com/geeklist/' + id + '" target="_blank" style="color:#e94560">' + displayLabel + '</a>';
    });

    // Process [thread=...]...[/thread]
    html = html.replace(/\[thread=([^\]]+)\]([^\[]*)\[\/thread\]/g, function(match, id, label) {
        const displayLabel = label || 'Thread ' + id;
        return '<a href="https://boardgamegeek.com/thread/' + id + '" target="_blank" style="color:#e94560">' + displayLabel + '</a>';
    });

    // Process [uforum=...]...[/uforum]
    html = html.replace(/\[uforum=([^\]]+)\]([^\[]*)\[\/uforum\]/g, function(match, id, label) {
        const displayLabel = label || 'Forum ' + id;
        return '<a href="https://boardgamegeek.com/forum/' + id + '" target="_blank" style="color:#e94560">' + displayLabel + '</a>';
    });

    // Handle line breaks
    html = html.replace(/\n/g, "<br>");

    // Handle separators
    html = html.replace(/={4,}/g, "<hr style='border-color:#2a2a4a; margin: 1rem 0;'>");

    return html;
}

function switchTab(tabName) {
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.tab === tabName);
    });
    document.getElementById("rawOutput").classList.toggle("hidden", tabName !== "raw");
    document.getElementById("formattedOutput").classList.toggle("hidden", tabName !== "formatted");
}

// ===========================
// Guest Hosts Roster
// ===========================

function renderGuestHosts() {
    const grid = document.getElementById("hostGrid");
    const missingList = document.getElementById("missingHostList");
    grid.innerHTML = "";
    missingList.innerHTML = "";

    GUEST_HOSTS.forEach((host, index) => {
        const card = document.createElement("div");
        card.className = "host-card";

        if (host.user && host.theme) {
            card.classList.add("filled");
            card.innerHTML = `
                <span class="status-badge">✓ Filled</span>
                <div class="month-year">${host.month} ${host.year}</div>
                <div class="host-name">User: ${host.user}</div>
                <div class="host-theme">Theme: ${host.theme}</div>
            `;
        } else if (host.user) {
            card.classList.add("pending");
            card.innerHTML = `
                <span class="status-badge">⏳ Pending</span>
                <div class="month-year">${host.month} ${host.year}</div>
                <div class="host-name">User: ${host.user}</div>
                <div class="host-theme">Theme: TBD</div>
            `;
        } else {
            card.classList.add("empty");
            card.innerHTML = `
                <span class="status-badge">Empty</span>
                <div class="month-year">${host.month} ${host.year}</div>
                <div class="host-name">No host assigned</div>
                <div class="host-theme">Theme: TBD</div>
            `;
            const li = document.createElement("li");
            li.textContent = `${host.month} ${host.year}`;
            missingList.appendChild(li);
        }

        grid.appendChild(card);
    });
}

// ===========================
// Event Listeners
// ===========================

document.addEventListener("DOMContentLoaded", () => {
    // Theme toggle
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("theme");
    const isLight = savedTheme === "light";
    if (isLight) {
        document.body.classList.add("light");
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light");
        const nowLight = document.body.classList.contains("light");
        themeToggle.textContent = nowLight ? "☀️" : "🌙";
        localStorage.setItem("theme", nowLight ? "light" : "dark");
    });

    const form = document.getElementById("headerForm");
    const exportBtn = document.getElementById("exportBtn");
    const validationError = document.getElementById("validationError");

    function validateForm() {
        const fields = [
            { id: "month", label: "Month" },
            { id: "year", label: "Year" },
            { id: "theme", label: "Theme" },
            { id: "themeDescription", label: "Theme Description" },
            { id: "pnpGamesOnYourTableId", label: "PnP Games On Your Table Geeklist ID" },
            { id: "lastMonth", label: "Last Month" },
            { id: "lastYear", label: "Last Year" },
            { id: "entryCount", label: "Entry Count" },
            { id: "lastCraftingGeeklistId", label: "Last Month's Crafting Geeklist ID" },
        ];

        let valid = true;
        let missing = [];

        fields.forEach(f => {
            const el = document.getElementById(f.id);
            if (!el.value.trim()) {
                valid = false;
                missing.push(f.label);
                el.classList.add("invalid");
            } else {
                el.classList.remove("invalid");
            }
        });

        if (!valid) {
            validationError.textContent = "Please fill in all required fields: " + missing.join(", ");
            validationError.classList.remove("hidden");
            exportBtn.disabled = true;
        } else {
            validationError.classList.add("hidden");
            exportBtn.disabled = false;
        }

        return valid;
    }

    // Attach validation to all inputs
    form.querySelectorAll("input, select, textarea").forEach(el => {
        el.addEventListener("input", validateForm);
        el.addEventListener("change", validateForm);
    });

    // Form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const data = collectFormData();
        renderOutput(data);
    });

    // Preview button
    document.getElementById("previewBtn").addEventListener("click", () => {
        if (!validateForm()) return;
        const data = collectFormData();
        renderOutput(data);
        // Switch to formatted tab
        switchTab("formatted");
    });

    // Tab switching
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });

    // Copy to clipboard
    document.getElementById("copyBtn").addEventListener("click", () => {
        const rawOutput = document.getElementById("rawOutput").textContent;
        navigator.clipboard.writeText(rawOutput).then(() => {
            const btn = document.getElementById("copyBtn");
            const original = btn.textContent;
            btn.textContent = "✅ Copied!";
            setTimeout(() => { btn.textContent = original; }, 2000);
        });
    });

    // Download as .txt
    document.getElementById("downloadBtn").addEventListener("click", () => {
        const rawOutput = document.getElementById("rawOutput").textContent;
        const data = collectFormData();
        const filename = `PnP_Crafting_Header_${data.month}_${data.year}.txt`;
        const blob = new Blob([rawOutput], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Render guest hosts
    renderGuestHosts();
});
