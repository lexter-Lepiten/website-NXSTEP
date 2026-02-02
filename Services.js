// ================= OPTIMIZED SERVICES.JS =================
// Reduced animations and improved performance

// ================= MODAL =================
// ================= MODAL =================
const modal = document.getElementById('serviceModal');

if (modal) {
    document.querySelectorAll('.service-card').forEach(card => {
        card.onclick = () => {
            const title = document.getElementById('modalTitle');
            const description = document.getElementById('modalDescription');
            const icon = document.getElementById('modalIcon');
            const content = modal.querySelector('.modal-content');
            
            if (title) title.textContent = card.dataset.title;
            if (description) description.textContent = card.dataset.description;
            if (icon) icon.src = card.dataset.icon;
            if (content) content.scrollTop = 0;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
    });
}

function closeModal() {
    if (!modal || !modal.classList.contains('active')) return;
    
    // Add closing class for animation
    modal.classList.add('closing');
    
    // Wait for animation to complete before removing classes
    setTimeout(() => {
        modal.classList.remove('active', 'closing');
        document.body.style.overflow = '';
    }, 300); // Match your CSS animation duration
}

// Modal close handlers
const closeBtn = document.querySelector('.close');
const overlay = document.querySelector('.overlay');
const modalBox = document.querySelector('.modal-box');

if (closeBtn) closeBtn.onclick = closeModal;
if (overlay) overlay.onclick = closeModal;
if (modalBox) modalBox.onclick = (e) => e.stopPropagation();

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

// ================= REVEAL ANIMATION (OPTIMIZED) =================
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('reveal');
            observer.unobserve(e.target); // Stop observing after reveal
        }
    });
}, { 
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
});

// Observe elements
document.querySelectorAll('.service-card, .services-header').forEach(el => {
    if (el) observer.observe(el);
});

// ================= OPTIMIZED PARALLAX (DESKTOP ONLY) =================
// Only enable parallax on devices with good performance
const isDesktop = window.innerWidth > 1024;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Cache DOM elements that might be animated
const els = {
    shapes: document.querySelectorAll('.floating-shape'),
    orbs: document.querySelectorAll('.glow-orb'),
    hexes: document.querySelectorAll('.hex-node'),
    grid: document.querySelector('.grid-overlay'),
    stripes: document.querySelector('.stripe-pattern')
};

if (isDesktop && !prefersReducedMotion) {
    let mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5, rafId = null;
    let lastMove = Date.now();
    
    // Throttle mousemove events to ~20fps
    document.addEventListener('mousemove', e => {
        const now = Date.now();
        if (now - lastMove < 50) return; // 50ms = ~20fps
        
        lastMove = now;
        tx = e.clientX / window.innerWidth;
        ty = e.clientY / window.innerHeight;
        
        if (!rafId) {
            rafId = requestAnimationFrame(animateParallax);
        }
    }, { passive: true });
    
    function animateParallax() {
        // Smooth interpolation
        mx += (tx - mx) * 0.08;
        my += (ty - my) * 0.08;
        
        const dx = (mx - 0.5);
        const dy = (my - 0.5);
        
        // Apply to shapes (reduced intensity)
        if (els.shapes.length > 0) {
            els.shapes.forEach((el, i) => {
                if (i % 2 === 0) { // Only animate every other element
                    const s = (i % 4 + 1) * 0.2;
                    el.style.transform = `translate3d(${dx * s * 15}px, ${dy * s * 15}px, 0)`;
                }
            });
        }
        
        // Apply to orbs (if they exist)
        if (els.orbs.length > 0) {
            els.orbs.forEach((el, i) => {
                if (i % 2 === 0) {
                    const s = (i + 1) * 0.15;
                    el.style.transform = `translate3d(${dx * s * 20}px, ${dy * s * 20}px, 0)`;
                }
            });
        }
        
        // Apply to hex nodes (if they exist)
        if (els.hexes.length > 0) {
            els.hexes.forEach((el, i) => {
                if (i % 3 === 0) {
                    const s = 0.1 + i * 0.01;
                    el.style.transform = `translate3d(${dx * s * 8}px, ${dy * s * 8}px, 0)`;
                }
            });
        }
        
        // Continue animation only if mouse is still moving
        if (Math.abs(tx - mx) > 0.001 || Math.abs(ty - my) > 0.001) {
            rafId = requestAnimationFrame(animateParallax);
        } else {
            rafId = null;
        }
    }
}

// ================= SCROLL PARALLAX (SIMPLIFIED) =================
let scrollTicking = false;
let lastY = 0;

window.addEventListener('scroll', () => {
    // Only update if scroll changed significantly
    if (Math.abs(window.scrollY - lastY) < 10) return;
    
    if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(() => {
            const y = window.scrollY;
            
            // Hero parallax (only when visible)
            const hero = document.querySelector('.services-hero');
            if (hero && y < 800) {
                hero.style.transform = `translateY(${y * 0.3}px)`;
            }
            
            // Shapes scroll parallax (reduced)
            if (els.shapes.length > 0) {
                els.shapes.forEach((el, i) => {
                    if (i % 3 === 0) { // Only every 3rd element
                        el.style.transform = `translate3d(0, ${y * (i % 3 + 1) * 0.1}px, 0)`;
                    }
                });
            }
            
            // Grid/stripes (if they exist)
            if (els.grid) {
                els.grid.style.transform = `translate3d(${y * 0.03}px, ${y * 0.03}px, 0)`;
            }
            if (els.stripes) {
                els.stripes.style.transform = `translate3d(${-y * 0.05}px, ${-y * 0.05}px, 0)`;
            }
            
            lastY = y;
            scrollTicking = false;
        });
    }
}, { passive: true });

// ================= PERFORMANCE OPTIMIZATIONS =================
// Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden && rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
});

// Detect low-end devices and reduce animations
const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
if (isLowEndDevice) {
    document.documentElement.classList.add('reduce-motion');
}

// ================= INIT =================
console.log('Services.js loaded successfully');