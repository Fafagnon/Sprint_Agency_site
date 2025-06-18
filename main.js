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
    
    const animateCounter = (element) => {
        const target = parseInt(element.dataset.target, 10);
        const suffix = element.innerText.replace(/[0-9]/g, ''); // Garde les symboles comme '+' ou '%'
        let current = 0;
        const duration = 2000; // 2 secondes
        const increment = target / (duration / 16); // Calculer l'incrément pour une animation fluide

        const updateCount = () => {
            current += increment;
            if (current < target) {
                element.innerText = Math.ceil(current) + suffix ;
                requestAnimationFrame(updateCount);
            } else {
                element.innerText =  target + suffix; // Assurer que la valeur finale est exacte
            }
        };

        requestAnimationFrame(updateCount);
    };


    // --- Animation d'Apparition au Scroll (Fade In) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                const counters = entry.target.querySelectorAll('[data-target]');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // On observe les éléments .fade-in et la section .stats
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});

// --- NOUVEAU : GESTION DU FORMULAIRE DE CONTACT VERS WHATSAPP ---
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (event) => {
        // 1. Empêcher le comportement par défaut du formulaire (qui est de recharger la page)
        event.preventDefault();

        // 2. Récupérer les données des champs du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        

        const whatsappNumber = '22899324636';

        // 4. Formater le message pour WhatsApp
        const whatsappMessage = `Bonjour, je vous contacte depuis votre site.\n\n*Nom :* ${name}\n*Email :* ${email}\n\n*Message :*\n${message}`;

        // 5. Encoder le message pour qu'il soit compatible avec une URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // 6. Créer l'URL de redirection WhatsApp
        const whatsappURL = `https://wa.me/${22899324636}?text=${encodedMessage}`;

        // 7. Ouvrir WhatsApp dans un nouvel onglet
        window.open(whatsappURL, '_blank');
    });
