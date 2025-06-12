document.addEventListener('DOMContentLoaded', () => {

    // --- Menu Mobile ---
    const header = document.getElementById('main-header');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuButton.addEventListener('click', () => {
        header.classList.toggle('nav-open');
    });

    // Fermer le menu en cliquant sur un lien
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            header.classList.remove('nav-open');
        }
    });

    // --- Effet de Header au Scroll ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Animation d'Apparition au Scroll (Fade In) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optionnel: ne l'anime qu'une fois
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

});