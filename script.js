 // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-animate').forEach(element => {
            observer.observe(element);
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && document.querySelector(href)) {
                    e.preventDefault();
                    const element = document.querySelector(href);
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll effect to navbar
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
            } else {
                nav.style.boxShadow = 'none';
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });