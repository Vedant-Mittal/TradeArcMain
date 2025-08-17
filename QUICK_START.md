# Quick Start Guide - TradeArk HTML Website

## Run the Website

### Option 1: Python Server (Recommended)
```bash
python -m http.server 5000
```
This will start a local server on http://localhost:5000.

### Option 2: Direct Browser Opening
Simply double-click on `index.html` to open it in your browser.

### Option 3: Other Local Servers
```bash
# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000

# Using Python (alternative)
python -m http.server 8000
```

## Features Overview

✅ **Responsive Design** - Works on all devices
✅ **Interactive Elements** - Smooth scrolling, animations, carousels
✅ **Contact Forms** - Functional contact and newsletter forms
✅ **Professional Design** - Matches original React version
✅ **Performance Optimized** - Fast loading and smooth interactions
✅ **Accessibility** - Keyboard navigation and screen reader friendly

## File Structure

```
tradeark-html/
├── index.html           # Main website file
├── products/            # Product pages
│   ├── makhana.html    # Makhana product page
│   └── horeca.html     # HoReCa cork product page
├── assets/
│   ├── css/style.css   # All styling
│   ├── js/main.js      # All functionality
│   └── images/         # Product images
├── Downloadables/       # PDF brochures
└── README.md           # Detailed documentation
```

## Key Differences from React Version

- **No Build Process**: Direct HTML/CSS/JS files
- **Vanilla JavaScript**: No React dependencies
- **Static Files**: Easy to deploy anywhere
- **Form Handling**: Integrated with Web3Forms for real form submissions
- **Testimonials**: Manual carousel instead of React component

## Next Steps

1. **Test the website** by running it locally
2. **Customize content** in `index.html`
3. **Modify styling** in `assets/css/style.css`
4. **Add backend integration** for forms in `assets/js/main.js`
5. **Deploy** to any static hosting service

## Need Help?

Check the full `README.md` for detailed documentation on customization, deployment, and integration options.