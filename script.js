// Get all the 'Add to Cart' buttons
const addToCartButtons = document.querySelectorAll('.movie-card button');
const cartTable = document.querySelector('#cartTable tbody');
const totalPriceElement = document.getElementById('totalPrice');

// Cart array to hold items
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to calculate and update the total price
function updateTotalPrice() {
  const totalPrice = cart.reduce((total, item) => total + item.totalPrice, 0);
  totalPriceElement.textContent = `Rs ${totalPrice}`;
}

// Function to render the cart
function renderCart() {
  cartTable.innerHTML = ''; // Clear the cart table
  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.movie}</td>
      <td>${item.quantity}</td>
      <td>Rs ${item.unitPrice}</td>
      <td>Rs ${item.totalPrice}</td>
    `;
    cartTable.appendChild(row);
  });
  updateTotalPrice();
}

// Save the cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Handle the add to cart logic
addToCartButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const movieCard = button.closest('.movie-card');
    const movieTitle = movieCard.querySelector('h3').textContent;
    const price = parseFloat(movieCard.querySelector('p').textContent.replace('Price: Rs ', ''));
    const quantityInput = movieCard.querySelector('input');
    let quantity = parseFloat(quantityInput.value);

    if (quantity <= 0 || isNaN(quantity)) {
      alert('Please enter a valid quantity (positive numbers only).');
      return;
    }

    // Check if the movie is already in the cart
    const existingItem = cart.find(item => item.movie === movieTitle);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
    } else {
      const newItem = {
        movie: movieTitle,
        quantity: quantity,
        unitPrice: price,
        totalPrice: quantity * price
      };
      cart.push(newItem);
    }

    // Show success message
    alert('Successfully added to cart!');
    renderCart();
    saveCart();
  });
});

// Save cart items as favourite in localStorage
function saveAsFavourite() {
  localStorage.setItem('favourites', JSON.stringify(cart));
  alert('Your cart has been saved as a favourite!');
}

// Apply favourite items to the cart
function applyFavourite() {
  const favouriteCart = JSON.parse(localStorage.getItem('favourites')) || [];
  if (favouriteCart.length === 0) {
    alert('No favourite items saved.');
    return;
  }
  cart = favouriteCart;
  renderCart();
  alert('Your favourite items have been added to the cart!');
}

// Render cart on page load
document.addEventListener('DOMContentLoaded', renderCart);

// Handle the proceed to checkout logic
function proceedToCheckout() {
  // Check if there are items in the cart
  if (cart.length === 0) {
    alert('Your cart is empty! Please add items to the cart before proceeding.');
    return;
  }

  // Redirect to the checkout page
  window.location.href = 'checkout.html';
}

const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const primaryNavigation = document.querySelector('.mobile-nav');

        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = primaryNavigation.getAttribute('aria-expanded') === 'true' || false;
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            primaryNavigation.classList.toggle('open');
        });