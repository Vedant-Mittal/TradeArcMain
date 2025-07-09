# TradeArk - HTML/CSS/JavaScript Version

This is a complete HTML/CSS/JavaScript version of the TradeArk website, converted from the original React application. The website showcases premium Indian Fox Nut exports and sustainable cork HoReCa tabletop décor.

## Features

- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Elements**: Testimonials carousel, smooth scrolling, form handling
- **Performance Optimized**: Lazy loading, debounced scroll events, efficient animations
- **Accessibility**: Keyboard navigation support, proper ARIA attributes
- **Brand Consistency**: Matches the original React version's design system

## File Structure

```
tradeark-html/
├── index.html                    # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css            # Main stylesheet
│   ├── js/
│   │   └── main.js              # JavaScript functionality
│   └── images/
│       └── placeholder-generator.html  # For generating placeholder images
├── README.md                    # This file
└── (additional assets as needed)
```

## Sections

1. **Hero Section**: Parallax background with brand introduction
2. **About Section**: Company story and core pillars
3. **Products Section**: Fox Nut and Cork décor showcase
4. **Quality Section**: Certifications and quality metrics
5. **Why Us Section**: Key advantages and call-to-action
6. **Testimonials Section**: Customer reviews carousel
7. **Contact Section**: Contact form and company information
8. **Footer**: Links, newsletter signup, and social media

## JavaScript Features

### Core Functionality
- **Navigation**: Smooth scrolling, mobile menu toggle
- **Parallax Effect**: Background movement on scroll
- **Animations**: Intersection Observer for scroll-triggered animations
- **Form Handling**: Contact form and newsletter subscription
- **Testimonials Carousel**: Auto-rotating with manual controls
- **Notifications**: Success/error message system

### Interactive Elements
- Smooth scrolling to sections
- Number animation for statistics
- Hover effects on cards and buttons
- Keyboard navigation support
- Lazy loading for images
- Mobile-responsive navigation

## Styling Features

### Design System
- **Colors**: Saffron gold (#F4A300), deep earth brown (#5B3A29), cream (#FFF8EC)
- **Typography**: Montserrat, Lora, Poppins, and Inter fonts
- **Animations**: Fade-in, scale-in, bounce, and parallax effects
- **Responsive**: Mobile-first with breakpoints at 768px

### CSS Architecture
- CSS custom properties for consistent theming
- Modular component styling
- Responsive grid layouts
- Smooth transitions and animations
- Accessibility-friendly focus states

## How to Use

1. **Open the Website**: Simply open `index.html` in any modern web browser
2. **Development**: Use a local server for best performance:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
3. **Customization**: Edit the CSS variables in `style.css` to change colors and styling
4. **Content**: Update the HTML content in `index.html` as needed

## Form Handling

The contact form and newsletter subscription currently log data to the console. To integrate with a backend:

1. **Contact Form**: Update the `handleContactForm` function in `main.js`
2. **Newsletter**: Update the `handleNewsletterForm` function in `main.js`
3. **API Integration**: Replace the setTimeout simulation with actual API calls

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Features

- Intersection Observer for efficient scroll animations
- Debounced scroll events
- Lazy loading for images
- Optimized CSS animations
- Efficient DOM manipulation

## Customization Guide

### Colors
Edit CSS custom properties in `style.css`:
```css
:root {
    --deep-earth-brown: #5B3A29;
    --saffron-gold: #F4A300;
    --cream: #FFF8EC;
    /* Add more colors as needed */
}
```

### Fonts
The website uses Google Fonts. To change fonts, update the import in `index.html` and CSS font-family declarations.

### Content
Update the HTML content in `index.html` sections:
- Hero section: Update title, subtitle, and description
- About section: Modify company story and pillars
- Products section: Update product information
- Testimonials: Replace customer reviews
- Contact section: Update contact information

### Animations
Modify animation timings and effects in `style.css`:
```css
@keyframes fadeIn {
    /* Custom animation keyframes */
}
```

## Integration with Backend

To connect with a backend service:

1. **Forms**: Replace console.log with fetch API calls
2. **Data**: Load dynamic content from API endpoints
3. **Images**: Replace placeholder colors with actual product images
4. **Analytics**: Add tracking code as needed

## Deployment

1. **Static Hosting**: Upload files to any static hosting service
2. **CDN**: Consider using a CDN for better performance
3. **HTTPS**: Ensure SSL certificate for secure connections
4. **Compression**: Enable gzip compression on the server

## License

This project matches the original React version's design and functionality, converted to vanilla HTML/CSS/JavaScript for broader compatibility and easier deployment.