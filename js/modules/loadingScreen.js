// js/modules/loadingScreen.js
export function initializeLoadingScreen() {
    const loaderText = document.getElementById('loader-text');
    const progressBar = document.querySelector('.progress-bar');
    const countdownElement = document.getElementById('countdown');
    const finalMessage = document.querySelector('.final-message');
    const mainContent = document.getElementById('main-content');
    const loaderContainer = document.querySelector('.loader-container');

    if (!loaderContainer || !mainContent) return;

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

    // Start loading sequence
    startLoadingSequence();

    function startLoadingSequence() {
        
        showInitialLoader();
    }

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

    async function startTypingMessages() {
        for (const [index, message] of messages.entries()) {
            await typeMessage(message, index);
        }
        
        await animateCheckmarks();
        animateProgressBar();
        await showRealityMessage();
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

    function animateProgressBar() {
        progressBar.style.width = '100%';
        return new Promise(r => setTimeout(r, 100));
    }

    async function showRealityMessage() {
        loaderText.innerHTML += '<div>Reality.exe loaded successfully</div>';
        return new Promise(r => setTimeout(r, 100));
    }

    

    function revealContent() {
        // Clear existing elements
        loaderText.style.display = 'none';
        progressBar.style.display = 'none';
        countdownElement.style.display = 'none';

        // Show and animate final message
        finalMessage.style.display = 'block';
        finalMessage.style.animation = 'finalMessageAppear 1s forwards';
        
        // Hide loader after message display
        setTimeout(() => {
            loaderContainer.style.opacity = '0';
            setTimeout(() => {
                loaderContainer.style.display = 'none';
                mainContent.style.display = 'block';
                clearMatrixEffect();
            }, 1000);
        }, 3000); // Show message for 3 seconds before fade
    }

    function startCountdown() {
        let count = 3;
        countdownElement.style.display = 'block';
        
        const countdownInterval = setInterval(() => {
            countdownElement.innerHTML = `Launching in: ${count}...`;
            count--;
            
            if (count < 0) {
                clearInterval(countdownInterval);
                countdownElement.innerHTML = 'Systems ready!';
                setTimeout(revealContent, 1000); // Add 1s delay before reveal
            }
        }, 1000);
    }

    


}