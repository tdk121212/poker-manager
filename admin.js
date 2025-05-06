import { showPage } from './auth.js';

export function setupAdminDashboard() {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const addPlayerLink = document.getElementById('add-player');
  const recordDepositLink = document.getElementById('record-deposit');
  const startGameLink = document.getElementById('start-game');
  const logoutLink = document.getElementById('logout');
  const playerForm = document.getElementById('player-form');
  const depositForm = document.getElementById('deposit-form');
  const startGameBtn = document.getElementById('start-new-game');
  const backButtons = document.querySelectorAll('#back-to-dashboard, #back-to-dashboard-deposit, #back-to-dashboard-game');

  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  addPlayerLink.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('add-player-form');
    sidebar.classList.remove('active');
  });

  recordDepositLink.addEventListener('click', (e) => {
    e.preventDefault();
    populatePlayerSelect();
    showPage('record-deposit-form');
    sidebar.classList.remove('active');
  });

  startGameLink.addEventListener('click', (e) => {
    e.preventDefault();
    showPage('start-game-page');
    sidebar.classList.remove('active');
  });

  logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    showPage('login-page');
    sidebar.classList.remove('active');
  });

  playerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('player-name').value.trim();
    if (name) {
      addPlayer(name);
      showPage('admin-dashboard');
      playerForm.reset();
    }
  });

  depositForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const player = document.getElementById('deposit-player').value;
    const amount = document.getElementById('deposit-amount').value;
    const chips = document.getElementById('chips-amount').value;
    if (player && amount && chips) {
      recordDeposit(player, amount, chips);
      showPage('admin-dashboard');
      depositForm.reset();
    }
  });

  startGameBtn.addEventListener('click', () => {
    startNewGame();
    showPage('admin-dashboard');
  });

  backButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      showPage('admin-dashboard');
    });
  });

  loadPlayersTable();
}

function addPlayer(name) {
  const players = JSON.parse(localStorage.getItem('players') || '[]');
  players.push({ name, deposits: [] });
  localStorage.setItem('players', JSON.stringify(players));
  loadPlayersTable();
}

function recordDeposit(playerName, amount, chips) {
  const players = JSON.parse(localStorage.getItem('players') || '[]');
  const player = players.find(p => p.name === playerName);
  if (player) {
    player.deposits.push({
      amount: parseInt(amount),
      chips: parseInt(chips),
      timestamp: new Date().toLocaleString('fa-IR')
    });
    localStorage.setItem('players', JSON.stringify(players));
    loadPlayersTable();
  }
}

function startNewGame() {
  const players = JSON.parse(localStorage.getItem('players') || '[]');
  players.forEach(player => {
    player.deposits = [];
  });
  localStorage.setItem('players', JSON.stringify(players));
  loadPlayersTable();
  alert('بازی جدید شروع شد و تمام واریزی‌ها ریست شدند.');
}

function loadPlayersTable() {
  const tbody = document.querySelector('#players-table tbody');
  tbody.innerHTML = '';
  const players = JSON.parse(localStorage.getItem('players') || '[]');
  players.forEach(player => {
    player.deposits.forEach(deposit => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${player.name}</td>
        <td>${deposit.amount}</td>
        <td>${deposit.chips}</td>
        <td>${deposit.timestamp}</td>
      `;
      tbody.appendChild(row);
    });
  });
}

function populatePlayerSelect() {
  const select = document.getElementById('deposit-player');
  select.innerHTML = '<option value="" disabled selected>بازیکن را انتخاب کنید</option>';
  const players = JSON.parse(localStorage.getItem('players') || '[]');
  players.forEach(player => {
    const option = document.createElement('option');
    option.value = player.name;
    option.textContent = player.name;
    select.appendChild(option);
  });
}