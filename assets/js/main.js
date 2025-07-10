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
});

// Navigation Functions
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
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
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animate-fade-in')) {
                entry.target.classList.add('animate-fade-in');
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
}

// Handle Contact Form Submission
function handleContactForm(form) {
    const formData = new FormData(form);
    const submitButton = form.querySelector('.form-submit');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Submit to Web3Forms API
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Web3Forms response:', data);
        if (data.success) {
            // Success - reset form and show success message
            form.reset();
            showNotification('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
        } else {
            // Error - show error message with details
            console.error('Web3Forms error:', data.message || 'Unknown error');
            if (data.message && data.message.includes('not allowed')) {
                // Fallback to mailto when Web3Forms is not activated
                handleMailtoFallback(form);
            } else {
                showNotification(`Error: ${data.message || 'Unable to send message. Please try again or contact us directly.'}`, 'error');
            }
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        // Fallback to mailto on network error
        handleMailtoFallback(form);
    })
    .finally(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    });
}

// Fallback mailto function
function handleMailtoFallback(form) {
    const formData = new FormData(form);
    const name = formData.get('name') || '';
    const company = formData.get('company') || '';
    const email = formData.get('email') || '';
    const phone = formData.get('phone') || '';
    const productInterest = formData.get('productInterest') || '';
    const message = formData.get('message') || '';
    
    // Create email body
    const emailBody = `
Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone}
Product Interest: ${productInterest}

Message:
${message}
    `.trim();
    
    const mailtoLink = `mailto:ashutoshsinha124@gmail.com?subject=Contact Form Submission from ${name}&body=${encodeURIComponent(emailBody)}`;
    
    // Open mailto link
    window.location.href = mailtoLink;
    
    // Show info message
    showNotification('Opening your email client. Please send the message to complete your inquiry.', 'info');
    
    // Reset form
    form.reset();
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
        
        // Log newsletter subscription (in real implementation, send to server)
        console.log('Newsletter subscription:', { email });
        
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

// Export functions for global use
window.scrollToSection = scrollToSection;
window.changeTestimonial = changeTestimonial;
window.goToTestimonial = goToTestimonial;
window.closeNotification = closeNotification;