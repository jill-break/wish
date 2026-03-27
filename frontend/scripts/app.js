import apiService from './apiService.js';

// Get the wish list container
const wishesContainer = document.getElementById("wishes");

// Handle granting a wish
if (wishesContainer) {
  wishesContainer.addEventListener('click', async (e) => {
    const btn = e.target.closest('.grant-wish-btn');
    if (btn) {
      const wishId = btn.getAttribute('data-id');
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Please login to grant a wish!');
        window.location.href = './login/login.html';
        return;
      }

      try {
        const result = await apiService.grantWish(wishId, token);
        if (result.message) {
          alert(result.message);
        } else {
          alert('Thank you for your generosity! Wish granted! 🎁');
          displayWishes(); // Refresh the list
        }
      } catch (err) {
        console.error('Error granting wish:', err);
        alert('Failed to grant wish: ' + (err.message || 'Unknown error'));
      }
    }
  });
}

// Function to display wishes
async function displayWishes() {
  if (!wishesContainer) return;

  // Show loading state before fetch
  wishesContainer.innerHTML = '<div class="loader-container"><div class="spinner"></div><p>Searching for wishes...</p></div>';

  try {
    const wishes = await apiService.getWishes();
    wishesContainer.innerHTML = ''; // Clear existing cards

    if (wishes.length === 0) {
      wishesContainer.innerHTML = '<p class="no-wishes">No wishes found. Be the first to make a wish!</p>';
      return;
    }

    wishes.forEach((wish) => {
      const wishCard = document.createElement("div");
      wishCard.classList.add("wish-card");
      wishCard.innerHTML = `
        <img src="${wish.imageUrl || 'https://via.placeholder.com/400x200?text=MyWish'}" alt="${wish.title}" class="gift-image">
        <div class="wish-card-content">
          <h3>${wish.title}</h3>
          <p class="price">${wish.priceRange}</p>
          <p>${wish.description}</p>
          <button class="grant-wish-btn" data-id="${wish._id}">Grant This Wish</button>
        </div>
      `;
      wishesContainer.appendChild(wishCard);
    });
  } catch (err) {
    console.error('Error fetching wishes:', err);
    wishesContainer.innerHTML = '<p class="error">Failed to load wishes. Please try again later.</p>';
  }
}

// Handle login state
async function checkAuth() {
  const token = localStorage.getItem('token');
  const loginLink = document.getElementById("login-link");
  const profileLink = document.getElementById("profile-link");

  if (token) {
    try {
      const user = await apiService.getCurrentUser(token);
      if (user && (user.id || user._id)) {
        loginLink.style.display = "none";
        profileLink.style.display = "block";
      } else {
        localStorage.removeItem('token');
      }
    } catch (err) {
      localStorage.removeItem('token');
    }
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  displayWishes();
  checkAuth();
});
