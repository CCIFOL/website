document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const emailOrUsername = document.getElementById('emailOrUsername').value;
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('errorMsg');
  const inputs = document.querySelectorAll('input');

  // Reset all inputs
  inputs.forEach(input => input.classList.remove('error'));

  let hasError = false;

  // Simple validation for login
  if (!emailOrUsername) {
    errorMsg.textContent = 'Email or Username is required';
    document.getElementById('emailOrUsername').classList.add('error');
    hasError = true;
  }

  if (!password) {
    errorMsg.textContent = 'Password is required';
    document.getElementById('password').classList.add('error');
    hasError = true;
  }

  if (hasError) {
    return;
  }

  try {
    const res = await fetch('https://website-bpjn.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrUsername, password }),
    });

    const data = await res.json();
    if (res.status !== 200) {
      errorMsg.textContent = data.msg || 'An error occurred';
    } else {
      alert('Login successful');
      // Handle successful login
      window.location.href = '/dashboard.html'; // or another page
    }
  } catch (err) {
    errorMsg.textContent = 'An error occurred';
  }
});