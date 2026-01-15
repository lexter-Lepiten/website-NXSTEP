// ================= SCROLL EFFECT FOR NAVBAR =================
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - lastScrollY;
    
    // Add scrolled class for styling
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
        // Parallax effect for navbar
        navbar.style.transform = `translateY(${Math.min(scrollDelta * -0.2, 0)}px)`;
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
    lastScrollY = scrollY;
}, { passive: true });

// ================= NAVBAR INTERACTIONS =================

// Enhanced ripple effect for contact button
const contactBtn = document.querySelector('.btn-contact');

if (contactBtn) {
    contactBtn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height) * 3;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: scale(0);
            opacity: 1;
            z-index: 10;
        `;
        
        this.appendChild(ripple);
        
        requestAnimationFrame(() => {
            ripple.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease';
            ripple.style.transform = 'scale(1)';
            ripple.style.opacity = '0';
        });
        
        setTimeout(() => ripple.remove(), 800);
    });
    
    // Contact button magnetic effect
    contactBtn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translateY(-4px) scale(1.02) translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    contactBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) translate(0, 0)';
    });
}

// Magnetic effect for nav links
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach((link) => {
    link.addEventListener('mouseenter', function(e) {
        this.style.transition = 'all 0.1s ease';
    });
    
    link.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translateY(-2px) translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        this.style.transform = 'translateY(0) translate(0, 0)';
    });
});

// Magnetic effect for language button
const languageBtn = document.querySelector('.language-btn');

if (languageBtn) {
    languageBtn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translateY(-3px) translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    languageBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) translate(0, 0)';
    });
}

// ================= ACTIVE STATE MANAGEMENT =================
const currentPage = window.location.pathname.split('/').pop() || 'LandingPage.html';

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('active');
    }
    
    link.addEventListener('click', function(e) {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ================= SMOOTH INITIALIZATION =================
window.addEventListener('load', () => {
    // Navbar fade-in
    if (navbar) {
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            navbar.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            navbar.style.opacity = '1';
            navbar.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ================= SMOOTH SCROLL FOR ANCHOR LINKS =================
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