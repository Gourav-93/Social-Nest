// auth.js - Authentication logic

document.addEventListener('DOMContentLoaded', () => {
    
    // Redirect if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'index.html';
        return;
    }

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    const loginTabBtn = document.getElementById('loginTabBtn');
    const registerTabBtn = document.getElementById('registerTabBtn');

    const authMessage = document.getElementById('authMessage');

    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');

    // Tab Switching Logic
    function switchTab(tab) {
        authMessage.classList.add('hidden');
        if (tab === 'login') {
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
            loginTabBtn.classList.add('active');
            loginTabBtn.setAttribute('aria-selected', 'true');
            registerTabBtn.classList.remove('active');
            registerTabBtn.setAttribute('aria-selected', 'false');
        } else {
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
            registerTabBtn.classList.add('active');
            registerTabBtn.setAttribute('aria-selected', 'true');
            loginTabBtn.classList.remove('active');
            loginTabBtn.setAttribute('aria-selected', 'false');
        }
    }

    loginTabBtn.addEventListener('click', () => switchTab('login'));
    registerTabBtn.addEventListener('click', () => switchTab('register'));

    function showMessage(msg, type = 'error') {
        authMessage.textContent = msg;
        authMessage.className = `alert ${type === 'error' ? 'alert-error' : 'alert-success'}`;
        authMessage.classList.remove('hidden');
    }

    // Login Form Submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        authMessage.classList.add('hidden');
        loginBtn.disabled = true;
        loginBtn.textContent = 'Logging in...';

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const data = await window.api.loginUser({ email, password });
            
            localStorage.setItem('isLoggedIn', 'true');
            if (data && data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            
            window.location.href = 'index.html';
            
        } catch (error) {
            showMessage(error.message || 'Invalid email or password.', 'error');
        } finally {
            loginBtn.disabled = false;
            loginBtn.textContent = 'Login';
        }
    });

    // Register Form Submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        authMessage.classList.add('hidden');
        registerBtn.disabled = true;
        registerBtn.textContent = 'Signing up...';

        const name = document.getElementById('registerName').value;
        const avatar = document.getElementById('registerAvatar').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        try {
            await window.api.registerUser({ name, avatar, email, password });
            
            showMessage('Registration successful! You can now login.', 'success');
            registerForm.reset();
            switchTab('login');
            
        } catch (error) {
            showMessage(error.message || 'Registration failed. Try again.', 'error');
        } finally {
            registerBtn.disabled = false;
            registerBtn.textContent = 'Register';
        }
    });
});
