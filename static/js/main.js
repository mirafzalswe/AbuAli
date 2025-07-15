// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Темная тема';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Светлая тема';
        localStorage.setItem('theme', 'dark');
    }
}

// User menu functionality
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.classList.toggle('active');
    }
}

// Logout functionality
function logout() {
    // This should ideally be a POST request to a logout URL
    console.log('Logout action triggered');
    // Simulate logout for UI purposes
    const authGuest = document.getElementById('authGuest');
    const authUser = document.getElementById('authUser');
    if(authGuest && authUser) {
        authGuest.style.display = 'flex';
        authUser.style.display = 'none';
    }
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        const themeIcon = document.getElementById('theme-icon');
        const themeText = document.getElementById('theme-text');
        if (themeIcon) themeIcon.textContent = '☀️';
        if (themeText) themeText.textContent = 'Светлая тема';
    }

    // Close user menu on outside click
    document.addEventListener('click', function(event) {
        const userMenu = document.getElementById('userMenu');
        const userProfile = document.querySelector('.user-profile');
        
        if (userMenu && userProfile && !userProfile.contains(event.target) && !userMenu.contains(event.target)) {
            userMenu.classList.remove('active');
        }
    });

    // Password strength animation
    document.addEventListener('input', function(event) {
        if (event.target.type === 'password' && event.target.closest(".auth-page-container")) {
            const password = event.target.value;
            const formGroup = event.target.closest('.form-group');
            if (!formGroup) return;

            const strengthBar = formGroup.querySelector('.strength-bar');
            const strengthText = formGroup.querySelector('.strength-text');
            
            if (!strengthBar || !strengthText) return;

            let strength = 0;
            let text = 'Слабый пароль';
            let color = '#ef4444';
            
            if (password.length >= 8) strength++;
            if (/[a-z]/.test(password)) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;
            
            if (strength >= 2) {
                text = 'Средний пароль';
                color = '#f59e0b';
            }
            if (strength >= 4) {
                text = 'Сильный пароль';
                color = '#10b981';
            }
            
            strengthBar.style.width = (strength * 20) + '%';
            strengthBar.style.backgroundColor = color;
            strengthText.textContent = text;
            strengthText.style.color = color;
        }
    });

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
