
// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModal = document.getElementById('closeModal');
    const playVideoBtn = document.getElementById('playVideo');
    
    // Filter gallery items
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide gallery items based on filter
            galleryItems.forEach(item => {
                const categories = item.getAttribute('data-categories');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    // Trigger animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Open image modal when gallery item is clicked
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageSrc = this.querySelector('.gallery-image').src;
            const category = this.querySelector('.gallery-category').textContent;
            const title = this.querySelector('.gallery-title').textContent;
            const description = this.querySelector('.gallery-description').textContent;
            
            // Check if it's a video item
            const isVideo = this.querySelector('.video-indicator') !== null;
            
            if (isVideo) {
                // For video items, show a video player modal instead
                alert('Video playback would start here. In production, this would open a video player or redirect to YouTube/Vimeo.');
                return;
            }
            
            // For image items, show the image modal
            modalImage.src = imageSrc;
            modalImage.alt = title;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            // Show modal
            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside the image
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            imageModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Video play button
    playVideoBtn.addEventListener('click', function() {
        alert('Video playback would start here. In production, this would embed a YouTube/Vimeo player.');
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
    
    // Stagger animation for gallery items
    function staggerAnimation() {
        const staggerItems = document.querySelectorAll('.stagger-item');
        staggerItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.05}s`;
        });
    }
    
    // Initialize
    animateOnScroll();
    staggerAnimation();
    
    if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('scrolled');
    }
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 140,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // CTA buttons
    document.querySelectorAll('.btn-cta-glow, .btn-outline-light-custom').forEach(button => {
        button.addEventListener('click', function() {
            alert('This would open the appropriate action (social media follow, collection view, etc.)');
        });
    });
});
