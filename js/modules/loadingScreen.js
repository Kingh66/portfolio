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
        { text: "> Initializing system boot sequence...", type: "system" },
        { text: "> Loading core modules...", type: "system" },
        { text: "> Authenticating user access...", type: "system" },
        { text: "> Establishing secure connection...", type: "system" },
        { text: "> Loading portfolio assets...", type: "system" },
        { text: "> Compiling interface components...", type: "system" },
        { text: "> Initializing Vanta.js background matrix...", type: "system" },
        { text: "> System ready for launch sequence", type: "success" }
    ];

    startLoadingSequence();

    function startLoadingSequence() {
        showInitialLoader();
    }

    function showInitialLoader() {
        loaderText.innerHTML = '<div class="typing-line">> Booting system<span class="typing-cursor"></span></div>';
        
        setTimeout(() => {
            startTypingMessages();
        }, 1000);
    }

    async function startTypingMessages() {
        let progress = 0;
        const progressIncrement = 100 / messages.length;

        for (const [index, message] of messages.entries()) {
            await typeMessage(message, index);
            
            // Update progress
            progress += progressIncrement;
            updateProgressBar(Math.min(progress, 100));
            
            // Add checkmark after delay for system messages
            if (message.type === "system") {
                setTimeout(() => {
                    addCheckmark(index);
                }, 0);
            }
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        startCountdown();
    }

    function typeMessage(message, index) {
        return new Promise(resolve => {
            const line = document.createElement('div');
            line.className = `typing-line ${message.type}`;
            if (message.type === "success") {
                line.classList.add('system-success');
            }
            loaderText.appendChild(line);
            
            let i = 0;
            const typingInterval = setInterval(() => {
                line.innerHTML = message.text.substring(0, i) + '<span class="typing-cursor"></span>';
                i++;
                
                if (i > message.text.length) {
                    clearInterval(typingInterval);
                    line.innerHTML = message.text;
                    resolve();
                }
            }, 30);
        });
    }

    function addCheckmark(index) {
        const lines = loaderText.querySelectorAll('.typing-line');
        if (lines[index]) {
            lines[index].innerHTML += ' <span class="checkmark">[✓]</span>';
        }
    }

    function updateProgressBar(percentage) {
        progressFill.style.width = percentage + '%';
        progressText.textContent = Math.round(percentage) + '%';
    }

    function startCountdown() {
        let count = 3;
        countdownElement.style.display = 'block';
        countdownElement.textContent = `> Launch sequence initiated: T-${count}`;
        
        const countdownInterval = setInterval(() => {
            countdownElement.textContent = `> Launch sequence initiated: T-${count}`;
            countdownElement.style.animation = 'glitch 0.3s ease';
            
            setTimeout(() => {
                countdownElement.style.animation = '';
            }, 300);
            
            count--;
            
            if (count < 0) {
                clearInterval(countdownInterval);
                countdownElement.textContent = '> Launching portfolio...';
                setTimeout(exitTerminal, 1000);
            }
        }, 1000);
    }

    function exitTerminal() {
        console.log('Exiting terminal...');
        // Animate terminal exit
        terminalWindow.style.animation = 'terminalExit 1s ease-in-out forwards';
        
        // After terminal disappears, show final message
        setTimeout(() => {
            showFinalMessage();
        }, 1000);
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
        finalMessage.style.animation = 'messageExit 0.8s ease-in-out forwards';
        
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