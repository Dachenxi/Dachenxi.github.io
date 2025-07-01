// Smooth scroll mouse wheel (optional - for ultra smooth scrolling)
let isScrolling = false;

function smoothScroll(target, duration = 800) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Enhanced smooth scroll for navbar links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            // Use custom smooth scroll
            smoothScroll(targetPosition, 1000);
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        smoothScroll(window.pageYOffset + window.innerHeight * 0.8);
    } else if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        smoothScroll(window.pageYOffset - window.innerHeight * 0.8);
    }
});