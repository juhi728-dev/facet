# facet

A fast, lightweight product search and filter UI built with vanilla JavaScript, HTML, and CSS. No frameworks, no build step — just open `index.html` in a browser.

![Dark mode product grid with search, category, price, and rating filters](https://placehold.co/1200x600/0f0f11/7c6ee8?text=facet)

## Features

- **Instant search** — debounced input filters across product name and description
- **Category filter** — electronics, gear, clothing, home, fitness
- **Price range slider** — dynamically set a max price ceiling
- **Rating filter** — filter by minimum star rating
- **Sort** — by price (asc/desc), name (A–Z / Z–A), or top rated
- **Empty state** — clear prompt with a one-click filter reset
- **Responsive** — sidebar collapses to a 2-column filter grid on mobile
- **Dark mode** — designed dark-first with CSS custom properties throughout

## Tech

| Layer  | Choice |
|--------|--------|
| Logic  | Vanilla JavaScript (ES6+) |
| Styles | Plain CSS with custom properties |
| Markup | Semantic HTML5 |
| Fonts  | Inter via Google Fonts |

No bundler, no dependencies, no node_modules.

## Project structure

```
facet/
├── index.html   # markup and layout
├── style.css    # dark theme, grid, components
└── app.js       # data, state, filtering, rendering
```

## How it works

All filter state lives in a single object:

```js
const state = {
  search: '',
  category: 'all',
  maxPrice: 1500,
  minRating: 0,
  sort: 'default',
};
```

Every interaction updates state and calls `render()`, which runs `filterAndSort()` and rebuilds the grid. Search input is debounced at 220ms to avoid unnecessary DOM updates on every keystroke.

## Running locally

```bash
git clone https://github.com/juhi728-dev/facet.git
cd facet
open index.html   # macOS
# or just drag index.html into your browser
```

No install step needed.

## Dataset

27 products across 5 categories with realistic names, descriptions, prices, and ratings. Easily swappable with a real API — just replace the `products` array in `app.js` with a fetch call and call `render()` once the data resolves.

## License

MIT
