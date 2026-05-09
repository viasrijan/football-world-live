const LEAGUES = [
  { id: "4328", name: "Premier League" },
  { id: "4331", name: "La Liga" },
  { id: "4332", name: "Serie A" },
  { id: "4335", name: "Bundesliga" },
  { id: "4334", name: "Ligue 1" },
  { id: "4346", name: "Champions League" },
];

// Team logo URLs via API
const TEAM_LOGOS = {
  "Manchester City": "https://cdn.sofifa.net/teams/71.png",
  "Liverpool": "https://cdn.sofifa.net/teams/70.png",
  "Arsenal": "https://cdn.sofifa.net/teams/69.png",
  "Chelsea": "https://cdn.sofifa.net/teams/68.png",
  "Manchester United": "https://cdn.sofifa.net/teams/67.png",
  "Barcelona": "https://cdn.sofifa.net/teams/131.png",
  "Real Madrid": "https://cdn.sofifa.net/teams/127.png",
  "Bayern Munich": "https://cdn.sofifa.net/teams/112.png",
  "PSG": "https://cdn.sofifa.net/teams/91.png",
  "Juventus": "https://cdn.sofifa.net/teams/109.png",
};

// Sample data - realistic football content
const SAMPLE_SCORES = [
  { home: "Manchester City", away: "Arsenal", homeScore: 2, awayScore: 1, league: "Premier League", date: "09.05.26" },
  { home: "Real Madrid", away: "Barcelona", homeScore: 3, awayScore: 2, league: "La Liga", date: "08.05.26" },
  { home: "Bayern Munich", away: "Dortmund", homeScore: 4, awayScore: 1, league: "Bundesliga", date: "08.05.26" },
  { home: "PSG", away: "Lyon", homeScore: 2, awayScore: 0, league: "Ligue 1", date: "07.05.26" },
  { home: "Juventus", away: "AC Milan", homeScore: 1, awayScore: 1, league: "Serie A", date: "07.05.26" },
  { home: "Liverpool", away: "Chelsea", homeScore: 3, awayScore: 1, league: "Premier League", date: "06.05.26" },
  { home: "Inter Milan", away: "Napoli", homeScore: 2, awayScore: 2, league: "Serie A", date: "06.05.26" },
  { home: "Atletico Madrid", away: "Sevilla", homeScore: 1, awayScore: 0, league: "La Liga", date: "05.05.26" },
];

const SAMPLE_FIXTURES = [
  { league: "Premier League", matches: [
    { home: "Manchester City", away: "Aston Villa", date: "10.05.26" },
    { home: "Liverpool", away: "Tottenham", date: "10.05.26" },
    { home: "Arsenal", away: "Brighton", date: "11.05.26" },
  ]},
  { league: "La Liga", matches: [
    { home: "Real Madrid", away: "Celta Vigo", date: "10.05.26" },
    { home: "Barcelona", away: "Villarreal", date: "10.05.26" },
  ]},
  { league: "Serie A", matches: [
    { home: "Juventus", away: "Roma", date: "10.05.26" },
    { home: "Inter Milan", away: "Lazio", date: "10.05.26" },
  ]},
];

const SAMPLE_HEADLINES = [
  { title: "Manchester City edge past Arsenal in thriller", source: "Match Report", copy: "2-1 victory seals crucial three points at the Emirates", href: "#" },
  { title: "Real Madrid complete comeback against Barcelona", source: "La Liga", copy: "3-2 win in El Clasico keeps title hopes alive", href: "#" },
  { title: "Bayern Munich thrash Dortmund in derby", source: "Bundesliga", copy: "4-1 win in biggest rivalry match of the season", href: "#" },
  { title: "PSG maintain lead with Lyon win", source: "Ligue 1", copy: "2-0 victory at Parc des Princes", href: "#" },
  { title: "Inter Milan stun Juventus with late equaliser", source: "Serie A", copy: "2-2 draw in Turin derby", href: "#" },
  { title: "Liverpool crush Chelsea at Anfield", source: "Premier League", copy: "3-1 win extends lead at top", href: "#" },
  { title: "Atletico Madrid edge past Sevilla", source: "La Liga", copy: "1-0 win pushes into top 4", href: "#" },
  { title: "Newcastle shock Manchester United", source: "Premier League", copy: "2-1 upset at Old Trafford", href: "#" },
  { title: "AC Milan beat Roma in tight contest", source: "Serie A", copy: "1-0 win in crucial European race", href: "#" },
  { title: "Dortmund bounce back with big win", source: "Bundesliga", copy: "3-0 victory over Frankfurt", href: "#" },
];

