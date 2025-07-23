// Responsive navbar burger menu
const menuToggle = document.querySelector('.menu-toggle');
const navbarResponsive = document.querySelector('.navbar');
if (menuToggle && navbarResponsive) {
    menuToggle.addEventListener('click', function() {
        navbarResponsive.classList.toggle('open');
        const expanded = navbarResponsive.classList.contains('open');
        menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
    // Close menu when a link is clicked (on mobile)
    navbarResponsive.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                navbarResponsive.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Section reveal on scroll
const revealSections = document.querySelectorAll('main section');
const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.88;
    revealSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < trigger) {
            section.classList.add('visible');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Navbar shadow/glass intensifies on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Button ripple effect
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        const circle = document.createElement('span');
        circle.className = 'ripple';
        const rect = btn.getBoundingClientRect();
        circle.style.left = `${e.clientX - rect.left}px`;
        circle.style.top = `${e.clientY - rect.top}px`;
        btn.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    });
});

// Dark mode toggle
const darkToggle = document.getElementById('dark-toggle');
darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if(document.body.classList.contains('dark')) {
        darkToggle.textContent = '☀️';
    } else {
        darkToggle.textContent = '🌙';
    }
});

// Typewriter effect for all paragraphs with .typewriter
function typewriterEffect(element, text, speed = 40) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.typewriter').forEach(el => {
        const txt = el.getAttribute('data-text') || el.textContent;
        typewriterEffect(el, txt, 40);
    });
});

// Animate skill bars on scroll
function animateSkillBars() {
    document.querySelectorAll('.skill-bar').forEach(bar => {
        const fill = bar.querySelector('.fill');
        const level = bar.getAttribute('data-level');
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
            fill.style.width = level + '%';
        }
    });
}
window.addEventListener('scroll', animateSkillBars);
window.addEventListener('DOMContentLoaded', animateSkillBars);

// Project modal logic
const modals = document.querySelectorAll('.modal');
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('open');
    });
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const modalId = card.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) modal.classList.add('open');
        }
    });
});
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('close')) {
            modal.classList.remove('open');
        }
    });
});

