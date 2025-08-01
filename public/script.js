// ========== Section Navigation ==========
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const sectionId = this.dataset.section;

    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(`${sectionId}Section`).classList.add('active');

    document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');
  });
});

// ========== Show/Hide Auth Modal ==========
function showAuth() {
  document.getElementById('authModal').classList.add('active');
}

function closeAuth() {
  document.getElementById('authModal').classList.remove('active');
}

// ========== Toggle Auth Mode ==========
let isLogin = true;

function toggleAuthMode() {
  isLogin = !isLogin;
  document.getElementById('authTitle').innerText = isLogin ? 'Login' : 'Register';
  document.getElementById('authSubmit').innerText = isLogin ? 'Login' : 'Register';
  document.getElementById('authSwitchText').innerText = isLogin ? "Don't have an account?" : "Already have an account?";
  document.getElementById('authSwitchLink').innerText = isLogin ? "Register" : "Login";
  document.getElementById('roleGroup').style.display = isLogin ? 'none' : 'block';
}

// ========== Fake Login/Register ==========
document.getElementById('authForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('authUsername').value;
  const role = isLogin ? 'buyer' : document.getElementById('userRole').value;

  // Save user to localStorage (for demo only)
  localStorage.setItem('user', JSON.stringify({ name: username, role }));

  updateUIForUser();
  closeAuth();
  showToast(`Welcome, ${username}!`);
});

// ========== Logout ==========
function logout() {
  localStorage.removeItem('user');
  location.reload();
}

// ========== Update UI After Login ==========
function updateUIForUser() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return;

  document.getElementById('authBtn').style.display = 'none';
  document.getElementById('userMenu').style.display = 'flex';
  document.getElementById('userName').innerText = user.name;

  // Role-based display
  document.body.classList.add(user.role);
  document.querySelectorAll('.vendor-only').forEach(el => {
    if (user.role === 'vendor') el.style.display = 'block';
  });

  // Enable chat input
  document.getElementById('chatInputContainer').style.display = 'flex';
  document.getElementById('chatLoginPrompt').style.display = 'none';

  // Show cart
  document.getElementById('cartIcon').style.display = 'block';
}

// ========== Toast ==========
function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.className = 'toast show' + (isError ? ' error' : '');
  setTimeout(() => {
    toast.className = 'toast';
  }, 3000);
}

// ========== Cart Modal ==========
function closeCart() {
  document.getElementById('cartModal').classList.remove('active');
}

// ========== Fake Checkout ==========
function checkout() {
  showToast('Order placed successfully!');
  document.getElementById('cartItems').innerHTML = '';
  document.getElementById('cartTotal').innerText = '0.00';
  document.getElementById('cartCount').innerText = '0';
  closeCart();
}

// ========== Chat ==========
function sendMessage() {
  const input = document.getElementById('messageInput');
  const text = input.value.trim();
  if (!text) return;

  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Guest' };
  const msgBox = document.createElement('div');
  msgBox.className = 'message own';
  msgBox.innerHTML = `
    <div class="message-header">
      <span class="message-user">${user.name}</span>
      <span class="message-time">${new Date().toLocaleTimeString()}</span>
    </div>
    <div class="message-content">${text}</div>
  `;

  document.getElementById('chatMessages').appendChild(msgBox);
  input.value = '';
  msgBox.scrollIntoView({ behavior: 'smooth' });
}

// ========== On Load ==========
window.addEventListener('DOMContentLoaded', () => {
  updateUIForUser();
}); 