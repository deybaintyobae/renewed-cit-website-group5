/*
===============================================
SLSU COLLEGE OF INDUSTRIAL TECHNOLOGY
JavaScript Functions - Updated Version 2.0
Navigation: Redirect-based (no smooth scroll)
===============================================
*/

/* 
===============================================
MOBILE MENU FUNCTIONALITY
===============================================
*/

// Initialize mobile hamburger menu
function initMobileMenu() {
    const menuBtn = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navigation');
    
    // Exit if elements don't exist
    if (!menuBtn || !navMenu) {
        console.warn('Menu elements not found');
        return;
    }

    // Toggle menu on button click
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Update ARIA for screen readers
        const isOpen = this.classList.contains('active');
        this.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking navigation links
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const clickInsideMenu = navMenu.contains(e.target);
        const clickOnBtn = menuBtn.contains(e.target);
        
        if (!clickInsideMenu && !clickOnBtn && navMenu.classList.contains('active')) {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

/* 
===============================================
SCROLL-TRIGGERED ANIMATIONS
===============================================
*/

// Initialize scroll animations for elements
function initScrollAnimations() {
    // Observer configuration
    const config = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create intersection observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, config);

    // Observe all animated elements
    const animatedEls = document.querySelectorAll('.animate-text');
    animatedEls.forEach(el => {
        observer.observe(el);
    });

    console.log(`Observing ${animatedEls.length} elements`);
}

/* 
===============================================
HEADER SCROLL EFFECTS
===============================================
*/

// Change header style based on scroll position
function initHeaderEffects() {
    const header = document.querySelector('.header');
    
    if (!header) {
        console.warn('Header not found');
        return;
    }

    let ticking = false;
    
    function updateHeader() {
        const scrollPos = window.scrollY;
        
        if (scrollPos > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(30, 58, 138, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(30, 58, 138, 0.1)';
        }
        
        ticking = false;
    }

    // Throttled scroll listener
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

/* 
===============================================
SLIDESHOW FUNCTIONALITY
===============================================
*/

// Slideshow state variables
let currentSlide = 1;
let slideTimer;

// Initialize slideshow
function initSlideshow() {
    showSlide(currentSlide);
    startAutoSlide();
}

// Start automatic slide rotation
function startAutoSlide() {
    slideTimer = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// Stop automatic slide rotation
function stopAutoSlide() {
    clearInterval(slideTimer);
}

// Restart automatic slide rotation
function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Change slide by offset (1 for next, -1 for previous)
function changeSlide(offset) {
    showSlide(currentSlide += offset);
    restartAutoSlide();
}

// Jump to specific slide
function currentSlide(n) {
    showSlide(currentSlide = n);
    restartAutoSlide();
}

// Display specified slide
function showSlide(n) {
    const slides = document.getElementsByClassName('slide');
    const dots = document.getElementsByClassName('indicator');
    
    // Wrap around slide numbers
    if (n > slides.length) {
        currentSlide = 1;
    }
    if (n < 1) {
        currentSlide = slides.length;
    }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    // Deactivate all indicators
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    // Show current slide and indicator
    if (slides[currentSlide - 1]) {
        slides[currentSlide - 1].classList.add('active');
    }
    if (dots[currentSlide - 1]) {
        dots[currentSlide - 1].classList.add('active');
    }
}

/* 
===============================================
CONTACT FORM HANDLING
===============================================
*/

// Initialize contact form with validation
function initFormHandling() {
    const form = document.querySelector('.contact-form form');
    
    if (!form) {
        console.warn('Contact form not found');
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageTextarea = this.querySelector('textarea');
        const submitBtn = this.querySelector('button[type="submit"]');
        
        // Get values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageTextarea.value.trim();
        
        // Clear previous errors
        clearErrors([nameInput, emailInput, messageTextarea]);
        
        // Validate form
        let isValid = true;
        
        if (!name) {
            showError(nameInput, 'Name is required');
            isValid = false;
        }
        
        if (!email) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(emailInput, 'Please enter a valid email');
            isValid = false;
        }
        
        if (!message) {
            showError(messageTextarea, 'Message is required');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Simulate form submission
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#10b981';
            submitBtn.style.opacity = '1';
            
            showSuccess('Thank you! Your message has been sent successfully.');
            
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1000);
    });
}

// Validate email format
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Show field error message
function showError(field, msg) {
    field.style.borderColor = '#ef4444';
    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = msg;
    
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

// Clear error states from fields
function clearErrors(fields) {
    fields.forEach(field => {
        field.style.borderColor = '#e0f2fe';
        field.style.boxShadow = '';
        
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
}

// Show success notification
function showSuccess(msg) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
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
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        successDiv.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 3000);
}

/* 
===============================================
ENHANCED CARD INTERACTIONS
===============================================
*/

// Add hover effects to cards
function initCardInteractions() {
    const cards = document.querySelectorAll('.vm-card, .goal-card, .program-card, .faculty-card, .facility-card, .org-box');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log(`Enhanced ${cards.length} cards`);
}

/* 
===============================================
STAGGERED ANIMATIONS
===============================================
*/

// Add progressive animation delays
function initStaggeredAnimations() {
    const elements = document.querySelectorAll('.animate-text');
    
    elements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });
    
    console.log(`Applied staggered delays to ${elements.length} elements`);
}

/* 
===============================================
KEYBOARD NAVIGATION
===============================================
*/

// Add keyboard support
function initKeyboardNav() {
    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
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

// Focus management for accessibility
function initFocusManagement() {
    // Add keyboard navigation class on Tab
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add focus styling
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid #3b82f6 !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);
}

/* 
===============================================
ACTIVE PAGE DETECTION
===============================================
*/

// Highlight current page in navigation
function setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* 
===============================================
MAIN INITIALIZATION
===============================================
*/

// Initialize all features when DOM is ready
function initApp() {
    console.log('Initializing SLSU CIT Website...');
    
    try {
        // Core functionality
        initMobileMenu();
        initScrollAnimations();
        initHeaderEffects();
        setActivePage();
        
        // Visual enhancements
        initCardInteractions();
        initStaggeredAnimations();
        
        // Form handling
        initFormHandling();
        
        // Slideshow (only on announcements page)
        if (document.querySelector('.slideshow-container')) {
            initSlideshow();
        }
        
        // Accessibility
        initKeyboardNav();
        initFocusManagement();
        
        console.log('Application initialized successfully!');
        
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

/* 
===============================================
EVENT LISTENERS
===============================================
*/

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Pause slideshow when page hidden
document.addEventListener('visibilitychange', function() {
    if (document.querySelector('.slideshow-container')) {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    }
});

// Slideshow hover pause
const slideshowContainer = document.querySelector('.slideshow-container');
if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', stopAutoSlide);
    slideshowContainer.addEventListener('mouseleave', startAutoSlide);
}

/* 
===============================================
ERROR HANDLING
===============================================
*/

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});