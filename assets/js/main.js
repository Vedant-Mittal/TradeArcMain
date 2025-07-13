// TradeArk - Main JavaScript File

// Global Variables
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.dot');

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeParallax();
    initializeForms();
    initializeTestimonials();
    initializeAnimations();
    initializeScrollIndicator();
    initializeLanguageManager();
    initializeGallery();

});

// Language Manager Initialization
function initializeLanguageManager() {
    if (typeof LanguageManager !== 'undefined') {
        window.languageManager = new LanguageManager();
    }
}

// Navigation Functions
function initializeNavigation() {
    initializeMobileMenu();
    initializeDesktopDropdowns();
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.nav');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.boxShadow = 'none';
            }
        }
    });
}

// Desktop dropdown functionality
function initializeDesktopDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (dropdownToggle && dropdownMenu) {
            // Show dropdown on hover for desktop
            dropdown.addEventListener('mouseenter', function() {
                if (window.innerWidth > 1023) {
                    dropdownMenu.style.display = 'block';
                }
            });
            
            dropdown.addEventListener('mouseleave', function() {
                if (window.innerWidth > 1023) {
                    dropdownMenu.style.display = 'none';
                }
            });
        }
    });
}



// Toggle mobile dropdown
function toggleMobileDropdown(dropdown) {
    const isActive = dropdown.classList.contains('active');
    
    // Close all other dropdowns
    document.querySelectorAll('.nav-dropdown').forEach(d => {
        if (d !== dropdown) {
            d.classList.remove('active');
        }
    });
    
    // Toggle current dropdown
    if (isActive) {
        dropdown.classList.remove('active');
    } else {
        dropdown.classList.add('active');
    }
}

// Mobile menu helper functions (correct implementation is below with initializeMobileMenu)

// Smooth Scrolling Function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Initialize Scroll Indicator
function initializeScrollIndicator() {
    const scrollIndicator = document.getElementById('scroll-explore');
    
    if (scrollIndicator) {
        // Add click event listener as backup
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('about');
        });
        
        // Add keyboard accessibility
        scrollIndicator.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToSection('about');
            }
        });
        
        // Add focus styles for accessibility
        scrollIndicator.setAttribute('tabindex', '0');
        scrollIndicator.setAttribute('role', 'button');
        scrollIndicator.setAttribute('aria-label', 'Scroll to About section');
    }
}