const SAMPLE_RUMORS = [
  { title: "Star midfielder linked to Premier League move", ups: 2300, author: "FootyInsider", num_comments: 450, href: "#" },
  { title: "Chelsea in talks for €80M striker", ups: 1850, author: "TransferWatch", num_comments: 320, href: "#" },
  { title: "Barcelona prepare €60M bid for Arsenal star", ups: 1650, author: "LaLigaInsider", num_comments: 280, href: "#" },
  { title: "Bayern target former player return", ups: 1400, author: "BundesligaBuzz", num_comments: 195, href: "#" },
  { title: "Real Madrid eye €100M wonderkid", ups: 2100, author: "MadridNews", num_comments: 410, href: "#" },
  { title: "PSG make shock approach for veteran striker", ups: 1200, author: "FrenchFootball", num_comments: 165, href: "#" },
  { title: "Liverpool consider surprise swoop for midfielder", ups: 980, author: "AnfieldTalk", num_comments: 145, href: "#" },
  { title: "Inter Milan in negotiations for defender", ups: 870, author: "Calciomercato", num_comments: 120, href: "#" },
  { title: "Tottenham prepare big offer for forward", ups: 1100, author: "SpursInsider", num_comments: 180, href: "#" },
  { title: "Juventus target Premier League midfielder", ups: 920, author: "Tuttosport", num_comments: 135, href: "#" },
];

const SAMPLE_DISCUSSIONS = [
  { title: "Who will win the title this season?", ups: 3400, author: "SoccerFan", num_comments: 890, href: "#" },
  { title: "Best XI from this weekend", ups: 2100, author: "Tactics Expert", num_comments: 560, href: "#" },
  { title: "Underrated players that deserve more recognition", ups: 1800, author: "FootballAnalyst", num_comments: 420, href: "#" },
  { title: "Most controversial refereeing decisions", ups: 2900, author: "RefWatch", num_comments: 780, href: "#" },
  { title: "Youth players to watch in 2026", ups: 1500, author: "ScoutNetwork", num_comments: 340, href: "#" },
  { title: "Best managers in the world right now", ups: 2300, author: "CoachingCorner", num_comments: 610, href: "#" },
  { title: "Biggest overachievers this season", ups: 1200, author: "StatsGuru", num_comments: 290, href: "#" },
  { title: "Most exciting young talents", ups: 1900, author: "YouthExpert", num_comments: 450, href: "#" },
  { title: "Transfer window predictions", ups: 2700, author: "RumourMill", num_comments: 720, href: "#" },
  { title: "Iconic matches from this decade", ups: 1600, author: "HistoryBuff", num_comments: 380, href: "#" },
];

const els = {
  headlines: document.getElementById("headline-cards"),
  rumors: document.getElementById("rumor-cards"),
  discussions: document.getElementById("discussion-cards"),
  scores: document.getElementById("scoreboard"),
  fixtures: document.getElementById("fixture-grid"),
  refreshBtn: document.getElementById("refresh-btn"),
  updatedAt: document.getElementById("last-updated"),
  sliderTrack: document.getElementById("slider-track"),
  sliderDots: document.querySelectorAll(".slider-dot"),
  sliderPrev: document.getElementById("slider-prev"),
  sliderNext: document.getElementById("slider-next"),
  status: {
    headlines: document.getElementById("headline-status"),
    rumors: document.getElementById("rumor-status"),
    discussions: document.getElementById("discussion-status"),
    scores: document.getElementById("score-status"),
    fixtures: document.getElementById("fixture-status"),
  },
};

// Slider auto-rotation
let currentSlide = 0;
const totalSlides = 5;

const initSlider = () => {
  els.sliderDots.forEach((dot, index) => {
    dot.addEventListener("click", () => goToSlide(index));
  });
  
  if (els.sliderPrev) {
    els.sliderPrev.addEventListener("click", () => goToSlide((currentSlide - 1 + totalSlides) % totalSlides));
  }
  
  if (els.sliderNext) {
    els.sliderNext.addEventListener("click", () => goToSlide((currentSlide + 1) % totalSlides));
  }
  
  setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }, 5000);
};

const goToSlide = (index) => {
  currentSlide = index;
  updateSlider();
};

