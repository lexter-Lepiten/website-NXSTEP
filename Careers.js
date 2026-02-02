let currentJobTitle = '';
let selectedFile = null;

// Initialize animations and observers
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeFileUpload();
    initializeFormHandling();
    initializeFilters();
    initializeCounters();
    
    // Monitor connection status
    window.addEventListener('online', () => {
        console.log('Connection restored');
    });
    
    window.addEventListener('offline', () => {
        console.log('Connection lost');
    });
});

function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
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

function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const jobCards = document.querySelectorAll('.job-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            jobCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.job-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
}

function initializeFileUpload() {
    const resumeFile = document.getElementById('resumeFile');
    const fileUploadArea = document.getElementById('fileUploadArea');
    
    if (resumeFile && fileUploadArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            fileUploadArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            fileUploadArea.addEventListener(eventName, () => {
                fileUploadArea.classList.add('drag-over');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            fileUploadArea.addEventListener(eventName, () => {
                fileUploadArea.classList.remove('drag-over');
            });
        });

        fileUploadArea.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                resumeFile.files = files;
                handleFileSelect(files[0]);
            }
        });

        resumeFile.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                handleFileSelect(file);
            }
        });
    }
}

function handleFileSelect(file) {
    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
        showErrorMessage(
            'File Too Large',
            'Please select a file smaller than 10MB.'
        );
        document.getElementById('resumeFile').value = '';
        return;
    }
    
    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
        showErrorMessage(
            'Invalid File Type',
            'Please upload a PDF, DOC, or DOCX file.'
        );
        document.getElementById('resumeFile').value = '';
        return;
    }
    
    selectedFile = file;
    const fileUploadArea = document.getElementById('fileUploadArea');
    const fileName = document.getElementById('fileName');
    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    
    fileName.style.opacity = '0';
    fileName.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        fileName.innerHTML = `<strong>${file.name}</strong> (${fileSize} MB)`;
        fileUploadArea.classList.add('has-file');
        
        requestAnimationFrame(() => {
            fileName.style.opacity = '1';
            fileName.style.transform = 'translateY(0)';
        });
    }, 150);
}

function initializeFormHandling() {
    const form = document.getElementById('applicationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check for internet connection
            if (!navigator.onLine) {
                showErrorMessage(
                    'No Internet Connection',
                    'Please check your internet connection and try again.'
                );
                return;
            }
            
            // Validate file is selected
            if (!selectedFile) {
                showErrorMessage(
                    'Resume Required',
                    'Please upload your resume/CV before submitting.'
                );
                return;
            }
            
            const submitBtn = document.getElementById('submitBtn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            const originalText = btnText.textContent;
            
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            btnText.textContent = 'Submitting...';
            btnLoader.style.display = 'inline-block';
            
            const formData = new FormData(form);
            
            // Set timeout for slow connections (30 seconds)
            const timeoutId = setTimeout(() => {
                showErrorMessage(
                    'Connection Timeout',
                    'The request is taking too long. Please check your internet connection and try again.'
                );
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                btnText.textContent = originalText;
                btnLoader.style.display = 'none';
            }, 30000);
            
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
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                btnText.textContent = originalText;
                btnLoader.style.display = 'none';
                
                showSuccessMessage();
            })
            .catch(error => {
                clearTimeout(timeoutId);
                console.error('Error:', error);
                
                let errorTitle = 'Submission Failed';
                let errorMessage = 'There was an error submitting your application. Please try again.';
                
                if (!navigator.onLine) {
                    errorTitle = 'No Internet Connection';
                    errorMessage = 'Please check your internet connection and try again.';
                } else if (error.message.includes('Failed to fetch')) {
                    errorTitle = 'Network Error';
                    errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
                } else if (error.message.includes('Server error')) {
                    errorTitle = 'Server Error';
                    errorMessage = 'The server encountered an error. Please try again later or contact support.';
                }
                
                showErrorMessage(errorTitle, errorMessage);
                
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                btnText.textContent = originalText;
                btnLoader.style.display = 'none';
            });
        });
    }
}

function openApplicationForm(jobTitle) {
    currentJobTitle = jobTitle;
    const modal = document.getElementById('applicationModal');
    const wrapper = modal.querySelector('.application-wrapper');
    
    document.getElementById('jobTitleDisplay').textContent = jobTitle;
    document.getElementById('hiddenPosition').value = jobTitle;
    document.getElementById('emailSubject').value = `New Application: ${jobTitle}`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'translateY(30px) scale(0.95)';
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            wrapper.style.opacity = '1';
            wrapper.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function closeApplicationForm() {
    document.getElementById('applicationForm').reset();
    selectedFile = null;
    const fileNameEl = document.getElementById('fileName');
    if (fileNameEl) {
        fileNameEl.textContent = '';
    }
    document.getElementById('fileUploadArea').classList.remove('has-file');
    
    Utils.closeModal('applicationModal');
}

function showSuccessMessage() {
    Utils.showSuccessMessage(
        'Application Submitted!',
        'Thank you for your interest in joining our team. We\'ve received your application and will review it carefully. You\'ll hear from us within 5-7 business days.'
    );
}

function closeSuccessMessage() {
    Utils.closeSuccessMessage();
    closeApplicationForm();
}

// Show error message
function showErrorMessage(title, message) {
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
                <button onclick="closeErrorMessage()" class="btn-error-close">Try Again</button>
            </div>
        `;
        document.body.appendChild(errorOverlay);
    }
    
    document.getElementById('errorTitle').textContent = title;
    document.getElementById('errorText').textContent = message;
    
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
}

function closeErrorMessage() {
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
}