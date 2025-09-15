// ...existing code...
// Global products array
let products = [];

// Example cart array (load from localStorage if exists)
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

// Fetch products from API
async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    products = data; // store in global array
    console.log("Products fetched:", products);

    renderProducts(products); // call render after fetch
    renderCart(); // update cart UI from saved data
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}


// Render products on page
function renderProducts(productsArray) {
  const container = document.getElementById("product-list"); // make sure you have this div in HTML
  if (!container) {
    console.error('#product-list element not found in DOM');
    return;
  }
  container.innerHTML = ""; // clear old content

  productsArray.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-img"/>
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <button class="addtocart" data-id="${product.id}">Add to Cart</button>
    `;

    // attach click handler to this button (safe because button exists now)
    const btn = card.querySelector('.addtocart');
    btn.addEventListener('click', () => addToCart(product.id));

    container.appendChild(card);
  });
}

// cart DOM container
const cartPage = document.querySelector('.cart-items');

// ...existing code...

// Render cart and attach per-item handlers
function renderCart() {
  if (!cartPage) return;
  cartPage.innerHTML = ''; // clear
  if (cart.length === 0) {
    cartPage.innerHTML = '<p>Your cart is empty</p>';
    const totalSpan = document.getElementById('total-span');
    if (totalSpan) totalSpan.textContent = 'Total: $0.00';
    return;
  }

  cart.forEach(item => {
    // ensure quantity exists
    if (!item.quantity) item.quantity = 1;

    const el = document.createElement('div');
    el.className = 'cart-info';
    el.dataset.id = item.id;

    el.innerHTML = `
      <img src="${item.image}" alt="${item.title}" id="product-img">
      <div class="cartinformation"><span class="cart-title">${item.title}</span>
      <strong>$${item.price}</strong></div>
    `;

    const counter = document.createElement('div');
    counter.classList.add('add-remove-product');
    counter.innerHTML = `
      <button class="remove" data-id="${item.id}">-</button>
      <span class="item-counter" data-id="${item.id}">${item.quantity}</span>
      <button class="add" data-id="${item.id}">+</button>
    `;

    // attach handlers for this item's buttons
    counter.querySelector('.remove').addEventListener('click', () => {
      item.quantity--;
      if (item.quantity <= 0) {
        cart = cart.filter(p => p.id !== item.id);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });

    counter.querySelector('.add').addEventListener('click', () => {
      item.quantity++;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });

    cartPage.appendChild(el);
    cartPage.appendChild(counter);
  });

  // update total span
  const totalSpan = document.getElementById('total-span');
  if (totalSpan) {
    const total = cart.reduce((s, i) => s + (Number(i.price || 0) * (i.quantity || 1)), 0);
    totalSpan.textContent = `Total: $${total.toFixed(2)}`;
  }
}

// Add to cart (store quantity)
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) {
    console.warn('Product not found for id', id);
    return;
  }
  const exists = cart.find(p => p.id === id);
  if (exists) {
    exists.quantity = (exists.quantity || 1) + 1;
  } else {
    const prodCopy = Object.assign({}, product, { quantity: 1 });
    cart.push(prodCopy);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  // optional: small toast instead of alert
}

// Call fetch when page loads
fetchProducts();
// ...existing code...