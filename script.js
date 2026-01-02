/* ============================================================================
   DelapanBit.my.id - JavaScript
   
   PANDUAN CUSTOMIZATION:
   ----------------------
   1. Setiap fungsi memiliki komentar penjelasan
   2. Ubah nilai di CONFIG untuk menyesuaikan behavior
   3. Hapus/tambah fitur sesuai kebutuhan
   ============================================================================ */

// ============================================================================
// CONFIGURATION - Ubah nilai di sini untuk mengatur behavior
// ============================================================================
const CONFIG = {
    // Jumlah partikel di hero section
    particleCount: 20,

    // Delay animasi scroll (ms)
    scrollAnimationThreshold: 0.1,

    // Scroll position untuk navbar berubah
    navbarScrollThreshold: 50,
};

// ============================================================================
// INITIALIZATION - Jalankan saat DOM siap
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initParticles();
    initScrollAnimations();
    initSmoothScroll();

    console.log('🌿 DelapanBit initialized successfully!');
});

// ============================================================================
// NAVBAR FUNCTIONALITY
// Mengatur behavior navbar saat scroll
// ============================================================================
function initNavbar() {
    const navbar = document.getElementById('navbar');

    if (!navbar) return;

    // Tambah class 'scrolled' saat user scroll ke bawah
    window.addEventListener('scroll', () => {
        if (window.scrollY > CONFIG.navbarScrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================================================
// MOBILE MENU
// Toggle menu di mobile view
// ============================================================================
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Tutup menu saat link diklik
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// ============================================================================
// PARTICLE ANIMATION
// Membuat efek partikel melayang di hero section
// Kamu bisa mengubah jumlah partikel di CONFIG.particleCount
// ============================================================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');

    if (!particlesContainer) return;

    // Buat partikel sesuai jumlah di config
    for (let i = 0; i < CONFIG.particleCount; i++) {
        createParticle(particlesContainer, i);
    }
}

/**
 * Membuat satu partikel dengan posisi dan timing random
 * @param {HTMLElement} container - Container untuk partikel
 * @param {number} index - Index partikel untuk variasi
 */
function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random properties untuk variasi
    const size = Math.random() * 10 + 5; // 5-15px
    const left = Math.random() * 100; // 0-100%
    const delay = Math.random() * 15; // 0-15s delay
    const duration = Math.random() * 10 + 10; // 10-20s duration
    const opacity = Math.random() * 0.3 + 0.1; // 0.1-0.4 opacity

    // Apply styles
    particle.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${left}%;
    bottom: -20px;
    animation-delay: ${delay}s;
    animation-duration: ${duration}s;
    opacity: ${opacity};
  `;

    // Variasi warna (hijau dengan berbagai shade)
    const hue = 80 + Math.random() * 40; // Hijau range
    particle.style.background = `hsl(${hue}, 60%, 50%)`;

    container.appendChild(particle);
}

// ============================================================================
// SCROLL ANIMATIONS
// Animasi elemen saat muncul di viewport
// Tambahkan class 'animate-on-scroll' ke elemen yang ingin dianimasi
// ============================================================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length === 0) return;

    // Gunakan Intersection Observer untuk performa yang baik
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opsional: berhenti observe setelah terlihat
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: CONFIG.scrollAnimationThreshold,
        rootMargin: '0px 0px -50px 0px' // Trigger sedikit sebelum elemen masuk view
    });

    animatedElements.forEach(el => observer.observe(el));
}

// ============================================================================
// SMOOTH SCROLL
// Scroll halus ke section saat nav link diklik
// ============================================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            // Kecuali untuk link '#' saja (biasanya logo)
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Offset untuk navbar fixed
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================================================
// UTILITY FUNCTIONS
// Fungsi-fungsi tambahan yang mungkin berguna
// ============================================================================

/**
 * Debounce function - mencegah fungsi dipanggil terlalu sering
 * Berguna untuk event seperti scroll atau resize
 * @param {Function} func - Fungsi yang akan di-debounce
 * @param {number} wait - Waktu tunggu dalam ms
 * @returns {Function} - Fungsi yang sudah di-debounce
 */
function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function - membatasi seberapa sering fungsi dipanggil
 * @param {Function} func - Fungsi yang akan di-throttle
 * @param {number} limit - Batas waktu minimum antar panggilan (ms)
 * @returns {Function} - Fungsi yang sudah di-throttle
 */
function throttle(func, limit = 100) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} - True if element is visible
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================================================
// EASTER EGG 🥚
// Ketik "delapanbit" di keyboard untuk surprise!
// ============================================================================
let konamiBuffer = '';
document.addEventListener('keydown', (e) => {
    konamiBuffer += e.key.toLowerCase();
    konamiBuffer = konamiBuffer.slice(-10); // Keep last 10 chars

    if (konamiBuffer.includes('delapanbit')) {
        console.log('🎉 You found the easter egg!');
        document.body.style.animation = 'none';
        document.body.offsetHeight; // Trigger reflow
        document.body.style.animation = 'rainbow 2s ease';
        konamiBuffer = '';
    }
});

// Rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    50% { filter: hue-rotate(180deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);
