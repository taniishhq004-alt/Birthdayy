/* ============================================
   NAVYA'S BIRTHDAY - ROMCOM THEME JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNavDots();
    initQuoteRotator();
    initFloatingHearts();
    initMagazine();
    initBalloons();
    initConfetti();
    initSparkleTrail();
    initScrollAnimations();
    initHeroSparkles();
    removeUnicornWatermark();
});

/* ============ REMOVE UNICORN STUDIO WATERMARK ============ */
function removeUnicornWatermark() {
    function scrub() {
        // Remove ONLY the "Made with unicorn.studio" watermark link
        document.querySelectorAll('a[href*="unicornstudio"], a[href*="unicorn.studio"]').forEach(el => {
            const container = el.closest('div') || el;
            container.remove();
        });
        // Remove any stray div injected by the SDK at body level (watermark badge)
        document.querySelectorAll('body > div').forEach(div => {
            if (!div.id && !div.className && !div.closest('section') && div.textContent.toLowerCase().includes('unicorn')) {
                div.remove();
            }
        });
    }
    // Run immediately and after short delays (SDK injects async)
    scrub();
    setTimeout(scrub, 500);
    setTimeout(scrub, 1500);
    setTimeout(scrub, 3000);

    // Observe for dynamically injected watermarks
    const observer = new MutationObserver(() => scrub());
    observer.observe(document.body, { childList: true, subtree: true });
    // Stop observing after 10s to avoid perf overhead
    setTimeout(() => observer.disconnect(), 10000);
}

/* ============ NAV DOTS ============ */
function initNavDots() {
    const dots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('.section');

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = parseInt(dot.dataset.section);
            sections[idx].scrollIntoView({ behavior: 'smooth' });
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = Array.from(sections).indexOf(entry.target);
                dots.forEach((d, i) => d.classList.toggle('active', i === idx));
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(s => observer.observe(s));
}

/* ============ QUOTE ROTATOR ============ */
function initQuoteRotator() {
    const quotes = document.querySelectorAll('.birthday-quote');
    if (!quotes.length) return;
    let current = 0;
    setInterval(() => {
        quotes[current].classList.remove('active');
        current = (current + 1) % quotes.length;
        quotes[current].classList.add('active');
    }, 3500);
}

/* ============ FLOATING HEARTS ============ */
function initFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    if (!container) return;
    const hearts = ['💖', '💗', '💕', '💝', '♡', '♥', '🩷', '🌸'];

    function createHeart() {
        const el = document.createElement('span');
        el.className = 'heart-float';
        el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
        el.style.animationDuration = (Math.random() * 6 + 6) + 's';
        el.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(el);
        setTimeout(() => el.remove(), 14000);
    }

    setInterval(createHeart, 800);
    for (let i = 0; i < 8; i++) setTimeout(createHeart, i * 300);
}

/* ============ HERO SPARKLES ============ */
function initHeroSparkles() {
    const container = document.getElementById('sparkles-hero');
    if (!container) return;

    function createSparkle() {
        const sp = document.createElement('div');
        sp.textContent = '✦';
        sp.style.cssText = `
            position: absolute; color: rgba(255,215,0,0.7);
            font-size: ${Math.random() * 14 + 8}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: sparkleFloat ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            pointer-events: none;
        `;
        container.appendChild(sp);
    }

    for (let i = 0; i < 20; i++) createSparkle();
}

/* ============ MAGAZINE PAGE TURNING ============ */
function initMagazine() {
    const pages = document.querySelectorAll('.magazine-page');
    const prevBtn = document.getElementById('mag-prev');
    const nextBtn = document.getElementById('mag-next');
    const currentEl = document.getElementById('mag-current-page');
    const totalEl = document.getElementById('mag-total-pages');
    if (!pages.length) return;

    let currentPage = 0;
    totalEl.textContent = pages.length;

    function showPage(idx) {
        pages.forEach((p, i) => p.classList.toggle('active', i === idx));
        currentEl.textContent = idx + 1;
        prevBtn.disabled = idx === 0;
        nextBtn.disabled = idx === pages.length - 1;
    }

    showPage(0);

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) { currentPage--; showPage(currentPage); }
    });
    nextBtn.addEventListener('click', () => {
        if (currentPage < pages.length - 1) { currentPage++; showPage(currentPage); }
    });

    // Click on page to turn
    pages.forEach(p => {
        p.addEventListener('click', () => {
            if (currentPage < pages.length - 1) { currentPage++; showPage(currentPage); }
        });
    });
}

