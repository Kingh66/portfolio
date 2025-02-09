// Initialize EmailJS with your User ID
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

// Check for saved theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
}

modeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'light';
    body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('nav') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});


(function() {
    emailjs.init('q69sk-XmcTj6GEzjl'); // Replace with your EmailJS User ID
})();

// Enhanced form handling with validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const requiredFields = ['name', 'email', 'subject', 'message'];
    let isValid = true;

    // Validate required fields
    requiredFields.forEach(field => {
        if (!formData.get(field)) {
            isValid = false;
            document.querySelector(`[name="${field}"]`).classList.add('error');
        }
    });

    if (isValid) {
        // Prepare email parameters
        const emailParams = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Send email using EmailJS
        emailjs.send('service_fcdwhbc', 'template_uim1xoc', emailParams)
            .then(() => {
                // Show success message
                const successMessage = document.getElementById('successMessage');
                successMessage.style.display = 'flex';
                this.reset(); // Reset the form

                // Hide success message after 3 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                        successMessage.style.opacity = '1';
                    }, 300);
                }, 3000);
            })
            .catch((error) => {
                console.error('Failed to send email:', error);
                alert('Failed to send message. Please try again later.');
            });
    }
});

// Add intersection observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.animate-text').forEach(el => observer.observe(el));

// =========================
// Loading Screen Logic
// =========================
const messages = [
    "Welcome to my digital realm... Where code shapes the future.",
    "Where code becomes architecture and algorithms transform into ecosystems.",
    "Sizwe Philani Mthembu | Software Developer",
    "Initializing systems... [✓]", 
    "Cybernetic Interface... [✓]",
    "Authenticating access... [✓]", 
    "Neural Connection... [✓]",
    "Booting creative engines... [✓]", 
    "Quantum CSS Processors... [✓]"
];

const loaderText = document.getElementById('loader-text');
const progressBar = document.querySelector('.progress-bar');
const countdownElement = document.getElementById('countdown');
const finalMessage = document.querySelector('.final-message');
const mainContent = document.getElementById('main-content');
const loaderContainer = document.querySelector('.loader-container'); // Define loaderContainer

let currentStep = 0;
let matrixInterval; // Variable to store the matrix interval

// Initial loading indicator
function showInitialLoader() {
    let dots = 0;
    const initialLoader = setInterval(() => {
        loaderText.innerHTML = '_'.repeat(dots) + '<span class="typing-cursor"></span>';
        dots = (dots % 3) + 1;
    }, 100);

    setTimeout(() => {
        clearInterval(initialLoader);
        startTypingMessages();
    }, 500);
}

// Type messages with cursor effect
async function startTypingMessages() {
    for (const [index, message] of messages.entries()) {
        await typeMessage(message, index);
    }
    
    // Animate checkmarks sequentially
    await animateCheckmarks();
    
    // Show progress bar
    progressBar.style.width = '100%';
    await new Promise(r => setTimeout(r, 100));
    
    // Show reality.exe message
    loaderText.innerHTML += '<div>Reality.exe loaded successfully</div>';
    await new Promise(r => setTimeout(r, 100));
    
    // Start countdown
    startCountdown();
}

function typeMessage(message, index) {
    return new Promise(resolve => {
        let i = 0;
        const typingInterval = setInterval(() => {
            const currentContent = loaderText.innerHTML;
            const newContent = currentContent.replace(/<span class="typing-cursor"><\/span>/, '') + 
                              message[i] + '<span class="typing-cursor"></span>';
            loaderText.innerHTML = newContent;
            i++;
            
            if (i >= message.length) {
                clearInterval(typingInterval);
                loaderText.innerHTML = loaderText.innerHTML.replace(/<span class="typing-cursor"><\/span>/, '');
                if (index < 3) loaderText.innerHTML += '<br>';
                resolve();
            }
        }, 50);
    });
}

async function animateCheckmarks() {
    const systemMessages = Array.from(loaderText.children).slice(3);
    for (const [index, messageElement] of systemMessages.entries()) {
        await new Promise(resolve => {
            setTimeout(() => {
                messageElement.innerHTML = messageElement.innerHTML.replace('[ ]', '[<span class="checkmark">✓</span>]');
                resolve();
            }, index * 800);
        });
    }
}

function startCountdown() {
    let count = 3;
    const countdownInterval = setInterval(() => {
        countdownElement.innerHTML = `Preparing immersive experience in:<br>${count}...`;
        count--;
        
        if (count < 0) {
            clearInterval(countdownInterval);
            
            // Display the final message
            finalMessage.style.opacity = '1';
            finalMessage.style.animation = 'fadeOut 2s forwards 3s'; // Fade out after 3 seconds
            
            // Hide the loader container and show the main content after the final message fades out
            setTimeout(() => {
                loaderContainer.style.display = 'none'; // Hide loader
                mainContent.style.display = 'block'; // Show main content
                clearInterval(matrixInterval); // Stop the matrix rain effect
            }, 1000); // Wait 5 seconds (3s delay + 2s fadeOut) before transitioning
        }
    }, 1000);
}

// Matrix rain effect
function createMatrixCode() {
    const chars = '01';
    const code = document.createElement('div');
    code.className = 'matrix-code';
    code.style.left = `${Math.random() * 100}%`;
    code.style.animationDuration = `${Math.random() * 5 + 3}s`;
    code.textContent = Array(100).fill().map(() => 
        chars[Math.floor(Math.random() * chars.length)]).join('');
    code.style.animation = 'fall linear forwards';
    document.body.appendChild(code);
    
    setTimeout(() => code.remove(), 500);
}

// Start effects
matrixInterval = setInterval(createMatrixCode, 100); // Store the interval in a variable
showInitialLoader();

// Hire Me Button
document.getElementById('hireMeBtn').addEventListener('click', function() {
    window.location.href = 'mailto:sizwemthembu03@gmail.com';
});

// Download CV Button
document.getElementById('downloadCvBtn').addEventListener('click', function() {
    // Replace with the actual path to your CV file
    const cvUrl = 'https://coffee-merry-19.tiiny.site';
    
    // Open the CV in a new tab
    window.open(cvUrl, '_blank');
    
    // Optional: Track the download (e.g., using Google Analytics)
    console.log('CV downloaded');
});

