

// Global products array
let products = [];

// Fetch products from API
async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    products = data; // store in global array
    console.log("Products fetched:", products);

    renderProducts(products); // call render after fetch
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Render products on page
function renderProducts(productsArray) {
  const container = document.getElementById("product-list"); // make sure you have this div in HTML
  container.innerHTML = ""; // clear old content

  productsArray.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-img"/>
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})" id = "addtocart">Add to Cart</button>
    `;

    container.appendChild(card);
  });
}
const cartLogo = document.querySelector('#cart');
const cartPage = document.querySelector('.cartpage');

if (cartLogo && cartPage) {
  cartLogo.addEventListener('click', () => {
    // toggle a class that shows/hides the cart sidebar
    cartPage.classList.remove()
  });
} else {
  console.warn('Cart logo or cart page not found:', { cartLogo, cartPage });
}

// const addtocartbtn = document.querySelector('#addtocart');

// addtocartbtn.addEventListener('click',addToCart(){
  
// })
// Example cart array
let cart = [];

// Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    console.log("Cart:", cart);
    alert(product.title + " added to cart!");
  }
}

// Call fetch when page loads
fetchProducts();
