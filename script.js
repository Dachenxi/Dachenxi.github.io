/* ============================================
   DACHENXI 8-BIT PORTFOLIO - SCRIPT
   ============================================ */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initStars();
    initNavigation();
    initScore();
    playSound('start');
});

// Create Pixel Stars Background
function initStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 50;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.opacity = Math.random() * 0.5 + 0.5;
        starsContainer.appendChild(star);
    }
}

// Navigation System
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));
            
            // Add active class to clicked button and target section
            this.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
            
            // Play click sound effect
            playSound('click');
            
            // Add score
            addScore(10);
        });
    });
}

// Score System
let currentScore = 0;

function initScore() {
    // Load score from localStorage
    const savedScore = localStorage.getItem('visitorScore');
    if (savedScore) {
        currentScore = parseInt(savedScore);
    }
    updateScoreDisplay();
    
    // Add initial visit score
    addScore(100);
}

function addScore(points) {
    currentScore += points;
    localStorage.setItem('visitorScore', currentScore);
    updateScoreDisplay();
}

function updateScoreDisplay() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = String(currentScore).padStart(5, '0');
    }
}

// Project Details Data
const projectsData = {
    project1: {
        title: '🎮 GAME PROJECT',
        description: 'Sebuah game 2D sederhana yang dibuat dengan JavaScript dan HTML5 Canvas. Game ini memiliki fitur scoring system, multiple levels, dan pixel art graphics.',
        tech: 'JavaScript, HTML5 Canvas, CSS3',
        link: '#'
    },
    project2: {
        title: '🌐 WEB APP',
        description: 'Aplikasi web interaktif dengan fitur-fitur modern. Menggunakan React untuk frontend dan dilengkapi dengan responsive design.',
        tech: 'React, Node.js, CSS3',
        link: '#'
    },
    project3: {
        title: '🤖 BOT PROJECT',
        description: 'Bot untuk Discord/Telegram dengan berbagai fitur menarik seperti music player, moderation tools, dan mini games.',
        tech: 'Python, Discord.py, SQLite',
        link: '#'
    },
    project4: {
        title: '📱 MOBILE APP',
        description: 'Aplikasi mobile cross-platform yang dibuat dengan Flutter. Memiliki UI yang clean dan performa yang smooth.',
        tech: 'Flutter, Dart, Firebase',
        link: '#'
    }
};

// Show Project Detail Modal
function showProjectDetail(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const project = projectsData[projectId];

    if (project) {
        modalBody.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p><strong style="color: #00ffff;">Tech Stack:</strong> ${project.tech}</p>
            <a href="${project.link}" class="modal-link" target="_blank">VIEW PROJECT →</a>
        `;
        modal.classList.add('active');
        playSound('open');
        addScore(5);
    }
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    playSound('close');
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// 8-bit Sound Effects (using Web Audio API)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        switch(type) {
            case 'start':
                oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
                oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
                oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
            case 'click':
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.05);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.05);
                break;
            case 'open':
                oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
            case 'close':
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
        }

        oscillator.type = 'square'; // 8-bit sound
    } catch (e) {
        // Audio not supported or blocked
        console.log('Audio not available');
    }
}

// Typing Effect for Terminal (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Konami Code Easter Egg
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    addScore(1000);
    document.body.style.animation = 'rainbow 2s infinite';

    // Add rainbow animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    alert('🎮 KONAMI CODE ACTIVATED! +1000 POINTS! 🎮');

    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// Console Easter Egg
console.log(`
%c
    ██████╗  █████╗  ██████╗██╗  ██╗███████╗███╗   ██╗██╗  ██╗██╗
    ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔════╝████╗  ██║╚██╗██╔╝██║
    ██║  ██║███████║██║     ███████║█████╗  ██╔██╗ ██║ ╚███╔╝ ██║
    ██║  ██║██╔══██║██║     ██╔══██║██╔══╝  ██║╚██╗██║ ██╔██╗ ██║
    ██████╔╝██║  ██║╚██████╗██║  ██║███████╗██║ ╚████║██╔╝ ╚██╗██║
    ╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝   ╚═╝╚═╝
    
    👾 Welcome to my 8-bit world! 👾
    🎮 Try the Konami Code: ↑↑↓↓←→←→BA
`, 'color: #00ff00; font-family: monospace;');

