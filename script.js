const API_URL = 'https://jsonplaceholder.typicode.com/users';
const container = document.getElementById('user-container');
const reloadButton = document.getElementById('reload-btn');

async function fetchAndRender() {
  container.innerHTML = '<p class="dim">Loading…</p>';

  try {
    const response = await fetch(API_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const users = await response.json();

    container.innerHTML = users.map(user => `
      <div class="card">
        <h2>${user.name}</h2>
        <p class="dim">${user.email}</p>
        <p class="dim">
          ${user.address.suite}, ${user.address.street}, ${user.address.city}
        </p>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `
      <p id="error-msg">
        ⚠️ Unable to load users: ${err.message}.<br>
        (Check your connection and click “Reload”.)
      </p>
    `;
  }
}

reloadButton.addEventListener('click', fetchAndRender);
fetchAndRender();
