'use strict';

// ==========================================
// PRODUCTOS REALES (Productos.txt)
// ==========================================
const PRODUCTS = [
  {
    id: 1,
    name: 'Cable USB-C',
    price: 99,
    category: 'cables',
    emoji: '🔌',
    catLabel: 'Cables',
    desc: 'Compatible con la mayoría de dispositivos Android, laptops y más.',
    visual: 'cable',
    connector: 'USB-C',
  },
  {
    id: 2,
    name: 'Cable Lightning',
    price: 99,
    category: 'cables',
    emoji: '⚡',
    catLabel: 'Cables',
    desc: 'Para iPhone, iPad y AirPods. Conector Lightning original.',
    visual: 'cable',
    connector: 'Lightning',
  },
  {
    id: 3,
    name: 'Cubito USB-C',
    price: 99,
    category: 'cubitos',
    emoji: '🔋',
    catLabel: 'Cubitos',
    desc: 'Adaptador de pared compacto con salida USB-C.',
    visual: 'cubito',
    label: 'USB-C',
  },
  {
    id: 4,
    name: 'Cubito USB-B',
    price: 99,
    category: 'cubitos',
    emoji: '🔌',
    catLabel: 'Cubitos',
    desc: 'Adaptador de pared con salida USB tipo B clásico.',
    visual: 'cubito',
    label: 'USB-B',
  },
  {
    id: 5,
    name: 'Sticker individual',
    price: 5,
    category: 'stickers',
    emoji: '🎨',
    catLabel: 'Stickers',
    desc: 'Un sticker con diseño llamativo para personalizar lo que quieras.',
    visual: 'sticker-single',
    emojis: ['🍐'],
  },
  {
    id: 6,
    name: 'Pack de 5 stickers',
    price: 21,
    category: 'stickers',
    emoji: '🎨',
    catLabel: 'Stickers · Pack',
    desc: '5 stickers por $21. Ahorra $4 vs. comprar uno por uno.',
    visual: 'sticker-multi',
    badge: 'Pack x5',
    emojis: ['🍐', '⚡', '🌊'],
  },
  {
    id: 7,
    name: 'Pack de 10 stickers',
    price: 45,
    category: 'stickers',
    emoji: '🎨',
    catLabel: 'Stickers · Pack',
    desc: '10 stickers por $45. El mejor precio del catálogo ($4.50 c/u).',
    visual: 'sticker-multi',
    badge: 'Pack x10',
    emojis: ['🍐', '🌟', '🎮'],
  },
];

// ==========================================
// RENDER VISUAL
// ==========================================
function buildVisual(p) {
  if (p.visual === 'cable') {
    return `<div class="prod-visual pv-cable">
      <div class="cable-wrap">
        <div class="cable-head"></div>
        <div class="cable-wire"></div>
        <div class="cable-head ${p.connector === 'USB-C' ? 'usb-c' : ''}"></div>
      </div>
      <div class="cable-badge">${p.connector}</div>
    </div>`;
  }
  if (p.visual === 'cubito') {
    return `<div class="prod-visual pv-cubito">
      <div class="cubito-block">
        <span class="cubito-label">${p.label}</span>
        <div class="cubito-pin"></div>
      </div>
    </div>`;
  }
  if (p.visual === 'sticker-multi') {
    return `<div class="prod-visual pv-sticker-multi">
      <div class="sticker-fan">
        <div class="sf sf-1">${p.emojis[0] || '🍐'}</div>
        <div class="sf sf-2">${p.emojis[1] || '⚡'}</div>
        <div class="sf sf-3">${p.emojis[2] || '🌟'}</div>
      </div>
      ${p.badge ? `<div class="sticker-badge">${p.badge}</div>` : ''}
    </div>`;
  }
  if (p.visual === 'sticker-single') {
    return `<div class="prod-visual pv-sticker-single">
      <div class="single-sticker-wrap">
        <svg width="70" height="80" viewBox="0 0 32 36" fill="none">
          <path d="M16 2C16 2 8 2 5 8C2 14 3 20 3 20C3 20 1 26 5 30C9 34 16 34 16 34C16 34 23 34 27 30C31 26 29 20 29 20C29 20 30 14 27 8C24 2 16 2 16 2Z" fill="white"/>
          <ellipse cx="22" cy="4" rx="3" ry="4" fill="white" transform="rotate(20 22 4)"/>
          <ellipse cx="5" cy="16" rx="5" ry="5" fill="#27ae60"/>
          <ellipse cx="27" cy="16" rx="5" ry="5" fill="#27ae60"/>
        </svg>
      </div>
    </div>`;
  }
  return '';
}

