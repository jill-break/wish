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
      
      const img = document.createElement("img");
      img.src = wish.imageUrl || 'https://via.placeholder.com/400x200?text=MyWish';
      img.alt = wish.title;
      img.className = "gift-image";
      
      const content = document.createElement("div");
      content.className = "wish-card-content";
      
      const title = document.createElement("h3");
      title.textContent = wish.title;
      
      const price = document.createElement("p");
      price.className = "price";
      price.textContent = wish.priceRange;
      
      const desc = document.createElement("p");
      desc.textContent = wish.description;
      
      const btn = document.createElement("button");
      btn.className = "grant-wish-btn";
      btn.setAttribute("data-id", wish._id);
      btn.textContent = "Grant This Wish";
      
      content.appendChild(title);
      content.appendChild(price);
      content.appendChild(desc);
      content.appendChild(btn);
      wishCard.appendChild(img);
      wishCard.appendChild(content);
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
