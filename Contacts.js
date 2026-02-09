/* ===============================================================
   CONTACTS PAGE - Simplified (Uses Utils.js)
   ===============================================================
   Removed ~120 lines of duplicate code
   =============================================================== */

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

/* ================= CONTACT FORM ================= */
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Use Utils for form submission with all validation
    Utils.submitFormWithValidation(form, {
        validateFile: false,
        timeout: 30000,
        loadingText: 'Sending...',
        submitButtonSelector: '#contactSubmitBtn',
        onSuccess: () => {
            Utils.showSuccessMessage(
                '✓ Message Sent!',
                'Thank you for contacting us. We\'ve received your message and will get back to you soon.'
            );
        },
        onError: (error) => {
            Utils.showErrorMessage(error.title, error.message);
        }
    });
}

/* ================= GLOBAL FUNCTIONS (for HTML onclick) ================= */
window.closeSuccessMessage = () => Utils.closeSuccessMessage();