// modules/themeManager.js
import { updateVantaTheme } from './vanta.js';

// Make sure this function exists and is exported
export function initializeTheme() {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    
    // Load saved theme or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);
    
    // Initialize Vanta with correct theme
    updateVantaTheme(currentTheme === 'light');

    // Theme toggle event
    if (modeToggle) {
        modeToggle.addEventListener('click', toggleTheme);
    }
}

// Make sure this function exists and is exported
export function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Update theme
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update Vanta.js colors
    updateVantaTheme(newTheme === 'light');
}

// If you have other functions, make sure they're exported too