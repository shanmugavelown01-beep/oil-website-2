// ============================================
// LEVI PREMIUM OILS - INTERACTIVE FEATURES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeFormHandling();
    initializeAnimations();
});

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                navMenu.style.display = 'none';
            }
        });
    });

    // Mobile hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.position = 'absolute';
                navMenu.style.flexDirection = 'column';
                navMenu.style.top = '70px';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'white';
                navMenu.style.gap = '0';
            }
        });
    }
}

// ============================================
// SCROLL EFFECTS
// ============================================

function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and elements for animation
    document.querySelectorAll('.oil-card, .benefit-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroVisual = document.querySelector('.hero-visual');

        if (heroVisual && scrollY < 800) {
            heroVisual.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    });
}

// ============================================
// FORM HANDLING
// ============================================

function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
            const email = contactForm.querySelector('input[placeholder="Your Email"]').value;
            const message = contactForm.querySelector('textarea').value;

            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Show success message (in production, this would send to a server)
            alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`);

            // Reset form
            contactForm.reset();
        });
    }
}

// ============================================
// ADD TO CART FUNCTIONALITY
// ============================================

function initializeCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.oil-card');
            const productName = card.querySelector('h3').textContent;
            const price = card.querySelector('.price').textContent;

            // Show feedback
            const originalText = button.textContent;
            button.textContent = '✓ Added to Cart!';
            button.style.background = 'linear-gradient(135deg, #4a7c2c, #2d5016)';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);

            // Log to console (in production, would update actual cart)
            console.log(`Added to cart: ${productName} - ${price}`);
        });
    });
}

// ============================================
// SMOOTH ANIMATIONS
// ============================================

function initializeAnimations() {
    // Initialize cart functionality
    initializeCart();

    // Add animation to elements on page load
    const animatedElements = document.querySelectorAll(
        '.hero-title, .hero-subtitle, .cta-button'
    );

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `slideInLeft 0.8s ease-out ${index * 0.1}s forwards`;
    });

    // Counter animation for numbers
    const counterElements = document.querySelectorAll('[data-count]');
    counterElements.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        animateCounter(el, target);
    });

    // Hover effects
    document.querySelectorAll('.oil-card, .benefit-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================

function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 50);

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = current;
        }
    }, 20);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Scroll to top button (optional enhancement)
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2d5016, #4a7c2c);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 999;
        font-size: 20px;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================

document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.style.display = 'none';
        }
    }
});

// ============================================
// LAZY LOADING IMAGES (if needed)
// ============================================

function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initializeLazyLoading();

// ============================================
// MOBILE RESPONSIVE IMPROVEMENTS
// ============================================

function improveResponsiveness() {
    const isMobile = window.innerWidth <= 768;

    // Adjust animations for mobile
    if (isMobile) {
        document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        const nowMobile = window.innerWidth <= 768;
        if (nowMobile && !isMobile) {
            // Switched to mobile
            document.querySelector('.nav-menu').style.display = 'none';
        }
    });
}

improveResponsiveness();

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
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

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

console.log('Levi Premium Oils Website - All systems initialized! 🌿');
