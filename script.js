document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Logic (Required on all pages)
    const menuBtn = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            menuBtn.classList.toggle('is-active');
        });
    }

// Loader Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (!loader) {
        // Not on home page — mark that the user has navigated so home skips the loader
        sessionStorage.setItem('hasNavigated', '1');
        return;
    }

    if (sessionStorage.getItem('hasNavigated')) {
        loader.style.display = 'none';
        return;
    }

    const fill = document.querySelector('.progress-fill');
    const percent = document.getElementById('loader-percent');
    let width = 0;

    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    sessionStorage.setItem('hasNavigated', '1');
                }, 500);
            }, 500);
        } else {
            width += Math.random() * 10;
            if (width > 100) width = 100;
            fill.style.width = width + '%';
            percent.innerText = Math.floor(width) + '%';
        }
    }, 100);
});

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollTop = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / height) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Particles Animation
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = '#00FFFF';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    // Connect particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance/100})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Wrap in DOMContentLoaded to ensure elements exist
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Add a check to prevent errors if elements aren't on the current page
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            // Toggle the menu visibility
            navLinks.classList.toggle('nav-active');
            
            // Animate the hamburger into an 'X'
            menuBtn.classList.toggle('is-active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                menuBtn.classList.remove('is-active');
            });
        });
    }
});

});