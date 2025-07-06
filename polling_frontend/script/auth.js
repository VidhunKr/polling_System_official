const baseUrl = "http://localhost:3000";

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  fetch(baseUrl + '/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else alert("Login failed");
  });
}

function register() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  fetch(baseUrl + '/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.msg || "Registered");
    if (data.msg === "User registered") window.location.href = "login.html";
  });
}