// Sample wish data (can be replaced with backend API data later)
const wishes = [
  {
    title: "Cozy Sweater",
    description: "A warm and cozy sweater perfect for the winter season. I would love one in a neutral color.",
    priceRange: "$30 - $50",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=400",
  },
  {
    title: "Bluetooth Headphones",
    description: "High-quality wireless headphones for focused work and music. Noise cancellation preferred.",
    priceRange: "$100 - $150",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
  },
  {
    title: "Bicycle for School",
    description: "A sturdy bicycle to help me commute to school every day. Any color is fine!",
    priceRange: "$150 - $200",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=400",
  },
  {
    title: "Art Supply Set",
    description: "I'm starting a new hobby in painting and would love some basic supplies like brushes and acrylics.",
    priceRange: "$20 - $40",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400",
  },
];

// Get the wish list container
const wishesContainer = document.getElementById("wishes");

// Function to display wishes
function displayWishes() {
  if (!wishesContainer) return;
  
  wishesContainer.innerHTML = ''; // Clear existing cards
  
  wishes.forEach((wish) => {
    const wishCard = document.createElement("div");
    wishCard.classList.add("wish-card");
    wishCard.innerHTML = `
      <img src="${wish.image}" alt="${wish.title}" class="gift-image">
      <div class="wish-card-content">
        <h3>${wish.title}</h3>
        <p class="price">${wish.priceRange}</p>
        <p>${wish.description}</p>
        <button class="grant-wish-btn">Grant This Wish</button>
      </div>
    `;
    wishesContainer.appendChild(wishCard);
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', displayWishes);
