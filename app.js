const LEAGUES = [
  { id: "4328", name: "Premier League" },
  { id: "4331", name: "La Liga" },
  { id: "4332", name: "Serie A" },
  { id: "4335", name: "Bundesliga" },
  { id: "4334", name: "Ligue 1" },
  { id: "4346", name: "Champions League" },
];

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
  { league: "Bundesliga", matches: [
    { home: "Bayern Munich", away: "Leverkusen", date: "10.05.26" },
    { home: "Dortmund", away: "RB Leipzig", date: "11.05.26" },
  ]},
];

const SAMPLE_HEADLINES = [
  { title: "Manchester City edge past Arsenal in thriller", source: "Match Report", copy: "2-1 victory seals crucial three points at the Emirates", href: "#" },
  { title: "Real Madrid complete comeback against Barcelona", source: "La Liga", copy: "3-2 win in El Clasico keeps title hopes alive", href: "#" },
  { title: "Bayern Munich thrash Dortmund in derby", source: "Bundesliga", copy: "4-1 win in biggest rivalry match of the season", href: "#" },
  { title: "PSG maintain lead with Lyon win", source: "Ligue 1", copy: "2-0 victory at Parc des Princes", href: "#" },
  { title: "Inter Milan stun Juventus with late equaliser", source: "Serie A", copy: "2-2 draw in Turin derby", href: "#" },
  { title: "Liverpool crush Chelsea at Anfield", source: "Premier League", copy: "3-1 win extends lead at top", href: "#" },
];

const SAMPLE_RUMORS = [
  { title: "Star midfielder linked to Premier League move", ups: 2300, author: "FootyInsider", num_comments: 450, href: "#" },
  { title: "Chelsea in talks for €80M striker", ups: 1850, author: "TransferWatch", num_comments: 320, href: "#" },
  { title: "Barcelona prepare €60M bid for Arsenal star", ups: 1650, author: "LaLigaInsider", num_comments: 280, href: "#" },
  { title: "Bayern target former player return", ups: 1400, author: "BundesligaBuzz", num_comments: 195, href: "#" },
  { title: "Real Madrid eye €100M wonderkid", ups: 2100, author: "MadridNews", num_comments: 410, href: "#" },
  { title: "PSG make shock approach for veteran striker", ups: 1200, author: "FrenchFootball", num_comments: 165, href: "#" },
];

const els = {
  headlines: document.getElementById("headline-cards"),
  rumors: document.getElementById("rumor-cards"),
  scores: document.getElementById("scoreboard"),
  fixtures: document.getElementById("fixture-grid"),
};

const setStatus = (section, text, type) => {
  const el = document.getElementById(`${section}-status`);
  if (!el) return;
  el.textContent = text;
  el.className = `status-chip status-${type}`;
};

// Image mapping for headlines
const headlineImages = [
  'images/6.jpeg', 'images/7.jpeg', 'images/8.jpeg',
  'images/9.jpeg', 'images/10.jpeg', 'images/1.jpeg'
];

const renderHeadlines = () => {
  const items = SAMPLE_HEADLINES;
  
  if (items.length === 0) {
    els.headlines.innerHTML = `<p>Headlines temporarily unavailable.</p>`;
    return;
  }

  els.headlines.innerHTML = items
    .map((item, idx) => `<article class="headline-card">
      <img class="card-image" src="${headlineImages[idx % headlineImages.length]}" alt="${item.title}" />
      <div class="card-body">
        <p class="card-source">${item.source}</p>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-excerpt">${item.copy}</p>
      </div>
    </article>`)
    .join("");
};

const renderRumors = () => {
  const items = SAMPLE_RUMORS;
  
  if (items.length === 0) {
    els.rumors.innerHTML = `<p>Rumor stream temporarily unavailable.</p>`;
    return;
  }

  els.rumors.innerHTML = items
    .map((post, idx) => `<article class="rumor-item">
      <span class="rumor-rank">${String(idx + 1).padStart(2, '0')}</span>
      <div class="rumor-content">
        <h4 class="rumor-title">${post.title}</h4>
        <p class="rumor-meta">By ${post.author}</p>
        <div class="rumor-stats">
          <span>${post.ups.toLocaleString()} upvotes</span>
          <span>${post.num_comments} comments</span>
        </div>
      </div>
    </article>`)
    .join("");
};

const getTeamLogo = (teamName) => {
  return TEAM_LOGOS[teamName] || null;
};

const renderScores = (events) => {
  const items = events && events.length > 0 ? events.slice(0, 8) : SAMPLE_SCORES;
  
  if (items.length === 0) {
    els.scores.innerHTML = `<p>No scores available.</p>`;
    return;
  }

  els.scores.innerHTML = items
    .map((event) => {
      const home = event.home || "Home";
      const away = event.away || "Away";
      const league = event.league || "League";
      const score = `${event.homeScore} - ${event.awayScore}`;
      
      return `<div class="score-row">
        <div class="score-team home">
          <span>${home}</span>
        </div>
        <div class="score-result">
          <span>${score}</span>
        </div>
        <div class="score-team away">
          <span>${away}</span>
        </div>
      </div>`;
    })
    .join("");
    
  // Add league label
  if (items.length > 0) {
    els.scores.innerHTML += `<p class="score-league">${items[0].league}</p>`;
  }
};

const renderFixtures = (leagueData) => {
  const cards = leagueData && leagueData.filter((entry) => entry.matches && entry.matches.length > 0).slice(0, 4) || SAMPLE_FIXTURES;
  
  if (cards.length === 0) {
    els.fixtures.innerHTML = `<p>No fixtures available.</p>`;
    return;
  }

  els.fixtures.innerHTML = cards
    .map((entry) => {
      const matches = entry.matches || [];
      const name = entry.league || "League";
      const topMatches = matches.slice(0, 4);
      return `<article class="fixture-card">
        <h4 class="league-name">${name}</h4>
        <div class="league-matches">
          ${topMatches
            .map((match) => {
              const home = match.home || "Home";
              const away = match.away || "Away";
              const dateStr = match.date || "";
              return `<div class="match-row">
                <span class="match-teams">${home} vs ${away}</span>
                <span class="match-date">${dateStr}</span>
              </div>`;
            })
            .join("")}
        </div>
      </article>`;
    })
    .join("");
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderHeadlines();
  renderRumors();
  renderScores(SAMPLE_SCORES);
  renderFixtures(SAMPLE_FIXTURES);
});
