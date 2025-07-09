# TradeArk Export Website

## Overview

This is a premium export business website for TradeArk, showcasing Indian Makhana exports and sustainable cork décor products. The project features modern responsive design, parallax effects, smooth scrolling, and interactive elements targeting international HoReCa markets.

## Recent Changes (July 2025)

**Complete Product Pages Redesign:**
- Redesigned both Fox Nut (Makhana) and Cork HoReCa product pages following B2B design best practices
- **Color Palette Fixed**: Changed from overwhelming yellow/saffron to cream/off-white primary background with deep brown headings and saffron only as accent
- **Visual Hierarchy Improved**: Better spacing, consistent card structure, and cleaner layout
- **Hero Sections**: Replaced flat yellow backgrounds with image overlays and dark gradients
- **Content Structure**: Organized into logical sections with better flow and readability
- **CTAs Optimized**: Reduced repetitive CTAs to main and secondary actions per section
- **Responsive Design**: Consistent mobile-first approach across both pages

**Latest Updates - July 9, 2025:**
- **Brand Terminology**: Changed "Fox Nut" to "Makhana" throughout the website for better brand positioning
- **Hero Background**: Updated with "Cargo Container Lot" image for professional export business look
- **Product Images**: Added authentic TradeArk images - Makhana Bowl Image for home page product section, Leaves Growing on Cork Pot for cork décor section
- **Product Pages Enhanced**: Added Makhana in Bowl as hero image for Makhana page, Makhana Hand Image above About Makhana section, Restaurant Image as HoReCa hero, Brown Corks Wine Glass above Why Cork section
- **SEO Improvements**: Updated all meta titles and descriptions to use "Makhana" instead of "Fox Nut", added descriptive alt text for all images
- **UI Fixes**: Fixed pillar alignment in Our Mission section, changed testimonial star colors to yellow (#FFD700)
- **Content Cleanup**: Removed Newsletter section from footer and cleaned up related CSS styling

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

This is a client-side static website with multiple pages for product details. The architecture consists of:

- **Frontend**: Multi-page HTML structure with shared CSS and JavaScript
- **Main Page**: index.html serves as the primary landing page
- **Product Pages**: Dedicated detail pages for Makhana and Cork HoReCa products
- **Deployment**: Static file hosting (can be served from any web server)
- **No Database**: No data persistence required
- **No API**: No server-side functionality

## Key Components

### HTML Structure
- `index.html` serves as the main landing page
- `products/makhana.html` - Detailed Makhana product page
- `products/horeca.html` - Detailed Cork HoReCa décor product page
- Semantic HTML5 structure with proper meta tags
- Responsive viewport configuration
- SEO-friendly with specific meta descriptions for each page

### CSS Styling
- Embedded CSS within the HTML file
- Modern CSS features including:
  - CSS Grid/Flexbox for layout
  - Linear gradients for background
  - Box shadows and border radius for visual effects
  - Backdrop filters for modern glass effect
  - Responsive design principles

### Design Features
- Centered layout using flexbox
- Gradient background (purple to blue)
- Semi-transparent card design with glass effect
- Responsive typography
- Mobile-friendly design with viewport meta tag

## Data Flow

Since this is a static website, there is minimal data flow:

1. User requests the main website or product pages
2. Server returns the appropriate HTML file
3. Browser renders the page with shared CSS and JavaScript
4. Navigation between pages via standard HTML links
5. Shared resources (CSS/JS) are cached for performance

## External Dependencies

- **None**: The project has no external dependencies
- Uses only standard HTML5 and CSS3 features
- No JavaScript frameworks or libraries
- No external fonts or resources (uses system Arial font)

## Deployment Strategy

The deployment strategy is straightforward for static hosting:

1. **Static File Hosting**: Can be deployed to any static hosting service
2. **Web Server**: Any HTTP server can serve the single HTML file
3. **CDN Compatible**: Can be easily distributed via CDN
4. **No Build Process**: No compilation or build steps required

### Deployment Options
- GitHub Pages
- Netlify
- Vercel
- AWS S3 Static Website Hosting
- Any traditional web server

### Requirements
- No server-side processing required
- No database setup needed
- Simply serve the HTML file from any web-accessible directory