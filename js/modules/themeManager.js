// js/modules/themeManager.js
import { updateVantaTheme } from './vanta.js';

export function initializeTheme() {
    // ✅ Target BOTH new IDs
    const toggleDesktop = document.getElementById('mode-toggle-desktop');
    const toggleMobile = document.getElementById('mode-toggle-mobile');
    const body = document.body;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.setAttribute('data-theme', 'light');
    } else {
        body.removeAttribute('data-theme');
    }
    
    // Initialize Vanta with correct theme
    updateVantaTheme(savedTheme === 'light');

    // Attach to BOTH buttons
    if (toggleDesktop) toggleDesktop.addEventListener('click', toggleTheme);
    if (toggleMobile) toggleMobile.addEventListener('click', toggleTheme);
}

export function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Update theme
    if (newTheme === 'dark') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'light');
    }
    
    localStorage.setItem('theme', newTheme);
    
    // ✅ Update Vanta.js colors
    updateVantaTheme(newTheme === 'light');
}