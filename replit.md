# TradeArk Export Website

## Overview
This project is a premium export business website for TradeArk, specializing in Indian Makhana and sustainable cork décor products. It targets international HoReCa markets with a focus on showcasing diverse Indian exports. The site aims to connect Indian excellence with global markets, emphasizing sustainable sourcing, quality control, and flexible custom sourcing solutions. Key capabilities include multilingual support, a professional image gallery, and a direct communication channel for inquiries.

## User Preferences
Preferred communication style: Simple, everyday language.

## Recent Changes (July 2025)

**Navigation Enhancement - July 31, 2025:**
- **Logo Navigation**: Made TradeArk logo clickable for homepage navigation across all pages, replacing standalone "Home" button
- **Home Button Removal**: Removed "Home" menu item from both desktop and mobile navigation menus site-wide
- **Custom Sourcing Menu Addition**: Added "Custom Sourcing" as third option in Products dropdown menu across all pages
- **Cross-Page Navigation Update**: Updated navigation structure in both makhana.html and horeca.html product pages
- **Mobile Navigation**: Added Custom Sourcing to mobile menu submenu for consistent experience across devices
- **Multilingual Support**: Added complete translations for "Custom Sourcing" menu item across all 6 languages (English, Hindi, Spanish, French, German, Arabic)
- **Anchor Link Integration**: Added proper ID anchor to Custom Sourcing section for smooth navigation scrolling
- **Site-Wide Consistency**: Ensured navigation structure remains consistent across homepage and both product pages

**Contact Information Update - July 31, 2025:**
- **Phone Number Change**: Updated all contact phone numbers from "91661 36118" to "8797102793" across all pages
- **WhatsApp Links**: Updated all WhatsApp communication links with new phone number
- **Telephone Links**: Updated all clickable phone number links with proper formatting (+91 8797102793)
- **Cross-Platform Consistency**: Applied phone number changes to homepage, makhana.html, and horeca.html pages

**Additional Contact Number Addition - August 6, 2025:**
- **Second Phone Number**: Added +91 9001600569 as a second contact number in the "Get In Touch" section
- **Multiple Contact Options**: Both numbers (+91 8797102793 and +91 9001600569) now display as clickable phone links
- **Contact Accessibility**: Visitors can now choose between two contact numbers for inquiries

**Gallery Removal - August 17, 2025:**
- **Makhana Gallery Removal**: Completely removed the "Makhana Gallery" image slider from the Makhana product page
- **Cork HoReCa Gallery Removal**: Completely removed the "Cork HoReCa Gallery" image slider from the HoReCa product page
- **Homepage Gallery Update**: Removed "Networking on the Expo Floor" image (third slide) from homepage "Our Gallery" section
- **Navigation Update**: Updated slideshow navigation dots from 10 to 9 dots to match current gallery count
- **Page Optimization**: Streamlined both product page layouts by eliminating redundant image galleries
- **Content Focus**: Enhanced focus on product information, benefits, and use cases without gallery distractions
- **Consistent Experience**: Both product pages now have clean, focused layouts without slideshow interruptions

**Cork Product Gallery Addition - July 31, 2025:**
- **Three New Cork Images**: Added "Cork Tissue Holder", "Cork HoReCa Catalogue", and "Cork Coaster" images to homepage gallery
- **Gallery Expansion**: Expanded homepage gallery from 7 to 10 slides with new sustainable cork products
- **Navigation Update**: Updated slideshow navigation dots from 7 to 10 dots for complete gallery control
- **Multilingual Content**: Added complete translations for new cork gallery items across all 6 languages
- **Product Categories**: Added Cork Cutlery & Napkin Organizer, Sustainable Cork HoReCa Collection, and Round Cork Coaster Set
- **Detailed Descriptions**: Added comprehensive product descriptions highlighting antimicrobial properties, sustainability, and functionality
- **Lightbox Integration**: Updated lightbox functionality for new cork product images with proper titles and descriptions

## System Architecture
This is a client-side static website with a multi-page HTML structure.

### UI/UX Decisions
- Modern responsive design with parallax effects and smooth scrolling.
- Uses a color palette of cream/off-white for primary backgrounds, deep brown for headings, and saffron gold as an accent.
- Professional image galleries feature auto-advancing slides with interactive navigation, split-screen layouts for product details, and responsive design.
- Implements professional 404 error pages consistent with brand aesthetics.
- Optimized for all device sizes with adaptive typography, spacing, and touch-friendly elements.
- Clean hamburger menu for mobile navigation with smooth animations.
- Integration of TradeArk logo across all pages and headers.

### Technical Implementations
- **Frontend**: Multi-page HTML structure (`index.html`, `makhana.html`, `horeca.html`) with shared CSS and JavaScript.
- **CSS Styling**: Uses modern CSS features like Grid/Flexbox for layout, linear gradients, box shadows, border radius, and backdrop filters for visual effects.
- **Image Optimization**: All images converted to WebP format for improved performance and reduced file sizes.
- **Multilingual Support**: Comprehensive translation system supporting English, Hindi, Spanish, French, German, and Arabic, including dynamic content translation.
- **Form Handling**: Integration with Web3Forms for contact forms, download requests, and newsletter subscriptions, including subject categorization and enhanced error handling.
- **Contact Features**: Clickable email and phone links, fixed WhatsApp floating button for direct communication.
- **SEO**: Meta titles, descriptions, and alt texts are optimized for search engines.

### Feature Specifications
- **Product Showcase**: Dedicated pages for Makhana and Cork HoReCa with detailed specifications, benefits, and branding options.
- **Dynamic Content**: Image galleries with product titles, descriptions, and lightbox functionality.
- **Custom Sourcing**: Section highlighting capabilities for sourcing products beyond the standard catalog.
- **Social Media Integration**: Links to Instagram and other social media platforms.

### System Design Choices
- **Static Site**: No backend database or server-side logic required.
- **Mobile-First Design**: Layouts built with a mobile-first approach, adapting to larger screens.
- **Accessibility**: Focus on keyboard navigation, ARIA labels, and high contrast ratios.

## External Dependencies
- **Web3Forms**: Used for handling all website form submissions (contact, download, newsletter).
- **Google Maps**: Embedded for displaying TradeArk's business location.