// Banner auto slide
let currentBanner = 0;
const slides = document.querySelectorAll('.banner-slide');
const dots = document.querySelectorAll('.dot');
function showBannerSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
  });
}
function nextBannerSlide() {
  currentBanner = (currentBanner + 1) % slides.length;
  showBannerSlide(currentBanner);
}
setInterval(nextBannerSlide, 4000);
// Cho phép click dot để chuyển slide thủ công
window.currentBannerSlide = function(idx) {
  currentBanner = idx - 1;
  showBannerSlide(currentBanner);
}

// Enhanced Mobile Menu with Better UX
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            
            // Animate hamburger lines
            const spans = hamburger.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transition = 'all 0.3s ease';
                if (hamburger.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on window resize if screen becomes larger
        window.addEventListener('resize', () => {
            if (window.innerWidth > 991) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Responsive Image Loading
function initResponsiveImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading="lazy" for better performance
        img.loading = 'lazy';
        
        // Add error handling
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    });
}

// Touch-friendly Interactions
function initTouchInteractions() {
    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        btn.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add touch feedback for cards
    const cards = document.querySelectorAll('.feature-card, .program-card, .student-story');
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Viewport Detection
function initViewportDetection() {
    const isMobile = () => window.innerWidth <= 767;
    const isTablet = () => window.innerWidth > 767 && window.innerWidth <= 991;
    const isDesktop = () => window.innerWidth > 991;
    
    // Add viewport classes to body
    function updateViewportClasses() {
        document.body.classList.remove('mobile', 'tablet', 'desktop');
        if (isMobile()) {
            document.body.classList.add('mobile');
        } else if (isTablet()) {
            document.body.classList.add('tablet');
        } else {
            document.body.classList.add('desktop');
        }
    }
    
    updateViewportClasses();
    window.addEventListener('resize', updateViewportClasses);
}

// Performance Optimization for Mobile
function initMobileOptimizations() {
    // Reduce animations on mobile for better performance
    if (window.innerWidth <= 767) {
        const animatedElements = document.querySelectorAll('.feature-card, .program-card, .student-story');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }
    
    // Optimize scroll performance
    let ticking = false;
    function updateScroll() {
        // Scroll-based effects can go here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Accessibility Improvements
function initAccessibility() {
    // Add keyboard navigation for mobile menu
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
            }
        });
        
        hamburger.setAttribute('tabindex', '0');
        hamburger.setAttribute('role', 'button');
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('aria-expanded', 'false');
        
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.classList.contains('active');
            hamburger.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Add focus management for mobile menu
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const hamburger = document.querySelector('.hamburger');
                if (hamburger) hamburger.click();
            }
        });
    }
}

// Modern Effects and Animations

// Scroll Progress Bar
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Scroll Reveal Effect
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // Add reveal classes to elements
    const elementsToReveal = document.querySelectorAll('.feature-card, .program-card, .student-story, .tradition-item, .summer-card, .method-item, .program-item, .stat-item');
    elementsToReveal.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Left reveal for text elements
    const leftRevealElements = document.querySelectorAll('.about-text, .btec-vision, .btec-goals, .edexcel-info');
    leftRevealElements.forEach((el, index) => {
        el.classList.add('reveal-left');
        el.style.animationDelay = `${index * 0.2}s`;
        observer.observe(el);
    });
    
    // Right reveal for images
    const rightRevealElements = document.querySelectorAll('.about-image, .btec-main-info-image');
    rightRevealElements.forEach((el, index) => {
        el.classList.add('reveal-right');
        el.style.animationDelay = `${index * 0.2}s`;
        observer.observe(el);
    });
    
    // Scale reveal for special elements
    const scaleRevealElements = document.querySelectorAll('.section-header, .hero-content');
    scaleRevealElements.forEach((el, index) => {
        el.classList.add('reveal-scale');
        el.style.animationDelay = `${index * 0.3}s`;
        observer.observe(el);
    });
}

// Particle Background Effect
function createParticles() {
    const heroBanner = document.querySelector('.hero-banner');
    if (!heroBanner) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    heroBanner.appendChild(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Enhanced Button Effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.classList.add('btn-modern');
        
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax Effect for Hero Banner
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBanner = document.querySelector('.hero-banner');
        const heroContent = document.querySelector('.hero-content');
        
        if (heroBanner && heroContent) {
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Enhanced Card Hover Effects
function initCardEffects() {
    const cards = document.querySelectorAll('.feature-card, .program-card, .student-story');
    cards.forEach(card => {
        card.classList.add('hover-lift');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(2deg) rotateY(2deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
}

// Loading Animation
function initLoadingAnimation() {
    const loadingElements = document.querySelectorAll('.feature-card, .program-card, .student-story');
    loadingElements.forEach((el, index) => {
        el.classList.add('loading');
        setTimeout(() => {
            el.classList.add('loaded');
        }, index * 200);
    });
}

// Counter Up Effect for .stat-number
function animateCounterUp() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 80; // tăng giá trị để chạy chậm hơn

    function runCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const isPercent = counter.textContent.includes('%');
        const isPlus = counter.textContent.includes('+');
        let suffix = '';
        if (isPercent) suffix = '%';
        if (isPlus) suffix = '+';
        let count = 0;
        const step = Math.max(1, Math.ceil(target / speed));
        function updateCounter() {
            if (count < target) {
                count += step;
                if (count > target) count = target;
                counter.textContent = count + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        }
        updateCounter();
    }

    // Dùng IntersectionObserver để phát hiện khi counter xuất hiện trên màn hình
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter(entry.target);
            } else {
                // Reset về 0 khi rời khỏi màn hình
                const target = +entry.target.getAttribute('data-target');
                const isPercent = entry.target.textContent.includes('%');
                const isPlus = entry.target.textContent.includes('+');
                let suffix = '';
                if (isPercent) suffix = '%';
                if (isPlus) suffix = '+';
                entry.target.textContent = '0' + suffix;
            }
        });
    }, { threshold: 0.5 }); // 50% xuất hiện mới chạy

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createScrollProgressBar();
    initScrollReveal();
    createParticles();
    initButtonEffects();
    initSmoothScroll();
    initParallaxEffect();
    initCardEffects();
    initLoadingAnimation();
    initMobileMenu();
    initResponsiveImages();
    initTouchInteractions();
    initViewportDetection();
    initMobileOptimizations();
    initAccessibility();
    animateCounterUp();
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can go here
}, 16)); // ~60fps
