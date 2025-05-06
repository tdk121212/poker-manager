export function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const role = document.getElementById('role').value;
  const errorElement = document.getElementById('login-error');

  if (!username || !password || !role) {
    errorElement.textContent = 'لطفاً تمام فیلدها را پر کنید.';
    return;
  }

  if (role === 'admin' && username === 'admin' && password === 'admin123') {
    localStorage.setItem'setItem('user', JSON.stringify({ username, role }));
    errorElement.textContent = '';
    showPage('admin-dashboard');
  } else if (role === 'player') {
    errorElement.textContent = 'دسترسی بازیکنان محدود است.';
  } else {
    errorElement.textContent = 'نام کاربری یا رمز عبور اشتباه است. از admin و admin123 استفاده کنید.';
  }
}

export function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
}