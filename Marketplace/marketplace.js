const products = [
  {
    id: 1,
    name: "Hybrid Wheat Seeds",
    category: "Seeds",
    price: 500,
    unit: "packet",
    rating: 4.7,
    stock: 42,
    seller: "Green Bharat Seeds",
    location: "Patna",
    description:
      "High germination wheat seeds for strong roots and better yield.",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900",
  },
  {
    id: 2,
    name: "Vegetable Seeds Combo",
    category: "Seeds",
    price: 350,
    unit: "combo",
    rating: 4.5,
    stock: 18,
    seller: "Kisan Nursery",
    location: "Ranchi",
    description:
      "Tomato, chilli, okra, and brinjal seeds for kitchen garden and small farms.",
    image:
      "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?auto=format&fit=crop&w=900",
  },
  {
    id: 3,
    name: "Organic Fertilizer",
    category: "Fertilizer",
    price: 900,
    unit: "bag",
    rating: 4.8,
    stock: 25,
    seller: "Soil Care Co",
    location: "Gaya",
    description:
      "Organic nutrient mix that improves soil health and crop growth naturally.",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900",
  },
  {
    id: 4,
    name: "NPK Fertilizer 20-20-20",
    category: "Fertilizer",
    price: 1150,
    unit: "bag",
    rating: 4.4,
    stock: 12,
    seller: "Agro Inputs Hub",
    location: "Nalanda",
    description: "Balanced NPK fertilizer for growth stage nutrient support.",
    image:
      "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=900",
  },
  {
    id: 5,
    name: "Tractor Rental",
    category: "Equipment",
    price: 2500,
    unit: "day",
    rating: 4.6,
    stock: 6,
    seller: "FarmRent Local",
    location: "Muzaffarpur",
    description:
      "Reliable tractor rental for ploughing, hauling, and field preparation.",
    image:
      "https://images.unsplash.com/photo-1605333202604-c5c5652964a9?auto=format&fit=crop&w=900",
  },
  {
    id: 6,
    name: "Crop Sprayer",
    category: "Equipment",
    price: 700,
    unit: "day",
    rating: 4.3,
    stock: 9,
    seller: "SprayPro Services",
    location: "Bhagalpur",
    description:
      "Easy spray machine for fertilizer, pesticide, and disease control use.",
    image:
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=900",
  },
  {
    id: 7,
    name: "Hand Tool Kit",
    category: "Tools",
    price: 1200,
    unit: "set",
    rating: 4.2,
    stock: 31,
    seller: "Village Tools",
    location: "Patna",
    description:
      "Sickle, spade, pruner, gloves, and essential daily farm tools.",
    image:
      "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?auto=format&fit=crop&w=900",
  },
  {
    id: 8,
    name: "Soil Testing Kit",
    category: "Tools",
    price: 1500,
    unit: "kit",
    rating: 4.9,
    stock: 8,
    seller: "Smart Soil Lab",
    location: "Pune",
    description:
      "Check pH and soil nutrients before choosing fertilizer plans.",
    image:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=900",
  },
  {
    id: 9,
    name: "Drip Irrigation Kit",
    category: "Irrigation",
    price: 3200,
    unit: "kit",
    rating: 4.7,
    stock: 14,
    seller: "WaterWise Agro",
    location: "Surat",
    description: "Water saving drip kit for vegetable fields and orchards.",
    image:
      "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=900",
  },
  {
    id: 10,
    name: "Water Pump Rental",
    category: "Irrigation",
    price: 600,
    unit: "day",
    rating: 4.1,
    stock: 5,
    seller: "Pump Mitra",
    location: "Ahmedabad",
    description:
      "Portable pump rental for irrigation and field water management.",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=900",
  },
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const quickActions = document.getElementById("quickActions");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const wishlistCount = document.getElementById("wishlistCount");
const cartItems = document.getElementById("cartItems");
const cartSummary = document.getElementById("cartSummary");
const cartBox = document.getElementById("cartBox");
const clearCart = document.getElementById("clearCart");
const checkoutForm = document.getElementById("checkoutForm");
const toast = document.getElementById("toast");
const productModal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalSeller = document.getElementById("modalSeller");
const modalPrice = document.getElementById("modalPrice");
const modalAdd = document.getElementById("modalAdd");
const paymentMethod = document.getElementById("paymentMethod");
const paymentModal = document.getElementById("paymentModal");
const closePaymentModal = document.getElementById("closePaymentModal");
const paymentOrderText = document.getElementById("paymentOrderText");
const paymentSummary = document.getElementById("paymentSummary");
const paymentForm = document.getElementById("paymentForm");
const upiFields = document.getElementById("upiFields");
const cardFields = document.getElementById("cardFields");
const codFields = document.getElementById("codFields");
const upiId = document.getElementById("upiId");
const cardName = document.getElementById("cardName");
const cardNumber = document.getElementById("cardNumber");
const cardExpiry = document.getElementById("cardExpiry");
const cardCvv = document.getElementById("cardCvv");
const upiQrImage = document.getElementById("upiQrImage");
const upiQrText = document.getElementById("upiQrText");

let cart = JSON.parse(localStorage.getItem("smartFarmerCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("smartFarmerWishlist")) || [];
let activeModalProductId = null;
let pendingOrder = null;

function svgData(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function productFallbackImage(category, name) {
  const icons = { Seeds: "Seeds", Fertilizer: "NPK", Equipment: "Tractor", Tools: "Tools", Irrigation: "Water" };
  const colors = {
    Seeds: ["#dcfce7", "#16a34a"],
    Fertilizer: ["#fef3c7", "#f59e0b"],
    Equipment: ["#e0f2fe", "#0284c7"],
    Tools: ["#f1f5f9", "#475569"],
    Irrigation: ["#dbeafe", "#2563eb"]
  };
  const pair = colors[category] || colors.Seeds;
  return svgData(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 560">
      <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${pair[0]}"/><stop offset="1" stop-color="${pair[1]}"/></linearGradient></defs>
      <rect width="900" height="560" fill="url(#g)"/>
      <circle cx="735" cy="105" r="125" fill="rgba(255,255,255,.22)"/>
      <path d="M90 430 C230 360 350 455 500 380 C635 310 725 355 820 300 L820 560 L90 560 Z" fill="rgba(255,255,255,.24)"/>
      <rect x="275" y="140" width="350" height="190" rx="28" fill="rgba(255,255,255,.78)"/>
      <text x="450" y="225" text-anchor="middle" font-family="Arial" font-size="52" font-weight="900" fill="#123524">${icons[category] || "Farm"}</text>
      <text x="450" y="292" text-anchor="middle" font-family="Arial" font-size="34" font-weight="800" fill="#14532d">${name}</text>
      <text x="450" y="388" text-anchor="middle" font-family="Arial" font-size="30" font-weight="800" fill="#123524">Smart Farmer ${category}</text>
    </svg>
  `);
}

function makeUpiQr(amount, orderId) {
  const seed = `${amount}-${orderId}`;
  let cells = "";
  for (let y = 0; y < 13; y += 1) {
    for (let x = 0; x < 13; x += 1) {
      const fixed = (x < 4 && y < 4) || (x > 8 && y < 4) || (x < 4 && y > 8);
      const code = seed.charCodeAt((x + y) % seed.length);
      const value = fixed || ((x * 7 + y * 11 + code) % 3 === 0);
      if (value) cells += `<rect x="${24 + x * 14}" y="${24 + y * 14}" width="10" height="10" rx="2" fill="#111827"/>`;
    }
  }
  return svgData(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 230">
      <rect width="230" height="230" rx="18" fill="#ffffff"/>
      <rect x="10" y="10" width="210" height="210" rx="14" fill="#f8fafc" stroke="#16a34a" stroke-width="4"/>
      ${cells}
      <rect x="78" y="92" width="74" height="46" rx="10" fill="#14532d"/>
      <text x="115" y="121" text-anchor="middle" font-family="Arial" font-size="18" font-weight="800" fill="#fff">UPI</text>
      <text x="115" y="204" text-anchor="middle" font-family="Arial" font-size="13" font-weight="700" fill="#14532d">Rs ${amount}</text>
    </svg>
  `);
}
function money(value) {
  return `Rs ${value.toLocaleString("en-IN")}`;
}


function getCartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = subtotal > 0 ? (subtotal >= 3000 ? 0 : 120) : 0;
  return {
    subtotal,
    delivery,
    total: subtotal + delivery,
    count: cart.reduce((sum, item) => sum + item.qty, 0),
  };
}

function getSelectedPayMode() {
  const selected = document.querySelector('input[name="payMode"]:checked');
  return selected ? selected.value : "upi";
}

function setPaymentFields(mode) {
  upiFields.classList.toggle("hidden", mode !== "upi");
  cardFields.classList.toggle("hidden", mode !== "card");
  codFields.classList.toggle("hidden", mode !== "cod");
  const payButton = paymentForm.querySelector(".pay-now-btn");
  payButton.innerHTML = mode === "cod"
    ? '<i class="fa-solid fa-truck"></i> Confirm COD Order'
    : '<i class="fa-solid fa-lock"></i> Pay Now';
}

function openPaymentModal(order) {
  pendingOrder = order;
  const mode = order.method;
  document.querySelectorAll('input[name="payMode"]').forEach((input) => {
    input.checked = input.value === mode;
  });
  setPaymentFields(mode);
  paymentOrderText.textContent = `Order for ${order.name} | ${order.phone}`;
  if (upiQrImage) upiQrImage.src = makeUpiQr(order.total, `SF-${Date.now()}`);
  if (upiQrText) upiQrText.textContent = `Scan QR to pay ${money(order.total)} to Smart Farmer Market.`;
  paymentSummary.innerHTML = `
    <div class="summary-line"><span>Items</span><strong>${order.items.length}</strong></div>
    <div class="summary-line"><span>Subtotal</span><strong>${money(order.subtotal)}</strong></div>
    <div class="summary-line"><span>Delivery</span><strong>${order.delivery === 0 ? "Free" : money(order.delivery)}</strong></div>
    <div class="summary-line total"><span>Payable</span><strong>${money(order.total)}</strong></div>
  `;
  paymentModal.classList.add("show");
  paymentModal.setAttribute("aria-hidden", "false");
}

function closePayment() {
  paymentModal.classList.remove("show");
  paymentModal.setAttribute("aria-hidden", "true");
}

function completePayment(mode) {
  const orders = JSON.parse(localStorage.getItem("smartFarmerOrders")) || [];
  const orderId = `SF-${Date.now()}`;
  const transactionId = mode === "cod" ? "COD-PENDING" : `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
  const status = mode === "cod" ? "pending" : "paid";

  orders.unshift({
    orderId,
    transactionId,
    paymentMethod: mode,
    paymentStatus: status,
    ...pendingOrder,
    createdAt: new Date().toISOString(),
  });
  localStorage.setItem("smartFarmerOrders", JSON.stringify(orders));

  cart = [];
  saveCart();
  renderCart();
  checkoutForm.reset();
  closePayment();
  showToast(mode === "cod" ? `COD order placed: ${orderId}` : `Payment successful: ${transactionId}`);
  pendingOrder = null;
}

function validatePayment(mode) {
  if (mode === "upi") {
    if (!upiId.value.trim() || !upiId.value.includes("@")) {
      showToast("Enter a valid UPI ID");
      return false;
    }
  }
  if (mode === "card") {
    const cleanCard = cardNumber.value.replace(/\s/g, "");
    if (!cardName.value.trim() || cleanCard.length < 12 || !cardExpiry.value.trim() || cardCvv.value.length < 3) {
      showToast("Enter valid card details");
      return false;
    }
  }
  return true;
}
function saveCart() {
  localStorage.setItem("smartFarmerCart", JSON.stringify(cart));
}

function saveWishlist() {
  localStorage.setItem("smartFarmerWishlist", JSON.stringify(wishlist));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1400);
}

function getFilteredProducts() {
  const term = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;
  const filtered = products.filter((product) => {
    const text =
      `${product.name} ${product.description} ${product.seller} ${product.location}`.toLowerCase();
    const matchesSearch = text.includes(term);
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (sortSelect.value === "low") filtered.sort((a, b) => a.price - b.price);
  if (sortSelect.value === "high") filtered.sort((a, b) => b.price - a.price);
  if (sortSelect.value === "rating")
    filtered.sort((a, b) => b.rating - a.rating);
  return filtered;
}

function renderProducts() {
  const filtered = getFilteredProducts();

  if (!filtered.length) {
    productGrid.innerHTML =
      '<div class="empty">No product found. Try another search or category.</div>';
    return;
  }

  productGrid.innerHTML = filtered
    .map((product) => {
      const liked = wishlist.includes(product.id);
      return `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src=productFallbackImage(\`${product.category}\`, \`${product.name}\`);" />
        <button class="wishlist-btn ${liked ? "active" : ""}" data-id="${product.id}" title="Save product"><i class="fa-solid fa-heart"></i></button>
        <div class="product-body">
          <div class="meta-line"><span class="category">${product.category}</span><span class="rating"><i class="fa-solid fa-star"></i> ${product.rating}</span></div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="seller"><i class="fa-solid fa-location-dot"></i> ${product.seller}, ${product.location}</div>
          <span class="stock ${product.stock <= 8 ? "low" : ""}">${product.stock <= 8 ? "Limited stock" : "In stock"}: ${product.stock}</span>
          <div class="price-row">
            <span class="price">${money(product.price)} / ${product.unit}</span>
            <div class="actions">
              <button class="details-btn" data-id="${product.id}">Details</button>
              <button class="buy-btn" data-id="${product.id}">Add</button>
            </div>
          </div>
        </div>
      </article>
    `;
    })
    .join("");
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  const existing = cart.find((item) => item.id === product.id);

  if (existing) existing.qty += 1;
  else
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      qty: 1,
    });

  saveCart();
  renderCart();
  showToast(`${product.name} added to cart`);
}

