

    // Modal functions for article detail popup
    function openArticleModal(e) {
        if (e) e.stopPropagation();
        const modal = document.getElementById('articleDetailModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal('articleDetailModal');
        }
    });
    
    // Close modal when clicking outside content
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function() {
            const modalId = this.parentElement.id;
            closeModal(modalId);
        });
    });
    
    // Copy link functionality
    function copyArticleLink() {
        const url = window.location.href + '#article-future-ai-2024';
        navigator.clipboard.writeText(url).then(() => {
            // Show feedback
            const copyBtn = event.target.closest('.share-btn.copy');
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.style.background = '#10b981';
            
            setTimeout(() => {
                copyBtn.innerHTML = originalHTML;
                copyBtn.style.background = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in-up, .stagger-item');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }

    // Stagger animation for cards
    function staggerAnimation() {
        const staggerItems = document.querySelectorAll('.stagger-item');
        staggerItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    // Initialize animations
    document.addEventListener('DOMContentLoaded', function () {
        animateOnScroll();
        staggerAnimation();

        // Trigger navbar state on load
        if (window.scrollY > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        }

        // Make article cards clickable
        document.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', function(e) {
                // Only open modal if the click wasn't on a link inside the card
                if (!e.target.closest('a')) {
                    openArticleModal();
                }
            });
        });
    });

    window.addEventListener('scroll', animateOnScroll);

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Button hover effects
    document.querySelectorAll('.btn-primary-custom, .btn-secondary-custom, .btn-cta-glow').forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animate chart bars on scroll
    function animateCharts() {
        const chartBars = document.querySelectorAll('.chart-bar');
        
        chartBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.setProperty('--chart-width', width);
        });
    }

    // Initialize everything
    document.addEventListener('DOMContentLoaded', function() {
        animateOnScroll();
        staggerAnimation();
        animateCharts();
        
        // Trigger navbar state on load
        if (window.scrollY > 50) {
            document.querySelector('.navbar').classList.add('scrolled');
        }
    });

    // Testimonials Horizontal Scrolling - Mobile only
    const testimonialsScroll = document.querySelector('.testimonials-scroll');
    const testimonialCards = document.querySelectorAll('.testimonial-card-wrapper');
    const prevBtn = document.querySelector('.testimonial-nav-prev');
    const nextBtn = document.querySelector('.testimonial-nav-next');
    const dots = document.querySelectorAll('.testimonial-dot');

    if (testimonialsScroll && testimonialCards.length > 0) {
        let currentIndex = 0;
        const isMobile = window.innerWidth <= 768;

        // Only initialize mobile scrolling on mobile devices
        if (isMobile) {
            const cardWidth = testimonialCards[0].offsetWidth + 32; // Including gap

            // Update active dot
            function updateActiveDot() {
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }

            // Scroll to specific index
            function scrollToIndex(index) {
                if (index < 0) index = testimonialCards.length - 1;
                if (index >= testimonialCards.length) index = 0;
                
                currentIndex = index;
                
                const scrollPosition = index * cardWidth;
                testimonialsScroll.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
                
                updateActiveDot();
            }

            // Next button click
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    scrollToIndex(currentIndex + 1);
                });
            }

            // Previous button click
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    scrollToIndex(currentIndex - 1);
                });
            }

            // Dot navigation
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    scrollToIndex(index);
                });
            });

            // Handle scroll events for mobile
            testimonialsScroll.addEventListener('scroll', () => {
                const scrollLeft = testimonialsScroll.scrollLeft;
                const newIndex = Math.round(scrollLeft / cardWidth);
                
                if (newIndex !== currentIndex) {
                    currentIndex = newIndex;
                    updateActiveDot();
                }
            });

            // Add keyboard navigation for mobile
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    if (e.key === 'ArrowLeft') {
                        scrollToIndex(currentIndex - 1);
                    } else {
                        scrollToIndex(currentIndex + 1);
                    }
                }
            });

            // Add touch/swipe support for mobile
            let touchStartX = 0;
            let touchEndX = 0;

            testimonialsScroll.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            testimonialsScroll.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // Swipe left - next
                        scrollToIndex(currentIndex + 1);
                    } else {
                        // Swipe right - previous
                        scrollToIndex(currentIndex - 1);
                    }
                }
            }

            // Initialize dots
            updateActiveDot();
        }

        // Update on window resize
        window.addEventListener('resize', () => {
            const newIsMobile = window.innerWidth <= 768;
            if (newIsMobile !== isMobile) {
                // Reload page on significant layout change
                window.location.reload();
            }
        });
    }
