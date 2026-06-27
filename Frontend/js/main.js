// main.js - Global logic (Navbar, Auth State)

function checkAuthState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const navLinks = document.getElementById('navLinks');
    
    if (!navLinks) return;

    // Check if auth links are already injected
    if (document.querySelector('.auth-item')) {
        return;
    }

    let linksHtml = '';

    if (isLoggedIn) {
        linksHtml = `
            <li class="auth-item"><a href="profile.html" class="nav-link">Profile</a></li>
            <li class="auth-item"><button id="logoutBtn" class="btn btn-danger">Logout</button></li>
        `;
    } else {
        linksHtml = `
            <li class="auth-item"><a href="auth.html" class="nav-link">Login</a></li>
        `;
    }

    navLinks.insertAdjacentHTML('beforeend', linksHtml);

    if (isLoggedIn) {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('user'); 
                window.location.href = 'index.html';
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuthState();
});
