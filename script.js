const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successMessage = document.getElementById('successMessage');

// Configuration for the "No" button movement
const moveNoButton = () => {
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get button dimensions
    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;
    
    // Calculate random position within safe bounds
    // We leave some margin (e.g., 50px) so it doesn't stick to the absolute edge
    const maxLeft = viewportWidth - btnWidth - 50;
    const maxTop = viewportHeight - btnHeight - 50;
    
    const randomLeft = Math.max(50, Math.floor(Math.random() * maxLeft));
    const randomTop = Math.max(50, Math.floor(Math.random() * maxTop));
    
    // Apply new style
    noBtn.style.position = 'fixed'; // Change to fixed to allow free movement across screen
    noBtn.style.left = randomLeft + 'px';
    noBtn.style.top = randomTop + 'px';
    
    // Add a funny scale effect
    noBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        noBtn.style.transform = 'scale(1)';
    }, 200);
};

// Events for "No" button
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent click on mobile if possible
    moveNoButton();
});
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Events for "Yes" button
yesBtn.addEventListener('click', () => {
    // 1. Trigger confetti
    triggerConfetti();
    
    // 2. Continuous confetti for a few seconds
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    };
    frame();

    // 3. Show success message
    successMessage.classList.remove('hidden');
    // Force reflow
    void successMessage.offsetWidth; 
    successMessage.classList.add('visible');
});

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
    });
}
