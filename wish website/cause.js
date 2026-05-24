// Reasons database — longer, more heartfelt messages
const reasons = [
    {
        text: "You know what I love most about you? It's the way you light up my entire world. Your kindness isn't something you put on — it just flows out of you naturally, and honestly, it's one of the most beautiful things about you. I feel so incredibly lucky to be yours, and I wouldn't trade our love for anything in this universe.🌟",
        emoji: "🌟",
        gif: "gif1.gif"
    },
    {
        text: "I hope today brings you the kind of happiness that makes your heart feel full — the kind where you can't stop smiling even if you tried. You deserve every bit of love, laughter, and magic that this day can possibly hold. May this year shower you with everything your beautiful heart has ever wished for.💗",
        emoji: "💗",
        gif: "gif2.gif"
    },
    {
        text: "If I could give you one thing, it would be the ability to see yourself exactly the way I see you — breathtaking, kind, absolutely radiant, and so full of life. You have this incredible energy that makes me fall in love with you more every day. Never stop being exactly who you are, because my world is so much better with you in it.💕",
        emoji: "💕",
        gif: "gif1.gif"
    },
    {
        text: "Here's to another year of growing, glowing, and being the gorgeous, unstoppable force that you are! I can't wait to see all the amazing things this new chapter brings you. You've got the biggest heart and the brightest future ahead, and I'll always be right here by your side, holding your hand every single step of the way.🥳",
        emoji: "🥳",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';

    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;

    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;

    card.appendChild(text);
    card.appendChild(gifOverlay);

    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);

        // Update counter
        reasonCounter.textContent = `Wish ${currentReasonIndex + 1} of ${reasons.length}`;

        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter Our Storylane 💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'flowers.html';
                            }
                        });
                    });
                }
            });
        }

        // Burst of floating hearts when a new card appears
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createFloatingElement(), i * 100);
        }

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        window.location.href = "#storylane";
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating heart elements — lots of heart varieties
const heartEmojis = ['💖', '💗', '💕', '💓', '💝', '💘', '💞', '❤️', '🩷', '♥️', '🤍', '🩵', '💜', '🧡'];

function createFloatingElement() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 22 + 12) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 8 + 6,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Create floating hearts frequently
setInterval(createFloatingElement, 600);