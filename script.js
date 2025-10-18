/*
================================================================================
! SLSU COLLEGE OF INDUSTRIAL TECHNOLOGY - MAIN JAVASCRIPT FILE
================================================================================
* Purpose: Core interactive functionality for the CIT department website
* Author: SLSU CIT Development Team
* Last Updated: 2025
* Dependencies: None (Vanilla JavaScript)
================================================================================
*/

/* ============================================================================
    ? GLOBAL VARIABLES - Slideshow Control
   ============================================================================ */
let slideIndex = 1;              // * Tracks current slide number (1-based index)
let slideTimer = null;           // * Timer ID for automatic slideshow rotation
let progressTimer = null;        // * Timer ID for progress bar animation
const AUTO_SLIDE_INTERVAL = 5000; // * 5 seconds between automatic slide transitions

/* ============================================================================
    ! MOBILE MENU FUNCTIONALITY
   * Handles hamburger menu toggle for responsive navigation on mobile/tablet
   ============================================================================ */
function initMobileMenu() {
    // * Get hamburger menu button element
    const menuBtn = document.getElementById('menuToggle');
    // * Get navigation menu container element
    const navMenu = document.getElementById('navigation');
    
    // ! Exit function if elements don't exist on the page
    if (!menuBtn || !navMenu) return;

    // * Add click event to toggle menu open/close
    menuBtn.addEventListener('click', function() {
        // * Toggle 'active' class on button (transforms hamburger to X)
        this.classList.toggle('active');
        // * Toggle 'active' class on menu (shows/hides navigation)
        navMenu.classList.toggle('active');
        
        // * Update ARIA attribute for screen reader accessibility
        const isOpen = this.classList.contains('active');
        this.setAttribute('aria-expanded', isOpen);
    });

    // * Get all navigation links
    const navLinks = document.querySelectorAll('.nav a');
    // * Close menu when any navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // * Remove active classes from button and menu
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            // * Update ARIA for accessibility
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // * Close menu when clicking outside of it
    document.addEventListener('click', function(e) {
        // * Check if click was inside menu
        const clickInsideMenu = navMenu.contains(e.target);
        // * Check if click was on toggle button
        const clickOnBtn = menuBtn.contains(e.target);
        
        // * If click was outside and menu is open, close it
        if (!clickInsideMenu && !clickOnBtn && navMenu.classList.contains('active')) {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ============================================================================
    ! DYNAMIC HEADER EFFECTS
   * Changes header appearance based on scroll position for better UX
   ============================================================================ */
function initHeaderEffects() {
    // * Get header element
    const header = document.querySelector('.header');
    // ! Exit if header doesn't exist
    if (!header) return;

    // * Throttling flag to optimize scroll performance
    let ticking = false;
    
    // * Function to update header styles based on scroll
    function updateHeader() {
        // * Get current vertical scroll position
        const scrollPos = window.scrollY;
        
        // * If scrolled more than 100px, make header more opaque
        if (scrollPos > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(30, 58, 138, 0.15)';
        } else {
            // * At top of page, make header slightly transparent
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(30, 58, 138, 0.1)';
        }
        
        // * Reset throttle flag
        ticking = false;
    }

    // * Listen for scroll events with throttling for performance
    window.addEventListener('scroll', function() {
        if (!ticking) {
            // * Use requestAnimationFrame for smooth 60fps updates
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

/* ============================================================================
    ! TYPING ANIMATION
   * Creates typewriter effect for hero title on homepage
   ============================================================================ */
function typeWriter(element, text, speed = 80) {
    // ! Exit if element or text is missing
    if (!element || !text) return;
    
    // * Initialize character counter
    let i = 0;
    // * Clear existing text
    element.textContent = '';
    // * Add blinking cursor effect
    element.style.borderRight = '2px solid white';
    
    // * Recursive function to type one character at a time
    function type() {
        if (i < text.length) {
            // * Add next character to element
            element.textContent += text.charAt(i);
            i++;
            // * Call type() again after delay for animation effect
            setTimeout(type, speed);
        } else {
            // * Remove cursor when typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // * Start typing animation
    type();
}

// * Initialize typing effect on hero title
function initTypingEffect() {
    // * Get hero title element (only on homepage)
    const heroTitle = document.querySelector('.hero-title');
    // ! Exit if element doesn't exist
    if (!heroTitle) return;
    
    // * Store original text content
    const originalText = heroTitle.textContent;
    
    // * Start typing animation after 500ms delay
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 80);
    }, 500);
}

/* ============================================================================
    ! ENHANCED CARD INTERACTIONS
   * Adds hover effects to various card elements throughout the site
   ============================================================================ */
function initCardInteractions() {
    // * Select all card elements (vision/mission, goals, programs, faculty, facilities)
    const cards = document.querySelectorAll('.vm-card, .goal-card, .program-card, .faculty-card, .facility-card, .org-box');
    
    // * Add hover interactions to each card
    cards.forEach(card => {
        // * On mouse enter, apply transform effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.15)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // * On mouse leave, return to original position
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.1)';
        });
    });
}

/* ============================================================================
    ! FORM VALIDATION & HANDLING
   * Validates and handles contact form submission with visual feedback
   ============================================================================ */
function initFormHandling() {
    // * Get contact form element
    const form = document.getElementById('contactForm');
    // ! Exit if form doesn't exist on page
    if (!form) return;

    // * Add submit event listener
    form.addEventListener('submit', function(e) {
        // * Prevent default form submission (no page reload)
        e.preventDefault();
        
        // * Get all form input elements
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageTextarea = this.querySelector('textarea');
        const submitBtn = this.querySelector('button[type="submit"]');
        
        // * Get trimmed values from inputs
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageTextarea.value.trim();
        
        // * Clear any previous error messages
        clearErrors([nameInput, emailInput, messageTextarea]);
        
        // * Validation flag
        let isValid = true;
        
        // * Validate name field is not empty
        if (!name) {
            showError(nameInput, 'Name is required');
            isValid = false;
        }
        
        // * Validate email field
        if (!email) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            // * Check email format using regex
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        }
        
        // * Validate message field is not empty
        if (!message) {
            showError(messageTextarea, 'Message is required');
            isValid = false;
        }
        
        // ! Stop if validation failed
        if (!isValid) return;
        
        // * Store original button text for later restoration
        const originalText = submitBtn.textContent;
        
        // * Show "Sending..." state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // * Simulate form submission (1 second delay)
        setTimeout(() => {
            // * Show success state
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#10b981';
            submitBtn.style.opacity = '1';
            
            // * Display success notification
            showSuccess('Thank you! Your message has been sent successfully.');
            
            // * Reset form after 2 seconds
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1000);
    });
}

// * Email validation using regular expression
function isValidEmail(email) {
    // * Regex pattern for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// * Display error message for invalid field
function showError(field, msg) {
    // * Style field with red border to indicate error
    field.style.borderColor = '#ef4444';
    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    
    // * Remove existing error message if present
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // * Create new error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = msg;
    
    // * Insert error message after the field
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

// * Clear all error states from fields
function clearErrors(fields) {
    fields.forEach(field => {
        // * Reset field border to default
        field.style.borderColor = '#e0f2fe';
        field.style.boxShadow = '';
        
        // * Remove error message if present
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
    });
}

// * Display success notification toast
function showSuccess(msg) {
    // * Create success notification element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    // * Position fixed in top-right corner
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    successDiv.textContent = msg;
    
    // * Add to page
    document.body.appendChild(successDiv);
    
    // * Slide in animation
    setTimeout(() => {
        successDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // * Auto-hide after 3 seconds
    setTimeout(() => {
        successDiv.style.transform = 'translateX(400px)';
        // * Remove from DOM after slide out animation
        setTimeout(() => {
            if (document.body.contains(successDiv)) {
                document.body.removeChild(successDiv);
            }
        }, 300);
    }, 3000);
}

/* ============================================================================
    ! SLIDESHOW FUNCTIONALITY (Announcements Page)
   * Automatic image slider with manual controls and progress indicator
   ============================================================================ */
function initSlideshow() {
    // * Get all slide elements
    const slides = document.getElementsByClassName('slide');
    // * Get all indicator dots
    const indicators = document.getElementsByClassName('indicator');
    
    // ! Exit if no slides found on page
    if (slides.length === 0) return;
    
    // * Display initial slide
    showSlide(slideIndex);
    // * Start automatic rotation
    startAutoSlide();
    
    // * Pause slideshow on hover for better UX
    const container = document.querySelector('.slideshow-container');
    if (container) {
        container.addEventListener('mouseenter', stopAutoSlide);
        container.addEventListener('mouseleave', startAutoSlide);
    }
}

// * Start automatic slide rotation timer
function startAutoSlide() {
    // * Clear existing timer to prevent duplicates
    stopAutoSlide();
    // * Set interval to advance slide every 5 seconds
    slideTimer = setInterval(() => {
        slideIndex++;
        showSlide(slideIndex);
    }, AUTO_SLIDE_INTERVAL);
}

// * Stop automatic slide rotation
function stopAutoSlide() {
    if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
    }
}

// * Restart automatic rotation (used after manual navigation)
function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// * Navigate to next/previous slide (called by arrow buttons)
function changeSlide(n) {
    slideIndex += n;
    showSlide(slideIndex);
    restartAutoSlide();
}

// * Jump to specific slide (called by indicator dots)
function goToSlide(n) {
    slideIndex = n;
    showSlide(slideIndex);
    restartAutoSlide();
}

// * Display specified slide and update indicators
function showSlide(n) {
    const slides = document.getElementsByClassName('slide');
    const indicators = document.getElementsByClassName('indicator');
    
    // ! Exit if no slides exist
    if (slides.length === 0) return;
    
    // * Loop back to first slide if at end
    if (n > slides.length) slideIndex = 1;
    // * Loop to last slide if before first
    if (n < 1) slideIndex = slides.length;
    
    // * Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    // * Deactivate all indicators
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove('active');
    }
    
    // * Show current slide
    slides[slideIndex - 1].classList.add('active');
    // * Activate corresponding indicator
    if (indicators[slideIndex - 1]) {
        indicators[slideIndex - 1].classList.add('active');
    }
}

/* ============================================================================
    ! KEYBOARD NAVIGATION
   * Adds keyboard support for better accessibility
   ============================================================================ */
function initKeyboardNav() {
    document.addEventListener('keydown', function(e) {
        // * Close mobile menu with Escape key
        if (e.key === 'Escape') {
            const menuBtn = document.getElementById('menuToggle');
            const navMenu = document.getElementById('navigation');
            
            if (navMenu && navMenu.classList.contains('active')) {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.focus();
            }
        }
    });
}

/* ============================================================================
    ! FOCUS MANAGEMENT
   * Enhances keyboard navigation visibility for accessibility
   ============================================================================ */
function initFocusManagement() {
    // * Add class when Tab key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // * Remove class when mouse is used
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // * Add dynamic focus outline styles for keyboard users
    const style = document.createElement('style');
    style.textContent = `.keyboard-navigation *:focus { 
        outline: 2px solid #3b82f6 !important; 
        outline-offset: 2px !important; 
    }`;
    document.head.appendChild(style);
}

/* ============================================================================
    ! ACTIVE PAGE DETECTION
   * Highlights current page in navigation menu
   ============================================================================ */
function setActivePage() {
    // * Get current page filename from URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    // * Get all navigation links
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        // * Remove existing active class
        link.classList.remove('active');
        
        // * Add active class to current page link
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* ============================================================================
    ! MAIN INITIALIZATION
   * Initializes all features when DOM is ready
   ============================================================================ */
function initApp() {
    try {
        // * Initialize mobile menu functionality
        initMobileMenu();
        // * Initialize header scroll effects
        initHeaderEffects();
        // * Highlight active page in navigation
        setActivePage();
        // * Add hover effects to cards
        initCardInteractions();
        // * Initialize contact form validation
        initFormHandling();
        // * Add keyboard navigation support
        initKeyboardNav();
        // * Enhance focus visibility
        initFocusManagement();
        
        // * Initialize slideshow only if on announcements page
        if (document.querySelector('.slideshow-container')) {
            initSlideshow();
        }
        
        // * Initialize typing effect only if on homepage
        if (document.querySelector('.hero-title')) {
            initTypingEffect();
        }
        
        console.log('✓ SLSU CIT Website initialized successfully!');
    } catch (error) {
        console.error('! Initialization error:', error);
    }
}

/* ============================================================================
    ! EVENT LISTENERS - Page Load & Visibility
   ============================================================================ */

// * Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    // * DOM already loaded, initialize immediately
    initApp();
}

// * Pause slideshow when page is hidden (tab switched/minimized)
document.addEventListener('visibilitychange', function() {
    if (document.querySelector('.slideshow-container')) {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    }
});

/* ============================================================================
    ! ERROR HANDLING - Global Error Logging
   ============================================================================ */

// * Log JavaScript errors to console
window.addEventListener('error', function(e) {
    console.error('! JavaScript Error:', e.error);
});

// * Log unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('! Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});