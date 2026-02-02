// ================= COMMON SCROLL & ANIMATION EFFECTS =================
// This file contains shared JavaScript for all pages
// Simplified version without scrolled state

// Wait for components to be loaded before initializing
document.addEventListener('componentsLoaded', function() {
    initializeNavbar();
});

// Fallback: also try to initialize after DOM load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeNavbar, 100);
});

function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // ================= ACTIVE PAGE HIGHLIGHTING =================
    const currentPage = window.location.pathname.split('/').pop() || 'LandingPage.html';
    const navLinks = document.querySelectorAll('.nav-links a');

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

    // ================= CONTACT BUTTON RIPPLE EFFECT =================
    const contactBtn = document.querySelector('.btn-contact');

    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height) * 2.5;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 70%);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                transform: scale(0);
                opacity: 1;
                z-index: 10;
            `;
            
            this.appendChild(ripple);
            
            requestAnimationFrame(() => {
                ripple.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
                ripple.style.transform = 'scale(1)';
                ripple.style.opacity = '0';
            });
            
            setTimeout(() => ripple.remove(), 600);
        });
    }

    // ================= NAV LINKS HOVER EFFECTS =================
    navLinks.forEach((link) => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ================= LANGUAGE BUTTON EFFECTS =================
    const languageBtn = document.querySelector('.language-btn');

    if (languageBtn) {
        languageBtn.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        languageBtn.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    }

    // ================= SMOOTH NAVBAR INITIALIZATION =================
    navbar.style.opacity = '0';
    navbar.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        navbar.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
    }, 100);
}

// ================= SMOOTH SCROLL FOR ANCHOR LINKS =================
document.addEventListener('DOMContentLoaded', function() {
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
});