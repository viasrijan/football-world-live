const LEAGUES = [
  { id: "4328", name: "Premier League" },
  { id: "4331", name: "La Liga" },
  { id: "4332", name: "Serie A" },
  { id: "4335", name: "Bundesliga" },
  { id: "4334", name: "Ligue 1" },
  { id: "4346", name: "UEFA Champions League" },
  { id: "4344", name: "MLS" },
];

const els = {
  headlines: document.getElementById("headline-cards"),
  rumors: document.getElementById("rumor-cards"),
  discussions: document.getElementById("discussion-cards"),
  scores: document.getElementById("scoreboard"),
  fixtures: document.getElementById("fixture-grid"),
  refreshBtn: document.getElementById("refresh-btn"),
  updatedAt: document.getElementById("last-updated"),
  status: {
    headlines: document.getElementById("headline-status"),
    rumors: document.getElementById("rumor-status"),
    discussions: document.getElementById("discussion-status"),
    scores: document.getElementById("score-status"),
    fixtures: document.getElementById("fixture-status"),
  },
};

const setStatus = (key, label, tone = "neutral") => {
  const el = els.status[key];
  if (!el) return;
  el.textContent = label;
  const tones = {
    neutral: "rgba(129, 150, 212, 0.2)",
    live: "rgba(87, 217, 163, 0.18)",
    warning: "rgba(255, 210, 125, 0.2)",
    error: "rgba(255, 129, 129, 0.18)",
  };
  el.style.background = tones[tone] ?? tones.neutral;
};

const formatDate = (dateObj) =>
  new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    day: "numeric",
  }).format(dateObj);

const withTimeout = async (url, timeoutMs = 12000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
};

const todayISO = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60000);
  return local.toISOString().slice(0, 10);
};

const safeText = (value, fallback) => (value && String(value).trim() ? String(value).trim() : fallback);

const getScoreline = (event) => {
  const home = event.intHomeScore;
  const away = event.intAwayScore;
  if (home === null || home === undefined || away === null || away === undefined) return "vs";
  return `${home} - ${away}`;
};

const extractEvents = async () => {
  const date = todayISO();
  const url = `https://www.thesportsdb.com/api/v1/json/3/eventsday.php?d=${date}&s=Soccer`;
  const data = await withTimeout(url);
  return (data?.events || [])
    .filter((e) => e.strSport === "Soccer")
    .sort((a, b) => (a.strLeague || "").localeCompare(b.strLeague || ""));
};

const extractRedditPosts = async (subreddit, limit = 8) => {
  const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=${limit}`;
  const data = await withTimeout(url);
  const children = data?.data?.children || [];
  return children.map((item) => item.data).filter(Boolean);
};

const renderHeadlines = (events, discussions) => {
  const pieces = [];
  const scoredMatches = events.filter((event) => event.intHomeScore !== null && event.intAwayScore !== null).slice(0, 4);
  scoredMatches.forEach((event) => {
    pieces.push({
      title: `🔥 ${safeText(event.strLeague, "League")} drama: ${safeText(event.strHomeTeam, "Home")} ${event.intHomeScore}-${event.intAwayScore} ${safeText(event.strAwayTeam, "Away")}`,
      source: "Generated from live scores",
      copy: `Result alert from ${safeText(event.strLeague, "global football")}.`,
      href: event.strVideo || null,
    });
  });

  discussions.slice(0, 4).forEach((post) => {
    pieces.push({
      title: `🗞️ ${safeText(post.title, "Football pulse update")}`,
      source: "r/soccer",
      copy: `${(post.ups || 0).toLocaleString()} upvotes • ${safeText(post.author, "community")}`,
      href: `https://reddit.com${post.permalink || ""}`,
    });
  });

  const items = pieces.slice(0, 6);
  if (items.length === 0) {
    els.headlines.innerHTML = `<article class="card"><p class="card-copy">No headline feed available right now. Tap refresh in a moment.</p></article>`;
    setStatus("headlines", "Fallback", "warning");
    return;
  }

  els.headlines.innerHTML = items
    .map(
      (item) => `<article class="card">
        <p class="card-meta">${item.source}</p>
        <h3 class="card-title">${item.href ? `<a href="${item.href}" target="_blank" rel="noopener noreferrer">${item.title}</a>` : item.title}</h3>
        <p class="card-copy">${item.copy}</p>
      </article>`
    )
    .join("");
  setStatus("headlines", "Live", "live");
};

const renderRumors = (rumors) => {
  const items = rumors.slice(0, 6);
  if (items.length === 0) {
    els.rumors.innerHTML = `<article class="card"><p class="card-copy">Rumor stream temporarily unavailable.</p></article>`;
    setStatus("rumors", "Unavailable", "warning");
    return;
  }

  els.rumors.innerHTML = items
    .map(
      (post) => `<article class="card">
        <p class="card-meta">r/soccertransfer • ${(post.ups || 0).toLocaleString()} upvotes</p>
        <h3 class="card-title"><a href="https://reddit.com${post.permalink || ""}" target="_blank" rel="noopener noreferrer">${safeText(post.title, "Transfer rumor update")}</a></h3>
        <p class="card-copy">By u/${safeText(post.author, "unknown")} • ${(post.num_comments || 0).toLocaleString()} comments</p>
      </article>`
    )
    .join("");
  setStatus("rumors", "Live", "live");
};