// ==========================================
// RENDER CARD
// ==========================================
function buildCard(p, delay = 0) {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.style.animationDelay = `${delay * 70}ms`;
  div.dataset.cat = p.category;
  div.innerHTML = `
    <div class="card-media">${buildVisual(p)}</div>
    <div class="card-info">
      <span class="card-cat">${p.catLabel}</span>
      <h3 class="card-name">${p.name}</h3>
      <p class="card-desc">${p.desc}</p>
      <div class="card-footer">
        <span class="card-price">$${p.price}</span>
        <button class="add-cart-btn" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-emoji="${p.emoji}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Agregar
        </button>
      </div>
    </div>`;

  // Tilt
  div.addEventListener('mousemove', e => {
    const r = div.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 8;
    div.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-6px)`;
  });
  div.addEventListener('mouseleave', () => div.style.transform = '');
  return div;
}

// ==========================================
// SHOP RENDER
// ==========================================
const shopGrid = document.getElementById('shopGrid');

function renderShop(filter = 'all') {
  shopGrid.innerHTML = '';
  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
  list.forEach((p, i) => shopGrid.appendChild(buildCard(p, i)));
  attachCartListeners();
}

renderShop();

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderShop(btn.dataset.filter);
  });
});

// ==========================================
// NAV
// ==========================================
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20), { passive: true });
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.addEventListener('click', e => {
  const t = e.target.closest('[data-scroll]');
  if (!t) return;
  e.preventDefault();
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.getElementById(t.dataset.scroll)?.scrollIntoView({ behavior: 'smooth' });
});

// ==========================================
// SCROLL REVEAL
// ==========================================
const observer = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('revealed'); observer.unobserve(en.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-delay-1, .reveal-delay-2, .reveal-delay-3, .reveal-delay-4').forEach(el => observer.observe(el));

setTimeout(() => {
  document.querySelectorAll('.hero .reveal, .hero .reveal-delay-1, .hero .reveal-delay-2, .hero .reveal-delay-3, .hero .reveal-delay-4')
    .forEach(el => el.classList.add('revealed'));
}, 80);

// ==========================================
// TABS (Proyecto)
// ==========================================
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab)?.classList.add('active');
  });
});

// ==========================================
// CART
// ==========================================
let cart = [];
const cartBtn = document.getElementById('cartBtn');
const cartClose = document.getElementById('cartClose');
const cartOverlay = document.getElementById('cartOverlay');
const cartDrawer = document.getElementById('cartDrawer');
const cartCountEl = document.getElementById('cartCount');
const cartItemsEl = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const totalAmount = document.getElementById('totalAmount');
const toast = document.getElementById('toast');

const openCart = () => { cartDrawer.classList.add('open'); cartOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; };
const closeCart = () => { cartDrawer.classList.remove('open'); cartOverlay.classList.remove('open'); document.body.style.overflow = ''; };

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.getElementById('goShop')?.addEventListener('click', () => { closeCart(); setTimeout(() => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' }), 300); });

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  cartCountEl.textContent = count;
  cartCountEl.classList.toggle('visible', count > 0);
  totalAmount.textContent = `$${total.toLocaleString('es-MX')}`;

  const empty = cart.length === 0;
  cartEmpty.style.display = empty ? 'flex' : 'none';
  cartFooter.style.display = empty ? 'none' : 'block';

  cartItemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="ci-thumb">${item.emoji}</div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">$${(item.price * item.qty).toLocaleString('es-MX')}</div>
        <div class="ci-qty">
          <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
        </div>
      </div>
      <span class="ci-remove" data-remove="${item.id}">✕</span>`;
    cartItemsEl.appendChild(div);
  });

  cartItemsEl.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = +btn.dataset.id;
      const it = cart.find(i => i.id === id);
      if (!it) return;
      btn.dataset.action === 'inc' ? it.qty++ : it.qty--;
      if (it.qty <= 0) cart = cart.filter(i => i.id !== id);
      updateCartUI();
    });
  });
  cartItemsEl.querySelectorAll('.ci-remove').forEach(btn => {
    btn.addEventListener('click', () => { cart = cart.filter(i => i.id !== +btn.dataset.remove); updateCartUI(); });
  });
}

function addToCart(id, name, price, emoji) {
  const ex = cart.find(i => i.id === id);
  ex ? ex.qty++ : cart.push({ id, name, price: +price, qty: 1, emoji });
  updateCartUI();
  showToast(`✓ ${name} agregado al carrito`);
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

function attachCartListeners() {
  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      addToCart(+btn.dataset.id, btn.dataset.name, btn.dataset.price, btn.dataset.emoji);
      btn.classList.add('added');
      setTimeout(() => btn.classList.remove('added'), 450);
    });
  });
}

document.querySelector('.checkout-btn')?.addEventListener('click', () => {
  showToast('🎉 ¡Gracias! Nos contactaremos contigo pronto.');
  cart = [];
  updateCartUI();
  setTimeout(closeCart, 800);
});

// ==========================================
// PARALLAX
// ==========================================
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const o1 = document.querySelector('.orb-1');
  const o2 = document.querySelector('.orb-2');
  if (o1) o1.style.transform = `translateY(${y * 0.12}px)`;
  if (o2) o2.style.transform = `translateY(${-y * 0.08}px)`;
}, { passive: true });

updateCartUI();
console.log('🍐 Pear Technologies v2 listo');
