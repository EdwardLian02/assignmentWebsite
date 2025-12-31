
        // Modal functions
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
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
                closeModal('featuredModal');
                closeModal('popularModal');
                closeModal('articleModal');
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
            const url = window.location.href;
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

        // Initialize AOS
        document.addEventListener('DOMContentLoaded', function () {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 100,
                delay: 100
            });

            // Navbar scroll effect
            window.addEventListener('scroll', function () {
                const navbar = document.querySelector('.navbar');
                const cleanSearchSection = document.querySelector('.clean-search-section');

                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                    if (cleanSearchSection) {
                        cleanSearchSection.classList.add('scrolled');
                    }
                } else {
                    navbar.classList.remove('scrolled');
                    if (cleanSearchSection) {
                        cleanSearchSection.classList.remove('scrolled');
                    }
                }
            });

            // Animation on scroll for fallback
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
                    item.style.transitionDelay = `${index * 0.05}s`;
                });
            }

            // ===== COLLAPSIBLE SIDEBAR SECTIONS =====
            const filterToggle = document.getElementById('filterToggle');
            const filterContent = document.getElementById('filterContent');
            const filterIcon = document.querySelector('.collapsible-icon');

            if (filterToggle && filterContent) {
                filterToggle.addEventListener('click', function () {
                    filterContent.classList.toggle('collapsed');
                    filterIcon.classList.toggle('collapsed');
                });

                // Start collapsed on mobile, expanded on desktop
                if (window.innerWidth <= 992) {
                    filterContent.classList.add('collapsed');
                }
            }

            // Update collapsible state on window resize
            window.addEventListener('resize', function () {
                if (filterContent) {
                    if (window.innerWidth <= 992) {
                        filterContent.classList.add('collapsed');
                        if (filterIcon) filterIcon.classList.remove('collapsed');
                    } else {
                        filterContent.classList.remove('collapsed');
                        if (filterIcon) filterIcon.classList.remove('collapsed');
                    }
                }
            });

            // ===== FILTER FUNCTIONALITY =====
            let activeFilter = 'all';
            let searchTerm = '';
            const articlesContainer = document.getElementById('articlesContainer');
            const filterTags = document.querySelectorAll('.filter-tag');
            const searchInput = document.getElementById('searchInput');
            const articleCount = document.getElementById('articleCount');

            // Filter by topic functionality
            filterTags.forEach(tag => {
                tag.addEventListener('click', function () {
                    // Remove active class from all tags
                    filterTags.forEach(t => t.classList.remove('active'));
                    // Add active class to clicked tag
                    this.classList.add('active');

                    // Get filter value
                    activeFilter = this.getAttribute('data-filter');

                    // Filter articles
                    filterArticles();

                    // On mobile, collapse filter after selection
                    if (window.innerWidth <= 992 && filterContent) {
                        filterContent.classList.add('collapsed');
                        filterIcon.classList.toggle('collapsed');
                    }
                });
            });

            // Search functionality with debounce
            let searchTimeout;
            if (searchInput) {
                searchInput.addEventListener('input', function (e) {
                    clearTimeout(searchTimeout);
                    searchTimeout = setTimeout(() => {
                        searchTerm = e.target.value.toLowerCase().trim();
                        filterArticles();
                    }, 300);
                });
            }

            // Filter articles function
            function filterArticles() {
                const articles = document.querySelectorAll('.article-stream-item');
                let visibleCount = 0;

                articles.forEach(article => {
                    const category = article.getAttribute('data-category');
                    const title = article.querySelector('.article-title').textContent.toLowerCase();
                    const excerpt = article.querySelector('.article-excerpt').textContent.toLowerCase();
                    const author = article.querySelector('.article-meta span:last-child').textContent.toLowerCase();

                    // Check if article matches filter
                    const matchesFilter = activeFilter === 'all' || category === activeFilter;

                    // Check if article matches search
                    const matchesSearch = !searchTerm ||
                        title.includes(searchTerm) ||
                        excerpt.includes(searchTerm) ||
                        author.includes(searchTerm);

                    // Show/hide article
                    if (matchesFilter && matchesSearch) {
                        article.classList.remove('hidden');
                        visibleCount++;
                    } else {
                        article.classList.add('hidden');
                    }
                });

                // Update article count
                if (articleCount) {
                    articleCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'article' : 'articles'}`;
                }

                // Show message if no results
                showNoResultsMessage(visibleCount === 0);
            }

            // Show no results message
            function showNoResultsMessage(show) {
                const existingMessage = document.getElementById('noResultsMessage');
                if (existingMessage) {
                    existingMessage.remove();
                }

                if (show) {
                    const message = document.createElement('div');
                    message.id = 'noResultsMessage';
                    message.className = 'text-center py-5';
                    message.innerHTML = `
                        <div class="mb-3">
                            <i class="fas fa-search fa-3x text-gray-medium"></i>
                        </div>
                        <h4 class="mb-2">No articles found</h4>
                        <p class="text-muted">Try adjusting your filters or search terms</p>
                        <button class="btn btn-outline-primary mt-3" id="resetFiltersBtn">
                            Reset All Filters
                        </button>
                    `;

                    articlesContainer.appendChild(message);

                    // Reset filters button
                    document.getElementById('resetFiltersBtn').addEventListener('click', function () {
                        searchInput.value = '';
                        searchTerm = '';

                        filterTags.forEach(tag => {
                            tag.classList.remove('active');
                            if (tag.getAttribute('data-filter') === 'all') {
                                tag.classList.add('active');
                            }
                        });

                        activeFilter = 'all';
                        filterArticles();
                    });
                }
            }

            // Load more functionality
            const loadMoreBtn = document.getElementById('loadMoreBtn');
            if (loadMoreBtn) {
                loadMoreBtn.addEventListener('click', function () {
                    this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Loading...';
                    this.disabled = true;

                    // Simulate loading more articles
                    setTimeout(() => {
                        // In a real implementation, this would load more articles via AJAX
                        console.log('Loading more articles...');

                        // Add more articles (simulated)
                        const newArticles = [
                            {
                                category: 'ai-automation',
                                title: 'The Future of Machine Learning Operations',
                                excerpt: 'How MLOps is transforming how enterprises deploy and maintain AI models at scale.',
                                author: 'Dr. Sarah Chen',
                                date: 'February 5, 2024',
                                readTime: '6 min read',
                                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                            },
                            {
                                category: 'cloud-devops',
                                title: 'Serverless Architectures: Benefits and Trade-offs',
                                excerpt: 'A comprehensive analysis of when serverless makes sense and when traditional architectures prevail.',
                                author: 'Robert Kim',
                                date: 'January 28, 2024',
                                readTime: '7 min read',
                                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                            }
                        ];

                        // Simulate adding new articles
                        newArticles.forEach((article, index) => {
                            const newArticle = document.createElement('div');
                            newArticle.className = 'article-stream-item stagger-item';
                            newArticle.setAttribute('data-category', article.category);
                            newArticle.setAttribute('data-aos', 'fade-up');
                            newArticle.setAttribute('data-aos-delay', index * 50);

                            newArticle.innerHTML = `
                                <div class="article-stream-content">
                                    <div class="article-stream-image">
                                        <img src="${article.image}" alt="${article.title}">
                                        <div class="article-category">${getCategoryName(article.category)}</div>
                                    </div>
                                    <div class="article-stream-text">
                                        <div class="article-meta">
                                            <span><i class="far fa-calendar"></i> ${article.date}</span>
                                            <span><i class="far fa-clock"></i> ${article.readTime}</span>
                                            <span><i class="fas fa-user"></i> ${article.author}</span>
                                        </div>
                                        <h3 class="article-title">${article.title}</h3>
                                        <p class="article-excerpt">${article.excerpt}</p>
                                        <a href="#" class="article-read-more">
                                            Read Article <i class="fas fa-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            `;

                            articlesContainer.appendChild(newArticle);
                        });

                        // Update article count
                        const totalArticles = document.querySelectorAll('.article-stream-item:not(.hidden)').length;
                        if (articleCount) {
                            articleCount.textContent = `${totalArticles} articles`;
                        }

                        // Re-run animations for new articles
                        animateOnScroll();
                        staggerAnimation();

                        this.innerHTML = 'Load More Articles <i class="fas fa-arrow-down ms-2"></i>';
                        this.disabled = false;
                    }, 1500);
                });
            }

            // Helper function to get category display name
            function getCategoryName(category) {
                const categoryMap = {
                    'ai-automation': 'AI & Automation',
                    'cloud-devops': 'Cloud & DevOps',
                    'cybersecurity': 'Cybersecurity',
                    'data-analytics': 'Data Analytics',
                    'digital-strategy': 'Digital Strategy',
                    'leadership': 'Leadership'
                };
                return categoryMap[category] || category;
            }

            // Newsletter form submission
            const newsletterForm = document.querySelector('.newsletter-form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function (e) {
                    e.preventDefault();
                    const emailInput = this.querySelector('.newsletter-input');
                    if (emailInput.value) {
                        // In a real implementation, this would submit to a backend
                        alert(`Thank you for subscribing with: ${emailInput.value}`);
                        emailInput.value = '';
                    }
                });
            }

            // Article card hover animation enhancement
            const articleItems = document.querySelectorAll('.article-stream-item');
            articleItems.forEach(item => {
                item.addEventListener('mouseenter', function () {
                    this.style.transform = 'translateY(-8px)';
                });

                item.addEventListener('mouseleave', function () {
                    this.style.transform = 'translateY(-5px)';
                });
            });

            // Popular article interactions
            const popularArticles = document.querySelectorAll('.popular-article, .popular-article-mobile');
            popularArticles.forEach(article => {
                article.addEventListener('click', function () {
                    // In a real implementation, this would navigate to article
                    console.log('Navigating to popular article');
                });
            });

            // Initialize
            animateOnScroll();
            staggerAnimation();

            if (window.scrollY > 50) {
                document.querySelector('.navbar').classList.add('scrolled');
                const cleanSearchSection = document.querySelector('.clean-search-section');
                if (cleanSearchSection) {
                    cleanSearchSection.classList.add('scrolled');
                }
            }

            window.addEventListener('scroll', animateOnScroll);

            // Initial filter setup
            filterArticles();
        });
