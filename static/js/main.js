// Password toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Password toggle
    const passwordToggleButtons = document.querySelectorAll('.password-toggle');
    passwordToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input[type="password"]');
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            this.textContent = isPassword ? '👁️' : '🔒';
        });
    });

    // Form submission handling
    const loginForm = document.querySelector('.auth-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const submitButton = this.querySelector('.form-submit');
            const submitText = submitButton.querySelector('.submit-text');
            const submitLoader = submitButton.querySelector('.submit-loader');

            // Disable form submission temporarily
            e.preventDefault();
            
            // Show loading state
            submitText.style.display = 'none';
            submitLoader.style.display = 'inline';
            submitButton.disabled = true;

            // Get form data
            const formData = new FormData(this);

            // Send AJAX request
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success - redirect to home page
                    window.location.href = '/';
                } else {
                    // Error - show error message
                    return response.json().then(data => {
                        throw new Error(data.message || 'Error occurred');
                    });
                }
            })
            .catch(error => {
                // Handle error
                const formErrors = document.querySelector('.form-errors');
                if (formErrors) {
                    formErrors.style.display = 'block';
                    formErrors.textContent = error.message;
                }
            })
            .finally(() => {
                // Reset button state
                submitText.style.display = 'inline';
                submitLoader.style.display = 'none';
                submitButton.disabled = false;
            });
        });
    }
});