/* ============ BALLOONS ============ */
function initBalloons() {
    const container = document.getElementById('balloons-container');
    if (!container) return;

    const colors = [
        '#ff6b9d', '#ff85a2', '#ffa0b8', '#ffb6c1', '#ff69b4',
        '#dda0dd', '#da70d6', '#ee82ee', '#ff77aa', '#ffaacc',
        '#f0a0ff', '#ff88cc', '#ffccdd', '#e8a0e8', '#ff99bb',
    ];

    function createBalloon() {
        const b = document.createElement('div');
        b.className = 'balloon';
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 30 + 45;
        b.style.cssText = `
            left: ${Math.random() * 95}%;
            width: ${size}px; height: ${size * 1.25}px;
            background: radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.4), ${color});
            animation-duration: ${Math.random() * 8 + 8}s;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(b);
        setTimeout(() => b.remove(), 18000);
    }

    // Observe when finale section is visible
    const finaleSection = document.getElementById('section-3');
    let balloonInterval = null;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !balloonInterval) {
                for (let i = 0; i < 15; i++) setTimeout(createBalloon, i * 200);
                balloonInterval = setInterval(createBalloon, 600);
            } else if (!entry.isIntersecting && balloonInterval) {
                clearInterval(balloonInterval);
                balloonInterval = null;
            }
        });
    }, { threshold: 0.2 });

    if (finaleSection) observer.observe(finaleSection);
}

/* ============ CONFETTI ============ */
function initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animating = false;

    function resize() {
        const section = document.getElementById('section-3');
        if (!section) return;
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#ff6b9d','#ffd700','#ff69b4','#dda0dd','#ffb6c1','#fff','#ee82ee','#ffa0b8'];

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: -10,
            w: Math.random() * 8 + 4,
            h: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            vy: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 2,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 6,
            opacity: 1,
        };
    }

    function animate() {
        if (!animating) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (particles.length < 80 && Math.random() > 0.5) particles.push(createParticle());

        particles.forEach((p, i) => {
            p.y += p.vy;
            p.x += p.vx;
            p.rotation += p.rotSpeed;
            p.opacity -= 0.002;
            if (p.y > canvas.height || p.opacity <= 0) { particles.splice(i, 1); return; }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });

        requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animating) {
                animating = true;
                for (let i = 0; i < 40; i++) particles.push(createParticle());
                animate();
            } else if (!entry.isIntersecting) {
                animating = false;
                particles = [];
            }
        });
    }, { threshold: 0.2 });

    const section = document.getElementById('section-3');
    if (section) observer.observe(section);
}

/* ============ SPARKLE CURSOR TRAIL ============ */
function initSparkleTrail() {
    const canvas = document.getElementById('sparkle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let sparkles = [];
    let mouse = { x: 0, y: 0 };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        for (let i = 0; i < 2; i++) {
            sparkles.push({
                x: mouse.x + (Math.random() - 0.5) * 10,
                y: mouse.y + (Math.random() - 0.5) * 10,
                size: Math.random() * 3 + 1,
                life: 1,
                color: `hsl(${330 + Math.random() * 40}, 80%, ${60 + Math.random() * 30}%)`,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5 - 0.5,
            });
        }
    });

    function animateSparkles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sparkles.forEach((s, i) => {
            s.x += s.vx;
            s.y += s.vy;
            s.life -= 0.02;
            s.size *= 0.98;
            if (s.life <= 0) { sparkles.splice(i, 1); return; }

            ctx.save();
            ctx.globalAlpha = s.life;
            ctx.fillStyle = s.color;
            ctx.beginPath();
            // Draw a tiny star
            const spikes = 4;
            const outerR = s.size;
            const innerR = s.size * 0.4;
            for (let j = 0; j < spikes * 2; j++) {
                const r = j % 2 === 0 ? outerR : innerR;
                const angle = (j * Math.PI) / spikes - Math.PI / 2;
                const x = s.x + Math.cos(angle) * r;
                const y = s.y + Math.sin(angle) * r;
                j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        });
        if (sparkles.length > 100) sparkles.splice(0, sparkles.length - 100);
        requestAnimationFrame(animateSparkles);
    }
    animateSparkles();
}

/* ============ SCROLL ANIMATIONS ============ */
function initScrollAnimations() {
    const animElements = document.querySelectorAll(
        '.scrapbook-card, .spread-left, .spread-right, .birthday-letter, .finale-content'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = entry.target.style.getPropertyValue('--rotate')
                    ? `rotate(${entry.target.style.getPropertyValue('--rotate')})`
                    : 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animElements.forEach(el => {
        if (!el.closest('.section-scrapbook')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        observer.observe(el);
    });
}
