import apiService from '../scripts/apiService.js';

const wishForm = document.getElementById('add-wish-form');
const profileInfo = document.getElementById('profile-info');

async function loadProfile() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '../login/login.html';
    return;
  }

  try {
    const user = await apiService.getCurrentUser(token);
    if (profileInfo) {
      profileInfo.innerHTML = `
        <h2>Welcome, ${user.name}!</h2>
        <p>Email: ${user.email}</p>
      `;
    }
  } catch (err) {
    console.error('Error loading profile:', err);
    localStorage.removeItem('token');
    window.location.href = '../login/login.html';
  }
}

if (wishForm) {
  wishForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    const wishData = {
      title: document.getElementById('wish-title').value,
      description: document.getElementById('wish-description').value,
      priceRange: document.getElementById('wish-price').value,
      imageUrl: document.getElementById('wish-image').value,
      expectedDate: document.getElementById('wish-date').value,
      contactInfo: document.getElementById('wish-contact').value,
    };

    try {
      const data = await apiService.createWish(wishData, token);
      if (data._id) {
        alert('Wish added successfully!');
        window.location.href = '../index.html';
      } else {
        alert(data.message || 'Failed to add wish');
      }
    } catch (err) {
      console.error('Error adding wish:', err);
    }
  });
}

document.addEventListener('DOMContentLoaded', loadProfile);
