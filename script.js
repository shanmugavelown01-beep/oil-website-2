// ============================================
// LEVI PREMIUM OILS - INTERACTIVE FEATURES
// ============================================

// Shopping Cart State
let cart = [];
const products = [
    { id: 1, name: 'Levi Groundnut Oil', price: 12.99, volume: '500ml' },
    { id: 2, name: 'Levi Coconut Oil', price: 14.99, volume: '500ml' },
    { id: 3, name: 'Levi Sesame Oil', price: 13.99, volume: '250ml' },
    { id: 4, name: 'Levi Sunflower Oil', price: 10.99, volume: '500ml' },
    { id: 5, name: 'Levi Castor Oil', price: 11.99, volume: '250ml' }
];

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeFormHandling();
    initializeAnimations();
    initializeShoppingCart();
    initializeCheckout();
    loadCartFromStorage();
});

// ============================================
// SHOPPING CART SYSTEM
// ============================================

function initializeShoppingCart() {
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.getElementById('cartClose');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Toggle cart sidebar
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartSidebar.classList.toggle('active');
        });
    }

    if (cartClose) {
        cartClose.addEventListener('click', () => {
            cartSidebar.classList.toggle('active');
        });
    }

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.oil-card');
            const productName = card.querySelector('h3').textContent;
            const priceText = card.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            const product = products.find(p => p.name === productName);

            addToCart(product);
            
            // Visual feedback
            button.textContent = '✓ Added!';
            button.style.background = 'linear-gradient(135deg, #4a7c2c, #2d5016)';
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.style.background = '';
            }, 1500);

            // Show toast notification
            showNotification(`${productName} added to cart!`);
        });
    });
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartDisplay();
    saveCartToStorage();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToStorage();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
            saveCartToStorage();
        }
    }
}

function updateCartDisplay() {
    const cartBadge = document.getElementById('cartBadge');
    const cartItems = document.getElementById('cartItems');
    const subtotal = document.getElementById('subtotal');
    const tax = document.getElementById('tax');
    const cartTotal = document.getElementById('cartTotal');

    // Update badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        subtotal.textContent = '$0.00';
        tax.textContent = '$0.00';
        cartTotal.textContent = '$0.00';
        return;
    }

    // Render cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-details">
                    <span>$${item.price.toFixed(2)} × ${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="qty-button" onclick="updateQuantity(${item.id}, -1)">−</button>
                <span class="qty-display">${item.quantity}</span>
                <button class="qty-button" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    // Calculate totals
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = subtotalAmount * 0.1;
    const totalAmount = subtotalAmount + taxAmount;

    subtotal.textContent = '$' + subtotalAmount.toFixed(2);
    tax.textContent = '$' + taxAmount.toFixed(2);
    cartTotal.textContent = '$' + totalAmount.toFixed(2);
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// ============================================
// CHECKOUT SYSTEM
// ============================================

function initializeCheckout() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const modalClose = document.getElementById('modalClose');
    const cancelCheckout = document.getElementById('cancelCheckout');
    const placeOrder = document.getElementById('placeOrder');
    const paymentForm = document.getElementById('paymentForm');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', openCheckout);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeCheckout);
    }

    if (cancelCheckout) {
        cancelCheckout.addEventListener('click', closeCheckout);
    }

    if (placeOrder) {
        placeOrder.addEventListener('click', processOrder);
    }

    if (paymentForm) {
        paymentForm.addEventListener('change', (e) => {
            if (e.target.name === 'payment') {
                updatePaymentDisplay(e.target.value);
            }
        });
    }

    // Format card input
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', function() {
            this.value = this.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
        });
    }

    const cardExpiry = document.getElementById('cardExpiry');
    if (cardExpiry) {
        cardExpiry.addEventListener('input', function() {
            if (this.value.length === 2) {
                this.value += '/';
            }
        });
    }
}

function openCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }

    const checkoutModal = document.getElementById('checkoutModal');
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.remove('active');
    checkoutModal.classList.add('active');
    updateCheckoutSummary();
}

function closeCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.classList.remove('active');
}

function updatePaymentDisplay(method) {
    const cardPayment = document.getElementById('cardPayment');
    const paypalPayment = document.getElementById('paypalPayment');
    const bankPayment = document.getElementById('bankPayment');

    cardPayment.style.display = 'none';
    paypalPayment.style.display = 'none';
    bankPayment.style.display = 'none';

    if (method === 'card') {
        cardPayment.style.display = 'block';
    } else if (method === 'paypal') {
        paypalPayment.style.display = 'block';
    } else if (method === 'bank') {
        bankPayment.style.display = 'block';
    }
}

function updateCheckoutSummary() {
    const summaryItems = document.getElementById('summaryItems');
    const orderSubtotal = document.getElementById('orderSubtotal');
    const orderTax = document.getElementById('orderTax');
    const shipping = document.getElementById('shipping');
    const orderTotal = document.getElementById('orderTotal');

    summaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <div>
                <div class="summary-item-name">${item.name}</div>
                <div style="font-size: 0.8rem; color: #666;">Qty: ${item.quantity}</div>
            </div>
            <span class="summary-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = subtotalAmount * 0.1;
    const shippingAmount = 5.00;
    const totalAmount = subtotalAmount + taxAmount + shippingAmount;

    orderSubtotal.textContent = '$' + subtotalAmount.toFixed(2);
    orderTax.textContent = '$' + taxAmount.toFixed(2);
    shipping.textContent = '$' + shippingAmount.toFixed(2);
    orderTotal.textContent = '$' + totalAmount.toFixed(2);
}

function processOrder() {
    const billingForm = document.getElementById('billingForm');
    const paymentForm = document.getElementById('paymentForm');

    // Validate forms
    if (!billingForm.checkValidity() || !paymentForm.checkValidity()) {
        showNotification('Please fill in all required fields', 'error');
        billingForm.reportValidity();
        paymentForm.reportValidity();
        return;
    }

    // Get form data
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const country = document.getElementById('country').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    // Create order object
    const order = {
        orderNumber: 'ORD-' + Date.now(),
        date: new Date().toLocaleDateString(),
        customer: { fullName, email, phone, address, city, state, zip, country },
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        tax: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.1,
        shipping: 5.00,
        paymentMethod: paymentMethod
    };

    // Log order (in production, send to server)
    console.log('Order placed:', order);

    // Show confirmation
    showOrderConfirmation(order);
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    saveCartToStorage();
}

function showOrderConfirmation(order) {
    const checkoutModal = document.getElementById('checkoutModal');
    const confirmationModal = document.getElementById('confirmationModal');
    const orderNumber = document.getElementById('orderNumber');
    const confirmationTotal = document.getElementById('confirmationTotal');
    const continueShoppingBtn = document.getElementById('continueShoppingBtn');

    const total = order.subtotal + order.tax + order.shipping;

    orderNumber.textContent = order.orderNumber;
    confirmationTotal.textContent = '$' + total.toFixed(2);

    checkoutModal.classList.remove('active');
    confirmationModal.classList.add('active');

    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', () => {
            confirmationModal.classList.remove('active');
        });
    }

    // Auto-close confirmation after 5 seconds
    setTimeout(() => {
        confirmationModal.classList.remove('active');
    }, 10000);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ff6b6b' : '#4a7c2c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

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
