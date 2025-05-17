// main.js
import { initializeTheme, toggleTheme } from './modules/themeManager.js';
import { initializeMenu } from './modules/menuManager.js';
import { initializeForm } from './modules/formManager.js';
import { initializeLoadingScreen } from './modules/loadingScreen.js';
import { initializeAnimations } from './modules/animations.js';
import { initializeProjects } from './modules/projects.js'; // Fixed path and name

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeMenu();
    initializeForm();
    initializeLoadingScreen();
    initializeAnimations();
    initializeProjects(); // Now matches the exported function name
});

