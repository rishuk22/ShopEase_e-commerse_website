/*
  script.js - Frontend cart and UI interactions for ShopEase
*/

const PRODUCTS = [
  {
    id: 1,
    name: "High-Performance Sneakers",
    category: "Footwear",
    price: 129.99,
    oldPrice: 159.99,
    badge: "Sale",
    image:
      "https://images.unsplash.com/photo-1600181950729-0c7a1b6b2f22?auto=format&fit=crop&w=800&q=80",
    description:
      "Lightweight sneakers built for comfort and speed. Ideal for running, gym sessions, and everyday wear.",
  },
  {
    id: 2,
    name: "Noise-Cancelling Headphones",
    category: "Electronics",
    price: 79.99,
    oldPrice: 99.99,
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1517059224940-d4af9eec41e4?auto=format&fit=crop&w=800&q=80",
    description:
      "Enjoy immersive sound with active noise cancellation and up to 30 hours of battery life.",
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 149.99,
    oldPrice: 189.99,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1549921296-3b2c07129f89?auto=format&fit=crop&w=800&q=80",
    description:
      "Track workouts, monitor heart rate, and stay connected with notifications on your wrist.",
  },
  {
    id: 4,
    name: "Sleek Laptop",
    category: "Electronics",
    price: 999.99,
    oldPrice: 1199.99,
    badge: "Limited",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    description:
      "Thin, powerful laptop with long battery life and a picturesque display for creatives.",
  },
  {
    id: 5,
    name: "Classic T-Shirt Pack",
    category: "Apparel",
    price: 49.99,
    oldPrice: 59.99,
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    description:
      "Soft cotton tees in three colors. Perfect for layering or lounging at home.",
  },
  {
    id: 6,
    name: "Adventure Backpack",
    category: "Accessories",
    price: 69.99,
    oldPrice: 89.99,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1523473827532-3bd58a4b4d98?auto=format&fit=crop&w=800&q=80",
    description:
      "Durable backpack with multiple compartments, water-resistant fabric, and padded straps.",
  },
  {
    id: 7,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 59.99,
    oldPrice: 79.99,
    badge: "Sale",
    image:
      "https://images.unsplash.com/photo-1512499617640-c2f999079a4c?auto=format&fit=crop&w=800&q=80",
    description:
      "Compact earbuds with crystal-clear sound and quick-charging case for all-day listening.",
  },
  {
    id: 8,
    name: "Running Shorts",
    category: "Apparel",
    price: 34.99,
    oldPrice: 44.99,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1556909218-7a258d0c0c26?auto=format&fit=crop&w=800&q=80",
    description:
      "Breathable running shorts with built-in liner and secure pockets for essentials.",
  },
  {
    id: 9,
    name: "Travel Duffel Bag",
    category: "Accessories",
    price: 59.99,
    oldPrice: 74.99,
    badge: "Featured",
    image:
      "https://images.unsplash.com/photo-1525286116112-b59af11adad1?auto=format&fit=crop&w=800&q=80",
    description:
      "Spacious duffel with multiple pockets, detachable shoulder strap, and sturdy handles.",
  },
  {
    id: 10,
    name: "Running Shoes",
    category: "Footwear",
    price: 119.99,
    oldPrice: 139.99,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1525718755401-a2b1b4f5a6d1?auto=format&fit=crop&w=800&q=80",
    description:
      "Responsive running shoes with excellent traction and breathable mesh upper.",
  },
  {
    id: 11,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 89.99,
    oldPrice: 109.99,
    badge: "Top Rated",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    description:
      "Portable speaker with bold sound, waterproof design, and long battery life.",
  },
  {
    id: 12,
    name: "Comfy Hoodie",
    category: "Apparel",
    price: 54.99,
    oldPrice: 69.99,
    badge: "Comfort",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    description:
      "Soft fleece hoodie with adjustable hood and kangaroo pocket for everyday comfort.",
  },
];

const CART_KEY = "shopEaseCart";

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn("Failed to parse cart", error);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const badgeEls = document.querySelectorAll("#cartCount");
  const cart = getCart();
  const count = cart.reduce((acc, item) => acc + item.quantity, 0);
  badgeEls.forEach((el) => {
    el.textContent = count;
  });
}

function getProductById(id) {
  return PRODUCTS.find((product) => product.id === Number(id));
}

function getQueryParams() {
  return new URLSearchParams(window.location.search);
}

function buildProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  card.appendChild(img);

  const body = document.createElement("div");
  body.className = "product-card-body";

  if (product.badge) {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = product.badge;
    body.appendChild(badge);
  }

  const title = document.createElement("h3");
  title.className = "product-card-title";
  title.textContent = product.name;
  body.appendChild(title);

  const desc = document.createElement("p");
  desc.className = "product-card-text";
  desc.textContent = product.description;
  body.appendChild(desc);

  const priceRow = document.createElement("div");
  priceRow.className = "product-price-row";

  const price = document.createElement("span");
  price.className = "product-price";
  price.textContent = formatPrice(product.price);
  priceRow.appendChild(price);

  if (product.oldPrice) {
    const oldPrice = document.createElement("span");
    oldPrice.className = "product-price-old";
    oldPrice.textContent = formatPrice(product.oldPrice);
    priceRow.appendChild(oldPrice);
  }

  body.appendChild(priceRow);

  const actions = document.createElement("div");
  actions.className = "product-card-actions";

  const addToCart = document.createElement("button");
  addToCart.className = "btn primary";
  addToCart.textContent = "Add to Cart";
  addToCart.addEventListener("click", () => addToCartHandler(product.id));

  const view = document.createElement("a");
  view.className = "btn outline";
  view.href = `product.html?id=${product.id}`;
  view.textContent = "View Product";

  actions.appendChild(addToCart);
  actions.appendChild(view);
  body.appendChild(actions);

  card.appendChild(body);
  return card;
}

function addToCartHandler(productId, quantity = 1) {
  const product = getProductById(productId);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: product.id, quantity });
  }
  saveCart(cart);
  showToast(`${product.name} added to cart`);
}

function showToast(message) {
  const existing = document.querySelector(".toast-notice");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.className = "toast-notice";
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("visible"));
  setTimeout(() => {
    toast.classList.remove("visible");
    setTimeout(() => toast.remove(), 240);
  }, 2400);
}

function renderProductGrid({ filter = "", category = "" } = {}) {
  const container = document.getElementById("productGrid");
  if (!container) return;
  container.innerHTML = "";
  const term = filter.trim().toLowerCase();

  const matches = PRODUCTS.filter((product) => {
    const matchesSearch =
      !term ||
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term);
    const matchesCategory = !category || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (matches.length === 0) {
    container.innerHTML = `<p class="empty">No products match your search.</p>`;
    return;
  }

  matches.forEach((product) => container.appendChild(buildProductCard(product)));
}

function renderFeaturedGrid() {
  const container = document.getElementById("featuredGrid");
  if (!container) return;
  container.innerHTML = "";

  const featured = PRODUCTS.filter((product) =>
    ["Sale", "Featured", "Top Rated", "New"].includes(product.badge)
  );

  featured.slice(0, 6).forEach((product) => container.appendChild(buildProductCard(product)));
}

function renderCategoryFilters() {
  const container = document.getElementById("categoryFilters");
  if (!container) return;
  container.innerHTML = "";

  const categories = Array.from(new Set(PRODUCTS.map((p) => p.category)));
  const params = getQueryParams();
  const currentCategory = params.get("category") || "";
  categories.unshift("All");

  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.textContent = category;

    if (category === "All" && !currentCategory) btn.classList.add("active");
    if (category === currentCategory) btn.classList.add("active");

    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((el) => el.classList.remove("active"));
      btn.classList.add("active");
      const selected = category === "All" ? "" : category;
      renderProductGrid({
        category: selected,
        filter: document.getElementById("searchInput")?.value || "",
      });
    });

    container.appendChild(btn);
  });
}

function initProductPage() {
  const params = getQueryParams();
  const id = params.get("id");
  const product = getProductById(id);
  if (!product) {
    const page = document.getElementById("productPage");
    if (page) page.innerHTML = "<p class='empty'>Product not found.</p>";
    return;
  }

  const imageContainer = document.getElementById("productImage");
  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.name;
  imageContainer.appendChild(image);

  document.getElementById("productName").textContent = product.name;
  document.getElementById("productCategory").textContent = product.category;
  document.getElementById("productPrice").textContent = formatPrice(product.price);
  document.getElementById("productDescription").textContent = product.description;

  const qtyInput = document.getElementById("qtyInput");
  const qtyIncrease = document.getElementById("qtyIncrease");
  const qtyDecrease = document.getElementById("qtyDecrease");
  const addToCartBtn = document.getElementById("addToCartBtn");

  const clampQty = () => {
    if (!qtyInput) return;
    const value = Number(qtyInput.value);
    if (Number.isNaN(value) || value < 1) {
      qtyInput.value = 1;
    }
  };

  qtyIncrease?.addEventListener("click", () => {
    clampQty();
    qtyInput.value = Number(qtyInput.value) + 1;
  });

  qtyDecrease?.addEventListener("click", () => {
    clampQty();
    qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
  });

  addToCartBtn?.addEventListener("click", () => {
    const amount = Number(qtyInput.value) || 1;
    addToCartHandler(product.id, amount);
  });
}

