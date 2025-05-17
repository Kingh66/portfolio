export function initializeTheme() {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    
    // Load saved theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
    }

    // Theme toggle event
    modeToggle.addEventListener('click', toggleTheme);
}

export function toggleTheme() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'light';
    body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}