const renderDiscussions = (discussions) => {
  const items = discussions.slice(0, 6);
  if (items.length === 0) {
    els.discussions.innerHTML = `<article class="card"><p class="card-copy">Discussion feed is currently empty.</p></article>`;
    setStatus("discussions", "Unavailable", "warning");
    return;
  }

  els.discussions.innerHTML = items
    .map(
      (post) => `<article class="card">
        <p class="card-meta">r/soccer • ${(post.ups || 0).toLocaleString()} upvotes</p>
        <h3 class="card-title"><a href="https://reddit.com${post.permalink || ""}" target="_blank" rel="noopener noreferrer">${safeText(post.title, "Football discussion")}</a></h3>
        <p class="card-copy">By u/${safeText(post.author, "unknown")} • ${(post.num_comments || 0).toLocaleString()} comments</p>
      </article>`
    )
    .join("");
  setStatus("discussions", "Live", "live");
};

const renderScores = (events) => {
  const items = events.slice(0, 18);
  if (items.length === 0) {
    els.scores.innerHTML = `<div class="score-row"><span class="card-copy">No score data available right now.</span></div>`;
    setStatus("scores", "Unavailable", "warning");
    return;
  }

  els.scores.innerHTML = items
    .map(
      (event) => `<div class="score-row">
      <div class="score-home">${safeText(event.strHomeTeam, "Home")}</div>
      <div class="scoreline">${getScoreline(event)}</div>
      <div class="score-away">${safeText(event.strAwayTeam, "Away")}</div>
      <div class="score-meta">${safeText(event.strLeague, "League")} • ${safeText(event.strStatus || event.strTime || event.dateEvent, "Scheduled")}</div>
    </div>`
    )
    .join("");
  setStatus("scores", "Live", "live");
};

const extractLeagueFixtures = async (leagueId) => {
  const url = `https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=${leagueId}`;
  const data = await withTimeout(url);
  return data?.events || [];
};

const renderFixtures = (leagueData) => {
  const cards = leagueData.filter((entry) => entry.matches.length > 0).slice(0, 6);
  if (cards.length === 0) {
    els.fixtures.innerHTML = `<article class="card"><p class="card-copy">No fixture feed currently available.</p></article>`;
    setStatus("fixtures", "Unavailable", "warning");
    return;
  }

  els.fixtures.innerHTML = cards
    .map((entry) => {
      const topMatches = entry.matches.slice(0, 4);
      return `<article class="card league-card">
          <h3>${entry.name}</h3>
          <div class="league-list">
            ${topMatches
              .map(
                (match) => `<div class="league-item">
                <span>${safeText(match.strHomeTeam, "Home")} vs ${safeText(match.strAwayTeam, "Away")}</span>
                <span>${safeText(match.dateEvent, "")}</span>
              </div>`
              )
              .join("")}
          </div>
        </article>`;
    })
    .join("");
  setStatus("fixtures", "Live", "live");
};

const loadAll = async () => {
  els.refreshBtn.disabled = true;
  els.updatedAt.textContent = "Refreshing feeds…";
  ["headlines", "rumors", "discussions", "scores", "fixtures"].forEach((k) => setStatus(k, "Loading", "neutral"));

  let events = [];
  let discussions = [];
  let rumors = [];

  try {
    events = await extractEvents();
    renderScores(events);
  } catch (error) {
    renderScores([]);
    setStatus("scores", "Feed error", "error");
  }

  try {
    discussions = await extractRedditPosts("soccer", 10);
    renderDiscussions(discussions);
  } catch (error) {
    renderDiscussions([]);
    setStatus("discussions", "Feed error", "error");
  }

  try {
    rumors = await extractRedditPosts("soccertransfer", 10);
    renderRumors(rumors);
  } catch (error) {
    renderRumors([]);
    setStatus("rumors", "Feed error", "error");
  }

  try {
    renderHeadlines(events, discussions);
  } catch (error) {
    setStatus("headlines", "Feed error", "error");
  }

  try {
    const fixturePromises = LEAGUES.map(async (league) => ({
      id: league.id,
      name: league.name,
      matches: await extractLeagueFixtures(league.id),
    }));
    const leaguesWithMatches = await Promise.all(fixturePromises);
    renderFixtures(leaguesWithMatches);
  } catch (error) {
    renderFixtures([]);
    setStatus("fixtures", "Feed error", "error");
  }

  els.updatedAt.textContent = `Last updated ${formatDate(new Date())}`;
  els.refreshBtn.disabled = false;
};

els.refreshBtn.addEventListener("click", loadAll);
loadAll();