function changeQty(productId, amount) {
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return;
  item.qty += amount;
  if (item.qty <= 0) cart = cart.filter((entry) => entry.id !== productId);
  saveCart();
  renderCart();
}

function renderCart() {
  const { subtotal, delivery, total, count } = getCartTotals();

  cartTotal.textContent = money(total);
  cartCount.textContent = `${count} item${count === 1 ? "" : "s"} selected`;
  wishlistCount.textContent = wishlist.length;

  if (!cart.length) {
    cartBox.style.display = "block";
    cartItems.innerHTML =
      '<p class="empty-cart">Cart is empty. Add products to create an order request.</p>';
    cartSummary.innerHTML = "";
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-row">
      <div>
        <strong>${item.name}</strong>
        <div class="qty">
          <button data-id="${item.id}" data-change="-1">-</button>
          <span>${item.qty}</span>
          <button data-id="${item.id}" data-change="1">+</button>
        </div>
      </div>
      <b>${money(item.price * item.qty)}</b>
    </div>
  `,
    )
    .join("");

  cartSummary.innerHTML = `
    <div class="summary-line"><span>Subtotal</span><strong>${money(subtotal)}</strong></div>
    <div class="summary-line"><span>Delivery</span><strong>${delivery === 0 ? "Free" : money(delivery)}</strong></div>
    <div class="summary-line total"><span>Total</span><strong>${money(total)}</strong></div>
  `;
}

function openDetails(productId) {
  const product = products.find((item) => item.id === productId);
  activeModalProductId = productId;
  modalImage.onerror = () => {
    modalImage.onerror = null;
    modalImage.src = productFallbackImage(product.category, product.name);
  };
  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalCategory.textContent = product.category;
  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description;
  modalSeller.textContent = `Seller: ${product.seller}, ${product.location} | Rating: ${product.rating} | Stock: ${product.stock}`;
  modalPrice.textContent = `${money(product.price)} / ${product.unit}`;
  productModal.classList.add("show");
  productModal.setAttribute("aria-hidden", "false");
}

function closeDetails() {
  productModal.classList.remove("show");
  productModal.setAttribute("aria-hidden", "true");
}

productGrid.addEventListener("click", (event) => {
  const addButton = event.target.closest(".buy-btn");
  const detailsButton = event.target.closest(".details-btn");
  const wishlistButton = event.target.closest(".wishlist-btn");

  if (addButton) addToCart(Number(addButton.dataset.id));
  if (detailsButton) openDetails(Number(detailsButton.dataset.id));
  if (wishlistButton) {
    const id = Number(wishlistButton.dataset.id);
    wishlist = wishlist.includes(id)
      ? wishlist.filter((item) => item !== id)
      : [...wishlist, id];
    saveWishlist();
    renderProducts();
    renderCart();
  }
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-change]");
  if (!button) return;
  changeQty(Number(button.dataset.id), Number(button.dataset.change));
});

quickActions.addEventListener("click", (event) => {
  const button = event.target.closest(".chip");
  if (!button) return;
  categoryFilter.value = button.dataset.category;
  document
    .querySelectorAll(".chip")
    .forEach((chip) => chip.classList.remove("active"));
  button.classList.add("active");
  renderProducts();
});

searchInput.addEventListener("input", renderProducts);
categoryFilter.addEventListener("change", () => {
  document
    .querySelectorAll(".chip")
    .forEach((chip) =>
      chip.classList.toggle(
        "active",
        chip.dataset.category === categoryFilter.value,
      ),
    );
  renderProducts();
});
sortSelect.addEventListener("change", renderProducts);
clearCart.addEventListener("click", () => {
  cart = [];
  saveCart();
  renderCart();
  showToast("Cart cleared");
});

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!cart.length) {
    showToast("Add items before payment");
    return;
  }

  const name = document.getElementById("farmerName").value.trim();
  const phone = document.getElementById("farmerPhone").value.trim();
  const address = document.getElementById("farmerAddress").value.trim();
  const method = paymentMethod.value;
  const totals = getCartTotals();

  openPaymentModal({
    name,
    phone,
    address,
    method,
    items: cart.map((item) => ({ ...item })),
    ...totals,
  });
});


if (paymentForm) {
  paymentForm.addEventListener("change", (event) => {
    if (event.target.name === "payMode") setPaymentFields(event.target.value);
  });

  paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!pendingOrder) return;
    const mode = getSelectedPayMode();
    if (!validatePayment(mode)) return;
    completePayment(mode);
  });
}

if (closePaymentModal) closePaymentModal.addEventListener("click", closePayment);
if (paymentModal) {
  paymentModal.addEventListener("click", (event) => {
    if (event.target === paymentModal) closePayment();
  });
}
closeModal.addEventListener("click", closeDetails);
productModal.addEventListener("click", (event) => {
  if (event.target === productModal) closeDetails();
});
modalAdd.addEventListener("click", () => {
  if (activeModalProductId) addToCart(activeModalProductId);
  closeDetails();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDetails();
});

renderProducts();
renderCart();



