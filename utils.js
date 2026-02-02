/* ===============================================================
   UTILITIES - Shared JavaScript Functions
   ===============================================================
   File: js/utils.js
   Purpose: Centralized utility functions used across all pages
   =============================================================== */

const Utils = {
    /* ================= SCROLL REVEAL ================= */
    initScrollReveal() {
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

        // Observe all scroll-reveal elements
        const elements = document.querySelectorAll(
            '.scroll-reveal, .scroll-reveal-scale, .fade-in-up, .fade-in-left, .fade-in-right, .value-item'
        );
        
        elements.forEach(el => observer.observe(el));
    },

    /* ================= MODAL CONTROLS ================= */
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        const modalBox = modal.querySelector('.modal-box, .application-wrapper, .modal-content');
        const overlay = modal.querySelector('.overlay');
        
        if (modalBox) {
            modalBox.style.opacity = '0';
            modalBox.style.transform = 'translateY(20px) scale(0.98)';
        }
        
        if (overlay) {
            overlay.style.opacity = '0';
        }
        
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset styles
            if (modalBox) {
                modalBox.style.opacity = '';
                modalBox.style.transform = '';
            }
            if (overlay) {
                overlay.style.opacity = '';
            }
        }, 350);
    },

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        const modalBox = modal.querySelector('.modal-box, .application-wrapper, .modal-content');
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        if (modalBox) {
            modalBox.style.opacity = '0';
            modalBox.style.transform = 'translateY(30px) scale(0.95)';
            
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    modalBox.style.opacity = '1';
                    modalBox.style.transform = 'translateY(0) scale(1)';
                });
            });
        }
    },

    /* ================= SUCCESS MESSAGE ================= */
    showSuccessMessage(title = 'Success!', message = 'Operation completed successfully.') {
        const successOverlay = document.getElementById('successOverlay');
        if (!successOverlay) return;
        
        const successMessage = successOverlay.querySelector('.success-message');
        const titleEl = successOverlay.querySelector('h2');
        const messageEl = successOverlay.querySelector('p');
        
        if (titleEl) titleEl.textContent = title;
        if (messageEl) messageEl.textContent = message;
        
        if (successMessage) {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'scale(0.8)';
        }
        
        successOverlay.classList.add('show');
        
        if (successMessage) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'scale(1)';
                });
            });
        }
    },

    closeSuccessMessage() {
        const overlay = document.getElementById('successOverlay');
        if (!overlay) return;
        
        const message = overlay.querySelector('.success-message');
        
        if (message) {
            message.style.opacity = '0';
            message.style.transform = 'scale(0.95)';
        }
        
        setTimeout(() => {
            overlay.classList.remove('show');
            if (message) {
                message.style.opacity = '';
                message.style.transform = '';
            }
        }, 300);
    },

 /* ================= error HANDLING ================= */



    /* ================= FORM HANDLING ================= */
    handleFormSubmit(formId, onSuccess) {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('[type="submit"]');
            const btnText = submitBtn?.querySelector('.btn-text, span');
            const btnLoader = submitBtn?.querySelector('.btn-loader');
            
            // Disable button and show loading
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
            }
            if (btnText) btnText.textContent = 'Submitting...';
            if (btnLoader) btnLoader.style.display = 'inline-block';
            
            const formData = new FormData(form);
            
            fetch(form.action, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                // Reset button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                }
                if (btnText) btnText.textContent = 'Submit';
                if (btnLoader) btnLoader.style.display = 'none';
                
                if (onSuccess) onSuccess();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your form. Please try again.');
                
                // Reset button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                }
                if (btnText) btnText.textContent = 'Submit';
                if (btnLoader) btnLoader.style.display = 'none';
            });
        });
    },


    
    /* ================= FILE UPLOAD HANDLING ================= */
    initFileUpload(fileInputId, uploadAreaId, fileNameId) {
        const fileInput = document.getElementById(fileInputId);
        const uploadArea = document.getElementById(uploadAreaId);
        const fileNameDisplay = document.getElementById(fileNameId);
        
        if (!fileInput || !uploadArea) return;

        // Drag and drop
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.add('drag-over');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.remove('drag-over');
            });
        });

        uploadArea.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                this.displayFileName(files[0], uploadArea, fileNameDisplay);
            }
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.displayFileName(file, uploadArea, fileNameDisplay);
            }
        });
    },

    displayFileName(file, uploadArea, fileNameDisplay) {
        if (!fileNameDisplay) return;
        
        const fileSize = (file.size / 1024 / 1024).toFixed(2);
        
        fileNameDisplay.style.opacity = '0';
        fileNameDisplay.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            fileNameDisplay.innerHTML = `<strong>${file.name}</strong> (${fileSize} MB)`;
            if (uploadArea) uploadArea.classList.add('has-file');
            
            requestAnimationFrame(() => {
                fileNameDisplay.style.opacity = '1';
                fileNameDisplay.style.transform = 'translateY(0)';
            });
        }, 150);
    },

    /* ================= FILTER FUNCTIONALITY ================= */
    initFilters(filterBtnSelector, itemSelector) {
        const filterBtns = document.querySelectorAll(filterBtnSelector);
        const items = document.querySelectorAll(itemSelector);

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Filter items
                items.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    },

    /* ================= SMOOTH SCROLL ================= */
    initSmoothScroll() {
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
    },

    /* ================= ESCAPE KEY HANDLER ================= */
    initEscapeKey() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any active modal
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    this.closeModal(activeModal.id);
                }
                
                // Close success message
                const successOverlay = document.querySelector('.success-overlay.show');
                if (successOverlay) {
                    this.closeSuccessMessage();
                }
            }
        });
    },

    /* ================= COUNTER ANIMATION ================= */
    initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    this.animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    },

    animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target === 98 ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target === 98 ? '%' : '+');
            }
        }, 30);
    }
};

/* ================= AUTO-INITIALIZE ON PAGE LOAD ================= */
document.addEventListener('DOMContentLoaded', () => {
    Utils.initScrollReveal();
    Utils.initSmoothScroll();
    Utils.initEscapeKey();
    
    // Only init counters if they exist on page
    if (document.querySelector('.stat-number')) {
        Utils.initCounters();
    }
});

/* ================= MAKE FUNCTIONS GLOBAL FOR BACKWARD COMPATIBILITY ================= */
// These allow onclick handlers in HTML to work
window.closeSuccessMessage = () => Utils.closeSuccessMessage();
window.closeModal = (id) => Utils.closeModal(id);
window.openModal = (id) => Utils.openModal(id);