// Enhanced Parallax Effect
function initializeParallax() {
    const parallaxBg = document.querySelector('.hero-bg');
    
    if (parallaxBg) {
        // Throttle scroll events for better performance
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3; // Changed to positive for downward movement
            const scale = 1 + (scrolled * 0.0001);
            parallaxBg.style.transform = `translateY(${rate}px) scale(${scale})`;
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
}

// Scroll Effects and Animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animate-fade-in')) {
                // Reduced delay for contact section
                const delay = entry.target.closest('.contact') ? 50 : 200;
                setTimeout(() => {
                    entry.target.classList.add('animate-fade-in');
                }, delay);
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll(
        '.section-header, .product-card, .why-us-card, .pillar, .cert-item, .quality-stats, .testimonial-card'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Form Handling
function initializeForms() {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const productInterestSelect = document.getElementById('productInterest');
    const customSourcingField = document.getElementById('customSourcingField');
    
    // Contact Form - Handle Web3Forms submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }
    
    // Newsletter Form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterForm(this);
        });
    }
    
    // Product Interest Dropdown - Show/Hide Custom Sourcing Field
    if (productInterestSelect && customSourcingField) {
        productInterestSelect.addEventListener('change', function() {
            const selectedValue = this.value;
            const customSourcingInput = document.getElementById('customSourcingDetails');
            
            if (selectedValue === 'custom-sourcing') {
                // Show the custom sourcing field with smooth animation
                customSourcingField.style.display = 'block';
                customSourcingField.style.opacity = '0';
                customSourcingField.style.transform = 'translateY(-10px)';
                
                // Animate in
                setTimeout(() => {
                    customSourcingField.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    customSourcingField.style.opacity = '1';
                    customSourcingField.style.transform = 'translateY(0)';
                }, 10);
                
                // Focus on the input field
                setTimeout(() => {
                    if (customSourcingInput) {
                        customSourcingInput.focus();
                    }
                }, 300);
            } else {
                // Hide the custom sourcing field with smooth animation
                customSourcingField.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                customSourcingField.style.opacity = '0';
                customSourcingField.style.transform = 'translateY(-10px)';
                
                // Clear the input value
                if (customSourcingInput) {
                    customSourcingInput.value = '';
                }
                
                // Hide completely after animation
                setTimeout(() => {
                    customSourcingField.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Handle Contact Form Submission
function handleContactForm(form) {
    const submitButton = form.querySelector('.form-submit');
    const originalText = submitButton.textContent;
    
    // Show loading state with spinner
    submitButton.innerHTML = '<span class="btn-spinner"></span> Sending...';
    submitButton.disabled = true;
    submitButton.classList.add('btn-loading');
    
    // Convert form data to JSON as required by Web3Forms
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    // Submit to Web3Forms API with proper headers and timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json,
        signal: controller.signal
    })
    .then(async (response) => {
        let responseData = await response.json();
        if (response.status == 200) {
            // Success - reset form and show success message
            form.reset();
            // Also hide the custom sourcing field after form reset
            const customSourcingField = document.getElementById('customSourcingField');
            if (customSourcingField) {
                customSourcingField.style.display = 'none';
            }
            showNotification('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
        } else {
            // Error - show error message
            // Handle error response
            showNotification(responseData.message || 'Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        }
    })
    .catch(error => {
        clearTimeout(timeoutId);
        // Handle network error
        if (error.name === 'AbortError') {
            showNotification('Request timed out. Please check your connection and try again.', 'error');
        } else {
            showNotification('Network error: Unable to send message. Please check your connection and try again.', 'error');
        }
    })
    .finally(() => {
        clearTimeout(timeoutId);
        // Reset button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('btn-loading');
    });
}

// Handle Newsletter Form Submission
function handleNewsletterForm(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Subscribing...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        const email = formData.get('email');
        
        // Newsletter subscription processed
        
        // Show success message
        showNotification('Successfully subscribed to our newsletter!', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1000);
}

// Testimonials Carousel
function initializeTestimonials() {
    showTestimonial(0);
    
    // Auto-rotate testimonials
    setInterval(() => {
        changeTestimonial(1);
    }, 5000);
}

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
    }
    
    // Update active dot
    if (testimonialDots[index]) {
        testimonialDots[index].classList.add('active');
    }
    
    currentTestimonial = index;
}

function changeTestimonial(direction) {
    let newIndex = currentTestimonial + direction;
    
    if (newIndex >= testimonials.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = testimonials.length - 1;
    }
    
    showTestimonial(newIndex);
}

function goToTestimonial(index) {
    showTestimonial(index);
}

// Initialize Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, entry.target.dataset.delay || 0);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll('.section-header').forEach((el, index) => {
        el.classList.add('fade-in');
        el.dataset.delay = index * 100;
        observer.observe(el);
    });

    document.querySelectorAll('.product-card').forEach((el, index) => {
        el.classList.add('scale-in');
        el.dataset.delay = index * 200;
        observer.observe(el);
    });

    document.querySelectorAll('.why-us-card').forEach((el, index) => {
        el.classList.add('fade-in');
        el.dataset.delay = index * 150;
        observer.observe(el);
    });

    document.querySelectorAll('.pillar').forEach((el, index) => {
        el.classList.add('slide-left');
        el.dataset.delay = index * 100;
        observer.observe(el);
    });

    document.querySelectorAll('.cert-item').forEach((el, index) => {
        el.classList.add('slide-right');
        el.dataset.delay = index * 100;
        observer.observe(el);
    });

    // Initialize number counting animation for stats
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
            }
        });
    });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Animate Numbers
function animateNumber(element) {
    const finalNumber = element.textContent;
    const isPercentage = finalNumber.includes('%');
    const isPlus = finalNumber.includes('+');
    const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
    
    let currentNumber = 0;
    const increment = Math.ceil(numericValue / 50);
    
    const timer = setInterval(() => {
        currentNumber += increment;
        
        if (currentNumber >= numericValue) {
            currentNumber = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = currentNumber.toString();
        if (isPercentage) displayValue += '%';
        if (isPlus) displayValue += '+';
        
        element.textContent = displayValue;
    }, 30);
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="closeNotification(this)">×</button>
        </div>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Poppins', sans-serif;
    `;
    
    // Add notification to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        closeNotification(notification.querySelector('.notification-close'));
    }, 5000);
}

function closeNotification(button) {
    const notification = button.closest('.notification');
    if (notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance Optimizations
const debouncedScroll = debounce(function() {
    // Scroll optimizations can be added here
}, 16);

window.addEventListener('scroll', debouncedScroll);

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Add smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading states for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.type === 'submit') {
            return; // Form submission handled separately
        }
        
        // Add loading state for other buttons
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 1000);
    });
});

// Add hover effects for cards
document.querySelectorAll('.product-card, .why-us-card, .cert-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add focus management for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--saffron-gold) !important;
        outline-offset: 2px !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    /* New smooth animations */
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.8s ease-out;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .slide-left {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.8s ease-out;
    }
    
    .slide-left.visible {
        opacity: 1;
        transform: translateX(0);
    }
    
    .slide-right {
        opacity: 0;
        transform: translateX(30px);
        transition: all 0.8s ease-out;
    }
    
    .slide-right.visible {
        opacity: 1;
        transform: translateX(0);
    }
    
    .scale-in {
        opacity: 0;
        transform: scale(0.9);
        transition: all 0.8s ease-out;
    }
    
    .scale-in.visible {
        opacity: 1;
        transform: scale(1);
    }
`;
document.head.appendChild(style);

// Download Modal Functions
function showDownloadModal() {
    const modal = document.getElementById('downloadModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

function closeDownloadModal() {
    const modal = document.getElementById('downloadModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            // Reset form
            const form = document.getElementById('downloadForm');
            if (form) {
                form.reset();
            }
        }, 300);
    }
}

// Initialize Download Form
function initializeDownloadForm() {
    const downloadForm = document.getElementById('downloadForm');
    const modal = document.getElementById('downloadModal');
    
    if (downloadForm) {
        downloadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleDownloadForm(this);
        });
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeDownloadModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDownloadModal();
        }
    });
}

