const { createApp } = Vue;

createApp({
    data() {
        return {
            content: null,
            loading: true,
            error: null
        }
    },
    
    computed: {
        section_1() {
            return {
                ...this.content?.section_1 || {},
                section_name: this.content?.section_1?.section_name || 'hero section'
            };
        },
        section_2() {
            return {
                ...this.content?.section_2 || {},
                section_name: this.content?.section_2?.section_name || 'the problem'
            };
        },
        section_3() {
            return {
                ...this.content?.section_3 || {},
                section_name: this.content?.section_3?.section_name || 'why now'
            };
        },
        headerContent() {
            return this.content?.main_header || {};
        }
    },
    
    methods: {
        async loadContent() {
            try {
                this.loading = true;
                const response = await fetch('./content/content-v1.0.0.json');
                if (!response.ok) throw new Error('Failed to load content');
                this.content = await response.json();
                this.error = null;
            } catch (error) {
                console.error('Content loading error:', error);
                this.error = 'Failed to load content. Please refresh the page.';
            } finally {
                this.loading = false;
            }
        },
        
        getImagePath(imageName) {
            return imageName ? `./images/${imageName}` : '';
        },
        
        scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        
        toggleMobileMenu() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        
        initializeScrollEffects() {
            // Navigation scroll effect
            window.addEventListener('scroll', () => {
                const nav = document.querySelector('nav');
                if (window.scrollY > 100) {
                    nav.classList.add('backdrop-blur-md', 'bg-white/95');
                } else {
                    nav.classList.remove('backdrop-blur-md', 'bg-white/95');
                }
            });
        },
        
        initializeAnimations() {
            // Intersection Observer for animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe sections for fade-in animation
            document.querySelectorAll('section').forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(section);
            });

            // Add hover effects to cards
            const cards = document.querySelectorAll('.shadow-lg');
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.classList.add('transform', '-translate-y-2');
                });
                card.addEventListener('mouseleave', () => {
                    card.classList.remove('transform', '-translate-y-2');
                });
            });
        }
    },
    
    async mounted() {
        await this.loadContent();
        this.initializeScrollEffects();
        this.initializeAnimations();
    }
}).mount('#app');