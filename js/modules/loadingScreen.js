// js/modules/loadingScreen.js
export function initializeLoadingScreen() {
    const loaderText = document.getElementById('loader-text');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const countdownElement = document.getElementById('countdown');
    const finalMessage = document.querySelector('.final-message');
    const mainContent = document.getElementById('main-content');
    const loaderContainer = document.querySelector('.loader-container');
    const terminalWindow = document.querySelector('.terminal-window');

    if (!loaderContainer || !mainContent) {
        console.error('Required elements not found');
        return;
    }

    // BOOSTED: Significantly reduced typing speeds (ms per char)
    const messages = [
        { text: "> Initializing system boot sequence...", type: "system", typingSpeed: 8 },
        { text: "> Loading core modules...", type: "system", typingSpeed: 6 },
        { text: "> Authenticating user access...", type: "system", typingSpeed: 10 },
        { text: "> Establishing secure connection...", type: "system", typingSpeed: 8 },
        { text: "> Loading portfolio assets...", type: "system", typingSpeed: 6 },
        { text: "> Compiling interface components...", type: "system", typingSpeed: 12 },
        { text: "> Initializing Vanta.js background matrix...", type: "system", typingSpeed: 15 },
        { text: "> System ready for launch sequence", type: "success", typingSpeed: 18 }
    ];

    startLoadingSequence();

    function startLoadingSequence() {
        showInitialLoader();
    }

    function showInitialLoader() {
        const initialLine = document.createElement('div');
        initialLine.className = 'typing-line';
        initialLine.innerHTML = '> Booting system<span class="typing-cursor"></span>';
        
        loaderText.innerHTML = '';
        loaderText.appendChild(initialLine);
        
        typeInitialLine(initialLine);
    }

    function typeInitialLine(lineElement) {
        const fullText = '> Booting system';
        let currentText = '';
        let charIndex = 0;
        // BOOSTED: Increased speed (lower ms)
        const speed = 15; 
        
        const typeChar = () => {
            if (charIndex < fullText.length) {
                currentText += fullText.charAt(charIndex);
                lineElement.innerHTML = currentText + '<span class="typing-cursor"></span>';
                charIndex++;
                setTimeout(typeChar, speed);
            } else {
                // BOOSTED: Reduced wait times
                setTimeout(() => {
                    lineElement.innerHTML = fullText + ' <span class="checkmark">[✓]</span>';
                    const checkmark = lineElement.querySelector('.checkmark');
                    checkmark.style.animation = 'checkPulse 0.3s ease-in-out';
                    
                    setTimeout(() => {
                        startTypingMessages();
                    }, 100); // Reduced from 300
                }, 100); // Reduced from 200
            }
        };
        
        typeChar();
    }

    async function startTypingMessages() {
        let progress = 0;
        const progressIncrement = 100 / (messages.length + 1);
        
        progress += progressIncrement;
        updateProgressBar(Math.min(progress, 15));

        for (const [index, message] of messages.entries()) {
            await typeMessage(message, index);
            
            progress += progressIncrement;
            updateProgressBar(Math.min(progress, 85));
            
            if (message.type === "system") {
                addCheckmark(index);
            }
            
            // BOOSTED: Drastically reduced delay between messages
            const messageDelay = message.text.length * 2; // Reduced multiplier
            await new Promise(resolve => setTimeout(resolve, Math.min(messageDelay, 80))); // Cap at 80ms
        }
        
        updateProgressBar(90);
        
        // BOOSTED: Reduced wait before countdown
        await new Promise(resolve => setTimeout(resolve, 300));
        startCountdown();
    }

    function typeMessage(message, index) {
        return new Promise(resolve => {
            const line = document.createElement('div');
            line.className = `typing-line ${message.type}`;
            line.id = `message-${index}`;
            
            if (message.type === "success") {
                line.classList.add('system-success');
            }
            
            loaderText.appendChild(line);
            
            let i = 0;
            const typingInterval = setInterval(() => {
                const existingCursor = line.querySelector('.typing-cursor');
                if (existingCursor) existingCursor.remove();
                
                line.innerHTML = message.text.substring(0, i) + '<span class="typing-cursor"></span>';
                i++;
                
                if (i > message.text.length) {
                    clearInterval(typingInterval);
                    line.innerHTML = message.text;
                    
                    if (message.type === "success") {
                        line.innerHTML += ' <span class="checkmark success-checkmark">✓</span>';
                        const checkmark = line.querySelector('.checkmark');
                        checkmark.style.animation = 'checkPulse 0.3s ease-in-out';
                    }
                    resolve();
                }
            }, message.typingSpeed || 10); // BOOSTED: Fallback speed reduced
        });
    }

    function addCheckmark(index) {
        const line = document.getElementById(`message-${index}`);
        if (line && !line.querySelector('.checkmark')) {
            const checkmark = document.createElement('span');
            checkmark.className = 'checkmark';
            checkmark.textContent = ' [✓]';
            line.appendChild(checkmark);
            checkmark.style.animation = 'checkPulse 0.3s ease-in-out';
            void checkmark.offsetWidth;
        }
    }

    function updateProgressBar(percentage) {
        progressFill.style.width = percentage + '%';
        progressText.textContent = Math.round(percentage) + '%';
        
        if (percentage === 25 || percentage === 50 || percentage === 75) {
            addProgressGlitch();
        }
    }

    function addProgressGlitch() {
        if (!terminalWindow) return;
        terminalWindow.style.animation = 'glitch 0.1s'; // Faster glitch
        setTimeout(() => {
            terminalWindow.style.animation = '';
        }, 100);
    }

    function startCountdown() {
        let count = 2; // BOOSTED: Reduced from 3 to 2
        countdownElement.style.display = 'block';
        countdownElement.textContent = `> Launch sequence initiated: T-${count}`;
        countdownElement.style.opacity = '0';
        
        setTimeout(() => {
            countdownElement.style.transition = 'opacity 0.2s ease'; // Faster fade
            countdownElement.style.opacity = '1';
        }, 50);
        
        // BOOSTED: Faster interval
        const countdownInterval = setInterval(() => {
            countdownElement.textContent = `> Launch sequence initiated: T-${count}`;
            countdownElement.style.animation = 'none';
            void countdownElement.offsetWidth;
            countdownElement.style.animation = 'glitch 0.2s ease';
            
            setTimeout(() => {
                countdownElement.style.animation = '';
            }, 150);

            const countdownProgress = 90 + ((2 - count) * (10 / 2)); 
            updateProgressBar(countdownProgress);
            
            count--;
            
            if (count < 0) {
                clearInterval(countdownInterval);
                countdownElement.textContent = '> Launching portfolio...';
                updateProgressBar(100);
                setTimeout(exitTerminal, 300); // BOOSTED: Faster exit
            }
        }, 500); // BOOSTED: Interval reduced from 1000ms to 500ms
    }

    function exitTerminal() {
        terminalWindow.style.animation = 'terminalExit 0.4s forwards'; // Faster animation
        
        setTimeout(() => {
            showFinalMessage();
        }, 400); // Match animation
    }

    function showFinalMessage() {
        finalMessage.classList.add('active');
        
        setTimeout(() => {
            hideFinalMessage();
        }, 1200); // BOOSTED: Reduced from 2500
    }

    function hideFinalMessage() {
        finalMessage.style.animation = 'messageExit 2s forwards'; // Faster animation
        
        setTimeout(() => {
            loaderContainer.style.display = 'none';
            mainContent.style.display = 'block';
            
            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 50);
        }, 400); // Match animation
    }
}