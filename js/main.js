// main.js
import { initializeTheme, toggleTheme } from './modules/themeManager.js';
import { initializeMenu } from './modules/menuManager.js';
import { initializeForm } from './modules/formManager.js';
import { initializeLoadingScreen } from './modules/loadingScreen.js';
import { initializeAnimations } from './modules/animations.js';
import { initializeProjects } from './modules/projects.js';


// Initialize all modules except Vanta - it will initialize itself when loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeMenu();
    initializeForm();
    initializeLoadingScreen();
    initializeAnimations();
    initializeProjects();
});

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
    });
}

// Call this when the skills section comes into view
document.addEventListener('DOMContentLoaded', animateSkillBars);