// ===== SEED DATA =====
const seedPosts = [
  { id: 'p1', user: 'alex_designs', avatar: 'A', color: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', caption: 'New UI kit just dropped! 🎨✨ Clean, modern, fully responsive. What do you think?', likes: 142, liked: false, comments: [{ user: 'sofia_dev', text: 'This is gorgeous!' }, { user: 'marcus.codes', text: '🔥🔥🔥' }], time: '2 HOURS AGO' },
  { id: 'p2', user: 'sofia_dev', avatar: 'S', color: '#42b72a', image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', caption: 'Deployed my first full-stack app today! 🚀 Months of learning finally paying off. #code #developer', likes: 89, liked: false, comments: [{ user: 'triz', text: 'Congrats!! 🎉' }, { user: 'alex_designs', text: 'Amazing work Sofia!' }], time: '4 HOURS AGO' },
  { id: 'p3', user: 'marcus.codes', avatar: 'M', color: '#e63946', image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', caption: 'Morning coding session ☕️ Nothing beats coffee + TypeScript at 6AM. Building something cool for the community 👀', likes: 215, liked: false, comments: [{ user: 'jpark_art', text: 'What are you building??' }], time: '8 HOURS AGO' },
  { id: 'p4', user: 'jpark_art', avatar: 'J', color: '#764ba2', image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', caption: 'New illustration finished! 🎨 Took 3 weeks but so worth it. Prints available soon! #art #illustration', likes: 310, liked: false, comments: [{ user: 'alex_designs', text: '🔥 I need this!' }], time: '12 HOURS AGO' },
  { id: 'p5', user: 'lisa_creates', avatar: 'L', color: '#1877f2', image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', caption: 'Sunset coding >>> anything else 🌅', likes: 67, liked: false, comments: [], time: '1 DAY AGO' }
];

let posts = [];
let currentUser = null;

function init() {
  const saved = localStorage.getItem('sg_posts');
  posts = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(seedPosts));
  savePosts();
}
init();

function savePosts() { localStorage.setItem('sg_posts', JSON.stringify(posts)); }

// ===== AUTH =====
function handleLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();
  if (!user || !pass) return alert('Please enter username and password.');
  currentUser = { name: user, avatar: user.charAt(0).toUpperCase() };
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('mainApp').style.display = 'block';
  renderFeed();
}

function handleSignup() { alert('📝 Sign up coming soon! Just log in with any credentials.'); }

// ===== FEED =====
function renderFeed() {
  const container = document.getElementById('feedContainer');
  container.innerHTML = '';
  if (!posts.length) {
    container.innerHTML = '<div style="text-align:center;padding:40px;color:#8e8e8e;">No posts yet. Share something! 📸</div>';
    return;
  }
  posts.forEach(p => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
      <div class="post-header">
        <div class="post-header-avatar" style="background:${p.color}">${p.avatar}</div>
        <div class="post-header-name">${esc(p.user)}</div>
        <div class="post-header-more" onclick="deletePost('${p.id}')">⋮</div>
      </div>
      <div class="post-image" style="background-image:${p.image};">
        ${p.user.split('.')[0]}'s photo
      </div>
      <div class="post-actions">
        <svg onclick="toggleLike('${p.id}')" viewBox="0 0 24 24" width="24" height="24" fill="${p.liked ? '#ed4956' : '#262626'}" stroke="${p.liked ? 'none' : '#262626'}" stroke-width="1.5">
          <path d="${p.liked ? 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' : 'M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z'}"/>
        </svg>
        <svg onclick="focusComment('${p.id}')" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#262626" stroke-width="1.5">
          <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/>
        </svg>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#262626" stroke-width="1.5">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
        </svg>
        <div class="save-btn">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#262626" stroke-width="1.5">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>
      </div>
      <div class="post-likes">${p.likes > 0 ? `${p.likes.toLocaleString()} likes` : 'Be the first to like this'}</div>
      <div class="post-caption"><strong>${esc(p.user)}</strong> ${esc(p.caption)}</div>
      <div class="post-comments-link" onclick="focusComment('${p.id}')">${p.comments.length > 0 ? `View all ${p.comments.length} comments` : 'Add a comment...'}</div>
      <div class="post-comments-list">
        ${p.comments.slice(0, 2).map(c => `<div class="comment-item"><strong>${esc(c.user)}</strong> ${esc(c.text)}</div>`).join('')}
      </div>
      <div class="post-time">${p.time}</div>
      <div class="post-comment-input">
        <input type="text" id="commentInput_${p.id}" placeholder="Add a comment..." onkeydown="commentKey(event, '${p.id}')">
        <button id="commentBtn_${p.id}" onclick="submitComment('${p.id}')">Post</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// ===== INTERACTIONS =====
function toggleLike(postId) {
  const p = posts.find(x => x.id === postId);
  if (!p) return;
  p.liked = !p.liked;
  p.likes += p.liked ? 1 : -1;
  savePosts();
  renderFeed();
}

function submitComment(postId) {
  const input = document.getElementById('commentInput_' + postId);
  const text = input.value.trim();
  if (!text) return;
  const p = posts.find(x => x.id === postId);
  if (p) {
    p.comments.push({ user: currentUser ? currentUser.name : 'triz', text });
    savePosts();
    renderFeed();
  }
}

function commentKey(e, postId) {
  if (e.key === 'Enter') { e.preventDefault(); submitComment(postId); }
}

function deletePost(postId) {
  if (!confirm('Delete this post?')) return;
  posts = posts.filter(p => p.id !== postId);
  savePosts();
  renderFeed();
}

function focusComment(postId) {
  const el = document.getElementById('commentInput_' + postId);
  if (el) el.focus();
}

// ===== CREATE POST =====
function handleCreatePost() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <h2>Create post</h2>
      <textarea id="newPostCaption" placeholder="Write a caption..."></textarea>
      <div class="modal-actions">
        <button class="modal-btn-cancel" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
        <button class="modal-btn-primary" onclick="publishPost()">Share</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.getElementById('newPostCaption').focus();
}

function publishPost() {
  const caption = document.getElementById('newPostCaption').value.trim();
  if (!caption) return alert('Please write a caption!');
  const name = currentUser ? currentUser.name : 'triz';
  const avatar = name.charAt(0).toUpperCase();
  const gradients = ['linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'];
  const newPost = {
    id: 'p' + Date.now(),
    user: name,
    avatar,
    color: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
    image: gradients[Math.floor(Math.random() * gradients.length)],
    caption,
    likes: 0, liked: false, comments: [],
    time: 'JUST NOW'
  };
  posts.unshift(newPost);
  savePosts();
  document.querySelector('.modal-overlay').remove();
  renderFeed();
}

// ===== NAV =====
function switchFeedTab(tab) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.nav-item')[tab === 'search' ? 1 : tab === 'reels' ? 3 : 0].classList.add('active');
  alert('📱 ' + tab.charAt(0).toUpperCase() + tab.slice(1) + ' tab coming soon!');
}

function esc(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

// Enter key on login
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('loginScreen').style.display !== 'none') handleLogin();
});
