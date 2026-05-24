// Typing effect for greeting
const greetingText = "Hey Deepika! On your special day, I just want you to know how incredibly grateful I am to have you as my girlfriend. You're not just my partner — you're my everything, the kind of soul that makes every single day brighter and far more beautiful. Here's to you, my love! 🎂✨";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 60);
    }
}

// Create floating heart elements — all sorts of hearts
const heartEmojis = ['💖', '💗', '💕', '💓', '💝', '💘', '💞', '❤️', '🩷', '♥️', '🤍', '🩵', '💜', '🧡'];

function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.fontSize = (Math.random() * 24 + 16) + 'px';
    element.style.position = 'absolute';
    element.style.pointerEvents = 'none';
    element.style.opacity = '0';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        x: Math.random() * 120 - 60,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 4,
        opacity: 1,
        ease: "none",
        onComplete: () => element.remove()
    });
}

// Initialize animations
window.addEventListener('load', () => {
    // Title animation
    gsap.to('h1', {
        opacity: 1,
        duration: 1,
        y: 20,
        ease: "bounce.out"
    });

    // Button animation
    gsap.to('.cta-button', {
        opacity: 1,
        duration: 1,
        y: -20,
        ease: "back.out"
    });

    // Start typing effect
    typeGreeting();

    // Create floating hearts frequently
    setInterval(createFloating, 500);
});

// Hover effects
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.1,
            duration: 0.3
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.3
        });
    });

    // Smooth page transition on click
    button.addEventListener('click', (e) => {
        // Heart burst effect
        for(let i=0; i<300; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.position = 'fixed';
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = 9999;
            document.body.appendChild(heart);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 200 + Math.random() * 1000;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            gsap.to(heart, {
                x: tx,
                y: ty,
                opacity: 0,
                duration: 1 + Math.random(),
                ease: "power2.out",
                onComplete: () => heart.remove()
            });
        }

        gsap.to('body', {
            opacity: 0,
            duration: 1.5,
            delay: 0.5,
            onComplete: () => {
                window.location.href = 'cause.html';
            }
        });
    });
});