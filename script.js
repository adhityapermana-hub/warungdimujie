// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const preloader = document.querySelector('.preloader');
const currentYear = document.getElementById('currentYear');
const animateElements = document.querySelectorAll('.animate-on-scroll');
const backToTopButton = document.querySelector('.back-to-top');
const floatingWA = document.querySelector('.floating-wa');
const categoryButtons = document.querySelectorAll('.category-btn');
const menuCards = document.querySelectorAll('.menu-card');
const orderButtons = document.querySelectorAll('.menu-order-btn');

// Set current year
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }, 1500);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    // Navbar background on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
    
    // Animate elements on scroll
    animateOnScroll();
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Back to top functionality
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Menu category filtering
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.dataset.category;
        
        // Filter menu cards
        menuCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Order button functionality
orderButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const itemName = button.dataset.item;
        
        // Create WhatsApp message
        const message = `Halo Warung Dimujie, saya ingin memesan ${itemName}.`;
        const whatsappURL = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
        
        // Open WhatsApp
        window.open(whatsappURL, '_blank');
    });
});

// Notification system
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    // Add animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-content i {
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(styleSheet);
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Animate elements on scroll
function animateOnScroll() {
    const windowHeight = window.innerHeight;
    const triggerBottom = windowHeight * 0.85;
    
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.classList.add('visible');
            
            // Apply delay if specified
            const delay = element.getAttribute('data-delay');
            if (delay) {
                element.style.transitionDelay = `${delay}s`;
            }
        }
    });
}

// Initial animation check
animateOnScroll();

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        const rate = scrolled * -0.3;
        heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effect to menu cards
menuCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            card.style.transform = 'translateY(-10px)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            card.style.transform = 'translateY(0)';
        }
    });
    
    // Touch support for mobile
    card.addEventListener('touchstart', () => {
        card.classList.add('touched');
    }, { passive: true });
    
    card.addEventListener('touchend', () => {
        setTimeout(() => {
            card.classList.remove('touched');
        }, 150);
    }, { passive: true });
});

// Add CSS for touch effect
const touchStyle = document.createElement('style');
touchStyle.textContent = `
    .menu-card.touched {
        transform: scale(0.98) !important;
        transition: transform 0.1s ease !important;
    }
`;
document.head.appendChild(touchStyle);

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on desktop
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Re-check animations
        animateOnScroll();
    }, 250);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Korean decorative effect
    createKoreanDecoration();
});

// Create Korean decorative elements
function createKoreanDecoration() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .decoration-korean {
            position: absolute;
            top: -10px;
            right: -10px;
            width: 100px;
            height: 100px;
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20,20 L80,20 L80,80 L20,80 Z' stroke='%23CD2C2C' stroke-width='2' fill='none' stroke-opacity='0.3'/%3E%3Cpath d='M30,30 L70,30 L70,70 L30,70 Z' stroke='%23003366' stroke-width='2' fill='none' stroke-opacity='0.3'/%3E%3Ccircle cx='50' cy='50' r='15' stroke='%23CD2C2C' stroke-width='2' fill='none' stroke-opacity='0.3'/%3E%3C/svg%3E");
            animation: spin 20s linear infinite;
            pointer-events: none;
            z-index: -1;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(styleSheet);
}