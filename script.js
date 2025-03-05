const product = {
  name: "Gummy Bears",
  inStock: true,
  price: 1.99,
  flavors: ["grape", "apple", "cherry"],
  description: "A delicious fruity treat!",
  image: "/product1.jpg",
};

let result = document.getElementById("Cart");
let listresult = document.getElementById("cartlist");

// Using a template literal for cleaner HTML structure
let resultHTML = `
    <div id="cart-item">
      <img id="cartimg" src="${product.image}" alt="Product" />
      <h2 class="product-name">Product ${product.name}</h2>
      <p class="product-stock">In Stock: ${product.inStock ? "Yes" : "No"}</p>
      <p class="product-price">Price: $${product.price}</p>
      <p class="product-description">Description: ${product.description}</p>
      <button id="addtocartbtn">Add To Cart</button>
    </div>
  `;
result.innerHTML = resultHTML;

// Use an array to store the cart items, but now store the product object itself
let cartItems = [];

// Add to cart functionality
document.addEventListener("click", (event) => {
  if (event.target.id === "addtocartbtn") {
    //Add the product object to the cart
    cartItems.push(product);
    updateCart();
    // Show the cart list when an item is added
    listresult.style.display = "flex";
  }
  if (event.target.id === "removefromcartbtn") {
    const itemToRemove = event.target.closest(".cart-item");
    if (itemToRemove) {
      const index = Array.from(listresult.children).indexOf(itemToRemove);
      if (index !== -1) {
        cartItems.splice(index - 1, 1); // -1 because of the cart list name which is added as first child
        updateCart();
        //Hide the list if it's empty
        if (cartItems.length === 0) {
          listresult.style.display = "none";
        }
      }
    }
  }
});

function updateCart() {
  listresult.innerHTML = "";
  // Clear the cart display

  // Add "Cart List" heading only if there are items in the cart
  if (cartItems.length > 0) {
    const cartlistname = document.createElement("h1");
    cartlistname.textContent = "Cart List";
    listresult.appendChild(cartlistname);
  }
  cartItems.forEach((item, index) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");
    //create html based on the product object
    cartItemElement.innerHTML = `
          <img id="cartimg" src="${item.image}" alt="Product" style="height: 100px; width: 100px;"/>
          <h2 class="product-name">Product ${item.name}</h2>
          <p class="product-price">Price: $${item.price}</p>
          `;
    const removeButton = document.createElement("button");
    removeButton.id = "removefromcartbtn";
    removeButton.textContent = "Remove";
    cartItemElement.appendChild(removeButton);
    listresult.appendChild(cartItemElement);
  });
}
// Hide the cart list initially
listresult.style.display = "none";
