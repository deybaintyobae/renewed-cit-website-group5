/*
SLSU COLLEGE OF INDUSTRIAL TECHNOLOGY - JAVASCRIPT
=========================================================
Interactive functionality for college department website
Adapted from original homefunctions.js for multi-page site
*/

/* ========================================
MOBILE MENU FUNCTIONALITY
   ======================================== */

function initializeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navigation = document.getElementById('navigation');
    
    if (!menuToggle || !navigation) return;

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navigation.classList.toggle('active');
        
        const isExpanded = this.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
    });

    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navigation.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navigation.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navigation.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navigation.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ========================================
DYNAMIC HEADER EFFECTS
   ======================================== */

function initializeHeaderEffects() {
    const header = document.querySelector('.header');
    if (!header) return;

    let ticking = false;
    
    function updateHeader() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(30, 58, 138, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(30, 58, 138, 0.1)';
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

/* ========================================
TYPING ANIMATION
   ======================================== */

function typeWriter(element, text, speed = 80) {
    if (!element || !text) return;
    
    let i = 0;
    element.textContent = '';
    element.style.borderRight = '2px solid white';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    type();
}

function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 80);
    }, 500);
}

/* ========================================
ENHANCED CARD INTERACTIONS
   ======================================== */

function initializeCardInteractions() {
    const cards = document.querySelectorAll('.vm-card, .goal-card, .program-card, .faculty-card, .facility-card, .org-box');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.15)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.1)';
        });
        
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-6px) scale(1.01)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
    });
}

/* ========================================
FORM HANDLING
   ======================================== */

function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageTextarea = this.querySelector('textarea');
        const submitBtn = this.querySelector('button[type="submit"]');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageTextarea.value.trim();
        
        clearFormErrors([nameInput, emailInput, messageTextarea]);
        
        let isValid = true;
        
        if (!name) {
            showFieldError(nameInput, 'Name is required');
            isValid = false;
        }
        
        if (!email) {
            showFieldError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFieldError(emailInput, 'Please enter a valid email');
            isValid = false;
        }
        
        if (!message) {
            showFieldError(messageTextarea, 'Message is required');
            isValid = false;
        }
        
        if (!isValid) return;
        
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#10b981';
            submitBtn.style.opacity = '1';
            
            showSuccessMessage('Thank you! Your message has been sent successfully.');
            
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1000);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(field, message) {
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
    errorDiv.textContent = message;
    
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

function clearFormErrors(fields) {
    fields.forEach(field => {
        field.style.borderColor = '#e0f2fe';
        field.style.boxShadow = '';
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

function showSuccessMessage(message) {
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
    successDiv.textContent = message;
    
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

/* ========================================
SLIDESHOW FUNCTIONALITY
   ======================================== */

let slideIndex = 1;
let slideInterval;

function initSlideshow() {
    const slides = document.getElementsByClassName('slide');
    const indicators = document.getElementsByClassName('indicator');
    
    console.log('Initializing slideshow...');
    console.log('Found slides:', slides.length);
    console.log('Found indicators:', indicators.length);
    
    if (slides.length === 0) {
        console.warn('No slides found!');
        return;
    }
    
    showSlide(slideIndex);
    startAutoSlide();
    
    // Add pause on hover
    const container = document.querySelector('.slideshow-container');
    if (container) {
        container.addEventListener('mouseenter', stopAutoSlide);
        container.addEventListener('mouseleave', startAutoSlide);
    }
    
    console.log('Slideshow initialized successfully');
}

function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval
    slideInterval = setInterval(() => {
        slideIndex++;
        showSlide(slideIndex);
    }, 5000);
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

function changeSlide(n) {
    slideIndex += n;
    showSlide(slideIndex);
    restartAutoSlide();
}

function currentSlide(n) {
    slideIndex = n;
    showSlide(slideIndex);
    restartAutoSlide();
}

function showSlide(n) {
    const slides = document.getElementsByClassName('slide');
    const indicators = document.getElementsByClassName('indicator');
    
    if (slides.length === 0) return;
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove('active');
    }
    
    slides[slideIndex - 1].classList.add('active');
    if (indicators[slideIndex - 1]) {
        indicators[slideIndex - 1].classList.add('active');
    }
}



/* ========================================
MAIN INITIALIZATION
   ======================================== */

function initializeApplication() {
    console.log('Initializing College Department Website...');
    
    try {
        initializeMobileMenu();
        initializeHeaderEffects();
        setActivePage();
        initializeCardInteractions();
        initializeFormHandling();
        initializeKeyboardNavigation();
        initializeFocusManagement();
        
        if (document.querySelector('.slideshow-container')) {
            initSlideshow();
        }
        
        console.log('Application initialized successfully!');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

function initializePageLoadEffects() {
    initializeTypingEffect();
}

/* ========================================
EVENT LISTENERS
   ======================================== */

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApplication);
} else {
    initializeApplication();
}

window.addEventListener('load', initializePageLoadEffects);

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopAutoSlide();
    } else {
        startAutoSlide();
    }
});

const slideshowContainer = document.querySelector('.slideshow-container');
if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', stopAutoSlide);
    slideshowContainer.addEventListener('mouseleave', startAutoSlide);
}

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});

