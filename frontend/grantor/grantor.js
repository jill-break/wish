import apiService from '../scripts/apiService.js';

const wishesContainer = document.getElementById("grantor-wishes");

async function loadWishes() {
  if (!wishesContainer) return;

  try {
    const wishes = await apiService.getWishes();
    wishesContainer.innerHTML = '';

    const availableWishes = wishes.filter(w => !w.granted);

    if (availableWishes.length === 0) {
      wishesContainer.innerHTML = '<p class="no-wishes">All wishes have been granted! Stay tuned for more.</p>';
      return;
    }

    availableWishes.forEach((wish) => {
      const wishCard = document.createElement("div");
      wishCard.classList.add("wish-card");
      wishCard.innerHTML = `
        <img src="${wish.imageUrl || 'https://via.placeholder.com/400x200?text=MyWish'}" alt="${wish.title}" class="gift-image">
        <div class="wish-card-content">
          <div class="wish-meta">Wisher: ${wish.user?.name || 'Anonymous'}</div>
          <h3>${wish.title}</h3>
          <p class="price">${wish.priceRange}</p>
          <p>${wish.description}</p>
          <button class="grant-wish-btn" data-id="${wish._id}">Grant This Wish 🎁</button>
        </div>
      `;
      wishesContainer.appendChild(wishCard);
    });

    // Add event listeners for grant buttons
    document.querySelectorAll('.grant-wish-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const wishId = e.target.getAttribute('data-id');
        alert(`Thank you for wanting to grant this wish! (WISH ID: ${wishId}). Contact the wisher to arrange delivery.`);
        // In a real app, this would update the backend state
      });
    });

  } catch (err) {
    console.error('Error loading wishes:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadWishes);