function renderCartPage() {
  const itemsContainer = document.getElementById("cartItems");
  const summaryCount = document.getElementById("summaryCount");
  const summarySub = document.getElementById("summarySub");
  const summaryTotal = document.getElementById("summaryTotal");
  const cartNote = document.getElementById("cartNote");

  if (!itemsContainer || !summaryCount || !summarySub || !summaryTotal) return;

  const cart = getCart();
  itemsContainer.innerHTML = "";

  if (cart.length === 0) {
    itemsContainer.innerHTML = `<p class="empty">Your cart is empty. Start shopping to add items.</p>`;
    summaryCount.textContent = "0";
    summarySub.textContent = "$0.00";
    summaryTotal.textContent = "$0.00";
    if (cartNote) cartNote.textContent = "You can add items from the products page.";
    return;
  }

  let subtotal = 0;
  let totalQty = 0;

  cart.forEach((entry) => {
    const product = getProductById(entry.id);
    if (!product) return;
    const itemTotal = product.price * entry.quantity;
    subtotal += itemTotal;
    totalQty += entry.quantity;

    const item = document.createElement("div");
    item.className = "cart-item";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;

    const meta = document.createElement("div");
    meta.className = "cart-item-meta";
    const title = document.createElement("h3");
    title.textContent = product.name;
    const qtyText = document.createElement("p");
    qtyText.innerHTML = `Qty: <strong>${entry.quantity}</strong>`;
    const priceText = document.createElement("p");
    priceText.textContent = formatPrice(itemTotal);
    meta.appendChild(title);
    meta.appendChild(qtyText);
    meta.appendChild(priceText);

    const actions = document.createElement("div");
    actions.className = "cart-item-actions";

    const qtyAdjust = document.createElement("div");
    qtyAdjust.className = "quantity";

    const dec = document.createElement("button");
    dec.className = "btn icon-btn";
    dec.textContent = "-";

    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.value = entry.quantity;
    qtyInput.min = "1";

    const inc = document.createElement("button");
    inc.className = "btn icon-btn";
    inc.textContent = "+";

    const updateQty = (newQty) => {
      updateCartQuantity(product.id, newQty);
      renderCartPage();
    };

    dec.addEventListener("click", () => updateQty(Math.max(1, entry.quantity - 1)));
    inc.addEventListener("click", () => updateQty(entry.quantity + 1));
    qtyInput.addEventListener("change", () => {
      const newQty = Math.max(1, Number(qtyInput.value) || 1);
      updateQty(newQty);
    });

    qtyAdjust.appendChild(dec);
    qtyAdjust.appendChild(qtyInput);
    qtyAdjust.appendChild(inc);

    const remove = document.createElement("button");
    remove.className = "btn outline";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      removeFromCart(product.id);
      renderCartPage();
    });

    actions.appendChild(qtyAdjust);
    actions.appendChild(remove);

    item.appendChild(img);
    item.appendChild(meta);
    item.appendChild(actions);

    itemsContainer.appendChild(item);
  });

  const shipping = 5.0;
  const total = subtotal + shipping;
  summaryCount.textContent = `${totalQty}`;
  summarySub.textContent = formatPrice(subtotal);
  summaryTotal.textContent = formatPrice(total);
  if (cartNote) cartNote.textContent = "";
}

function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
}

function updateCartQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return;
  item.quantity = quantity;
  saveCart(cart);
}

function initHeaderInteractions() {
  const toggle = document.getElementById("mobileNavToggle");
  const nav = document.getElementById("nav");

  toggle?.addEventListener("click", () => {
    nav?.classList.toggle("open");
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!nav || !toggle) return;
    if (nav.contains(target) || toggle.contains(target)) return;
    nav.classList.remove("open");
  });
}

function initSearch() {
  const input = document.getElementById("searchInput");
  const button = document.getElementById("searchBtn");
  if (!input || !button) return;

  const update = () => {
    const term = input.value.trim();
    renderProductGrid({ filter: term, category: getQueryParams().get("category") || "" });
  };

  button.addEventListener("click", update);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      update();
    }
  });
}

function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("newsletterEmail");
  const note = document.getElementById("newsletterNote");
  if (!form || !emailInput || !note) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    if (!email) return;
    note.textContent = "Thanks for subscribing! We'll keep you updated.";
    emailInput.value = "";
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const note = document.getElementById("contactNote");
  if (!form || !note) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    note.textContent = "Thanks for reaching out! We'll respond as soon as possible.";
    form.reset();
  });
}

function setYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll("#year").forEach((el) => {
    el.textContent = String(year);
  });
}

function init() {
  setYear();
  initHeaderInteractions();
  initSearch();
  initNewsletter();
  initContactForm();
  updateCartCount();

  if (document.getElementById("productPage")) {
    initProductPage();
  }

  if (document.getElementById("cartSection")) {
    renderCartPage();
    const checkoutBtn = document.getElementById("checkoutBtn");
    checkoutBtn?.addEventListener("click", () => {
      const cart = getCart();
      if (cart.length === 0) {
        const cartNote = document.getElementById("cartNote");
        if (cartNote) cartNote.textContent = "Add items to your cart before checking out.";
        return;
      }
      alert("Checkout is not available in this demo. Thank you for shopping!");
    });
  }

  renderCategoryFilters();
  renderProductGrid({
    filter: getQueryParams().get("search") || "",
    category: getQueryParams().get("category") || "",
  });
  renderFeaturedGrid();
}

document.addEventListener("DOMContentLoaded", init);
