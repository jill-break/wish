// User-specific wishes
const userWishes = [
  {
    title: "A New Backpack",
    description: "I need a sturdy backpack for school.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Soccer Ball",
    description: "I love soccer and need a new ball to practice.",
    image: "https://via.placeholder.com/300x200",
  },
];

// Get the user's wish container
const userWishesContainer = document.getElementById("user-wishes-container");

// Function to display user's wishes
function displayUserWishes() {
  userWishes.forEach((wish) => {
    const wishCard = document.createElement("div");
    wishCard.classList.add("wish-card");
    wishCard.innerHTML = `
      <img src="${wish.image}" alt="${wish.title}">
      <div class="wish-card-content">
        <h3>${wish.title}</h3>
        <p>${wish.description}</p>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    `;
    userWishesContainer.appendChild(wishCard);
  });
}

// Initialize the profile page
displayUserWishes();