// Handle Download Form Submission
function handleDownloadForm(form) {
    const submitButton = form.querySelector('.download-submit');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i data-lucide="loader-2"></i> Processing...';
    submitButton.disabled = true;
    
    // Get form data
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        company: formData.get('company'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        message: formData.get('message') || '',
        action: 'download_catalogue'
    };
    
    // Simulate form processing (you can integrate with your backend here)
    setTimeout(() => {
        // Show success notification
        showNotification('Thank you! Your download will start shortly.', 'success');
        
        // Close modal
        closeDownloadModal();
        
        // Start the actual download - determine catalog type based on current page
        const currentPath = window.location.pathname;
        const catalogType = currentPath.includes('/makhana') ? 'makhana' : 'horeca';
        triggerCatalogueDownload(catalogType);
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Reset form
        form.reset();
    }, 1500);
}

// Global function to trigger catalogue download (used by product pages)
function triggerCatalogueDownload(catalogueType = 'horeca') {
    let fileName;
    let filePath;
    
    // Determine the correct path based on current location
    const currentPath = window.location.pathname;
    const isInProductsFolder = currentPath.includes('/products/');
    const basePath = isInProductsFolder ? '../' : './';
    
    if (catalogueType === 'horeca') {
        fileName = 'The Cork Studio HoReCa Catalogue.pdf';
        filePath = basePath + 'Downloadables/The Cork Studio HoReCa Catalogue.pdf';
    } else {
        fileName = 'TradeArk Makhana Brochure.pdf';
        filePath = basePath + 'Downloadables/TradeArk Makhana Brochure.pdf';
    }
    
    // Create a link element to trigger download
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Export functions for global use
window.scrollToSection = scrollToSection;
window.changeTestimonial = changeTestimonial;
window.goToTestimonial = goToTestimonial;
window.closeNotification = closeNotification;
window.showDownloadModal = showDownloadModal;
window.closeDownloadModal = closeDownloadModal;
window.triggerCatalogueDownload = triggerCatalogueDownload;
window.initializeDownloadForm = initializeDownloadForm;

// ===== NEW MOBILE MENU SYSTEM =====

function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link:not(.mobile-menu-toggle-btn)');
    const mobileMenuSublinks = document.querySelectorAll('.mobile-menu-sublink');
    const mobileMenuToggleBtns = document.querySelectorAll('.mobile-menu-toggle-btn');
    
    // Ensure Lucide icons are properly rendered in mobile menu
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
    

    
    // Toggle mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
    }
    
    // Close mobile menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });
    }
    
    // Close menu when clicking overlay
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }
    
    // Close menu when clicking direct links and handle smooth scrolling
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle internal anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const sectionId = href.substring(1);
                scrollToSection(sectionId);
                closeMobileMenu();
            } else {
                // For external links, just close the menu
                closeMobileMenu();
            }
        });
    });
    
    // Close menu when clicking sub-links
    mobileMenuSublinks.forEach(sublink => {
        sublink.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Handle expandable menu items
    mobileMenuToggleBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileSubmenu(btn);
        });
        
        // Keyboard support
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileSubmenu(btn);
            }
        });
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Handle swipe gestures for closing menu
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        mobileMenuOverlay.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        });
    }
    
    function handleSwipeGesture() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        // Swipe left to close menu
        if (swipeDistance < -swipeThreshold) {
            closeMobileMenu();
        }
    }
}

function toggleMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;
    
    if (mobileMenuOverlay && mobileMenuToggle) {
        const isOpen = mobileMenuOverlay.classList.contains('active');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
}

function openMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;
    
    if (mobileMenuOverlay && mobileMenuToggle) {
        mobileMenuOverlay.classList.add('active');
        mobileMenuToggle.classList.add('active');
        body.classList.add('mobile-menu-open');
        
        // Re-initialize Lucide icons when menu opens to ensure chevrons are visible
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            setTimeout(() => {
                lucide.createIcons();
            }, 100);
        }
        
        // Focus the close button for accessibility
        setTimeout(() => {
            const closeBtn = document.querySelector('.mobile-menu-close');
            if (closeBtn) {
                closeBtn.focus();
            }
        }, 300);
    }
}

function closeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;
    
    if (mobileMenuOverlay && mobileMenuToggle) {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        body.classList.remove('mobile-menu-open');
        
        // Close all open submenus
        const expandedItems = document.querySelectorAll('.mobile-menu-expandable.expanded');
        expandedItems.forEach(item => {
            item.classList.remove('expanded');
            const toggleBtn = item.querySelector('.mobile-menu-toggle-btn');
            if (toggleBtn) {
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

function toggleMobileSubmenu(toggleBtn) {
    const parentItem = toggleBtn.closest('.mobile-menu-expandable');
    const isExpanded = parentItem.classList.contains('expanded');
    
    // Close all other open submenus (only one open at a time)
    const allExpandedItems = document.querySelectorAll('.mobile-menu-expandable.expanded');
    allExpandedItems.forEach(item => {
        if (item !== parentItem) {
            item.classList.remove('expanded');
            const otherToggleBtn = item.querySelector('.mobile-menu-toggle-btn');
            if (otherToggleBtn) {
                otherToggleBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Toggle current submenu
    if (isExpanded) {
        parentItem.classList.remove('expanded');
        toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
        parentItem.classList.add('expanded');
        toggleBtn.setAttribute('aria-expanded', 'true');
    }
}

// Gallery Slideshow Functions
let currentSlide = 0;
let slideInterval;
let slides = [];
let allSlides = [];

function initializeGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    allSlides = document.querySelectorAll('.slide');
    slides = Array.from(allSlides);
    
    // Initialize filter functionality only if filter buttons exist
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter slides
                filterSlides(filter);
            });
        });
    }
    
    // Initialize slideshow functionality
    initializeSlideshow();
    
    // Initialize lightbox functionality
    initializeLightbox();
}

function filterSlides(filter) {
    // Reset slideshow
    clearInterval(slideInterval);
    currentSlide = 0;
    
    // Filter slides based on category
    if (filter === 'all') {
        slides = Array.from(allSlides);
    } else {
        slides = Array.from(allSlides).filter(slide => slide.dataset.category === filter);
    }
    
    // Hide all slides
    allSlides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none';
    });
    
    // Show filtered slides
    slides.forEach(slide => {
        slide.style.display = 'flex';
    });
    
    // Update dots
    updateDots();
    
    // Show first slide if any exist
    if (slides.length > 0) {
        slides[0].classList.add('active');
        startSlideshow();
    }
}

function initializeSlideshow() {
    // Show first slide
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }
    
    // Start auto-advance
    startSlideshow();
    
    // Pause on hover
    const slideshow = document.querySelector('.slideshow-container');
    if (slideshow) {
        slideshow.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slideshow.addEventListener('mouseleave', () => {
            startSlideshow();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
}

function startSlideshow() {
    clearInterval(slideInterval);
    if (slides.length > 1) {
        slideInterval = setInterval(() => {
            changeSlide(1);
        }, 5000); // Change slide every 5 seconds
    }
}

function changeSlide(direction) {
    if (slides.length === 0) return;
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Calculate next slide
    currentSlide += direction;
    
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
    
    // Update dots
    updateDots();
    
    // Update progress bar
    updateProgressBar();
}

function goToSlide(index) {
    if (slides.length === 0 || index >= slides.length) return;
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Set new current slide
    currentSlide = index;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
    
    // Update dots
    updateDots();
    
    // Update progress bar
    updateProgressBar();
    
    // Restart slideshow
    startSlideshow();
}

function updateDots() {
    const dots = document.querySelectorAll('.slideshow-dots .dot');
    dots.forEach((dot, index) => {
        if (index < slides.length) {
            dot.style.display = 'block';
            dot.classList.toggle('active', index === currentSlide);
        } else {
            dot.style.display = 'none';
        }
    });
}

function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar && slides.length > 0) {
        const progress = ((currentSlide + 1) / slides.length) * 100;
        progressBar.style.width = progress + '%';
    }
}

function initializeLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    
    // Close lightbox when clicking outside
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-overlay')) {
                closeLightbox();
            }
        });
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
}

function openLightbox(imageSrc, title, description) {
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    
    if (lightbox && lightboxImage && lightboxTitle && lightboxDescription) {
        lightboxImage.src = imageSrc;
        lightboxImage.alt = title;
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;
        
        lightbox.style.display = 'flex';
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    
    if (lightbox) {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
        
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}

