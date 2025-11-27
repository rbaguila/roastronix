/**
 * RoasTronix - Interactive Behaviors
 * Museum-quality smooth interactions and animations
 */

// ==========================================
// Premium Custom Cursor
// ==========================================
(function initCustomCursor() {
    // Only on desktop
    if (window.innerWidth <= 768) return;

    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';

    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        // Smooth cursor follow
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        dotX += (mouseX - dotX) * 0.25;
        dotY += (mouseY - dotY) * 0.25;

        cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
        cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;

        requestAnimationFrame(animate);
    }

    animate();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .roaster-card, .machine-feature, input, textarea, select');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('link-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('link-hover');
        });
    });
})();

// ==========================================
// Page Load Animation
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// Navigation Scroll Effect
// ==========================================
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ==========================================
// Mobile Menu Toggle
// ==========================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');

        // Animate hamburger to X
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking nav links
const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// ==========================================
// Smooth Scroll for Anchor Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const navHeight = nav.offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Intersection Observer for Scroll Animations
// ==========================================
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

// Observe elements for scroll animations
const animateOnScroll = document.querySelectorAll(`
    .value-item,
    .roaster-card,
    .machine-feature,
    .achievement-item,
    .about-content,
    .about-image,
    .contact-info,
    .contact-form-wrapper
`);

animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ==========================================
// Parallax Effect for Hero Background
// ==========================================
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    }
});

// ==========================================
// Form Handling
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            interest: document.getElementById('interest').value,
            message: document.getElementById('message').value
        };

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success feedback
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#4caf50';

            // Reset form
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
            }, 3000);

            // Log form data (replace with actual API call)
            console.log('Form submitted:', formData);
        }, 1500);
    });
}

// ==========================================
// Image Lazy Loading Fallback
// ==========================================
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==========================================
// Roaster Card Tilt Effect (Desktop Only)
// ==========================================
if (window.innerWidth > 1024) {
    const roasterCards = document.querySelectorAll('.roaster-card');

    roasterCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ==========================================
// Stat Counter Animation
// ==========================================
const statNumbers = document.querySelectorAll('.stat-number');

const animateStats = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;

            // Only animate numeric values
            if (!isNaN(finalValue) && finalValue.includes('%')) {
                const numericValue = parseInt(finalValue);
                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        target.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + '%';
                    }
                }, 30);
            }

            observer.unobserve(target);
        }
    });
};

const statsObserver = new IntersectionObserver(animateStats, {
    threshold: 0.5
});

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ==========================================
// Active Navigation Link Highlighting
// ==========================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ==========================================
// Keyboard Accessibility Enhancements
// ==========================================
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ==========================================
// Preload Critical Images
// ==========================================
window.addEventListener('load', () => {
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

// ==========================================
// Performance: Debounce Scroll Events
// ==========================================
function debounce(func, wait = 10) {
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

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Additional scroll operations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ==========================================
// Console Art (Easter Egg)
// ==========================================
console.log('%c RoasTronix ', 'background: #8b5a3c; color: white; font-size: 24px; padding: 10px;');
console.log('%c The Art of Intelligent Roasting ', 'color: #8b5a3c; font-size: 14px;');
console.log('%c Crafted with precision and care ', 'color: #666; font-size: 12px; font-style: italic;');
