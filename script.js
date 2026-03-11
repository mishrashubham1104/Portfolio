// ========== TYPING ANIMATION ==========
const heroText = document.querySelector('.hero p');
if (heroText) {
    const originalText = heroText.innerHTML;
    heroText.innerHTML = `<span class="typing-container"><span class="typing-text" id="typingText"></span></span><br>Building responsive, role-based web applications with modern technologies`;
    
    const typingText = document.getElementById('typingText');
    const texts = [
        { text: 'Full Stack Developer', color: '#3b82f6' },      // Blue
        { text: 'MERN Stack Specialist', color: '#06b6d4' },     // Cyan
        { text: 'Problem Solver', color: '#8b5cf6' },            // Purple
        { text: 'Code Enthusiast', color: '#10b981' }            // Green
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function typeEffect() {
        const currentItem = texts[textIndex];
        const currentText = currentItem.text;
        
        // Update color
        typingText.style.color = currentItem.color;
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 100;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 1000);
}

// ========== CUSTOM CURSOR GLOW ==========
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursorDot);

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;
let dotX = 0, dotY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Move dot instantly
    dotX = mouseX;
    dotY = mouseY;
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
});

// Smooth follow animation for glow
function animateCursor() {
    const speed = 0.15;
    glowX += (mouseX - glowX) * speed;
    glowY += (mouseY - glowY) * speed;
    
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect for cursor
const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-tag, .contact-card, .social-icon');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorGlow.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('hover');
    });
});

// ========== SCROLL PROGRESS BAR ==========
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.prepend(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ========== MAGNETIC BUTTON EFFECT ==========
const magneticButtons = document.querySelectorAll('.btn');

magneticButtons.forEach(btn => {
    btn.classList.add('btn-magnetic');
    
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ========== SKILL REVEAL ANIMATION ==========
const skillTags = document.querySelectorAll('.skill-tag');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, {
    threshold: 0.2
});

skillTags.forEach(tag => {
    skillObserver.observe(tag);
});

// ========== PROJECT CARD TILT ANIMATION ==========
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ========== PARTICLE ANIMATION ==========
const canvas = document.createElement('canvas');
canvas.id = 'particles-canvas';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 80;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * 
                           (particlesArray[a].x - particlesArray[b].x)) +
                          ((particlesArray[a].y - particlesArray[b].y) * 
                           (particlesArray[a].y - particlesArray[b].y));
            
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                let opacity = 1 - (distance / 20000);
                ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.2})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    
    connectParticles();
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// ========== MOBILE MENU TOGGLE ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-animate').forEach(element => {
    observer.observe(element);
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== NAVBAR SCROLL EFFECT ==========
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        nav.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        nav.style.boxShadow = 'none';
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #06b6d4; font-size: 20px; font-weight: bold;');
console.log('%c👨‍💻 Built by Shubham Mishra', 'color: #3b82f6; font-size: 14px;');

// ========== CONTACT FORM HANDLING ==========
const contactFormMain = document.getElementById('contactForm');
if (contactFormMain) {
    contactFormMain.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formStatus = document.getElementById('formStatus');
        const formData = new FormData(contactFormMain);
        
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Show loading state
        const submitBtn = contactFormMain.querySelector('.form-submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate sending (replace with actual backend call)
        setTimeout(() => {
            formStatus.className = 'form-status success';
            formStatus.textContent = `Thank you, ${name}! Your message has been received. I'll get back to you at ${email} soon!`;
            contactFormMain.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Hide message after 8 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 8000);
        }, 1500);
        
        /* 
        // For actual backend implementation, uncomment and modify:
        fetch('your-backend-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {
            formStatus.className = 'form-status success';
            formStatus.textContent = 'Message sent successfully!';
            contactFormMain.reset();
        })
        .catch(error => {
            formStatus.className = 'form-status error';
            formStatus.textContent = 'Failed to send message. Please try again.';
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
        */
    });
}

// ========== ENHANCED BACKGROUND ANIMATIONS ==========

