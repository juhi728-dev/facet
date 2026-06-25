const products = [
  { id: 1,  name: 'Sony WH-1000XM5',       category: 'electronics', price: 349, rating: 4.8, image: '🎧', desc: 'Industry-leading noise cancellation, 30hr battery.' },
  { id: 2,  name: 'Keychron Q3 Keyboard',   category: 'electronics', price: 179, rating: 4.6, image: '⌨️', desc: 'Hot-swap mechanical keyboard, aluminum frame.' },
  { id: 3,  name: 'LG 27" 4K Monitor',      category: 'electronics', price: 449, rating: 4.5, image: '🖥️', desc: 'IPS panel, USB-C, factory calibrated.' },
  { id: 4,  name: 'Anker 737 Charger',      category: 'electronics', price: 89,  rating: 4.7, image: '🔌', desc: '120W GaN charger, charges 3 devices at once.' },
  { id: 5,  name: 'Logitech MX Master 3S',  category: 'electronics', price: 99,  rating: 4.8, image: '🖱️', desc: 'Precision scroll wheel, silent clicks, 70-day battery.' },
  { id: 6,  name: 'iPad Pro M4 11"',        category: 'electronics', price: 999, rating: 4.9, image: '📱', desc: 'M4 chip, Ultra Retina XDR, Apple Pencil Pro support.' },
  { id: 7,  name: 'Raspberry Pi 5',         category: 'electronics', price: 80,  rating: 4.6, image: '💾', desc: '4GB RAM, 2.4GHz quad-core, dual 4K display output.' },

  { id: 8,  name: 'Peak Design Backpack 20L', category: 'gear',      price: 299, rating: 4.7, image: '🎒', desc: 'Weather-resistant, MagLatch, lifetime guarantee.' },
  { id: 9,  name: 'Leatherman Wave+',       category: 'gear',        price: 109, rating: 4.8, image: '🔧', desc: '18 tools, stainless steel, 25yr warranty.' },
  { id: 10, name: 'Nalgene 32oz Bottle',    category: 'gear',        price: 15,  rating: 4.6, image: '🍶', desc: 'BPA-free Tritan, dishwasher safe, wide mouth.' },
  { id: 11, name: 'Black Diamond Headlamp', category: 'gear',        price: 49,  rating: 4.5, image: '🔦', desc: '350 lumens, IPX8 waterproof, red night-vision mode.' },
  { id: 12, name: 'Osprey Ultralight Kit',  category: 'gear',        price: 55,  rating: 4.4, image: '🏕️', desc: 'Packing cubes, stuff sacks, rain cover included.' },
  { id: 13, name: 'Gerber Pocket Knife',    category: 'gear',        price: 39,  rating: 4.3, image: '🔪', desc: 'Assisted open, fine edge, belt clip.' },

  { id: 14, name: 'Levi\'s 511 Slim Jeans', category: 'clothing',    price: 69,  rating: 4.4, image: '👖', desc: 'Slim fit, stretch denim, classic 5-pocket style.' },
  { id: 15, name: 'Arc\'teryx Atom Hoody',  category: 'clothing',    price: 259, rating: 4.8, image: '🧥', desc: 'Coreloft insulation, moisture resistant, packable.' },
  { id: 16, name: 'Merino Wool T-Shirt',    category: 'clothing',    price: 79,  rating: 4.5, image: '👕', desc: '18.5 micron merino, odor resistant, travel-ready.' },
  { id: 17, name: 'Allbirds Runners',       category: 'clothing',    price: 145, rating: 4.3, image: '👟', desc: 'Merino wool upper, sugarcane sole, machine washable.' },
  { id: 18, name: 'Patagonia Baggies',      category: 'clothing',    price: 55,  rating: 4.6, image: '🩳', desc: '2.5" inseam, recycled nylon, doubles as swim shorts.' },
  { id: 19, name: 'Darn Tough Hiking Socks',category: 'clothing',    price: 24,  rating: 4.9, image: '🧦', desc: 'Merino wool, unconditional lifetime guarantee.' },

  { id: 20, name: 'Aeropress Coffee Maker', category: 'home',        price: 39,  rating: 4.8, image: '☕', desc: 'Smooth espresso-style coffee in under 2 minutes.' },
  { id: 21, name: 'Dyson V12 Vacuum',       category: 'home',        price: 649, rating: 4.6, image: '🌀', desc: 'Laser dust detection, 60min runtime, auto-suction.' },
  { id: 22, name: 'Ember Mug 2',            category: 'home',        price: 149, rating: 4.5, image: '🫖', desc: 'App-controlled temperature, 80min battery, 14oz.' },
  { id: 23, name: 'Philips Hue Starter Kit',category: 'home',        price: 199, rating: 4.4, image: '💡', desc: '3 color bulbs + bridge, 16M colors, voice control.' },

  { id: 24, name: 'Garmin Forerunner 265',  category: 'fitness',     price: 449, rating: 4.7, image: '⌚', desc: 'AMOLED display, training readiness, 13-day battery.' },
  { id: 25, name: 'Theragun Mini',          category: 'fitness',     price: 199, rating: 4.5, image: '💪', desc: 'Portable percussive therapy, 3 speeds, 150min battery.' },
  { id: 26, name: 'Resistance Band Set',    category: 'fitness',     price: 29,  rating: 4.4, image: '🏋️', desc: '5 resistance levels, fabric bands, carry bag included.' },
  { id: 27, name: 'Hydrow Rowing Machine',  category: 'fitness',     price: 1495,rating: 4.6, image: '🚣', desc: 'Live and on-demand classes, 22" touchscreen, smooth drag.' },
];

