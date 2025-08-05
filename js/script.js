// Theme Management
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update theme toggle icon
    const themeToggle = document.querySelector('.theme-toggle i');
    if (newTheme === 'dark') {
        themeToggle.className = 'fas fa-sun';
    } else {
        themeToggle.className = 'fas fa-moon';
    }
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Set initial icon
    const themeToggle = document.querySelector('.theme-toggle i');
    if (savedTheme === 'dark') {
        themeToggle.className = 'fas fa-sun';
    } else {
        themeToggle.className = 'fas fa-moon';
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Cursor-reactive background animation
function initializeBackgroundAnimation() {
    const container = document.getElementById('backgroundAnimation');
    const particleCount = 25; // Increased particle count
    
    // Create floating particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        // Add random scale variation
        const scale = 0.8 + Math.random() * 0.5;
        particle.style.transform = `scale(${scale})`;
        
        container.appendChild(particle);
    }
    
    // Add enhanced cursor interaction
    document.addEventListener('mousemove', (e) => {
        const particles = container.querySelectorAll('.floating-particle');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.8; // Increased reactivity
            const x = (mouseX - 0.5) * speed * 80; // Increased movement range
            const y = (mouseY - 0.5) * speed * 80;
            
            // Add rotation for more dynamic movement
            const rotation = (mouseX * mouseY) * 180;
            
            // Apply transforms with scale preserved
            const scale = 0.8 + Math.random() * 0.5;
            particle.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
            
            // Increase opacity range for better visibility
            const baseOpacity = document.documentElement.getAttribute('data-theme') === 'dark' ? 0.2 : 0.25;
            particle.style.opacity = baseOpacity + (mouseX + mouseY) * 0.15;
        });
    });
    
    // Add subtle pulsing effect
    setInterval(() => {
        const particles = container.querySelectorAll('.floating-particle');
        particles.forEach((particle) => {
            const currentScale = parseFloat(getComputedStyle(particle).getPropertyValue('transform').split(',')[0].slice(7)) || 1;
            const newScale = currentScale < 1 ? currentScale * 1.2 : currentScale * 0.9;
            particle.style.transform = particle.style.transform.replace(/scale\([^)]*\)/, `scale(${newScale})`);
        });
    }, 3000);
}

// Navigation transparency on scroll
function initializeNavScroll() {
    const nav = document.querySelector('nav');
    let isScrolled = false;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50 && !isScrolled) {
            nav.classList.add('scrolled');
            isScrolled = true;
        } else if (scrollTop <= 50 && isScrolled) {
            nav.classList.remove('scrolled');
            isScrolled = false;
        }
    });
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Navigation background on scroll
function handleNavScroll() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            nav.style.background = 'rgba(17, 24, 39, 0.98)';
        }
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            nav.style.background = 'rgba(17, 24, 39, 0.95)';
        }
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Skill bar animations
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0%';
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// PDF Export functionality
function exportToPDF() {
    // Show info message
    const infoBar = document.createElement('div');
    infoBar.textContent = 'Coming soon!';
    infoBar.style.position = 'fixed';
    infoBar.style.top = '0';
    infoBar.style.left = '0';
    infoBar.style.right = '0';
    infoBar.style.padding = '10px';
    infoBar.style.background = 'var(--primary-color)';
    infoBar.style.color = 'white';
    infoBar.style.textAlign = 'center';
    infoBar.style.zIndex = '1000';
    infoBar.style.animation = 'slideDown 0.3s ease-in-out';
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Add to document
    document.body.appendChild(infoBar);
    
    // Remove after 3 seconds
    setTimeout(() => {
        infoBar.style.animation = 'slideDown 0.3s ease-in-out reverse';
        setTimeout(() => {
            document.body.removeChild(infoBar);
            document.head.removeChild(style);
        }, 300);
    }, 3000);
}

// Typing animation for hero section
function initializeTypingAnimation() {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Parallax effect for hero section
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Contact form validation (if form exists)
function initializeContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mobile menu functionality (if mobile menu exists)
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add loading animation
function showPageLoader() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    document.body.appendChild(loader);
    
    // Remove loader when page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 300);
        }, 500);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSectionParticles();
    initializeScrollObserver();
    initializeParticleInteraction();

    function initializeSectionParticles() {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'section-particles';
            
            // Create particles
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particlesContainer.appendChild(particle);
            }
            
            section.appendChild(particlesContainer);
        });
    }

    function initializeScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }

    function initializeParticleInteraction() {
        document.addEventListener('mousemove', (e) => {
            const sections = document.querySelectorAll('.section.in-view');
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    const particles = section.querySelectorAll('.particle');
                    particles.forEach(particle => {
                        const particleRect = particle.getBoundingClientRect();
                        const dx = e.clientX - (particleRect.left + particleRect.width / 2);
                        const dy = e.clientY - (particleRect.top + particleRect.height / 2);
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        const maxDistance = 200;
                        
                        if (distance < maxDistance) {
                            const angle = Math.atan2(dy, dx);
                            const force = (maxDistance - distance) / maxDistance;
                            const moveX = Math.cos(angle) * force * 20;
                            const moveY = Math.sin(angle) * force * 20;
                            particle.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
                        } else {
                            particle.style.transform = 'translate(0, 0)';
                        }
                    });
                }
            });
        });
    }

    // Core functionality
    initializeTheme();
    initializeSmoothScrolling();
    initializeScrollAnimations();
    animateSkillBars();
    
    // Enhanced features
    initializeBackgroundAnimation();
    initializeNavScroll();
    initializeTypingAnimation();
    initializeParallax();
    initializeContactForm();
    initializeMobileMenu();
    initializeLazyLoading();
    
    // Event listeners
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        handleNavScroll();
    });
    
    // Initial calls
    updateActiveNavLink();
    handleNavScroll();
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.project-card, .skill-category, .contact-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click ripple effect
    const buttons = document.querySelectorAll('button, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.3s ease;
    }
    
    .loader-content {
        text-align: center;
        color: var(--text-primary);
    }
    
    .loader-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid var(--border-color);
        border-top: 4px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);