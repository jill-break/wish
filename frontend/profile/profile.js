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

  try {
    const user = await apiService.getCurrentUser(token);
    if (profileInfo) {
      profileInfo.innerHTML = `
        <div class="profile-header">
           <img src="${user.avatar || 'https://via.placeholder.com/100'}" alt="Avatar" class="profile-avatar">
           <div class="profile-text">
             <h2>Welcome, ${user.name}!</h2>
             <p>Email: ${user.email}</p>
           </div>
        </div>
      `;
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
      userWishesContainer.innerHTML = '<p class="no-wishes">You haven\'t made any wishes yet. Go ahead and add one!</p>';
      return;
    }

    wishes.forEach(wish => {
      const wishCard = document.createElement('div');
      wishCard.classList.add('wish-card');
      wishCard.innerHTML = `
        <div class="wish-card-inner">
           <img src="${wish.imageUrl || 'https://via.placeholder.com/300x150?text=MyWish'}" alt="${wish.title}">
           <div class="wish-info">
             <h4>${wish.title}</h4>
             <p class="wish-status">${wish.granted ? '✅ Granted' : '⏳ Pending'}</p>
             <p>${wish.description}</p>
           </div>
        </div>
      `;
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
