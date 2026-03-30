// js/modules/nav.js

export function initializeNav() {
    const toggleDesktop = document.getElementById('mode-toggle-desktop');
    const toggleMobile = document.getElementById('mode-toggle-mobile');

    // ONLY handle visibility - themeManager handles the clicks
    function handleToggleVisibility() {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            if (toggleDesktop) toggleDesktop.style.display = 'none';
            if (toggleMobile) toggleMobile.style.display = 'flex';
        } else {
            if (toggleDesktop) toggleDesktop.style.display = 'flex';
            if (toggleMobile) toggleMobile.style.display = 'none';
        }
    }

    window.addEventListener('resize', handleToggleVisibility);

    // Run immediately
    handleToggleVisibility();
}