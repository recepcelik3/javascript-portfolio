document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const menuBtn = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const skillBars = document.querySelectorAll('.skill-progress');
    const workItems = document.querySelectorAll('.work-item');
    const processSteps = document.querySelectorAll('.process-step');
    const contactForm = document.getElementById('contact-form');
    const loader = document.querySelector('.loader');
    const loaderProgress = document.querySelector('.loader-progress');
    const header = document.querySelector('header');
    const projectCards = document.querySelectorAll('.project-card');
    const canvas = document.getElementById('noise-canvas');

    // Navigation Functions
    function setActiveSection(sectionId) {
        // Remove active class from all sections and links
        sections.forEach(section => section.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to current section and link
        const currentSection = document.getElementById(sectionId);
        const currentLink = document.querySelector(`a[href="#${sectionId}"]`);

        if (currentSection) currentSection.classList.add('active');
        if (currentLink) currentLink.classList.add('active');
    }

    // Loader Animation
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }, 500);
        }
        loaderProgress.style.width = `${progress}%`;
    }, 200);

    // Scroll Events
    window.addEventListener('scroll', () => {
        // Header Background
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Project Cards Animation
        projectCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            
            if (cardTop < window.innerHeight - 100 && cardBottom > 0) {
                card.classList.add('visible');
            }
        });
    });

    // Event Listeners
    // Menu Toggle
    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuBtn.textContent = mainNav.classList.contains('active') ? 'Close' : 'Menu';
        });
    }

    // Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            
            setActiveSection(sectionId);

            // Close menu on mobile
            if (mainNav) {
                mainNav.classList.remove('active');
                menuBtn.textContent = 'Menu';
            }

            // Smooth scroll to section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Skills Animation
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const parentBar = progressBar.parentElement;
                if (parentBar && parentBar.hasAttribute('data-progress')) {
                    progressBar.style.width = parentBar.getAttribute('data-progress') + '%';
                }
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Process Steps Animation
    const processObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });

    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        processObserver.observe(step);
    });

    // Work Items Hover Effect
    workItems.forEach(item => {
        const overlay = item.querySelector('.work-overlay');
        if (overlay) {
            item.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
            });
        }
    });

    // Canvas Noise Effect
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        function noise(ctx) {
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;
            
            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 255;
                data[i] = value;
                data[i + 1] = value;
                data[i + 2] = value;
                data[i + 3] = 15; // Low opacity for subtle effect
            }
            
            ctx.putImageData(imageData, 0, 0);
        }

        function loop() {
            noise(ctx);
            requestAnimationFrame(loop);
        }

        loop();

        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
    }

    // Form Handling
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form validation
            const formData = new FormData(contactForm);
            let isValid = true;
            
            formData.forEach((value, key) => {
                if (!value.trim()) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Simulated form submission
                const submitBtn = contactForm.querySelector('.submit-btn');
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }, 1500);
            }
        });

        // Form Label Animation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Check for pre-filled inputs
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }

    // Set initial active section
    setActiveSection('about');
});
