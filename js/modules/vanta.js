// modules/vanta.js
let vantaEffect = null;
let isInitialized = false;
let pendingThemeUpdate = null;

export function initializeVanta() {
    if (isInitialized) return;
    
    console.log('Initializing Vanta.js...');
    
    // Load Three.js and Vanta.js dynamically
    const threeScript = document.createElement('script');
    threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    
    threeScript.onload = () => {
        console.log('Three.js loaded, loading Vanta...');
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.globe.min.js';
        
        vantaScript.onload = () => {
            console.log('Vanta.js loaded, creating effect...');
            isInitialized = true;
            createVantaEffect();
            
            // Apply any pending theme update
            if (pendingThemeUpdate !== null) {
                updateVantaTheme(pendingThemeUpdate);
                pendingThemeUpdate = null;
            }
        };
        document.head.appendChild(vantaScript);
    };
    document.head.appendChild(threeScript);
}

export function updateVantaTheme(isLightTheme = false) {
    console.log('Updating Vanta theme to:', isLightTheme ? 'light' : 'dark');
    
    if (!isInitialized) {
        console.log('Vanta not initialized yet, queuing theme update...');
        pendingThemeUpdate = isLightTheme;
        initializeVanta();
        return;
    }
    
    if (vantaEffect) {
        console.log('Destroying current Vanta effect...');
        vantaEffect.destroy();
        
        // Small delay to ensure clean destruction
        setTimeout(() => {
            createVantaEffect(isLightTheme);
        }, 100);
    } else {
        createVantaEffect(isLightTheme);
    }
}

function createVantaEffect(isLightTheme = false) {
    if (!window.VANTA) {
        console.error('VANTA not available');
        return;
    }
    
    // Check current theme if not provided
    if (isLightTheme === undefined) {
        isLightTheme = document.body.getAttribute('data-theme') === 'light';
    }
    
    console.log('Creating Vanta effect with theme:', isLightTheme ? 'light (black lines)' : 'dark (green dots, white lines)');
    
    try {
        vantaEffect = window.VANTA.GLOBE({
            el: "#vanta-background",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            
            
            color: isLightTheme ? 0x067206 : 0x00ff00,
            
            
            color2: isLightTheme ? 0x000000 : 0xffffff,
            
            backgroundColor: 0x000000,
            backgroundAlpha: 0.0
        });
        
        console.log('Vanta effect created successfully');
    } catch (error) {
        console.error('Error creating Vanta effect:', error);
    }
}

// Force reinitialization if needed
export function reloadVanta() {
    if (vantaEffect) {
        vantaEffect.destroy();
        vantaEffect = null;
    }
    isInitialized = false;
    initializeVanta();
}