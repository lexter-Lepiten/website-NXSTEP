/* ===============================================================
   SERVICES PAGE - Simplified (Uses Utils.js)
   ===============================================================
   Removed ~50 lines of duplicate code
   =============================================================== */

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeServiceCards();
    initializeServiceModal();
    Utils.initScrollReveal({ selectors: '.service-card, .services-header' });
});

/* ================= SERVICE CARDS ================= */
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            openServiceModal(card);
        });
    });
}

/* ================= SERVICE MODAL ================= */
function initializeServiceModal() {
    const modal = document.getElementById('serviceModal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.close');
    const overlay = modal.querySelector('.overlay');
    const modalBox = modal.querySelector('.modal-box');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeServiceModal);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeServiceModal);
    }
    
    if (modalBox) {
        modalBox.addEventListener('click', (e) => e.stopPropagation());
    }
}

function openServiceModal(card) {
    const modal = document.getElementById('serviceModal');
    if (!modal) return;

    const title = modal.querySelector('#modalTitle');
    const description = modal.querySelector('#modalDescription');
    const icon = modal.querySelector('#modalIcon');
    const content = modal.querySelector('.modal-content');
    
    if (title) title.textContent = card.dataset.title;
    if (description) description.textContent = card.dataset.description;
    if (icon) icon.src = card.dataset.icon;
    if (content) content.scrollTop = 0;
    
    Utils.manageModal('serviceModal', 'open');
}

function closeServiceModal() {
    Utils.manageModal('serviceModal', 'close');
}

/* ================= PARALLAX EFFECTS (OPTIONAL - PERFORMANCE) ================= */
const isDesktop = window.innerWidth > 1024;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (isDesktop && !prefersReducedMotion) {
    // Simplified parallax - only if performance allows
    let scrollTicking = false;
    
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(() => {
                const y = window.scrollY;
                const hero = document.querySelector('.services-hero');
                
                if (hero && y < 800) {
                    hero.style.transform = `translateY(${y * 0.3}px)`;
                }
                
                scrollTicking = false;
            });
        }
    }, { passive: true });
}

/* ================= GLOBAL FUNCTIONS (for HTML onclick) ================= */
window.closeModal = closeServiceModal;