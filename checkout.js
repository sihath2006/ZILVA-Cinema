// Get cart data from localStorage
const cartData = JSON.parse(localStorage.getItem("cart") || "[]");

const tbody = document.querySelector("#checkoutSummary tbody");
const totalElement = document.getElementById("checkout-total-price");
let totalPrice = 0;

cartData.forEach((item) => {
    const row = document.createElement("tr");
    const itemPrice = item.unitPrice * item.quantity; // Calculate the price for the current quantity
    row.innerHTML = `
        <td>${item.movie}</td>
        <td>${item.quantity}</td>
        <td>$${item.unitPrice.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
    totalPrice += itemPrice; // Add the calculated item price to the total
});



// Add total row
const totalRow = document.createElement("tr");
totalRow.innerHTML = `<td colspan="2"><strong>Total</strong></td><td><strong>$${totalPrice.toFixed(
  2
)}</strong></td>`;
tbody.appendChild(totalRow);

// Function to handle payment
function completePayment() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const seats = document.getElementById("seats").value.trim();
  const payment = document.getElementById("payment").value;

  if (!name || !email || !seats || !payment) {
    alert("Please fill in all fields before proceeding.");
    return;
  }

  // Generate booking reference and time
  const refNumber = "MTB-" + Math.floor(100000 + Math.random() * 900000);
  const movieTimes = ["2:00 PM", "5:30 PM", "8:00 PM"];
  const randomTime = movieTimes[Math.floor(Math.random() * movieTimes.length)];

  // Build thank you message
  const thankYouMsg = `
    <h3>Thank you, ${name}!</h3>
    <p>Your booking is confirmed.</p>
    <p><strong>Movie Time:</strong> ${randomTime}</p>
    <p><strong>Seats:</strong> ${seats}</p>
    <p><strong>Booking Ref:</strong> ${refNumber}</p>
    <p>An e-ticket has been sent to <strong>${email}</strong>.</p>
  `;

  // Show thank you message, hide form
  document.querySelector(".checkout-form").style.display = "none";
  const thankYouBox = document.getElementById("thankYouMessage");
  thankYouBox.innerHTML = thankYouMsg;
  thankYouBox.style.display = "block";

  // Clear cart from local storage
  localStorage.removeItem("checkoutCart");
}
