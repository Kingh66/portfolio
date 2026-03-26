export function initializeAnimations() {
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animation is done to save resources
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // 1. Observe all text elements
    document.querySelectorAll('.animate-text').forEach(el => {
        observer.observe(el);
    });

    // 2. Observe Glass Cards (for a subtle fade-in effect if you add .animate-text to them)
    document.querySelectorAll('.glass-card').forEach(el => {
        // If you want cards to animate, add 'animate-text' class to them in HTML, 
        // or specifically add a '.animate-card' class rule in CSS.
        if (el.classList.contains('animate-text')) {
            observer.observe(el);
        }
    });
    
    console.log("Scroll animations initialized.");
}