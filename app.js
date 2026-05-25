// API Configuration
const API_KEYS = {
  football: 'e7ce83004df34ef6acd3e8340e69144e',
  imageRouter: '3eb11e4c8165d963c8496f458d743fe5ac7f94a5603a33f8a67fe051342f1e9f'
};

// ESPN API endpoints for major leagues
const LEAGUES = [
  { id: 'eng.1', name: 'Premier League', slug: 'eng' },
  { id: 'esp.1', name: 'La Liga', slug: 'esp' },
  { id: 'ger.1', name: 'Bundesliga', slug: 'ger' },
  { id: 'ita.1', name: 'Serie A', slug: 'ita' },
  { id: 'fra.1', name: 'Ligue 1', slug: 'fra' },
  { id: 'uefa.champions', name: 'Champions League', slug: 'champions' }
];

// DOM Elements
const els = {
  headlines: document.getElementById('headline-cards'),
  rumors: document.getElementById('rumor-cards'),
  scores: document.getElementById('scoreboard'),
  fixtures: document.getElementById('fixture-grid'),
  ticker: document.querySelector('.ticker-track'),
  featured: document.querySelector('.featured-card'),
  sidebar: document.querySelector('.sidebar-grid')
};

// Image cache for generated images
let imageCache = {};
let loadingImages = new Set();