// --- state ---
const state = {
  search: '',
  category: 'all',
  maxPrice: 1500,
  minRating: 0,
  sort: 'default',
};

// derived max price from data so the slider always makes sense
const DATA_MAX_PRICE = Math.max(...products.map(p => p.price));

let debounceTimer = null;

function filterAndSort() {
  let result = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(state.search) ||
                          p.desc.toLowerCase().includes(state.search);
    const matchesCategory = state.category === 'all' || p.category === state.category;
    const matchesPrice    = p.price <= state.maxPrice;
    const matchesRating   = p.rating >= state.minRating;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  if (state.sort === 'price-asc')  result.sort((a, b) => a.price - b.price);
  if (state.sort === 'price-desc') result.sort((a, b) => b.price - a.price);
  if (state.sort === 'name-asc')   result.sort((a, b) => a.name.localeCompare(b.name));
  if (state.sort === 'name-desc')  result.sort((a, b) => b.name.localeCompare(a.name));
  if (state.sort === 'rating')     result.sort((a, b) => b.rating - a.rating);

  return result;
}

function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function renderCards(items) {
  const grid = document.getElementById('product-grid');
  const count = document.getElementById('result-count');

  count.textContent = `${items.length} product${items.length !== 1 ? 's' : ''}`;

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <span>🔍</span>
        <p>No products match your filters.</p>
        <button onclick="resetFilters()">Clear filters</button>
      </div>`;
    return;
  }

  // build all cards as a string — faster than appending nodes one by one
  grid.innerHTML = items.map(p => `
    <article class="card" data-id="${p.id}">
      <div class="card-image">${p.image}</div>
      <div class="card-body">
        <span class="category-tag">${p.category}</span>
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="card-footer">
          <div class="rating">
            <span class="stars">${renderStars(p.rating)}</span>
            <span class="rating-num">${p.rating}</span>
          </div>
          <span class="price">$${p.price.toLocaleString()}</span>
        </div>
      </div>
    </article>
  `).join('');
}

function render() {
  renderCards(filterAndSort());
  syncUI();
}

function syncUI() {
  // keep the displayed values in sync with state
  document.getElementById('price-display').textContent = `$${state.maxPrice.toLocaleString()}`;
  document.getElementById('price-range').value = state.maxPrice;
  document.getElementById('rating-display').textContent = state.minRating > 0
    ? `${state.minRating}+ ★`
    : 'Any';
}

function resetFilters() {
  state.search   = '';
  state.category = 'all';
  state.maxPrice = DATA_MAX_PRICE;
  state.minRating = 0;
  state.sort     = 'default';

  document.getElementById('search-input').value = '';
  document.getElementById('category-select').value = 'all';
  document.getElementById('sort-select').value = 'default';
  document.getElementById('rating-range').value = 0;

  render();
}

// --- event wiring ---
function init() {
  document.getElementById('price-range').max = DATA_MAX_PRICE;
  document.getElementById('price-range').value = DATA_MAX_PRICE;
  state.maxPrice = DATA_MAX_PRICE;

  document.getElementById('search-input').addEventListener('input', e => {
    // debounce so we're not filtering on every single keystroke
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      state.search = e.target.value.toLowerCase().trim();
      render();
    }, 220);
  });

  document.getElementById('category-select').addEventListener('change', e => {
    state.category = e.target.value;
    render();
  });

  document.getElementById('sort-select').addEventListener('change', e => {
    state.sort = e.target.value;
    render();
  });

  document.getElementById('price-range').addEventListener('input', e => {
    state.maxPrice = Number(e.target.value);
    render();
  });

  document.getElementById('rating-range').addEventListener('input', e => {
    state.minRating = Number(e.target.value);
    render();
  });

  render();
}

document.addEventListener('DOMContentLoaded', init);
