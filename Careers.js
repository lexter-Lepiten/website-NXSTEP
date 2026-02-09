/* ===============================================================
   CAREERS PAGE - Simplified (Uses Utils.js)
   ===============================================================
    This script handles all interactions on the Careers page, including:
   =============================================================== */

let currentJobTitle = '';
let fileUploadController = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Use Utils for all common functionality
    Utils.initScrollReveal({ selectors: '.job-card, .benefit-card, .stat-number' });
    Utils.initCounters();
    Utils.initFilters('.filter-btn', '.job-card');
    
    // Page-specific initialization
    initializeJobApplicationForm();
});

/* ================= JOB APPLICATION FORM ================= */
function initializeJobApplicationForm() {
    const form = document.getElementById('applicationForm');
    if (!form) return;

    // Initialize file upload with validation
    fileUploadController = Utils.initFileUpload('resumeFile', 'fileUploadArea', 'fileName', {
        maxSizeMB: 10,
        allowedTypes: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ],
        onFileSelect: (file) => {
            console.log('File selected:', file.name);
        },
        onFileError: (error) => {
            Utils.showErrorMessage(error.title, error.message);
        }
    });

    // Initialize form submission
    Utils.submitFormWithValidation(form, {
        validateFile: true,
        fileInputId: 'resumeFile',
        timeout: 30000,
        loadingText: 'Submitting...',
        customValidation: () => {
            // Any custom validation logic here
            return true;
        },
        onSuccess: () => {
            Utils.showSuccessMessage(
                'Application Submitted!',
                'Thank you for your interest in joining our team. We\'ve received your application and will review it carefully. You\'ll hear from us within 5-7 business days.',
                {
                    onClose: () => {
                        closeApplicationForm();
                    }
                }
            );
        },
        onError: (error) => {
            Utils.showErrorMessage(error.title, error.message);
        }
    });
}

/* ================= JOB CARD INTERACTIONS ================= */
function openApplicationForm(jobTitle) {
    currentJobTitle = jobTitle;
    
    // Update form fields
    document.getElementById('jobTitleDisplay').textContent = jobTitle;
    document.getElementById('hiddenPosition').value = jobTitle;
    document.getElementById('emailSubject').value = `New Application: ${jobTitle}`;
    
    // Open modal using Utils
    Utils.manageModal('applicationModal', 'open');
}

function closeApplicationForm() {
    const form = document.getElementById('applicationForm');
    if (form) {
        form.reset();
    }
    
    // Clear file upload
    if (fileUploadController) {
        fileUploadController.clearFile();
    }
    
    // Close modal using Utils
    Utils.manageModal('applicationModal', 'close', {
        onClose: () => {
            currentJobTitle = '';
        }
    });
}

/* ================= GLOBAL FUNCTIONS (for HTML onclick) ================= */
window.openApplicationForm = openApplicationForm;
window.closeApplicationForm = closeApplicationForm;