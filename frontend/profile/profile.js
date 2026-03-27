import apiService from '../scripts/apiService.js';

const wishForm = document.getElementById('add-wish-form');
const profileInfo = document.getElementById('profile-info');
const userWishesContainer = document.getElementById('user-wishes');

async function loadProfile() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '../login/login.html';
    return;
  }

async function loadProfile() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '../login/login.html';
    return;
  }

  try {
    const user = await apiService.getCurrentUser(token);
    if (profileInfo) {
      profileInfo.innerHTML = ''; // Clear loading state
      
      const header = document.createElement('div');
      header.className = 'profile-header';
      
      const avatar = document.createElement('img');
      avatar.src = user.avatar || 'https://via.placeholder.com/100';
      avatar.className = 'profile-avatar';
      
      const text = document.createElement('div');
      text.className = 'profile-text';
      
      const welcome = document.createElement('h2');
      welcome.textContent = `Welcome, ${user.name}!`;
      
      const email = document.createElement('p');
      email.textContent = `Email: ${user.email}`;
      
      text.appendChild(welcome);
      text.appendChild(email);
      header.appendChild(avatar);
      header.appendChild(text);
      profileInfo.appendChild(header);
    }
    loadUserWishes(token);
  } catch (err) {
    console.error('Error loading profile:', err);
    localStorage.removeItem('token');
    window.location.href = '../login/login.html';
  }
}

async function loadUserWishes(token) {
  if (!userWishesContainer) return;

  try {
    const wishes = await apiService.getMyWishes(token);
    userWishesContainer.innerHTML = '';

    if (wishes.length === 0) {
      const msg = document.createElement('p');
      msg.className = 'no-wishes';
      msg.textContent = "You haven't made any wishes yet. Go ahead and add one!";
      userWishesContainer.appendChild(msg);
      return;
    }

    wishes.forEach(wish => {
      const wishCard = document.createElement('div');
      wishCard.classList.add('wish-card');
      
      const inner = document.createElement('div');
      inner.className = 'wish-card-inner';
      
      const img = document.createElement('img');
      img.src = wish.imageUrl || 'https://via.placeholder.com/300x150?text=MyWish';
      
      const info = document.createElement('div');
      info.className = 'wish-info';
      
      const title = document.createElement('h4');
      title.textContent = wish.title;
      
      const status = document.createElement('p');
      status.className = 'wish-status';
      status.textContent = wish.granted ? '✅ Granted' : '⏳ Pending';
      
      const desc = document.createElement('p');
      desc.textContent = wish.description;
      
      info.appendChild(title);
      info.appendChild(status);
      info.appendChild(desc);
      inner.appendChild(img);
      inner.appendChild(info);
      wishCard.appendChild(inner);
      userWishesContainer.appendChild(wishCard);
    });
  } catch (err) {
    console.error('Error loading user wishes:', err);
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
