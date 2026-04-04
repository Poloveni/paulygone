// Tout le code s'exécute après le chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Script chargé !');
    
    // Barre de progression de lecture
    const progressBar = document.getElementById('progressBar');

    if (progressBar) {
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.pageYOffset;
            const progress = (scrolled / documentHeight) * 100;
            progressBar.style.width = progress + '%';
        });
    }

    // Navigation mobile toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const spans = navToggle.querySelectorAll('span');
            if (spans.length >= 3) {
                spans[0].style.transform = navLinks.classList.contains('active') 
                    ? 'rotate(45deg) translateY(8px)' 
                    : 'none';
                spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
                spans[2].style.transform = navLinks.classList.contains('active') 
                    ? 'rotate(-45deg) translateY(-8px)' 
                    : 'none';
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                if (spans.length >= 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }

    // Scroll-based navbar styling
    const nav = document.querySelector('.nav');

    if (nav) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                nav.style.background = 'linear-gradient(135deg, #1a252f 0%, #2c3e50 100%)';
                nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            } else {
                nav.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
                nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Animation Canvas Portfolio
    const canvas = document.getElementById('portfolioCanvas');
    if (canvas) {
        try {
            const ctx = canvas.getContext('2d');
            let particles = [];
            
            function resizeCanvas() {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
            }
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            class Particle {
                constructor() {
                    this.reset();
                }
                
                reset() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 3 + 1;
                    this.speedX = Math.random() * 0.5 - 0.25;
                    this.speedY = Math.random() * 0.5 - 0.25;
                    this.opacity = Math.random() * 0.5 + 0.3;
                }
                
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    
                    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                        this.reset();
                    }
                }
                
                draw() {
                    ctx.fillStyle = `rgba(201, 169, 97, ${this.opacity})`;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = 'rgba(201, 169, 97, 0.5)';
                }
            }
            
            for (let i = 0; i < 80; i++) {
                particles.push(new Particle());
            }
            
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });
                requestAnimationFrame(animate);
            }
            
            animate();
        } catch (error) {
            console.log('Canvas error:', error);
        }
    }

    // FORMULAIRE WEB3FORMS - LA PARTIE IMPORTANTE !
    const contactForm = document.getElementById('contactForm');
    console.log('📧 Formulaire trouvé:', contactForm);
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('🚀 Formulaire soumis !');
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (!submitBtn) {
                console.error('❌ Bouton submit non trouvé !');
                return;
            }
            
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            const formData = new FormData(contactForm);
            formData.append('access_key', '1a79de7f-cdea-4b44-bd65-ef53ac8cf7d6');
            
            console.log('📤 Envoi à Web3Forms...');
            
            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                console.log('📥 Réponse reçue:', data);
                
                if (data.success) {
                    submitBtn.textContent = '✅ Message envoyé !';
                    contactForm.reset();
                    alert('✅ Votre message a été envoyé avec succès !');
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Erreur Web3Forms: ' + JSON.stringify(data));
                }
            } catch (error) {
                console.error('❌ Erreur:', error);
                submitBtn.textContent = '❌ Erreur. Réessayez.';
                alert('❌ Erreur lors de l\'envoi. Vérifiez la console.');
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
        
        console.log('✅ Event listener ajouté au formulaire !');
    } else {
        console.error('❌ Formulaire #contactForm non trouvé !');
    }
});
