/* ===============================================================
   UTILITIES - Shared JavaScript Functions (REFACTORED)
   ===============================================================
   File: js/utils.js
   Purpose: Centralized utility functions used across all pages
   Version: 2.0 - Consolidated duplicate code from all pages
   =============================================================== */

const Utils = {
    /* ================= ERROR HANDLING ================= */
    showErrorMessage(title, message, options = {}) {
        const {
            buttonText = 'Try Again',
            onClose = null
        } = options;
        
        let errorOverlay = document.getElementById('errorOverlay');
        
        // Create error overlay if it doesn't exist
        if (!errorOverlay) {
            errorOverlay = document.createElement('div');
            errorOverlay.id = 'errorOverlay';
            errorOverlay.className = 'error-overlay';
            errorOverlay.innerHTML = `
                <div class="error-message">
                    <div class="error-icon">⚠️</div>
                    <h2 id="errorTitle">Error</h2>
                    <p id="errorText">Something went wrong.</p>
                    <button onclick="Utils.closeErrorMessage()" class="btn-error-close">Try Again</button>
                </div>
            `;
            document.body.appendChild(errorOverlay);
        }
        
        document.getElementById('errorTitle').textContent = title;
        document.getElementById('errorText').textContent = message;
        
        const button = errorOverlay.querySelector('.btn-error-close');
        if (button) {
            button.textContent = buttonText;
            if (onClose) {
                button.onclick = () => {
                    this.closeErrorMessage();
                    onClose();
                };
            }
        }
        
        const errorMessage = errorOverlay.querySelector('.error-message');
        errorMessage.style.opacity = '0';
        errorMessage.style.transform = 'scale(0.8)';
        
        errorOverlay.classList.add('show');
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                errorMessage.style.opacity = '1';
                errorMessage.style.transform = 'scale(1)';
            });
        });
    },

    closeErrorMessage() {
        const overlay = document.getElementById('errorOverlay');
        if (!overlay) return;
        
        const message = overlay.querySelector('.error-message');
        
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

    /* ================= UNIVERSAL FORM SUBMISSION HANDLER ================= */
    submitFormWithValidation(form, options = {}) {
        const {
            validateFile = false,
            fileInputId = 'resumeFile',
            timeout = 30000,
            onSuccess = null,
            onError = null,
            customValidation = null,
            loadingText = 'Submitting...',
            submitButtonSelector = '[type="submit"]'
        } = options;

        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Check for internet connection
            if (!navigator.onLine) {
                this.showErrorMessage(
                    'No Internet Connection',
                    'Please check your internet connection and try again.'
                );
                return;
            }
            
            // Custom validation
            if (customValidation && !customValidation()) {
                return;
            }
            
            // File validation if required
            if (validateFile) {
                const fileInput = document.getElementById(fileInputId);
                if (!fileInput || !fileInput.files || !fileInput.files[0]) {
                    this.showErrorMessage(
                        'File Required',
                        'Please upload the required file before submitting.'
                    );
                    return;
                }
            }
            
            const submitBtn = form.querySelector(submitButtonSelector);
            const btnText = submitBtn?.querySelector('.btn-text') || submitBtn;
            const btnLoader = submitBtn?.querySelector('.btn-loader');
            const originalText = btnText?.textContent || 'Submit';
            
            // Set loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
            }
            if (btnText) btnText.textContent = loadingText;
            if (btnLoader) btnLoader.style.display = 'inline-block';
            
            const formData = new FormData(form);
            
            // Set timeout for slow connections
            const timeoutId = setTimeout(() => {
                this.showErrorMessage(
                    'Connection Timeout',
                    'The request is taking too long. Please check your internet connection and try again.'
                );
                this._resetSubmitButton(submitBtn, btnText, btnLoader, originalText);
            }, timeout);
            
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                
                // Success
                this._resetSubmitButton(submitBtn, btnText, btnLoader, originalText);
                
                if (onSuccess) {
                    onSuccess();
                } else {
                    this.showSuccessMessage();
                }
                
                form.reset();
            })
            .catch(error => {
                clearTimeout(timeoutId);
                console.error('Error:', error);
                
                const errorInfo = this._categorizeError(error);
                
                if (onError) {
                    onError(errorInfo);
                } else {
                    this.showErrorMessage(errorInfo.title, errorInfo.message);
                }
                
                this._resetSubmitButton(submitBtn, btnText, btnLoader, originalText);
            });
        });
    },

    // Helper: Reset submit button state
    _resetSubmitButton(btn, text, loader, originalText) {
        if (btn) {
            btn.disabled = false;
            btn.classList.remove('loading');
        }
        if (text) text.textContent = originalText;
        if (loader) loader.style.display = 'none';
    },

    // Helper: Categorize errors for better user messaging
    _categorizeError(error) {
        let title = 'Submission Failed';
        let message = 'There was an error submitting your form. Please try again.';
        
        if (!navigator.onLine) {
            title = 'No Internet Connection';
            message = 'Please check your internet connection and try again.';
        } else if (error.message.includes('Failed to fetch')) {
            title = 'Network Error';
            message = 'Unable to connect to the server. Please check your internet connection and try again.';
        } else if (error.message.includes('Server error')) {
            title = 'Server Error';
            message = 'The server encountered an error. Please try again later or contact support.';
        } else if (error.message.includes('timeout') || error.message.includes('Timeout')) {
            title = 'Connection Timeout';
            message = 'The request took too long. Please check your internet connection and try again.';
        }
        
        return { title, message };
    },

    /* ================= CONNECTION MONITORING ================= */
    initConnectionMonitoring(options = {}) {
        const {
            onOnline = () => console.log('Connection restored'),
            onOffline = () => console.log('Connection lost'),
            showNotifications = false
        } = options;

        window.addEventListener('online', () => {
            onOnline();
            if (showNotifications) {
                // Could show a toast notification here
                console.log('✅ Back online');
            }
        });
        
        window.addEventListener('offline', () => {
            onOffline();
            if (showNotifications) {
                this.showErrorMessage(
                    'Connection Lost',
                    'Your internet connection was lost. Please check your network.',
                    { buttonText: 'Dismiss' }
                );
            }
        });
    },

    /* ================= FILE UPLOAD WITH VALIDATION ================= */
    initFileUpload(fileInputId, uploadAreaId, fileNameId, options = {}) {
        const {
            maxSizeMB = 10,
            allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            onFileSelect = null,
            onFileError = null
        } = options;

        const fileInput = document.getElementById(fileInputId);
        const uploadArea = document.getElementById(uploadAreaId);
        const fileNameDisplay = document.getElementById(fileNameId);
        
        if (!fileInput || !uploadArea) return;

        let selectedFile = null;

        // Drag and drop handlers
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
                this._handleFileSelect(files[0], {
                    maxSizeMB,
                    allowedTypes,
                    uploadArea,
                    fileNameDisplay,
                    fileInput,
                    onFileSelect,
                    onFileError
                });
            }
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this._handleFileSelect(file, {
                    maxSizeMB,
                    allowedTypes,
                    uploadArea,
                    fileNameDisplay,
                    fileInput,
                    onFileSelect,
                    onFileError
                });
            }
        });

        return {
            getSelectedFile: () => selectedFile,
            clearFile: () => {
                selectedFile = null;
                fileInput.value = '';
                if (fileNameDisplay) fileNameDisplay.textContent = '';
                uploadArea.classList.remove('has-file');
            }
        };
    },

    // Helper: Handle file selection with validation
    _handleFileSelect(file, config) {
        const { maxSizeMB, allowedTypes, uploadArea, fileNameDisplay, fileInput, onFileSelect, onFileError } = config;
        
        // Validate file size
        const maxSize = maxSizeMB * 1024 * 1024;
        if (file.size > maxSize) {
            const error = {
                type: 'size',
                title: 'File Too Large',
                message: `Please select a file smaller than ${maxSizeMB}MB.`
            };
            
            if (onFileError) {
                onFileError(error);
            } else {
                this.showErrorMessage(error.title, error.message);
            }
            
            fileInput.value = '';
            return;
        }
        
        // Validate file type
        if (!allowedTypes.includes(file.type)) {
            const error = {
                type: 'format',
                title: 'Invalid File Type',
                message: 'Please upload a PDF, DOC, or DOCX file.'
            };
            
            if (onFileError) {
                onFileError(error);
            } else {
                this.showErrorMessage(error.title, error.message);
            }
            
            fileInput.value = '';
            return;
        }
        
        // File is valid - display it
        if (fileNameDisplay) {
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
        }
        
        if (onFileSelect) {
            onFileSelect(file);
        }
    },

    /* ================= SCROLL REVEAL ================= */
    initScrollReveal(options = {}) {
        const {
            threshold = 0.1,
            rootMargin = '0px 0px -50px 0px',
            selectors = '.scroll-reveal, .scroll-reveal-scale, .fade-in-up, .fade-in-left, .fade-in-right, .value-item, .service-card, .job-card'
        } = options;

        const observerOptions = { threshold, rootMargin };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active', 'reveal');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all elements
        const elements = document.querySelectorAll(selectors);
        elements.forEach(el => {
            // Set initial state
            if (!el.classList.contains('active')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
            }
            observer.observe(el);
        });

        return observer;
    },

    /* ================= MODAL CONTROLS ================= */
    manageModal(modalId, action = 'toggle', options = {}) {
        const {
            onOpen = null,
            onClose = null,
            animationDuration = 350
        } = options;

        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        if (action === 'open' || (action === 'toggle' && !modal.classList.contains('active'))) {
            this._openModal(modal, onOpen);
        } else if (action === 'close' || action === 'toggle') {
            this._closeModal(modal, onClose, animationDuration);
        }
    },

    _openModal(modal, callback) {
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
        
        if (callback) callback();
    },

    _closeModal(modal, callback, duration) {
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
            
            if (callback) callback();
        }, duration);
    },

    // Legacy support
    closeModal(modalId) {
        this.manageModal(modalId, 'close');
    },

    openModal(modalId) {
        this.manageModal(modalId, 'open');
    },

    /* ================= SUCCESS MESSAGE ================= */
    showSuccessMessage(title = 'Success!', message = 'Operation completed successfully.', options = {}) {
        const {
            buttonText = 'Close',
            onClose = null
        } = options;

        const successOverlay = document.getElementById('successOverlay');
        if (!successOverlay) return;
        
        const successMessage = successOverlay.querySelector('.success-message');
        const titleEl = successOverlay.querySelector('h2');
        const messageEl = successOverlay.querySelector('p');
        const button = successOverlay.querySelector('button');
        
        if (titleEl) titleEl.textContent = title;
        if (messageEl) messageEl.textContent = message;
        if (button) {
            button.textContent = buttonText;
            if (onClose) {
                button.onclick = () => {
                    this.closeSuccessMessage();
                    onClose();
                };
            }
        }
        
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

    /* ================= FILTER FUNCTIONALITY ================= */
    initFilters(filterBtnSelector, itemSelector, options = {}) {
        const {
            activeClass = 'active',
            animationDelay = 10,
            transitionTime = 300
        } = options;

        const filterBtns = document.querySelectorAll(filterBtnSelector);
        const items = document.querySelectorAll(itemSelector);

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove(activeClass));
                this.classList.add(activeClass);

                // Filter items
                items.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, animationDelay);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, transitionTime);
                    }
                });
            });
        });
    },

    /* ================= COUNTER ANIMATION ================= */
    initCounters(options = {}) {
        const {
            selector = '.stat-number',
            threshold = 0.5,
            speed = 30
        } = options;

        const counters = document.querySelectorAll(selector);
        const observerOptions = {
            threshold,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    this.animateCounter(entry.target, target, speed);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    },

    animateCounter(element, target, speed = 30) {
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
        }, speed);
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
                
                // Close error message
                const errorOverlay = document.querySelector('.error-overlay.show');
                if (errorOverlay) {
                    this.closeErrorMessage();
                }
            }
        });
    }
};

/* ================= AUTO-INITIALIZE ON PAGE LOAD ================= */
document.addEventListener('DOMContentLoaded', () => {
    Utils.initScrollReveal();
    Utils.initSmoothScroll();
    Utils.initEscapeKey();
    Utils.initConnectionMonitoring();
    
    // Only init counters if they exist on page
    if (document.querySelector('.stat-number')) {
        Utils.initCounters();
    }
});

/* ================= GLOBAL COMPATIBILITY FUNCTIONS ================= */
// These allow onclick handlers in HTML to work
window.closeSuccessMessage = () => Utils.closeSuccessMessage();
window.closeErrorMessage = () => Utils.closeErrorMessage();
window.closeModal = (id) => Utils.closeModal(id);
window.openModal = (id) => Utils.openModal(id);