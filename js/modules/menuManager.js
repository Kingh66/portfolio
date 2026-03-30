// js/modules/menuManager.js

export function initializeMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu li a');

    if (!menuToggle || !navMenu) return;

    // Helper: swap hamburger icon
    function updateIcon(isOpen) {
        const icon = menuToggle.querySelector('i');
        if (!icon) return;
        
        icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    }

    // Helper: close menu
    function closeMenu() {
        navMenu.classList.remove('active');
        updateIcon(false);
    }

    // Toggle menu on hamburger click
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click-outside from firing
        const isOpening = !navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        updateIcon(isOpening);
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking the mobile theme toggle
    const mobileToggle = document.getElementById('mode-toggle-mobile');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', closeMenu);
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const clickedInsideNav = e.target.closest('nav');
        if (!clickedInsideNav && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}