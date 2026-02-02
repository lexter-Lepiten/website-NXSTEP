

// Handle contact form submission with comprehensive error handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('contactSubmitBtn');
            const originalText = submitBtn.textContent;
            
            // Check for internet connection
            if (!navigator.onLine) {
                showErrorMessage(
                    'No Internet Connection',
                    'Please check your internet connection and try again.'
                );
                return;
            }
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            const formData = new FormData(form);
            
            // Set timeout for slow connections (30 seconds)
            const timeoutId = setTimeout(() => {
                showErrorMessage(
                    'Connection Timeout',
                    'The request is taking too long. Please check your internet connection and try again.'
                );
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
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
                submitBtn.textContent = originalText;
                document.getElementById('successOverlay').classList.add('show');
                form.reset();
            })
            .catch(error => {
                clearTimeout(timeoutId);
                console.error('Error:', error);
                
                let errorTitle = 'Submission Failed';
                let errorMessage = 'There was an error sending your message. Please try again.';
                
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
                submitBtn.textContent = originalText;
            });
        });
    }
    
    // Monitor connection status
    window.addEventListener('online', () => {
        console.log('Connection restored');
    });
    
    window.addEventListener('offline', () => {
        console.log('Connection lost');
    });
});

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

function closeSuccessMessage() {
    Utils.closeSuccessMessage();
}