// Show specific slide
function showSlide(n) {
    var slides = document.getElementsByClassName('slide');
    var dots = document.getElementsByClassName('indicator');
    
    if (slides.length === 0) return;
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    for (var i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Change slide (called by arrow buttons)
function changeSlide(n) {
    slideIndex += n;
    showSlide(slideIndex);
    restartAutoSlide();
}

// Go to specific slide (called by indicator dots)
function currentSlide(n) {
    slideIndex = n;
    showSlide(slideIndex);
    restartAutoSlide();
}

// Start automatic slideshow
function startAutoSlide() {
    if (slideTimer) clearInterval(slideTimer);
    slideTimer = setInterval(function() {
        slideIndex++;
        showSlide(slideIndex);
    }, 5000);
}

// Stop automatic slideshow
function stopAutoSlide() {
    if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
    }
}

// Restart automatic slideshow
function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

/* 
===============================================
MOBILE MENU
===============================================
*/
function initMobileMenu() {
    var menuBtn = document.getElementById('menuToggle');
    var navMenu = document.getElementById('navigation');
    
    if (!menuBtn || !navMenu) return;

    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        var isOpen = this.classList.contains('active');
        this.setAttribute('aria-expanded', isOpen);
    });

    var navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', function(e) {
        var clickInsideMenu = navMenu.contains(e.target);
        var clickOnBtn = menuBtn.contains(e.target);
        
        if (!clickInsideMenu && !clickOnBtn && navMenu.classList.contains('active')) {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

/* 
===============================================
HEADER SCROLL EFFECTS
===============================================
*/
function initHeaderEffects() {
    var header = document.querySelector('.header');
    if (!header) return;

    var ticking = false;
    
    function updateHeader() {
        var scrollPos = window.scrollY;
        
        if (scrollPos > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(30, 58, 138, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(30, 58, 138, 0.1)';
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}



/* 
===============================================
CONTACT FORM
===============================================
*/
function initFormHandling() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        var nameInput = this.querySelector('input[type="text"]');
        var emailInput = this.querySelector('input[type="email"]');
        var messageInput = this.querySelector('textarea');
        var submitBtn = this.querySelector('button[type="submit"]');
        
        var name = nameInput.value.trim();
        var email = emailInput.value.trim();
        var message = messageInput.value.trim();
        
        clearErrors([nameInput, emailInput, messageInput]);
        
        var isValid = true;
        
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
            showError(messageInput, 'Message is required');
            isValid = false;
        }
        
        if (!isValid) return;
        
        var originalText = submitBtn.textContent;
        var originalBg = window.getComputedStyle(submitBtn).background;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        setTimeout(function() {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#10b981';
            submitBtn.style.opacity = '1';
            
            showSuccess('Thank you! Your message has been sent successfully.');
            
            setTimeout(function() {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1000);
    });
}

function isValidEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function showError(field, msg) {
    field.style.borderColor = '#ef4444';
    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    
    var existingError = field.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    var errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = msg;
    
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

function clearErrors(fields) {
    fields.forEach(function(field) {
        field.style.borderColor = '#e0f2fe';
        field.style.boxShadow = '';
        
        var errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
    });
}

function showSuccess(msg) {
    var successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = 'position: fixed; top: 100px; right: 20px; background: #10b981; color: white; padding: 15px 20px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); z-index: 1001; transform: translateX(400px); transition: transform 0.3s ease;';
    successDiv.textContent = msg;
    
    document.body.appendChild(successDiv);
    
    setTimeout(function() {
        successDiv.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(function() {
        successDiv.style.transform = 'translateX(400px)';
        setTimeout(function() {
            if (document.body.contains(successDiv)) {
                document.body.removeChild(successDiv);
            }
        }, 300);
    }, 3000);
}

/* 
===============================================
TYPING ANIMATION FOR HERO
===============================================
*/
function initTypingEffect() {
    var heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    var originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid white';
    
    var i = 0;
    function type() {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, 80);
        } else {
            setTimeout(function() {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    setTimeout(type, 500);
}

/* 
===============================================
CARD INTERACTIONS
===============================================
*/
function initCardInteractions() {
    var cards = document.querySelectorAll('.vm-card, .goal-card, .program-card, .faculty-card, .facility-card, .org-box');
    
    cards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

/* 
===============================================
KEYBOARD NAVIGATION
===============================================
*/
function initKeyboardNav() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            var menuBtn = document.getElementById('menuToggle');
            var navMenu = document.getElementById('navigation');
            
            if (navMenu && navMenu.classList.contains('active')) {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.focus();
            }
        }
    });
}

function initFocusManagement() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    var style = document.createElement('style');
    style.textContent = '.keyboard-navigation *:focus { outline: 2px solid #3b82f6 !important; outline-offset: 2px !important; }';
    document.head.appendChild(style);
}

/* 
===============================================
ACTIVE PAGE HIGHLIGHTING
===============================================
*/
function setActivePage() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(function(link) {
        var linkPage = link.getAttribute('href');
        link.classList.remove('active');
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* 
===============================================
MAIN INITIALIZATION
===============================================
*/
function initApp() {
    console.log('Initializing SLSU CIT Website...');
    
    try {
        initMobileMenu();
        initHeaderEffects();
        setActivePage();
        initCardInteractions();
        initFormHandling();
        initKeyboardNav();
        initFocusManagement();
        
        if (document.querySelector('.slideshow-container')) {
            initSlideshow();
        }
        
        if (document.querySelector('.hero-title')) {
            initTypingEffect();
        }
        
        console.log('✓ All features initialized successfully!');
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

/* 
===============================================
START APPLICATION
===============================================
*/
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

document.addEventListener('visibilitychange', function() {
    if (document.querySelector('.slideshow-container')) {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    }
});

window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});

/* 
===============================================
GLOBAL SLIDESHOW FUNCTIONS
These need to be global for HTML onclick attributes
===============================================
*/

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
    
    if (slides.length === 0) return;
    
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
HEADER SCROLL EFFECTS
===============================================
*/

// Change header style based on scroll position
function initHeaderEffects() {
    const header = document.querySelector('.header');
    
    if (!header) {
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
SLIDESHOW INITIALIZATION
===============================================
*/

// Initialize slideshow
function initSlideshow() {
    const slides = document.getElementsByClassName('slide');
    if (slides.length > 0) {
        showSlide(currentSlide);
        startAutoSlide();
        
        // Add hover pause functionality
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) {
            slideshowContainer.addEventListener('mouseenter', stopAutoSlide);
            slideshowContainer.addEventListener('mouseleave', startAutoSlide);
        }
    }
}

// Slideshow Variables
        let currentSlideIndex = 1;
        let slideTimer;
        let progressTimer;
        const AUTO_SLIDE_INTERVAL = 5000;

        // Initialize slideshow
        function initializeSlideshow() {
            showSlide(currentSlideIndex);
            startAutoSlide();
            
            const container = document.querySelector('.slideshow-container');
            if (container) {
                container.addEventListener('mouseenter', pauseAutoSlide);
                container.addEventListener('mouseleave', resumeAutoSlide);
            }
        }

        // Show specific slide
        function showSlide(n) {
            const slides = document.getElementsByClassName('slide');
            const indicators = document.getElementsByClassName('indicator');
            
            if (slides.length === 0) return;
            
            if (n > slides.length) {
                currentSlideIndex = 1;
            }
            if (n < 1) {
                currentSlideIndex = slides.length;
            }
            
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active');
            }
            
            for (let i = 0; i < indicators.length; i++) {
                indicators[i].classList.remove('active');
            }
            
            slides[currentSlideIndex - 1].classList.add('active');
            if (indicators[currentSlideIndex - 1]) {
                indicators[currentSlideIndex - 1].classList.add('active');
            }

            resetProgress();
        }

        // Change slide by offset
        function changeSlide(offset) {
            currentSlideIndex += offset;
            showSlide(currentSlideIndex);
            restartAutoSlide();
        }

        // Go to specific slide
        function goToSlide(n) {
            currentSlideIndex = n;
            showSlide(currentSlideIndex);
            restartAutoSlide();
        }

        // Progress bar
        function updateProgress() {
            const progressBar = document.getElementById('slideProgress');
            let width = 0;
            const increment = 100 / (AUTO_SLIDE_INTERVAL / 50);
            
            clearInterval(progressTimer);
            progressTimer = setInterval(() => {
                if (width >= 100) {
                    clearInterval(progressTimer);
                } else {
                    width += increment;
                    if (progressBar) {
                        progressBar.style.width = width + '%';
                    }
                }
            }, 50);
        }

        function resetProgress() {
            const progressBar = document.getElementById('slideProgress');
            if (progressBar) {
                progressBar.style.width = '0%';
            }
            clearInterval(progressTimer);
            updateProgress();
        }

        // Auto slide functions
        function startAutoSlide() {
            clearInterval(slideTimer);
            slideTimer = setInterval(() => {
                currentSlideIndex++;
                showSlide(currentSlideIndex);
            }, AUTO_SLIDE_INTERVAL);
            updateProgress();
        }

        function pauseAutoSlide() {
            clearInterval(slideTimer);
            clearInterval(progressTimer);
        }

        function resumeAutoSlide() {
            startAutoSlide();
        }

        function restartAutoSlide() {
            pauseAutoSlide();
            startAutoSlide();
        }

        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeSlideshow);
        } else {
            initializeSlideshow();
        }

        // Pause on page visibility change
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                pauseAutoSlide();
            } else {
                resumeAutoSlide();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                changeSlide(1);
            }
        });

/* 
===============================================
CONTACT FORM HANDLING
===============================================
*/

// Initialize contact form with validation
function initFormHandling() {
    const form = document.getElementById('contactForm');
    
    if (!form) {
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
        const originalBg = submitBtn.style.background;
        
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
                submitBtn.style.background = originalBg;
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
            if (document.body.contains(successDiv)) {
                document.body.removeChild(successDiv);
            }
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
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
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
        
        // Remove any existing active class
        link.classList.remove('active');
        
        // Add active class to current page
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '/' && linkPage === 'index.html')) {
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
        initHeaderEffects();
        setActivePage();
        
        // Visual enhancements
        initCardInteractions();
        
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

// Newsletter Section JavaScript
(function() {
  'use strict';

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    initNewsletterSection();
  });

  function initNewsletterSection() {
    const newsletterItems = document.querySelectorAll('.newsletter-item');
    
    // Add hover effects
    newsletterItems.forEach(item => {
      item.addEventListener('mouseenter', handleNewsletterHover);
      item.addEventListener('mouseleave', handleNewsletterLeave);
    });

    // Add click tracking for analytics (optional)
    newsletterItems.forEach(item => {
      const link = item.querySelector('a');
      if (link) {
        link.addEventListener('click', function(e) {
          trackNewsletterClick(this.href);
        });
      }
    });

    // Lazy load images if needed
    lazyLoadNewsletterImages();
  }

  function handleNewsletterHover(e) {
    const card = e.currentTarget;
    card.style.zIndex = '10';
    
    // Add animation class
    card.classList.add('newsletter-hover');
  }

  function handleNewsletterLeave(e) {
    const card = e.currentTarget;
    card.style.zIndex = '1';
    
    // Remove animation class
    card.classList.remove('newsletter-hover');
  }

  function trackNewsletterClick(url) {
    // Analytics tracking (example using console.log)
    console.log('Newsletter clicked:', url);
    
    // If you're using Google Analytics:
    if (typeof gtag !== 'undefined') {
      gtag('event', 'newsletter_click', {
        'event_category': 'Newsletter',
        'event_label': url,
        'value': 1
      });
    }
  }

  function lazyLoadNewsletterImages() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              img.classList.add('loaded');
            }
            
            observer.unobserve(img);
          }
        });
      });

      const lazyImages = document.querySelectorAll('.newsletter-image img[data-src]');
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  // Optional: Auto-rotate newsletter carousel
  function initNewsletterCarousel() {
    const grid = document.querySelector('.newsletter-grid');
    if (!grid) return;

    let currentIndex = 0;
    const items = Array.from(grid.querySelectorAll('.newsletter-item'));
    const itemsToShow = getItemsToShow();
    
    function getItemsToShow() {
      const width = window.innerWidth;
      if (width < 768) return 1;
      if (width < 1024) return 2;
      return 3;
    }

    function rotateCarousel() {
      currentIndex = (currentIndex + 1) % items.length;
      
      // Reorder items
      const firstItem = items.shift();
      items.push(firstItem);
      
      // Rebuild grid
      grid.innerHTML = '';
      items.forEach(item => grid.appendChild(item));
    }

    // Auto-rotate every 5 seconds (optional)
    // Uncomment the line below to enable auto-rotation
    // setInterval(rotateCarousel, 5000);
  }

  // Responsive handling
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Handle responsive changes if needed
      console.log('Window resized');
    }, 250);
  });

  // Add smooth scroll to view more button (optional)
  const viewMoreBtn = document.querySelector('.view-more-btn');
  if (viewMoreBtn && viewMoreBtn.getAttribute('href').startsWith('#')) {
    viewMoreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

})();

// Alternative: jQuery version (if you're using jQuery)
/*
(function($) {
  'use strict';

  $(document).ready(function() {
    // Newsletter hover effects
    $('.newsletter-item').hover(
      function() {
        $(this).css('z-index', '10');
      },
      function() {
        $(this).css('z-index', '1');
      }
    );

    // Track newsletter clicks
    $('.newsletter-item a').on('click', function() {
      var url = $(this).attr('href');
      console.log('Newsletter clicked:', url);
      
      // Google Analytics tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_click', {
          'event_category': 'Newsletter',
          'event_label': url,
          'value': 1
        });
      }
    });
  });

})(jQuery);
*/