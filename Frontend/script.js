const productGrid = document.getElementById('productGrid');
const statusText = document.getElementById('statusText');
const retryButton = document.getElementById('retryButton');
const emptyState = document.getElementById('emptyState');
const cartCount = document.getElementById('cartCount');
const toast = document.getElementById('toast');
const cartToggle = document.getElementById('cartToggle');
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartSubtotal = document.getElementById('cartSubtotal');
const checkoutButton = document.getElementById('checkoutButton');
const buyNowButton = document.getElementById('buyNowButton');
const filterButtons = document.querySelectorAll('.filter');

let allItems = [];
let activeCategory = 'All';
let cart = [];
let toastTimer;

const moneyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

const setStatus = (message, isError = false) => {
  statusText.textContent = message;
  statusText.style.color = isError ? '#fecaca' : '#cbd5e1';
};

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 1800);
};

const getCartCount = () => cart.reduce((total, item) => total + item.quantity, 0);

const getCartSubtotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

const updateCartBadge = () => {
  cartCount.textContent = String(getCartCount());
  cartSubtotal.textContent = moneyFormatter.format(getCartSubtotal());
};

const openCart = () => {
  cartDrawer.classList.add('open');
  cartBackdrop.classList.remove('hidden');
  cartDrawer.setAttribute('aria-hidden', 'false');
  cartBackdrop.setAttribute('aria-hidden', 'false');
};

const closeCart = () => {
  cartDrawer.classList.remove('open');
  cartBackdrop.classList.add('hidden');
  cartDrawer.setAttribute('aria-hidden', 'true');
  cartBackdrop.setAttribute('aria-hidden', 'true');
};

const renderCart = () => {
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty. Add sports items to see them here.</p>';
    updateCartBadge();
    return;
  }

  cart.forEach((item) => {
    const row = document.createElement('article');
    row.className = 'cart-item';

    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h3>${item.name}</h3>
        <p>${item.category} • ${moneyFormatter.format(item.price)}</p>
        <div class="cart-item-meta">
          <div class="qty-controls" aria-label="Quantity controls">
            <button type="button" class="qty-minus" aria-label="Decrease quantity">−</button>
            <span>${item.quantity}</span>
            <button type="button" class="qty-plus" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" class="remove-item">Remove</button>
        </div>
      </div>
    `;

    row.querySelector('.qty-minus').addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart = cart.filter((cartItem) => cartItem._id !== item._id);
      }
      renderCart();
      updateCartBadge();
    });

    row.querySelector('.qty-plus').addEventListener('click', () => {
      item.quantity += 1;
      renderCart();
      updateCartBadge();
    });

    row.querySelector('.remove-item').addEventListener('click', () => {
      cart = cart.filter((cartItem) => cartItem._id !== item._id);
      renderCart();
      updateCartBadge();
      showToast(`${item.name} removed from cart`);
    });

    cartItems.appendChild(row);
  });

  updateCartBadge();
};

const addToCart = (item) => {
  const existing = cart.find((cartItem) => cartItem._id === item._id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      _id: item._id,
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  }

  renderCart();
  openCart();
  showToast(`${item.name} added to cart`);
};

const buyNow = () => {
  if (cart.length === 0) {
    showToast('Your cart is empty');
    return;
  }

  const total = moneyFormatter.format(getCartSubtotal());
  const itemCount = getCartCount();
  cart = [];
  renderCart();
  closeCart();
  window.showCompletionModal({
    eyebrow: 'Payment complete', title: 'Your order is confirmed',
    message: 'Thanks for shopping with SPORTS. We will prepare your items shortly.',
    details: [{ label: 'Items', value: `${itemCount} item${itemCount === 1 ? '' : 's'}` }, { label: 'Total', value: total }],
    actionLabel: 'Continue shopping'
  });
};

const renderProducts = () => {
  const filteredItems =
    activeCategory === 'All'
      ? allItems
      : allItems.filter((item) => item.category === activeCategory);

  productGrid.innerHTML = '';
  emptyState.classList.toggle('hidden', filteredItems.length !== 0);

  if (filteredItems.length === 0) {
    setStatus('No products available for the selected category.');
    return;
  }

  setStatus(`Showing ${filteredItems.length} product${filteredItems.length === 1 ? '' : 's'}.`);

  filteredItems.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card';

    card.innerHTML = `
      <img class="card-image" src="${item.image}" alt="${item.name}" loading="lazy" />
      <div class="card-body">
        <div class="card-meta">
          <span class="category-tag">${item.category}</span>
          <span class="stock-tag">Stock: ${item.stock}</span>
        </div>
        <h2>${item.name}</h2>
        <p class="price">${moneyFormatter.format(item.price)}</p>
        <button class="add-to-cart" type="button" ${item.stock <= 0 ? 'disabled' : ''}>
          ${item.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    `;

    const button = card.querySelector('.add-to-cart');
    button.addEventListener('click', () => {
      addToCart(item);
    });

    productGrid.appendChild(card);
  });
};

const loadItems = async () => {
  retryButton.classList.add('hidden');
  setStatus('Loading products...');

  try {
    const response = await fetch('/items');

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    allItems = await response.json();
    renderProducts();
  } catch (error) {
    productGrid.innerHTML = '';
    emptyState.classList.add('hidden');
    setStatus('Unable to load products. Check the backend connection and try again.', true);
    retryButton.classList.remove('hidden');
    showToast('Failed to load items');
    console.error(error);
  }
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    activeCategory = button.dataset.category;
    renderProducts();
  });
});

cartToggle?.addEventListener('click', () => {
  openCart();
});

cartClose.addEventListener('click', closeCart);
cartBackdrop.addEventListener('click', closeCart);
checkoutButton?.addEventListener('click', buyNow);
buyNowButton?.addEventListener('click', buyNow);

retryButton.addEventListener('click', loadItems);
loadItems();
renderCart();