// --- Memory Game ---
const memoryIcons = [
    '⚛️','⚛️', // React
    '🐍','🐍', // Python
    '🐙','🐙', // GitHub
    '💻','💻', // Code
    '🌐','🌐', // Web
    '📦','📦', // Package
    '🖥️','🖥️', // Desktop
    '🔒','🔒'  // Security
];
let memoryFirst = null, memorySecond = null, memoryLock = false, memoryMatched = 0;
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
function setupMemoryGame() {
    const game = document.getElementById('memory-game');
    if (!game) return;
    let icons = [...memoryIcons];
    shuffle(icons);
    game.innerHTML = '';
    memoryFirst = null; memorySecond = null; memoryLock = false; memoryMatched = 0;
    icons.forEach((icon, idx) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.setAttribute('tabindex', '0');
        card.dataset.icon = icon;
        card.innerHTML = '<span style="opacity:0;">'+icon+'</span>';
        card.addEventListener('click', () => flipMemoryCard(card));
        card.addEventListener('keypress', e => { if(e.key==='Enter'||e.key===' '){ flipMemoryCard(card); }});
        game.appendChild(card);
    });
}
function flipMemoryCard(card) {
    if (memoryLock || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    card.innerHTML = '<span>'+card.dataset.icon+'</span>';
    if (!memoryFirst) {
        memoryFirst = card;
    } else {
        memorySecond = card;
        memoryLock = true;
        if (memoryFirst.dataset.icon === memorySecond.dataset.icon) {
            memoryFirst.classList.add('matched');
            memorySecond.classList.add('matched');
            memoryMatched += 2;
            setTimeout(() => {
                memoryFirst = memorySecond = null;
                memoryLock = false;
                if (memoryMatched === memoryIcons.length) {
                    setTimeout(() => alert('🎉 Bravo, tu as gagné le Memory !'), 300);
                }
            }, 600);
        } else {
            setTimeout(() => {
                memoryFirst.classList.remove('flipped');
                memorySecond.classList.remove('flipped');
                memoryFirst.innerHTML = '<span style="opacity:0;">'+memoryFirst.dataset.icon+'</span>';
                memorySecond.innerHTML = '<span style="opacity:0;">'+memorySecond.dataset.icon+'</span>';
                memoryFirst = memorySecond = null;
                memoryLock = false;
            }, 900);
        }
    }
}
document.getElementById('restart-memory')?.addEventListener('click', setupMemoryGame);
window.addEventListener('DOMContentLoaded', setupMemoryGame);

// --- Snake Game ---
const showSnakeBtn = document.getElementById('show-snake');
const snakeWrapper = document.getElementById('snake-wrapper');
const snakeCanvas = document.getElementById('snake-canvas');
const snakeScore = document.getElementById('snake-score');
let snake, food, dx, dy, snakeInterval, score;
function resetSnake() {
    snake = [ {x:8, y:8} ];
    dx = 1; dy = 0; score = 0;
    food = { x: Math.floor(Math.random()*16), y: Math.floor(Math.random()*16) };
    snakeScore.textContent = 'Score: 0';
}
function drawSnake() {
    const ctx = snakeCanvas.getContext('2d');
    ctx.clearRect(0,0,320,320);
    ctx.fillStyle = '#60a5fa';
    snake.forEach(s => ctx.fillRect(s.x*20, s.y*20, 18, 18));
    ctx.fillStyle = '#e53935';
    ctx.fillRect(food.x*20, food.y*20, 18, 18);
}
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    if (head.x<0||head.x>15||head.y<0||head.y>15||snake.some(s=>s.x===head.x&&s.y===head.y)) {
        clearInterval(snakeInterval);
        alert('💀 Game Over! Score: '+score);
        resetSnake();
        drawSnake();
        return;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        snakeScore.textContent = 'Score: '+score;
        food = { x: Math.floor(Math.random()*16), y: Math.floor(Math.random()*16) };
    } else {
        snake.pop();
    }
    drawSnake();
}
function startSnake() {
    resetSnake();
    drawSnake();
    clearInterval(snakeInterval);
    snakeInterval = setInterval(moveSnake, 120);
}
showSnakeBtn?.addEventListener('click', () => {
    if (snakeWrapper.style.display === 'none') {
        snakeWrapper.style.display = 'block';
        startSnake();
    } else {
        snakeWrapper.style.display = 'none';
        clearInterval(snakeInterval);
    }
});

// Bouton Restart pour Snake
const restartSnakeBtn = document.getElementById('restart-snake');
restartSnakeBtn?.addEventListener('click', () => {
    startSnake();
});

// Contrôles directionnels tactiles pour Snake
const snakeDirBtns = document.querySelectorAll('.snake-dir');
snakeDirBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!snakeWrapper || snakeWrapper.style.display === 'none') return;
        const dir = btn.getAttribute('data-dir');
        if (dir === 'up' && dy !== 1) { dx = 0; dy = -1; }
        else if (dir === 'down' && dy !== -1) { dx = 0; dy = 1; }
        else if (dir === 'left' && dx !== 1) { dx = -1; dy = 0; }
        else if (dir === 'right' && dx !== -1) { dx = 1; dy = 0; }
    });
});

window.addEventListener('keydown', e => {
    if (!snakeWrapper || snakeWrapper.style.display === 'none') return;
    if (e.key==='ArrowUp' && dy!==1) { dx=0; dy=-1; }
    else if (e.key==='ArrowDown' && dy!==-1) { dx=0; dy=1; }
    else if (e.key==='ArrowLeft' && dx!==1) { dx=-1; dy=0; }
    else if (e.key==='ArrowRight' && dx!==-1) { dx=1; dy=0; }
});
