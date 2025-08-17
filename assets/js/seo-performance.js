// Advanced SEO Performance Monitoring (2025)
// Core Web Vitals and Search Optimization Tracking

(function() {
    'use strict';

    // Core Web Vitals Monitoring
    function measureCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.startTime > 2500) {
                    console.warn('LCP Warning: Slow loading detected', entry.startTime);
                }
            }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // Interaction to Next Paint (INP) - 2025 Core Web Vital
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.processingEnd - entry.processingStart > 200) {
                    console.warn('INP Warning: Slow interaction response', entry);
                }
            }
        }).observe({ entryTypes: ['event'] });

        // Cumulative Layout Shift (CLS)
        let clsScore = 0;
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsScore += entry.value;
                    if (clsScore > 0.1) {
                        console.warn('CLS Warning: Layout shift detected', clsScore);
                    }
                }
            }
        }).observe({ entryTypes: ['layout-shift'] });
    }

    // Structured Data Validation
    function validateStructuredData() {
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        scripts.forEach((script, index) => {
            try {
                JSON.parse(script.textContent);
            } catch (error) {
                console.error(`Structured Data Error in script ${index + 1}:`, error);
            }
        });
    }

    // Image SEO Optimization Check
    function checkImageSEO() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.alt || img.alt.length < 5) {
                console.warn('SEO Warning: Missing or short alt text', img);
            }
            if (!img.src.includes('.webp')) {
                console.warn('Performance Warning: Consider WebP format', img);
            }
        });
    }

    // Meta Tags Validation
    function validateMetaTags() {
        const requiredMeta = [
            'description',
            'keywords',
            'og:title',
            'og:description',
            'twitter:card'
        ];

        requiredMeta.forEach(metaName => {
            const meta = document.querySelector(`meta[name="${metaName}"], meta[property="${metaName}"]`);
            if (!meta) {
                console.warn(`SEO Warning: Missing meta tag: ${metaName}`);
            }
        });
    }

    // Search Console Integration Helper
    function trackSearchPerformance() {
        // Track page load for Search Console
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            
            // Send to Google Analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_load_time', {
                    value: loadTime,
                    event_category: 'Performance',
                    event_label: 'Core Web Vitals'
                });
            }
        });
    }

    // Initialize all SEO monitoring functions
    function initSEOMonitoring() {
        // Run checks after DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                measureCoreWebVitals();
                validateStructuredData();
                checkImageSEO();
                validateMetaTags();
                trackSearchPerformance();
            });
        } else {
            measureCoreWebVitals();
            validateStructuredData();
            checkImageSEO();
            validateMetaTags();
            trackSearchPerformance();
        }
    }

    // Auto-start monitoring
    initSEOMonitoring();

    // Export functions for manual testing
    window.SEOMonitor = {
        measureCoreWebVitals,
        validateStructuredData,
        checkImageSEO,
        validateMetaTags
    };

})();