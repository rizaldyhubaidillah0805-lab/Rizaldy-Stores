const products = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    category: "Elektronik",
    price: 899000,
    rating: 4.9,
    sold: 384,
    tag: "Best Seller",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 2,
    name: "Urban Sneakers One",
    category: "Fashion",
    price: 749000,
    rating: 4.8,
    sold: 231,
    tag: "Trending",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 3,
    name: "Minimal Desk Lamp",
    category: "Rumah",
    price: 329000,
    rating: 4.7,
    sold: 119,
    tag: "New",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 4,
    name: "Mechanical Keyboard 75%",
    category: "Hobi",
    price: 1099000,
    rating: 4.9,
    sold: 518,
    tag: "Hot",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 5,
    name: "Smartwatch Active 2",
    category: "Elektronik",
    price: 1299000,
    rating: 4.8,
    sold: 306,
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 6,
    name: "Essential Backpack",
    category: "Fashion",
    price: 469000,
    rating: 4.7,
    sold: 178,
    tag: "Choice",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 7,
    name: "Ceramic Coffee Set",
    category: "Rumah",
    price: 279000,
    rating: 4.8,
    sold: 145,
    tag: "Favorite",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: 8,
    name: "Training Shoes Flex",
    category: "Olahraga",
    price: 819000,
    rating: 4.6,
    sold: 96,
    tag: "New",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=85"
  }
];

let selectedCategory = "Semua";
let cart = JSON.parse(localStorage.getItem("nexamart_cart") || "[]");
let wishlist = JSON.parse(localStorage.getItem("nexamart_wishlist") || "[]");

const grid = document.getElementById("productsGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const cartCount = document.getElementById("cartCount");
const wishlistCount = document.getElementById("wishlistCount");
const cartDrawer = document.getElementById("cartDrawer");
const wishlistDrawer = document.getElementById("wishlistDrawer");
const drawerBackdrop = document.getElementById("drawerBackdrop");

const rupiah = n => new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR", maximumFractionDigits: 0
}).format(n);

function renderProducts() {
  const q = searchInput.value.trim().toLowerCase();
  const visible = products.filter(p => {
    const categoryMatch = selectedCategory === "Semua" || p.category === selectedCategory;
    const searchMatch = `${p.name} ${p.category}`.toLowerCase().includes(q);
    return categoryMatch && searchMatch;
  });

  grid.innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <span class="tag">${p.tag}</span>
        <button class="wish ${wishlist.includes(p.id) ? "active" : ""}" onclick="toggleWishlist(${p.id})" aria-label="Tambah ke wishlist">
          ${wishlist.includes(p.id) ? "♥" : "♡"}
        </button>
      </div>
      <div class="product-body">
        <div class="product-meta">${p.category}</div>
        <h3 class="product-title">${p.name}</h3>
        <div class="product-rating">★ ${p.rating} <span>• ${p.sold} terjual</span></div>
        <div class="product-bottom">
          <div class="product-price">${rupiah(p.price)}</div>
          <button class="add-cart" onclick="addToCart(${p.id})" aria-label="Tambah ke keranjang">+</button>
        </div>
      </div>
    </article>
  `).join("");

  emptyState.classList.toggle("hidden", visible.length > 0);
}

function persist() {
  localStorage.setItem("nexamart_cart", JSON.stringify(cart));
  localStorage.setItem("nexamart_wishlist", JSON.stringify(wishlist));
  updateCounts();
}

function updateCounts() {
  cartCount.textContent = cart.length;
  wishlistCount.textContent = wishlist.length;
}

function addToCart(id) {
  cart.push(id);
  persist();
  renderCart();
  showToast("Produk ditambahkan ke keranjang");
}

function toggleWishlist(id) {
  wishlist = wishlist.includes(id)
    ? wishlist.filter(x => x !== id)
    : [...wishlist, id];
  persist();
  renderProducts();
  renderWishlist();
  showToast(wishlist.includes(id) ? "Ditambahkan ke wishlist" : "Dihapus dari wishlist");
}

function removeCartIndex(index) {
  cart.splice(index, 1);
  persist();
  renderCart();
}

function removeWishlist(id) {
  wishlist = wishlist.filter(x => x !== id);
  persist();
  renderWishlist();
  renderProducts();
}

function renderCart() {
  const items = cart.map(id => products.find(p => p.id === id)).filter(Boolean);
  const el = document.getElementById("cartItems");
  if (!items.length) {
    el.innerHTML = `<div class="drawer-empty">🛒<h4>Keranjang masih kosong</h4><p>Tambahkan produk favoritmu.</p></div>`;
  } else {
    el.innerHTML = items.map((p, i) => `
      <div class="drawer-item">
        <img src="${p.image}" alt="${p.name}">
        <div><h4>${p.name}</h4><small>${rupiah(p.price)}</small></div>
        <button class="remove-btn" onclick="removeCartIndex(${i})">×</button>
      </div>
    `).join("");
  }
  document.getElementById("cartTotal").textContent = rupiah(items.reduce((s,p) => s + p.price, 0));
}

function renderWishlist() {
  const items = wishlist.map(id => products.find(p => p.id === id)).filter(Boolean);
  const el = document.getElementById("wishlistItems");
  if (!items.length) {
    el.innerHTML = `<div class="drawer-empty">♡<h4>Wishlist masih kosong</h4><p>Simpan produk untuk dilihat nanti.</p></div>`;
  } else {
    el.innerHTML = items.map(p => `
      <div class="drawer-item">
        <img src="${p.image}" alt="${p.name}">
        <div><h4>${p.name}</h4><small>${rupiah(p.price)}</small></div>
        <button class="remove-btn" onclick="removeWishlist(${p.id})">×</button>
      </div>
    `).join("");
  }
}

function openDrawer(drawer) {
  document.querySelectorAll(".drawer").forEach(d => d.classList.remove("open"));
  drawer.classList.add("open");
  drawerBackdrop.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function closeDrawers() {
  document.querySelectorAll(".drawer").forEach(d => d.classList.remove("open"));
  drawerBackdrop.classList.add("hidden");
  document.body.style.overflow = "";
}

document.getElementById("cartBtn").addEventListener("click", () => {
  renderCart(); openDrawer(cartDrawer);
});
document.getElementById("wishlistBtn").addEventListener("click", () => {
  renderWishlist(); openDrawer(wishlistDrawer);
});
drawerBackdrop.addEventListener("click", closeDrawers);
document.querySelectorAll("[data-close]").forEach(btn => btn.addEventListener("click", closeDrawers));

document.getElementById("checkoutBtn").addEventListener("click", () => {
  showToast("Demo checkout — sambungkan payment gateway untuk versi produksi");
});

document.getElementById("sellerDemoBtn").addEventListener("click", () => {
  showToast("Dashboard seller siap dikembangkan ke login, stok, pesanan, dan analitik");
});

document.querySelectorAll("[data-category]").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedCategory = btn.dataset.category;
    document.querySelectorAll(".filter-btn").forEach(x => x.classList.toggle("active", x.dataset.category === selectedCategory));
    document.querySelectorAll(".category-card").forEach(x => x.classList.toggle("active", x.dataset.category === selectedCategory));
    renderProducts();
    if (btn.classList.contains("category-card")) {
      document.getElementById("products").scrollIntoView({behavior:"smooth"});
    }
  });
});

searchInput.addEventListener("input", renderProducts);

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2100);
}

updateCounts();
renderProducts();
renderCart();
renderWishlist();
