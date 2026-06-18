// ===== SEED TWEETS =====
const seedTweets = [
  { id: 't1', user: 'Alex Rivera', handle: '@alex_codes', avatar: 'A', color: '#e63946', text: 'Just shipped a full Laravel + Vue app to production! 🚀 3 months of work, countless cups of coffee, but we made it. #webdev #launch', replies: 12, retweets: 45, likes: 234, liked: false, time: '2h' },
  { id: 't2', user: 'Sofia Chen', handle: '@sofia_dev', avatar: 'S', color: '#42b72a', text: 'Hot take: TypeScript is mandatory for any serious project in 2026. The type safety alone saves you from so many runtime headaches. Fight me. 🔥', replies: 28, retweets: 89, likes: 567, liked: false, time: '4h' },
  { id: 't3', user: 'Marcus Tan', handle: '@marcus_codes', avatar: 'M', color: '#f7b928', text: 'The best code editor is the one you actually use every day. Stop arguing about VSCode vs Neovim vs WebStorm and just write code. ✍️', replies: 42, retweets: 120, likes: 892, liked: false, time: '6h' },
  { id: 't4', user: 'Jamie Park', handle: '@jpark_art', avatar: 'J', color: '#764ba2', text: 'UI/UX tip: If you need instructions on how to use your UI, your UI has already failed. Good design is invisible. 🎨 #design #ux', replies: 8, retweets: 67, likes: 445, liked: false, time: '8h' },
  { id: 't5', user: 'Pulse News', handle: '@pulsenews', avatar: 'P', color: '#1d9bf0', text: 'BREAKING: AI-powered code assistants now generate 40% of production code in major tech companies, report finds. The role of developers is shifting from writing code to reviewing AI-generated code. #tech #AI', replies: 156, retweets: 890, likes: 2.1, liked: false, time: '1h' }
];

let tweets = [];
let currentUser = null;

function init() {
  const saved = localStorage.getItem('pulse_tweets');
  tweets = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(seedTweets));
  saveTweets();
}
init();

function saveTweets() { localStorage.setItem('pulse_tweets', JSON.stringify(tweets)); }

// ===== AUTH =====
function handleLogin() {
  currentUser = { name: 'Triz', handle: '@triz', avatar: 'T' };
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('mainApp').style.display = 'block';
  document.getElementById('navUserName').textContent = currentUser.name;
  document.getElementById('navUserHandle').textContent = currentUser.handle;
  renderFeed();
}

function handleLogout() {
  if (!confirm('Log out of Pulse?')) return;
  currentUser = null;
  document.getElementById('mainApp').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
}

// ===== TWEET COMPOSER =====
function handleTweet() {
  const input = document.getElementById('tweetInput');
  const text = input.textContent.trim();
  if (!text) return alert('What\'s happening?');
  const count = text.length;
  if (count > 280) return alert('Tweet is too long! Max 280 characters.');

  const newTweet = {
    id: 't' + Date.now(),
    user: currentUser.name,
    handle: currentUser.handle,
    avatar: currentUser.avatar,
    color: '#1d9bf0',
    text: text,
    replies: 0, retweets: 0, likes: 0, liked: false,
    time: 'Just now'
  };
  tweets.unshift(newTweet);
  saveTweets();
  renderFeed();
  input.textContent = '';
  updateCharCount();
}

// ===== CHAR COUNT =====
function updateCharCount() {
  const input = document.getElementById('tweetInput');
  const count = input.textContent.trim().length;
  const el = document.getElementById('charCount');
  el.textContent = 280 - count;
  el.className = 'char-count';
  if (count > 260) el.classList.add('warning');
  if (count > 280) el.classList.add('danger');
}

document.addEventListener('input', function(e) {
  if (e.target.id === 'tweetInput') updateCharCount();
});

// ===== FEED =====
function renderFeed() {
  const feed = document.getElementById('tweetFeed');
  feed.innerHTML = '';
  if (!tweets.length) {
    feed.innerHTML = '<div style="padding:40px;text-align:center;color:#71767b;">No tweets yet. Post something! 🐦</div>';
    return;
  }
  tweets.forEach(t => {
    const likesDisplay = typeof t.likes === 'number' ? (t.likes >= 1000 ? (t.likes / 1000).toFixed(1) + 'K' : t.likes) : t.likes + 'K';
    const card = document.createElement('div');
    card.className = 'tweet-card';
    card.innerHTML = `
      <div class="tweet-avatar" style="background:${t.color}">${esc(t.avatar)}</div>
      <div class="tweet-content">
        <div class="tweet-header">
          <span class="tweet-name">${esc(t.user)}</span>
          <span class="tweet-handle">${esc(t.handle)}</span>
          <span class="tweet-dot">·</span>
          <span class="tweet-time">${t.time}</span>
        </div>
        <div class="tweet-text">${esc(t.text)}</div>
        <div class="tweet-actions">
          <div class="tweet-action" onclick="alert('Reply feature coming soon 💬')">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.634 8.129 8.125 0 4.157-2.925 7.627-6.804 8.458l-5.03 1.078c-.81.174-1.533-.446-1.533-1.245v-1.403c-2.948-.544-5.1-3.108-5.1-6.106v-.014l.001-.893h-.002V10zm4.332-1.444c0 2.424 1.764 4.428 4.11 4.785l.74.113v2.179l4.063-.871c2.177-.466 3.767-2.406 3.767-4.636 0-2.764-2.24-5-5-5H10.04c-2.304 0-4.077 1.872-4.077 4.166l-.13.264z"/></svg>
            ${t.replies}
          </div>
          <div class="tweet-action" onclick="retweet('${t.id}')">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/></svg>
            ${t.retweets}
          </div>
          <div class="tweet-action ${t.liked ? 'liked' : ''}" onclick="toggleLike('${t.id}')">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="${t.liked ? '#f91880' : 'currentColor'}"><path d="${t.liked ? 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' : 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'}"/>
            </svg>
            ${likesDisplay}
          </div>
          <div class="tweet-action" onclick="alert('Share feature coming soon 🔗')">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/></svg>
          </div>
        </div>
      </div>
    `;
    feed.appendChild(card);
  });
}

// ===== INTERACTIONS =====
function toggleLike(tweetId) {
  const t = tweets.find(x => x.id === tweetId);
  if (!t) return;
  t.liked = !t.liked;
  t.likes = t.liked ? (typeof t.likes === 'number' ? t.likes + 1 : 2.2) : (typeof t.likes === 'number' ? t.likes - 1 : 2.0);
  saveTweets();
  renderFeed();
}

function retweet(tweetId) {
  const t = tweets.find(x => x.id === tweetId);
  if (t) { t.retweets++; saveTweets(); renderFeed(); }
}

// ===== NAV =====
function switchPage(page) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const pages = { feed: 0, explore: 1, notifs: 2, messages: 3, profile: 4 };
  document.querySelectorAll('.nav-item')[pages[page] || 0].classList.add('active');
  if (page !== 'feed') alert(`📱 ${page.charAt(0).toUpperCase() + page.slice(1)} page coming soon!`);
}

function esc(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

// Enter key on login
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('loginScreen').style.display !== 'none') handleLogin();
});
