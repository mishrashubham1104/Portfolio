// ========== TYPING ANIMATION ==========
const heroText = document.querySelector('.hero p');
if (heroText) {
    const originalText = heroText.innerHTML;
    heroText.innerHTML = `<span class="typing-container"><span class="typing-text" id="typingText"></span></span>`;
    
    const typingText = document.getElementById('typingText');
    const texts = [
        'Full Stack Developer',
        'MERN Stack Specialist', 
        'Problem Solver',
        'Code Enthusiast'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function typeEffect() {
        const currentText = texts[textIndex];
        
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

// ========== PARALLAX EFFECT ON SCROLL ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-image');
    
    parallaxElements.forEach(element => {
        const speed = 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
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
        
        
        // For actual backend implementation, uncomment and modify:
       
    });
}