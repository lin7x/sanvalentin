const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successMessage = document.getElementById('successMessage');

// New Elements
const envelope = document.getElementById('envelope');
const envelopeScreen = document.getElementById('envelope-screen');
const letterScreen = document.getElementById('letter-screen');
const finishLetterBtn = document.getElementById('finishLetterBtn');
const proposalScreen = document.getElementById('proposal-screen');

// --- ENVELOPE LOGIC ---
envelope.addEventListener('click', () => {
    envelope.classList.add('open');

    // Wait for animation to finish before showing letter full screen
    setTimeout(() => {
        envelopeScreen.classList.add('hidden');
        letterScreen.classList.remove('hidden');
    }, 800);
});

finishLetterBtn.addEventListener('click', () => {
    letterScreen.classList.add('hidden');
    proposalScreen.classList.remove('hidden');
});


// --- PROPOSAL LOGIC ---

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
    const maxLeft = viewportWidth - btnWidth - 50;
    const maxTop = viewportHeight - btnHeight - 50;

    const randomLeft = Math.max(50, Math.floor(Math.random() * maxLeft));
    const randomTop = Math.max(50, Math.floor(Math.random() * maxTop));

    // Apply new style
    noBtn.style.position = 'fixed';
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
    e.preventDefault();
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

// --- COUPON LOGIC ---
function redeemCoupon(type) {
    if (type === 'dinner') {
        Swal.fire({
            title: '¡Cena Romántica! 🍝',
            text: 'Ve eligiendo el lugar (yo pago... a veces 😜). ¡Es broma! Será donde tú quieras.',
            icon: 'success',
            confirmButtonColor: '#ff4d6d',
            confirmButtonText: '¡Qué rico!'
        });
    } else if (type === 'punches') {
        Swal.fire({
            title: '¡Ay! 🥊',
            text: 'Este cupón es peligroso... Prometo portarme bien para que no tengas que usarlo (muy fuerte).',
            icon: 'warning',
            confirmButtonColor: '#ff4d6d',
            confirmButtonText: 'Lo pensaré...'
        });
    } else if (type === 'ps5') {
        Swal.fire({
            title: '¡CONFIRMADO! 🎮',
            text: 'Acabas de firmar un contrato vinculante. He guardado una captura de pantalla. No se aceptan devoluciones. Fecha de entrega: PRONTO.',
            imageUrl: 'https://media.giphy.com/media/3oKIPa2TdahY8LAAgw/giphy.gif',
            imageWidth: 300,
            imageHeight: 200,
            imageAlt: 'Money gif',
            confirmButtonColor: '#d4af37', // Gold color
            confirmButtonText: '¡Acepto mi destino!'
        });
        // Extra confetti for the big prize
        triggerConfetti();
    }
}
