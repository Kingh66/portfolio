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

    console.log('Loading screen elements:', {
        loaderText,
        progressFill,
        countdownElement,
        finalMessage,
        mainContent,
        loaderContainer,
        terminalWindow
    });

    if (!loaderContainer || !mainContent) {
        console.error('Required elements not found');
        return;
    }

    const messages = [
        { text: "> Initializing system boot sequence...", type: "system", typingSpeed: 25 },
        { text: "> Loading core modules...", type: "system", typingSpeed: 20 },
        { text: "> Authenticating user access...", type: "system", typingSpeed: 30 },
        { text: "> Establishing secure connection...", type: "system", typingSpeed: 25 },
        { text: "> Loading portfolio assets...", type: "system", typingSpeed: 20 },
        { text: "> Compiling interface components...", type: "system", typingSpeed: 35 },
        { text: "> Initializing Vanta.js background matrix...", type: "system", typingSpeed: 40 },
        { text: "> System ready for launch sequence", type: "success", typingSpeed: 50 }
    ];

    startLoadingSequence();

    function startLoadingSequence() {
        showInitialLoader();
    }

    function showInitialLoader() {
        // Create the initial line but without adding it directly to the DOM yet
        const initialLine = document.createElement('div');
        initialLine.className = 'typing-line';
        initialLine.innerHTML = '> Booting system<span class="typing-cursor"></span>';
        
        // Clear any existing content and add the initial line
        loaderText.innerHTML = '';
        loaderText.appendChild(initialLine);
        
        // Animate the initial line typing
        typeInitialLine(initialLine);
    }

    function typeInitialLine(lineElement) {
        const fullText = '> Booting system';
        let currentText = '';
        let charIndex = 0;
        const speed = 50; // ms per character
        
        const typeChar = () => {
            if (charIndex < fullText.length) {
                currentText += fullText.charAt(charIndex);
                lineElement.innerHTML = currentText + '<span class="typing-cursor"></span>';
                charIndex++;
                setTimeout(typeChar, speed);
            } else {
                // Done typing initial line, wait and then start messages
                setTimeout(() => {
                    // Remove the cursor from the initial line and add checkmark
                    lineElement.innerHTML = fullText + ' <span class="checkmark">[✓]</span>';
                    // Add pulse animation to checkmark
                    const checkmark = lineElement.querySelector('.checkmark');
                    checkmark.style.animation = 'checkPulse 0.5s ease-in-out';
                    
                    // Wait a moment, then start next messages
                    setTimeout(() => {
                        startTypingMessages();
                    }, 300);
                }, 200);
            }
        };
        
        typeChar();
    }

    async function startTypingMessages() {
        let progress = 0;
        const progressIncrement = 100 / (messages.length + 1); // +1 for the initial "Booting system" message
        
        // Initial progress for "Booting system"
        progress += progressIncrement;
        updateProgressBar(Math.min(progress, 15));

        for (const [index, message] of messages.entries()) {
            await typeMessage(message, index);
            
            // Update progress
            progress += progressIncrement;
            updateProgressBar(Math.min(progress, 85)); // Cap at 85% until countdown
            
            // Add checkmark immediately after typing completes
            if (message.type === "system") {
                addCheckmark(index);
            }
            
            // Small delay between messages (varies by message length)
            const messageDelay = message.text.length * 10; // 10ms per character
            await new Promise(resolve => setTimeout(resolve, Math.min(messageDelay, 500)));
        }
        
        // Final progress update before countdown
        updateProgressBar(90);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
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
                // Remove any existing cursor
                const existingCursor = line.querySelector('.typing-cursor');
                if (existingCursor) {
                    existingCursor.remove();
                }
                
                // Update text and add new cursor
                line.innerHTML = message.text.substring(0, i) + '<span class="typing-cursor"></span>';
                i++;
                
                if (i > message.text.length) {
                    clearInterval(typingInterval);
                    // Remove cursor and set final text
                    line.innerHTML = message.text;
                    
                    // For success messages, add special styling
                    if (message.type === "success") {
                        line.innerHTML += ' <span class="checkmark success-checkmark">✓</span>';
                        const checkmark = line.querySelector('.checkmark');
                        checkmark.style.animation = 'checkPulse 0.5s ease-in-out';
                    }
                    
                    resolve();
                }
            }, message.typingSpeed || 30);
        });
    }

    function addCheckmark(index) {
        const line = document.getElementById(`message-${index}`);
        if (line && !line.querySelector('.checkmark')) {
            // Create checkmark span with bracket style
            const checkmark = document.createElement('span');
            checkmark.className = 'checkmark';
            checkmark.textContent = ' [✓]';
            
            // Append checkmark to the line
            line.appendChild(checkmark);
            
            // Add animation immediately
            checkmark.style.animation = 'checkPulse 0.5s ease-in-out';
            
            // Trigger reflow to ensure animation plays
            void checkmark.offsetWidth;
        }
    }

    function updateProgressBar(percentage) {
        progressFill.style.width = percentage + '%';
        progressText.textContent = Math.round(percentage) + '%';
        
        // Add subtle glitch effect at key progress points
        if (percentage === 25 || percentage === 50 || percentage === 75) {
            addProgressGlitch();
        }
    }

    function addProgressGlitch() {
        if (!terminalWindow) return;
        
        terminalWindow.style.animation = 'glitch 0.2s';
        setTimeout(() => {
            terminalWindow.style.animation = '';
        }, 200);
    }

    function startCountdown() {
        let count = 3;
        countdownElement.style.display = 'block';
        countdownElement.textContent = `> Launch sequence initiated: T-${count}`;
        countdownElement.style.opacity = '0';
        
        // Fade in countdown
        setTimeout(() => {
            countdownElement.style.transition = 'opacity 0.5s ease';
            countdownElement.style.opacity = '1';
        }, 100);
        
        const countdownInterval = setInterval(() => {
            countdownElement.textContent = `> Launch sequence initiated: T-${count}`;
            countdownElement.style.animation = 'none';
            
            // Force reflow to restart animation
            void countdownElement.offsetWidth;
            
            countdownElement.style.animation = 'glitch 0.3s ease';
            
            setTimeout(() => {
                countdownElement.style.animation = '';
            }, 300);
            
            // Update progress during countdown
            const countdownProgress = 90 + ((3 - count) * (10 / 3)); // 90% to 100% during countdown
            updateProgressBar(countdownProgress);
            
            count--;
            
            if (count < 0) {
                clearInterval(countdownInterval);
                countdownElement.textContent = '> Launching portfolio...';
                updateProgressBar(100);
                setTimeout(exitTerminal, 800);
            }
        }, 1000);
    }

    function exitTerminal() {
        console.log('Exiting terminal...');
        // Animate terminal exit
        terminalWindow.style.animation = 'terminalExit 0.8s forwards';
        
        // After terminal disappears, show final message
        setTimeout(() => {
            showFinalMessage();
        }, 800);
    }

    function showFinalMessage() {
        console.log('Showing final message...', finalMessage);
        // Show final message
        finalMessage.classList.add('active');
        
        // After message display, reveal portfolio
        setTimeout(() => {
            hideFinalMessage();
        }, 2500);
    }

    function hideFinalMessage() {
        console.log('Hiding final message...');
        // Hide final message
        finalMessage.style.animation = 'messageExit 0.8s forwards';
        
        // Reveal main content
        setTimeout(() => {
            loaderContainer.style.display = 'none';
            mainContent.style.display = 'block';
            
            // Trigger any entrance animations for main content
            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 100);
        }, 800);
    }
}