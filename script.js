// ============================================
// SMOOTH SCROLL & NAVIGATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    
    // Récupérer le header une seule fois pour toute la fonction
    const header = document.querySelector('.header');
    
    // Créer un overlay transparent pour capturer les clics dans la zone du header
    if (header) {
        const headerOverlay = document.createElement('div');
        headerOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 100px;
            z-index: 999998;
            pointer-events: auto;
            background: transparent;
        `;
        document.body.appendChild(headerOverlay);
        
        // Rediriger les clics vers le header
        headerOverlay.addEventListener('click', function(e) {
            const menuToggle = document.querySelector('.menu-toggle');
            const rect = headerOverlay.getBoundingClientRect();
            const clickX = e.clientX;
            const clickY = e.clientY;
            
            // Vérifier si le clic est sur le menu toggle
            if (menuToggle) {
                const menuRect = menuToggle.getBoundingClientRect();
                if (clickX >= menuRect.left && clickX <= menuRect.right &&
                    clickY >= menuRect.top && clickY <= menuRect.bottom) {
                    e.preventDefault();
                    e.stopPropagation();
                    menuToggle.click();
                    return;
                }
            }
        }, true);
        
        headerOverlay.addEventListener('touchstart', function(e) {
            const menuToggle = document.querySelector('.menu-toggle');
            const touch = e.touches[0];
            const clickX = touch.clientX;
            const clickY = touch.clientY;
            
            if (menuToggle) {
                const menuRect = menuToggle.getBoundingClientRect();
                if (clickX >= menuRect.left && clickX <= menuRect.right &&
                    clickY >= menuRect.top && clickY <= menuRect.bottom) {
                    e.preventDefault();
                    e.stopPropagation();
                    menuToggle.dispatchEvent(new Event('touchstart', { bubbles: true }));
                    return;
                }
            }
        }, true);
    }
    
    // Search bar toggle - Supprimé
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        function handleMenuToggle(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        }
        
        menuToggle.addEventListener('click', handleMenuToggle, true);
        menuToggle.addEventListener('touchstart', handleMenuToggle, true);
        menuToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        }, true);
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        });
    });
    
    // Header scroll effect - Toujours transparent
    if (header) {
        // Forcer la transparence au chargement et empêcher tout changement
        header.style.setProperty('background-color', 'transparent', 'important');
        header.style.setProperty('background', 'transparent', 'important');
        header.style.setProperty('backdrop-filter', 'none', 'important');
        header.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
        header.style.setProperty('border-bottom', 'none', 'important');
        header.style.setProperty('box-shadow', 'none', 'important');
        
        // Forcer la transparence sur nav et nav-container
        const nav = header.querySelector('nav');
        const navContainer = header.querySelector('.nav-container');
        
        if (nav) {
            nav.style.setProperty('background-color', 'transparent', 'important');
            nav.style.setProperty('background', 'transparent', 'important');
            nav.style.setProperty('backdrop-filter', 'none', 'important');
            nav.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
        }
        
        if (navContainer) {
            navContainer.style.setProperty('background-color', 'transparent', 'important');
            navContainer.style.setProperty('background', 'transparent', 'important');
            navContainer.style.setProperty('backdrop-filter', 'none', 'important');
            navContainer.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
        }
        
        // Empêcher tout changement de style au scroll
        const originalSetProperty = header.style.setProperty;
        header.style.setProperty = function(prop, value, priority) {
            if (prop === 'background-color' || prop === 'background') {
                return originalSetProperty.call(this, prop, 'transparent', 'important');
            }
            return originalSetProperty.call(this, prop, value, priority);
        };
    }
    
    // ============================================
    // FADE IN ON SCROLL ANIMATION
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('.collection, .about, .commitments, .contact, .process, .page-header');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Observe watch cards individually
    const watchCards = document.querySelectorAll('.watch-card');
    watchCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe commitment cards
    const commitmentCards = document.querySelectorAll('.commitment-card');
    commitmentCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
    
    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Veuillez remplir tous les champs.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Simulate form submission (in production, this would send to a server)
            const submitButton = contactForm.querySelector('.btn-primary');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Envoi en cours...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // ============================================
    // SELL FORM HANDLING
    // ============================================
    
    const sellForm = document.getElementById('sellForm');
    
    if (sellForm) {
        sellForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(sellForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const brand = formData.get('brand');
            const model = formData.get('model');
            
            // Simple validation
            if (!name || !email || !phone || !brand || !model) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Simulate form submission
            const submitButton = sellForm.querySelector('.btn-primary');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Envoi en cours...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Merci pour votre demande ! Nos experts vous contacteront sous 24h pour une estimation gratuite.');
                sellForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS (only on same page)
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty hash
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target && header) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // HERO FIXE - SECTION PASSANT PAR-DESSUS
    // ============================================
    
    // ============================================
    // HERO FIXE - SECTION PASSANT PAR-DESSUS
    // ============================================
    
    const hero = document.querySelector('.hero');
    const actionsSection = document.querySelector('.actions-section');
    const heroImage = document.querySelector('.hero-image');
    
    // Section actions temporairement supprimée
    if (hero && actionsSection) {
        const heroHeight = window.innerHeight; // Utiliser la hauteur complète de la fenêtre
        
        // Désactiver les transforms sur le hero pour éviter qu'il bloque les clics
        hero.style.transform = 'none';
        hero.style.willChange = 'opacity';
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const fadeStart = heroHeight * 0.7; // Commencer à faire disparaître à 70%
            const fadeEnd = heroHeight * 0.9; // Complètement disparu à 90%
            
            // La section actions monte progressivement par-dessus le hero
            if (scrolled <= heroHeight) {
                // La section actions monte progressivement
                const translateY = -scrolled;
                actionsSection.style.transform = `translateY(${translateY}px)`;
                
                // Faire disparaître le hero progressivement entre fadeStart et fadeEnd
                if (scrolled <= fadeStart) {
                    // Hero complètement visible pendant que les tuiles montent
                    hero.style.opacity = '1';
                    hero.style.visibility = 'visible';
                    hero.style.pointerEvents = 'none';
                    hero.style.display = 'flex';
                    hero.style.zIndex = '-1';
                    
                    // Parallax sur l'image du hero pendant le scroll
                    if (heroImage) {
                        const parallaxY = scrolled * 0.5;
                        heroImage.style.transform = `translateY(${parallaxY}px)`;
                    }
                } else if (scrolled <= fadeEnd) {
                    // Fade progressif du hero
                    const fadeProgress = (scrolled - fadeStart) / (fadeEnd - fadeStart);
                    hero.style.opacity = String(1 - fadeProgress);
                    hero.style.visibility = 'visible';
                    hero.style.pointerEvents = 'none';
                    hero.style.display = 'flex';
                    hero.style.zIndex = '-1';
                } else {
                    // Hero complètement caché
                    hero.style.opacity = '0';
                    hero.style.visibility = 'hidden';
                    hero.style.pointerEvents = 'none';
                    hero.style.display = 'none';
                    hero.style.zIndex = '-10';
                }
            } else {
                // Une fois passé le hero, le cacher complètement
                hero.style.opacity = '0';
                hero.style.visibility = 'hidden';
                hero.style.pointerEvents = 'none';
                hero.style.display = 'none';
                hero.style.zIndex = '-10';
                actionsSection.style.transform = `translateY(-${heroHeight}px)`;
            }
        }, { passive: true });
        
        // Initialiser au chargement - s'assurer que le hero est visible seulement si on est en haut
        const initialScroll = window.pageYOffset;
        const fadeStart = heroHeight * 0.7;
        const fadeEnd = heroHeight * 0.9;
        
        if (initialScroll === 0) {
            // En haut de la page, hero visible
            hero.style.opacity = '1';
            hero.style.visibility = 'visible';
            hero.style.pointerEvents = 'none';
            hero.style.display = 'flex';
            hero.style.zIndex = '-1';
            hero.style.transform = 'none';
            actionsSection.style.transform = 'translateY(0)';
        } else if (initialScroll <= fadeStart) {
            // Hero complètement visible
            hero.style.opacity = '1';
            hero.style.visibility = 'visible';
            hero.style.pointerEvents = 'none';
            hero.style.display = 'flex';
            hero.style.zIndex = '-1';
            hero.style.transform = 'none';
            actionsSection.style.transform = `translateY(-${initialScroll}px)`;
            
            // Parallax sur l'image
            if (heroImage) {
                const parallaxY = initialScroll * 0.5;
                heroImage.style.transform = `translateY(${parallaxY}px)`;
            }
        } else if (initialScroll <= fadeEnd) {
            // Fade progressif
            const fadeProgress = (initialScroll - fadeStart) / (fadeEnd - fadeStart);
            hero.style.opacity = String(1 - fadeProgress);
            hero.style.visibility = 'visible';
            hero.style.pointerEvents = 'none';
            hero.style.display = 'flex';
            hero.style.zIndex = '-1';
            hero.style.transform = 'none';
            actionsSection.style.transform = `translateY(-${initialScroll}px)`;
        } else if (initialScroll <= heroHeight) {
            // Hero caché mais section encore en mouvement
            hero.style.opacity = '0';
            hero.style.visibility = 'hidden';
            hero.style.pointerEvents = 'none';
            hero.style.display = 'none';
            hero.style.zIndex = '-10';
            hero.style.transform = 'none';
            actionsSection.style.transform = `translateY(-${initialScroll}px)`;
        } else {
            // Complètement passé
            hero.style.opacity = '0';
            hero.style.visibility = 'hidden';
            hero.style.pointerEvents = 'none';
            hero.style.display = 'none';
            hero.style.zIndex = '-10';
            hero.style.transform = 'none';
            actionsSection.style.transform = `translateY(-${heroHeight}px)`;
        }
    }
    
    // ============================================
    // PARALLAX EFFECT FOR SECTIONS
    // ============================================
    
    // Effet parallax désactivé pour la section commitments
    // const parallaxElements = document.querySelectorAll('.commitments');
    // 
    // parallaxElements.forEach(element => {
    //     window.addEventListener('scroll', function() {
    //         const rect = element.getBoundingClientRect();
    //         const scrolled = window.pageYOffset;
    //         const elementTop = rect.top + scrolled;
    //         const elementHeight = rect.height;
    //         const windowHeight = window.innerHeight;
    //         
    //         // Si l'élément est visible dans le viewport
    //         if (rect.top < windowHeight && rect.bottom > 0) {
    //             const parallaxSpeed = 0.3;
    //             const yPos = (scrolled - elementTop + windowHeight) * parallaxSpeed;
    //             element.style.transform = `translateY(${yPos}px)`;
    //         }
    //     });
    // });
    
    // ============================================
    // ENHANCED SCROLL ANIMATIONS
    // ============================================
    
    const enhancedObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const enhancedObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Observer une seule fois
                enhancedObserver.unobserve(entry.target);
            }
        });
    }, enhancedObserverOptions);
    
    // Observer les tuiles d'actions
    const actionTiles = document.querySelectorAll('.action-tile');
    
    actionTiles.forEach((tile, index) => {
        tile.classList.add('scroll-animate');
        tile.style.transitionDelay = `${index * 0.1}s`;
        enhancedObserver.observe(tile);
    });
    
    // Observer les cartes d'engagements avec animation (utiliser la variable déjà déclarée)
    const commitmentCardsEnhanced = document.querySelectorAll('.commitment-card');
    commitmentCardsEnhanced.forEach((card, index) => {
        // Ne pas ajouter scroll-animate si déjà présent
        if (!card.classList.contains('scroll-animate')) {
            card.classList.add('scroll-animate');
        }
        card.style.transitionDelay = `${index * 0.15}s`;
        enhancedObserver.observe(card);
    });
    
    // ============================================
    // WATCH CARD INTERACTIONS
    // ============================================
    
    watchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
});