// Create floating dots animation
function createFloatingDots() {
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'floating-dots';
    dotsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 30; i++) {
        const dot = document.createElement('div');
        dot.className = 'floating-dot';
        
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 15;
        const animationDelay = Math.random() * 5;
        const opacity = Math.random() * 0.3 + 0.1;
        
        dot.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(6, 182, 212, ${opacity}), rgba(59, 130, 246, ${opacity}));
            border-radius: 50%;
            left: ${left}%;
            bottom: -20px;
            animation: floatUp ${animationDuration}s ease-in ${animationDelay}s infinite;
            box-shadow: 0 0 ${size * 3}px rgba(6, 182, 212, ${opacity});
        `;
        
        dotsContainer.appendChild(dot);
    }
    
    document.body.prepend(dotsContainer);
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) translateX(0) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) scale(0.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize floating dots
createFloatingDots();

// Create gradient mesh animation
function createGradientMesh() {
    const meshContainer = document.createElement('div');
    meshContainer.className = 'gradient-mesh';
    meshContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
        opacity: 0.4;
        background: 
            radial-gradient(at 20% 30%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
            radial-gradient(at 80% 70%, rgba(6, 182, 212, 0.15) 0px, transparent 50%),
            radial-gradient(at 40% 80%, rgba(139, 92, 246, 0.15) 0px, transparent 50%),
            radial-gradient(at 60% 20%, rgba(16, 185, 129, 0.1) 0px, transparent 50%);
        filter: blur(40px);
        animation: meshMove 20s ease-in-out infinite;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes meshMove {
            0%, 100% {
                transform: scale(1) translate(0, 0);
            }
            33% {
                transform: scale(1.1) translate(20px, -20px);
            }
            66% {
                transform: scale(0.95) translate(-20px, 20px);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.prepend(meshContainer);
}

// Initialize gradient mesh
createGradientMesh();

// Parallax effect for background elements
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            
            // Parallax for shapes
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.05);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            // Parallax for floating dots
            const floatingDots = document.querySelector('.floating-dots');
            if (floatingDots) {
                floatingDots.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            
            // Parallax for gradient mesh
            const gradientMesh = document.querySelector('.gradient-mesh');
            if (gradientMesh) {
                gradientMesh.style.transform = `translateY(${scrolled * 0.15}px) scale(${1 + scrolled * 0.0001})`;
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// Add mouse move parallax effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Move gradient mesh based on mouse
    const gradientMesh = document.querySelector('.gradient-mesh');
    if (gradientMesh) {
        gradientMesh.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    }
    
    // Move shapes slightly based on mouse
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 5 + (index * 2);
        shape.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
    });
});

console.log('%c🎨 Enhanced Background Animations Loaded!', 'color: #06b6d4; font-size: 16px; font-weight: bold;');

// ========== ACTIVE NAVIGATION LINK HIGHLIGHTING ==========
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-links a:not(.resume-nav-link)');
    const sections = document.querySelectorAll('section[id]');
    
    // Remove active class from all links
    function removeActiveClasses() {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    }
    
    // Add active class based on scroll position
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                removeActiveClasses();
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink && !activeLink.classList.contains('resume-nav-link')) {
                    activeLink.classList.add('active');
                }
            }
        });
        
        // If at top of page, activate Home
        if (scrollY < 100) {
            removeActiveClasses();
            const homeLink = document.querySelector('.nav-links a[href="#home"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }
    }
    
    // Click event for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            removeActiveClasses();
            this.classList.add('active');
        });
    });
    
    // Scroll event
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Set initial active state
    highlightNavOnScroll();
}

// Initialize active navigation highlighting
setActiveNavLink();

console.log('%c🎯 Active Navigation Highlighting Enabled!', 'color: #06b6d4; font-size: 14px; font-weight: bold;');

// ========== MODAL FUNCTIONALITY ==========
const educationBtn = document.getElementById('educationBtn');
const skillsBtn = document.getElementById('skillsBtn');
const educationModal = document.getElementById('educationModal');
const skillsModal = document.getElementById('skillsModal');
const closeButtons = document.querySelectorAll('.close-modal');

// Open Education Modal
if (educationBtn) {
    educationBtn.addEventListener('click', () => {
        educationModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Open Skills Modal
if (skillsBtn) {
    skillsBtn.addEventListener('click', () => {
        skillsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close Modal Function
function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close buttons
closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        closeModal(modal);
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal);
        }
    }
});

console.log('%c📚 Education & Skills Modals Loaded!', 'color: #10b981; font-size: 14px; font-weight: bold;');

// ========== IMAGE ROTATION ==========
function rotateImages(containerSelector, imageClass) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const images = container.querySelectorAll(imageClass);
    if (images.length === 0) return;
    
    let currentIndex = 0;
    
    setInterval(() => {
        // Remove active class from current image
        images[currentIndex].classList.remove('active');
        
        // Move to next image
        currentIndex = (currentIndex + 1) % images.length;
        
        // Add active class to next image
        images[currentIndex].classList.add('active');
    }, 3000); // Rotate every 3 seconds
}

// Initialize image rotation for hero section
rotateImages('.hero-image-container', '.hero-image');

// Initialize image rotation for about section
rotateImages('.about-image-container', '.about-img');

console.log('%c🔄 Image Rotation Activated! (3 seconds interval)', 'color: #8b5cf6; font-size: 14px; font-weight: bold;');