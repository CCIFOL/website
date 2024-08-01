
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorMsg = document.getElementById('errorMsg');
  const inputs = document.querySelectorAll('input');

  // Reset all inputs
  inputs.forEach(input => input.classList.remove('error'));

  // Improved email regex with specific domains
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|aol\.com|mail\.com)$/;

  // Improved password regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  let hasError = false;

  if (username.length < 4) {
    errorMsg.textContent = 'Username must be at least 4 characters long';
    document.getElementById('username').classList.add('error');
    hasError = true;
  }

  if (!emailRegex.test(email)) {
    errorMsg.textContent = 'Please enter a valid email address from supported providers (e.g., gmail.com, yahoo.com)';
    document.getElementById('email').classList.add('error');
    hasError = true;
  }

  if (!passwordRegex.test(password)) {
    errorMsg.textContent = 'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character';
    document.getElementById('password').classList.add('error');
    hasError = true;
  }

  if (password !== confirmPassword) {
    errorMsg.textContent = 'Passwords do not match';
    document.getElementById('confirmPassword').classList.add('error');
    hasError = true;
  }

  if (hasError) {
    return;
  }

  try {
    const res = await fetch('https://website-bpjn.onrender.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (res.status !== 200) {
      errorMsg.textContent = data.msg || 'An error occurred';
    } else {
      alert('Registration successful');
      window.location.href = '/login.html';
    }
  } catch (err) {
    errorMsg.textContent = 'An error occurred';
  }
});
