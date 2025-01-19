// Sample wish data (can be replaced with backend API data later)
const wishes = [
  {
    title: "A New Bicycle",
    description: "I wish to have a new bicycle to ride to school.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Books for College",
    description: "I need books for my first semester at college.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Toy Car for My Brother",
    description: "My little brother would love a toy car this Christmas.",
    image: "https://via.placeholder.com/300x200",
  },
];

// Get the wish list container
const wishesContainer = document.getElementById("wishes");

// Function to display wishes
function displayWishes() {
  wishes.forEach((wish) => {
    const wishCard = document.createElement("div");
    wishCard.classList.add("wish-card");
    wishCard.innerHTML = `
      <img src="${wish.image}" alt="${wish.title}">
      <div class="wish-card-content">
        <h3>${wish.title}</h3>
        <p>${wish.description}</p>
        <button>Grant Wish</button>
      </div>
    `;
    wishesContainer.appendChild(wishCard);
  });
}

// Initialize the page
displayWishes();