// Fetch scores from ESPN API
async function fetchScores(leagueSlug = 'eng') {
  try {
    const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${leagueSlug}/scoreboard`);
    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error('Error fetching scores:', error);
    return [];
  }
}

// Fetch all league scores
async function fetchAllScores() {
  const allScores = [];
  for (const league of LEAGUES) {
    const scores = await fetchScores(league.slug);
    allScores.push(...scores.map(e => ({ ...e, league: league.name })));
  }
  return allScores;
}

// Format date
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });
}

// Get team logo
function getTeamLogo(team) {
  return team?.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(team?.displayName || 'FC')}&background=random`;
}

// Render scoreboard
function renderScores(events) {
  if (!events || events.length === 0) {
    els.scores.innerHTML = '<p class="no-data">No matches available</p>';
    return;
  }

  els.scores.innerHTML = events.slice(0, 8).map(event => {
    const competition = event.competitions?.[0];
    const homeTeam = competition?.competitors?.find(c => c.homeAway === 'home');
    const awayTeam = competition?.competitors?.find(c => c.homeAway === 'away');
    const status = competition?.status;
    
    return `
      <div class="score-row">
        <div class="score-team home">
          <img src="${getTeamLogo(homeTeam?.team)}" alt="${homeTeam?.team?.abbreviation}" class="team-logo" onerror="this.src='https://ui-avatars.com/api/?name=${homeTeam?.team?.abbreviation}&background=random'">
          <span>${homeTeam?.team?.abbreviation || homeTeam?.team?.displayName}</span>
        </div>
        <div class="score-result">
          <span>${homeTeam?.score || 0}</span>
          <span class="divider">-</span>
          <span>${awayTeam?.score || 0}</span>
        </div>
        <div class="score-team away">
          <span>${awayTeam?.team?.abbreviation || awayTeam?.team?.displayName}</span>
          <img src="${getTeamLogo(awayTeam?.team)}" alt="${awayTeam?.team?.abbreviation}" class="team-logo" onerror="this.src='https://ui-avatars.com/api/?name=${awayTeam?.team?.abbreviation}&background=random'">
        </div>
      </div>
    `;
  }).join('') + `<p class="score-league">${events[0]?.league || 'Live Scores'}</p>`;
}

// Render headlines from news
function renderHeadlines(events) {
  if (!events || events.length === 0) {
    els.headlines.innerHTML = '<p class="no-data">No headlines available</p>';
    return;
  }

  const headlines = events.slice(0, 6).map((event, idx) => {
    const competition = event.competitions?.[0];
    const homeTeam = competition?.competitors?.find(c => c.homeAway === 'home');
    const awayTeam = competition?.competitors?.find(c => c.homeAway === 'away');
    const headline = event.headlines?.[0];
    
    return `
      <article class="headline-card">
        <img class="card-image" src="images/${(idx % 10) + 1}.jpeg" alt="${event.name}" onerror="this.src='https://placehold.co/600x400/24262b/fff?text=Football'">
        <div class="card-body">
          <p class="card-source">${event.league}</p>
          <h3 class="card-title">${event.name}</h3>
          <p class="card-excerpt">${headline?.description || 'Match report coming soon'}</p>
        </div>
      </article>
    `;
  });

  els.headlines.innerHTML = headlines.join('');
}

// Render fixtures (upcoming matches)
async function renderFixtures() {
  const fixtures = [];
  
  for (const league of LEAGUES) {
    try {
      const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/soccer/${league.slug}/scoreboard?dates=20260525-20260531`);
      const data = await response.json();
      const events = data.events || [];
      
      // Get upcoming/unplayed matches
      for (const event of events) {
        const competition = event.competitions?.[0];
        if (competition?.status?.type?.state !== 'post') {
          const homeTeam = competition?.competitors?.find(c => c.homeAway === 'home');
          const awayTeam = competition?.competitors?.find(c => c.homeAway === 'away');
          fixtures.push({
            league: league.name,
            home: homeTeam?.team?.abbreviation || homeTeam?.team?.displayName,
            away: awayTeam?.team?.abbreviation || awayTeam?.team?.displayName,
            date: formatDate(event.date)
          });
        }
      }
    } catch (e) {
      console.error(`Error fetching ${league.name}:`, e);
    }
  }

  // If no fixtures, show sample data
  if (fixtures.length === 0) {
    els.fixtures.innerHTML = `
      <article class="fixture-card">
        <h4 class="league-name">Premier League</h4>
        <div class="match-row">
          <span class="match-teams">MCI vs AVL</span>
          <span class="match-date">25.05.26</span>
        </div>
        <div class="match-row">
          <span class="match-teams">LIV vs TOT</span>
          <span class="match-date">25.05.26</span>
        </div>
      </article>
      <article class="fixture-card">
        <h4 class="league-name">La Liga</h4>
        <div class="match-row">
          <span class="match-teams">RMA vs CEL</span>
          <span class="match-date">25.05.26</span>
        </div>
        <div class="match-row">
          <span class="match-teams">BAR vs VIL</span>
          <span class="match-date">26.05.26</span>
        </div>
      </article>
    `;
    return;
  }

  // Group fixtures by league
  const grouped = {};
  fixtures.forEach(f => {
    if (!grouped[f.league]) grouped[f.league] = [];
    grouped[f.league].push(f);
  });

  els.fixtures.innerHTML = Object.entries(grouped).slice(0, 4).map(([league, matches]) => `
    <article class="fixture-card">
      <h4 class="league-name">${league}</h4>
      <div class="league-matches">
        ${matches.slice(0, 3).map(m => `
          <div class="match-row">
            <span class="match-teams">${m.home} vs ${m.away}</span>
            <span class="match-date">${m.date}</span>
          </div>
        `).join('')}
      </div>
    </article>
  `).join('');
}

// Render transfer rumors (simulated with sample data structure)
function renderRumors() {
  const rumors = [
    { title: 'Barcelona prepare €80M bid for Premier League star', author: 'FootyInsider', upvotes: 2340, comments: 456 },
    { title: 'Real Madrid in talks with midfield sensation', author: 'TransferWatch', upvotes: 1890, comments: 321 },
    { title: 'Chelsea target Serie A striker', author: 'LaLigaInsider', upvotes: 1650, comments: 287 },
    { title: 'Bayern Munich eye Premier League defender', author: 'BundesligaBuzz', upvotes: 1420, comments: 198 },
    { title: 'PSG prepare shock bid for veteran forward', author: 'FrenchFootball', upvotes: 1180, comments: 167 },
    { title: 'Liverpool consider surprise swoop for winger', author: 'AnfieldTalk', upvotes: 980, comments: 145 }
  ];

  els.rumors.innerHTML = rumors.map((r, idx) => `
    <article class="rumor-item">
      <span class="rumor-rank">${String(idx + 1).padStart(2, '0')}</span>
      <div class="rumor-content">
        <h4 class="rumor-title">${r.title}</h4>
        <p class="rumor-meta">By ${r.author}</p>
        <div class="rumor-stats">
          <span>⬆ ${r.upvotes.toLocaleString()}</span>
          <span>💬 ${r.comments}</span>
        </div>
      </div>
    </article>
  `).join('');
}

// Update live ticker
function updateTicker(events) {
  if (!events || events.length === 0) return;
  
  const matchStrings = events.slice(0, 6).map(event => {
    const competition = event.competitions?.[0];
    const homeTeam = competition?.competitors?.find(c => c.homeAway === 'home');
    const awayTeam = competition?.competitors?.find(c => c.homeAway === 'away');
    const status = competition?.status;
    
    const isLive = status?.type?.state !== 'post';
    const score = `${homeTeam?.score || 0} - ${awayTeam?.score || 0}`;
    
    return `<span class="${isLive ? 'live' : ''}">${homeTeam?.team?.abbreviation} ${score} ${awayTeam?.team?.abbreviation}</span>`;
  });

  const tickerContent = matchStrings.join(' • ') + ' • ' + matchStrings.join(' • ');
  els.ticker.innerHTML = tickerContent;
}

// Generate AI image (placeholder - would call ImageRouter API when configured)
async function generateImage(prompt) {
  // ImageRouter integration would go here
  // For now, we use existing images
  console.log('Image generation requested:', prompt);
  return null;
}

// Initialize app
async function init() {
  console.log('⚽ Loading Football World Live...');
  
  try {
    // Fetch all scores
    const allScores = await fetchAllScores();
    
    // Render sections
    renderScores(allScores);
    renderHeadlines(allScores);
    renderRumors();
    await renderFixtures();
    updateTicker(allScores);
    
    console.log('✅ Data loaded successfully');
  } catch (error) {
    console.error('❌ Error loading data:', error);
    // Fallback to sample data
    loadSampleData();
  }
}

// Fallback sample data
function loadSampleData() {
  console.log('📦 Loading sample data...');
  
  const sampleScores = [
    { home: 'MCI', away: 'ARS', homeScore: 2, awayScore: 1, league: 'Premier League' },
    { home: 'RMA', away: 'BAR', homeScore: 3, awayScore: 2, league: 'La Liga' },
    { home: 'BAY', away: 'DOR', homeScore: 4, awayScore: 1, league: 'Bundesliga' },
    { home: 'PSG', away: 'LYO', homeScore: 2, awayScore: 0, league: 'Ligue 1' }
  ];

  renderScores(sampleScores.map(s => ({
    competitions: [{
      competitors: [
        { homeAway: 'home', team: { abbreviation: s.home, displayName: s.home, logo: '' }, score: s.homeScore },
        { homeAway: 'away', team: { abbreviation: s.away, displayName: s.away, logo: '' }, score: s.awayScore }
      ]
    }],
    league: s.league
  })));
  
  renderRumors();
}

// Auto-refresh every 5 minutes
setInterval(init, 5 * 60 * 1000);

// Start
document.addEventListener('DOMContentLoaded', init);