const updateSlider = () => {
  if (els.sliderTrack) {
    els.sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  els.sliderDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
};

// Format date as dd.mm.yy
const formatDateShort = (dateObj) => {
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = String(dateObj.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
};

const setStatus = (key, label, tone = "neutral") => {
  const el = els.status[key];
  if (!el) return;
  el.textContent = label;
  const tones = {
    neutral: "var(--bg-surface)",
    live: "var(--live-bg)",
    warning: "#1a1404",
    error: "var(--error-bg)",
  };
  el.style.background = tones[tone] ?? tones.neutral;
};

const formatDate = (dateObj) =>
  new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
    day: "2-digit",
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

const renderHeadlines = () => {
  const items = SAMPLE_HEADLINES.slice(0, 10);
  if (items.length === 0) {
    els.headlines.innerHTML = `<article class="card"><p class="card-copy">No headline feed available right now.</p></article>`;
    setStatus("headlines", "Unavailable", "warning");
    return;
  }

  els.headlines.innerHTML = items
    .map(
      (item) => `<article class="card">
        <p class="card-meta">${item.source}</p>
        <h3 class="card-title">${item.href ? `<a href="${item.href}">${item.title}</a>` : item.title}</h3>
        <p class="card-copy">${item.copy}</p>
      </article>`
    )
    .join("");
  setStatus("headlines", "Live", "live");
};

const renderRumors = () => {
  const items = SAMPLE_RUMORS.slice(0, 6);
  if (items.length === 0) {
    els.rumors.innerHTML = `<article class="card"><p class="card-copy">Rumor stream temporarily unavailable.</p></article>`;
    setStatus("rumors", "Unavailable", "warning");
    return;
  }

  els.rumors.innerHTML = items
    .map(
      (post) => `<article class="card">
        <p class="card-meta">Transfer News • ${post.ups.toLocaleString()} votes</p>
        <h3 class="card-title"><a href="${post.href}">${post.title}</a></h3>
        <p class="card-copy">By ${post.author} • ${post.num_comments} comments</p>
      </article>`
    )
    .join("");
  setStatus("rumors", "Live", "live");
};

const renderDiscussions = () => {
  const items = SAMPLE_DISCUSSIONS.slice(0, 6);
  if (items.length === 0) {
    els.discussions.innerHTML = `<article class="card"><p class="card-copy">Discussion feed is currently empty.</p></article>`;
    setStatus("discussions", "Unavailable", "warning");
    return;
  }

  els.discussions.innerHTML = items
    .map(
      (post) => `<article class="card">
        <p class="card-meta">r/soccer • ${post.ups.toLocaleString()} votes</p>
        <h3 class="card-title"><a href="${post.href}">${post.title}</a></h3>
        <p class="card-copy">By ${post.author} • ${post.num_comments} comments</p>
      </article>`
    )
    .join("");
  setStatus("discussions", "Live", "live");
};

const getTeamLogo = (teamName) => {
  // Logos disabled - use text only
  return null;
};

const renderScores = (events) => {
  const items = events && events.length > 0 ? events.slice(0, 18) : SAMPLE_SCORES;
  
  if (items.length === 0) {
    els.scores.innerHTML = `<div class="score-row"><span class="card-copy">Using sample data...</span></div>`;
    setStatus("scores", "Sample", "warning");
    return;
  }

  els.scores.innerHTML = items
    .map(
      (event) => {
        const home = event.home || event.strHomeTeam || "Home";
        const away = event.away || event.strAwayTeam || "Away";
        const league = event.league || event.strLeague || "League";
        const dateStr = event.date || event.dateEvent || "";
        const score = event.homeScore !== undefined ? `${event.homeScore} - ${event.awayScore}` : getScoreline(event));
        
        return `<div class="score-row">
          <div class="score-home"><span>${home}</span></div>
          <div class="scoreline">${score}</div>
          <div class="score-away"><span>${away}</span></div>
          <div class="score-meta">${league} • ${dateStr}</div>
        </div>`;
      }
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
  const cards = (leagueData && leagueData.filter((entry) => entry.matches && entry.matches.length > 0).slice(0, 6)) || SAMPLE_FIXTURES;
  
  if (cards.length === 0) {
    els.fixtures.innerHTML = `<article class="card"><p class="card-copy">Using sample fixtures...</p></article>`;
    setStatus("fixtures", "Sample", "warning");
    return;
  }

  els.fixtures.innerHTML = cards
    .map((entry) => {
      const matches = entry.matches || [];
      const name = entry.name || entry.league || "League";
      const topMatches = matches.slice(0, 4);
      return `<article class="card league-card">
          <h3>${name}</h3>
          <div class="league-list">
            ${topMatches
              .map(
                (match) => {
                  const home = match.home || match.strHomeTeam || "Home";
                  const away = match.away || match.strAwayTeam || "Away";
                  const dateStr = match.date || match.dateEvent || "";
                  return `<div class="league-item">
                  <span>${home} vs ${away}</span>
                  <span>${dateStr}</span>
                </div>`;
                }
              )
              .join("")}
          </div>
        </article>`;
    })
    .join("");
  setStatus("fixtures", "Live", "live");
};

const loadAll = async () => {
  ["headlines", "rumors", "discussions", "scores", "fixtures"].forEach((k) => setStatus(k, "Loading", "neutral"));
  
  // Render all sections with full sample data
  renderHeadlines();
  renderRumors();
  renderDiscussions();
  renderScores(SAMPLE_SCORES);
  renderFixtures(SAMPLE_FIXTURES);
};

// Initialize slider and load data
initSlider();
loadAll();
