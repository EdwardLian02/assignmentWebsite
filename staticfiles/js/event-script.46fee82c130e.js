
// Event data for popup modal
const eventDetails = {
    featured: {
        type: "Conference",
        title: "Future of Enterprise AI Summit 2024",
        subtitle: "Join industry leaders and AI pioneers for a deep dive into the latest advancements in enterprise artificial intelligence, machine learning implementation, and ethical AI practices.",
        description: "This premier event brings together the brightest minds in artificial intelligence to explore how AI is transforming enterprise operations, decision-making, and innovation. Through keynote presentations, panel discussions, and hands-on workshops, you'll gain practical insights into implementing AI solutions that drive business value while maintaining ethical standards and compliance.",
        meta: [
            { icon: "far fa-calendar", label: "Date", value: "March 15-17, 2024" },
            { icon: "fas fa-map-marker-alt", label: "Location", value: "San Francisco & Virtual" },
            { icon: "far fa-clock", label: "Duration", value: "3 Days (9:00 AM - 6:00 PM Daily)" },
            { icon: "fas fa-user-friends", label: "Attendees", value: "500+ Expected" },
            { icon: "fas fa-language", label: "Language", value: "English" },
            { icon: "fas fa-certificate", label: "Certificate", value: "Yes (CPD Accredited)" }
        ],
        agenda: [
            { time: "9:00 AM - 10:30 AM", title: "Opening Keynote", description: "The State of Enterprise AI in 2024" },
            { time: "11:00 AM - 12:30 PM", title: "Panel Discussion", description: "Ethical AI: Balancing Innovation and Responsibility" },
            { time: "1:30 PM - 3:00 PM", title: "Workshop Session", description: "Implementing AI Governance Frameworks" },
            { time: "3:30 PM - 5:00 PM", title: "Case Studies", description: "Real-world AI Success Stories" }
        ],
        learnings: [
            "Understand the latest AI technologies and their enterprise applications",
            "Learn how to develop and implement AI governance frameworks",
            "Discover strategies for ethical AI development and deployment",
            "Gain insights into AI integration with existing business systems",
            "Network with industry leaders and AI experts"
        ],
        speakers: [
            { name: "Dr. Sarah Chen", title: "AI Research Director", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
            { name: "Michael Rodriguez", title: "CTO, TechNova", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
            { name: "Jessica Williams", title: "Head of AI Ethics", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
            { name: "David Kim", title: "AI Solutions Architect", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
        ],
        audience: "CTOs, CIOs, AI/ML Engineers, Data Scientists, IT Directors, Innovation Managers, and business leaders looking to leverage AI for competitive advantage.",
        pricing: "Early Bird: $999 | Standard: $1,299 | Virtual Only: $399",
        seats: "45",
        earlyBird: "7 days"
    },
    event1: {
        type: "Webinar",
        title: "Multi-Cloud Strategy Best Practices",
        subtitle: "Learn how to design and implement effective multi-cloud strategies that optimize costs, performance, and security.",
        description: "In this comprehensive webinar, our cloud experts will guide you through the complexities of multi-cloud environments. We'll cover everything from initial planning and vendor selection to ongoing management and optimization. You'll learn practical strategies for avoiding vendor lock-in, optimizing costs across platforms, and ensuring consistent security and compliance.",
        meta: [
            { icon: "far fa-calendar", label: "Date", value: "June 12, 2024" },
            { icon: "fas fa-globe", label: "Location", value: "Virtual (Online)" },
            { icon: "far fa-clock", label: "Time", value: "2:00 PM - 3:30 PM EST" },
            { icon: "fas fa-user-friends", label: "Capacity", value: "200 Participants" },
            { icon: "fas fa-language", label: "Language", value: "English" },
            { icon: "fas fa-certificate", label: "Certificate", value: "Yes" }
        ],
        agenda: [
            { time: "2:00 PM - 2:20 PM", title: "Introduction", description: "The State of Multi-Cloud Adoption" },
            { time: "2:20 PM - 2:50 PM", title: "Strategy Session", description: "Designing Your Multi-Cloud Architecture" },
            { time: "2:50 PM - 3:20 PM", title: "Best Practices", description: "Cost Optimization and Security" },
            { time: "3:20 PM - 3:30 PM", title: "Q&A", description: "Your Questions Answered" }
        ],
        learnings: [
            "Understand the benefits and challenges of multi-cloud strategies",
            "Learn how to select the right cloud providers for your needs",
            "Discover tools for managing multiple cloud environments",
            "Gain insights into cost optimization across platforms",
            "Learn security best practices for multi-cloud setups"
        ],
        speakers: [
            { name: "Alex Thompson", title: "Cloud Architect", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
            { name: "Maria Garcia", title: "DevOps Lead", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
        ],
        audience: "Cloud Architects, DevOps Engineers, IT Managers, CTOs, and anyone involved in cloud infrastructure planning and management.",
        pricing: "Free",
        seats: "156",
        earlyBird: "N/A"
    },
    event2: {
        type: "Workshop",
        title: "Building Enterprise AI Models",
        subtitle: "Hands-on workshop covering the complete lifecycle of developing, training, and deploying enterprise-grade AI models.",
        description: "This intensive workshop provides practical, hands-on experience with building production-ready AI models. You'll work through real-world scenarios using our enterprise AI platform, covering everything from data preparation and model selection to deployment and monitoring. Bring your laptop and be ready to code!",
        meta: [
            { icon: "far fa-calendar", label: "Date", value: "June 25, 2024" },
            { icon: "fas fa-map-marker-alt", label: "Location", value: "New York Tech Center" },
            { icon: "far fa-clock", label: "Duration", value: "9:00 AM - 5:00 PM EST" },
            { icon: "fas fa-user-friends", label: "Capacity", value: "40 Participants" },
            { icon: "fas fa-language", label: "Language", value: "English" },
            { icon: "fas fa-certificate", label: "Certificate", value: "Yes" }
        ],
        agenda: [
            { time: "9:00 AM - 10:30 AM", title: "Introduction", description: "Enterprise AI Landscape" },
            { time: "10:45 AM - 12:30 PM", title: "Hands-on Session", description: "Data Preparation and Feature Engineering" },
            { time: "1:30 PM - 3:00 PM", title: "Model Development", description: "Building and Training Models" },
            { time: "3:15 PM - 4:30 PM", title: "Deployment", description: "Production Deployment Strategies" },
            { time: "4:30 PM - 5:00 PM", title: "Wrap-up", description: "Q&A and Next Steps" }
        ],
        learnings: [
            "Master the complete AI model development lifecycle",
            "Learn best practices for data preparation and feature engineering",
            "Understand model selection and hyperparameter tuning",
            "Gain hands-on experience with deployment pipelines",
            "Learn monitoring and maintenance strategies"
        ],
        speakers: [
            { name: "Dr. Robert Kim", title: "AI Research Lead", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
            { name: "Lisa Wong", title: "ML Engineer", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
        ],
        audience: "Data Scientists, ML Engineers, AI Researchers, and developers with basic Python knowledge interested in enterprise AI applications.",
        pricing: "Early Bird: $499 | Standard: $699",
        seats: "28",
        earlyBird: "14 days"
    }
};

// Horizontal scroll for timeline month tabs
function initTimelineMonthScroll() {
    const timelineMonths = document.getElementById('timelineMonths');
    const prevMonthTab = document.getElementById('prevMonthTab');
    const nextMonthTab = document.getElementById('nextMonthTab');
    const prevMonthTabMobile = document.getElementById('prevMonthTabMobile');
    const nextMonthTabMobile = document.getElementById('nextMonthTabMobile');
    
    if (!timelineMonths) return;
    
    function updateMonthTabButtons() {
        const scrollLeft = timelineMonths.scrollLeft;
        const maxScroll = timelineMonths.scrollWidth - timelineMonths.clientWidth;
        const isAtStart = scrollLeft <= 10;
        const isAtEnd = scrollLeft >= maxScroll - 10;
        
        // Update desktop buttons
        if (prevMonthTab) {
            prevMonthTab.disabled = isAtStart;
            prevMonthTab.style.opacity = isAtStart ? '0.5' : '1';
        }
        if (nextMonthTab) {
            nextMonthTab.disabled = isAtEnd;
            nextMonthTab.style.opacity = isAtEnd ? '0.5' : '1';
        }
        
        // Update mobile buttons
        if (prevMonthTabMobile) {
            prevMonthTabMobile.disabled = isAtStart;
            prevMonthTabMobile.style.opacity = isAtStart ? '0.5' : '1';
        }
        if (nextMonthTabMobile) {
            nextMonthTabMobile.disabled = isAtEnd;
            nextMonthTabMobile.style.opacity = isAtEnd ? '0.5' : '1';
        }
    }
    
    function scrollMonthTabsBy(amount) {
        timelineMonths.scrollBy({
            left: amount,
            behavior: 'smooth'
        });
        
        setTimeout(updateMonthTabButtons, 300);
    }
    
    // Desktop month tab buttons
    if (prevMonthTab) {
        prevMonthTab.addEventListener('click', () => scrollMonthTabsBy(-150));
    }
    
    if (nextMonthTab) {
        nextMonthTab.addEventListener('click', () => scrollMonthTabsBy(150));
    }
    
    // Mobile month tab buttons
    if (prevMonthTabMobile) {
        prevMonthTabMobile.addEventListener('click', () => scrollMonthTabsBy(-150));
    }
    
    if (nextMonthTabMobile) {
        nextMonthTabMobile.addEventListener('click', () => scrollMonthTabsBy(150));
    }
    
    // Update on scroll
    timelineMonths.addEventListener('scroll', updateMonthTabButtons);
    
    // Update on resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateMonthTabButtons, 250);
    });
    
    // Initialize button states
    updateMonthTabButtons();
    
    // Auto-center active month on load
    function centerActiveMonth() {
        const activeMonth = timelineMonths.querySelector('.timeline-month.active');
        if (activeMonth) {
            const containerWidth = timelineMonths.clientWidth;
            const monthWidth = activeMonth.offsetWidth;
            const monthLeft = activeMonth.offsetLeft;
            
            timelineMonths.scrollTo({
                left: monthLeft - (containerWidth / 2) + (monthWidth / 2),
                behavior: 'smooth'
            });
        }
    }
    
    // Center active month when timeline loads
    setTimeout(centerActiveMonth, 500);
    
    // Also center when month is clicked
    document.querySelectorAll('.timeline-month').forEach(month => {
        month.addEventListener('click', function() {
            setTimeout(centerActiveMonth, 100);
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
// Horizontal scroll navigation for events grid
function initHorizontalScroll() {
    const eventsRow = document.querySelector('#events-grid .row');
    const scrollLeftBtn = document.getElementById('scrollLeftBtn');
    const scrollRightBtn = document.getElementById('scrollRightBtn');
    const scrollLeftBtnMobile = document.getElementById('scrollLeftBtnMobile');
    const scrollRightBtnMobile = document.getElementById('scrollRightBtnMobile');
    
    if (!eventsRow) return;
    
    function updateScrollButtons() {
        const scrollLeft = eventsRow.scrollLeft;
        const maxScroll = eventsRow.scrollWidth - eventsRow.clientWidth;
        const isAtStart = scrollLeft <= 0;
        const isAtEnd = scrollLeft >= maxScroll - 10;
        
        // Update desktop buttons
        if (scrollLeftBtn) scrollLeftBtn.disabled = isAtStart;
        if (scrollRightBtn) scrollRightBtn.disabled = isAtEnd;
        
        // Update mobile buttons
        if (scrollLeftBtnMobile) scrollLeftBtnMobile.disabled = isAtStart;
        if (scrollRightBtnMobile) scrollRightBtnMobile.disabled = isAtEnd;
    }
    
    function scrollBy(amount) {
        eventsRow.scrollBy({
            left: amount,
            behavior: 'smooth'
        });
    }
    
    // Desktop buttons
    if (scrollLeftBtn) {
        scrollLeftBtn.addEventListener('click', () => scrollBy(-350));
    }
    
    if (scrollRightBtn) {
        scrollRightBtn.addEventListener('click', () => scrollBy(350));
    }
    
    // Mobile buttons
    if (scrollLeftBtnMobile) {
        scrollLeftBtnMobile.addEventListener('click', () => scrollBy(-350));
    }
    
    if (scrollRightBtnMobile) {
        scrollRightBtnMobile.addEventListener('click', () => scrollBy(350));
    }
    
    // Update on scroll
    eventsRow.addEventListener('scroll', updateScrollButtons);
    
    // Update on resize
    window.addEventListener('resize', updateScrollButtons);
    
    // Initialize button states
    updateScrollButtons();
}

// Event tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.event-tab-btn');
    const eventItems = document.querySelectorAll('.event-item');
    // Initialize horizontal scroll functionality
initHorizontalScroll();
// Initialize timeline month scroll functionality
initTimelineMonthScroll();
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-tab');
            
            // Show/hide events based on filter
            eventItems.forEach(item => {
                const categories = item.getAttribute('data-categories');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.classList.remove('d-none');
                    item.classList.add('d-block');
                    
                    // Trigger animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.classList.remove('d-block');
                        item.classList.add('d-none');
                    }, 300);
                }
            });
        });
    });
    
    // Event modal functionality
    const eventModal = document.getElementById('eventModal');
    const closeModal = document.getElementById('closeModal');
    const viewEventButtons = document.querySelectorAll('.view-event-details');
    const pastEventCards = document.querySelectorAll('.past-event-card');
    
    // Open modal
    viewEventButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const eventId = this.getAttribute('data-event-id');
            openEventModal(eventId);
        });
    });
    
    // Open modal for past events
    pastEventCards.forEach(card => {
        card.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event-id');
            openEventModal(eventId);
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', closeEventModal);
    eventModal.addEventListener('click', function(e) {
        if (e.target === eventModal) {
            closeEventModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && eventModal.classList.contains('active')) {
            closeEventModal();
        }
    });
    
    function openEventModal(eventId) {
        const event = eventDetails[eventId] || eventDetails.event1;
        
        // Update modal content
        document.getElementById('modalBadge').textContent = event.type;
        document.getElementById('modalTitle').textContent = event.title;
        document.getElementById('modalSubtitle').textContent = event.subtitle;
        document.getElementById('modalDescription').textContent = event.description;
        document.getElementById('modalSeats').textContent = event.seats;
        document.getElementById('modalEarlyBird').textContent = event.earlyBird;
        document.getElementById('modalAudience').textContent = event.audience;
        document.getElementById('modalPricing').textContent = event.pricing;
        
        // Update meta information
        const modalMeta = document.getElementById('modalMeta');
        modalMeta.innerHTML = '';
        event.meta.forEach(metaItem => {
            const metaElement = document.createElement('div');
            metaElement.className = 'modal-meta-item';
            metaElement.innerHTML = `
                <i class="${metaItem.icon}"></i>
                <div class="modal-meta-text">
                    <span class="modal-meta-label">${metaItem.label}</span>
                    <span class="modal-meta-value">${metaItem.value}</span>
                </div>
            `;
            modalMeta.appendChild(metaElement);
        });
        
        // Update agenda
        const modalAgenda = document.getElementById('modalAgenda');
        modalAgenda.innerHTML = '<ul class="agenda-list">';
        event.agenda.forEach(agendaItem => {
            modalAgenda.innerHTML += `
                <li class="agenda-item">
                    <div class="agenda-time">${agendaItem.time}</div>
                    <div class="agenda-content">
                        <h4>${agendaItem.title}</h4>
                        <p>${agendaItem.description}</p>
                    </div>
                </li>
            `;
        });
        modalAgenda.innerHTML += '</ul>';
        
        // Update learnings
        const modalLearnings = document.getElementById('modalLearnings');
        modalLearnings.innerHTML = '';
        event.learnings.forEach(learning => {
            const li = document.createElement('li');
            li.textContent = learning;
            modalLearnings.appendChild(li);
        });
        
        // Update speakers
        const modalSpeakers = document.getElementById('modalSpeakers');
        modalSpeakers.innerHTML = '';
        event.speakers.forEach(speaker => {
            modalSpeakers.innerHTML += `
                <div class="speaker-card">
                    <div class="speaker-avatar">
                        <img src="${speaker.img}" alt="${speaker.name}">
                    </div>
                    <div class="speaker-name">${speaker.name}</div>
                    <div class="speaker-title">${speaker.title}</div>
                </div>
            `;
        });
        
        // Show modal
        document.body.style.overflow = 'hidden';
        eventModal.classList.add('active');
        
        // Trigger animation
        setTimeout(() => {
            eventModal.style.opacity = '1';
            document.querySelector('.event-modal-content').style.transform = 'translateY(0)';
            document.querySelector('.event-modal-content').style.opacity = '1';
        }, 10);
    }
    
    function closeEventModal() {
        eventModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Modal button actions
    document.getElementById('modalSaveBtn').addEventListener('click', function() {
        alert('Event saved to your calendar! We\'ll send you a reminder before the event.');
    });
    
    document.getElementById('modalRegisterBtn').addEventListener('click', function() {
        const eventTitle = document.getElementById('modalTitle').textContent;
        alert(`Registration form for "${eventTitle}" would open here. In production, this would connect to your event registration system.`);
    });
    
    // Monthly Timeline Functionality
    const months = [
        'June 2024', 'July 2024', 'August 2024', 
        'September 2024', 'October 2024', 'November 2024'
    ];
    
    const timelineEvents = {
        'June 2024': [
            { day: '12', month: 'Jun', title: 'Multi-Cloud Strategy Webinar', time: '2:00 PM EST', type: 'webinar', id: 'event1' },
            { day: '25', month: 'Jun', title: 'Enterprise AI Workshop', time: '9:00 AM - 5:00 PM', type: 'workshop', id: 'event2' }
        ],
        'July 2024': [
            { day: '10', month: 'Jul', title: 'Security Summit', time: 'July 10-12', type: 'conference', id: 'event3' },
            { day: '18', month: 'Jul', title: 'Real-time Analytics Webinar', time: '11:00 AM EST', type: 'webinar', id: 'event4' }
        ],
        'August 2024': [
            { day: '05', month: 'Aug', title: 'Advanced CI/CD Workshop', time: '10:00 AM - 4:00 PM', type: 'workshop', id: 'event5' }
        ],
        'September 2024': [
            { day: '22', month: 'Sep', title: 'Digital Leaders Forum', time: 'September 22-24', type: 'conference', id: 'event6' }
        ],
        'October 2024': [
            { day: '15', month: 'Oct', title: 'AI Ethics & Governance', time: '1:00 PM EST', type: 'webinar', id: 'event7' },
            { day: '29', month: 'Oct', title: 'Cloud Migration Workshop', time: '9:00 AM - 4:00 PM', type: 'workshop', id: 'event8' }
        ],
        'November 2024': [
            { day: '12', month: 'Nov', title: 'Future Tech Conference', time: 'November 12-14', type: 'conference', id: 'event9' }
        ]
    };
    
    const timelineMonthsContainer = document.getElementById('timelineMonths');
    const timelineEventsContainer = document.getElementById('timelineEvents');
    let currentMonthIndex = 0;
    
    // Populate months
    months.forEach((month, index) => {
        const monthElement = document.createElement('div');
        monthElement.className = `timeline-month ${index === 0 ? 'active' : ''}`;
        monthElement.textContent = month;
        monthElement.setAttribute('data-month', month);
        
        monthElement.addEventListener('click', function() {
            // Remove active class from all months
            document.querySelectorAll('.timeline-month').forEach(m => m.classList.remove('active'));
            
            // Add active class to clicked month
            this.classList.add('active');
            
            // Update current month index
            currentMonthIndex = months.indexOf(this.getAttribute('data-month'));
            
            // Display events for selected month
            displayTimelineEvents(this.getAttribute('data-month'));
        });
        
        timelineMonthsContainer.appendChild(monthElement);
    });
    
    // Display events for initial month
    function displayTimelineEvents(month) {
        timelineEventsContainer.innerHTML = '';
        
        if (timelineEvents[month]) {
            timelineEvents[month].forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'timeline-event';
                eventElement.setAttribute('data-event-id', event.id);
                
                eventElement.innerHTML = `
                    <div class="timeline-event-date">
                        <span class="timeline-event-day">${event.day}</span>
                        <span class="timeline-event-month">${event.month}</span>
                    </div>
                    <div class="timeline-event-content">
                        <div class="timeline-event-title">${event.title}</div>
                        <div class="timeline-event-time">
                            <i class="far fa-clock"></i>
                            <span>${event.time}</span>
                            <span class="badge bg-light text-primary ms-2">${event.type}</span>
                        </div>
                    </div>
                `;
                
                // Add click event to timeline events
                eventElement.addEventListener('click', function() {
                    const eventId = this.getAttribute('data-event-id');
                    if (eventDetails[eventId]) {
                        openEventModal(eventId);
                    } else {
                        openEventModal('event1');
                    }
                });
                
                timelineEventsContainer.appendChild(eventElement);
            });
        } else {
            timelineEventsContainer.innerHTML = `
                <div class="text-center py-4">
                    <p class="text-muted">No events scheduled for this month.</p>
                </div>
            `;
        }
    }
    
    // Initialize with first month
    displayTimelineEvents(months[0]);
    
    // Month navigation
    document.getElementById('prevMonth').addEventListener('click', function() {
        if (currentMonthIndex > 0) {
            currentMonthIndex--;
            updateActiveMonth();
        }
    });
    
    document.getElementById('nextMonth').addEventListener('click', function() {
        if (currentMonthIndex < months.length - 1) {
            currentMonthIndex++;
            updateActiveMonth();
        }
    });
    
    function updateActiveMonth() {
        const monthElements = document.querySelectorAll('.timeline-month');
        monthElements.forEach(m => m.classList.remove('active'));
        monthElements[currentMonthIndex].classList.add('active');
        displayTimelineEvents(months[currentMonthIndex]);
    }
    
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
    
    // Event registration buttons
    document.querySelectorAll('.btn-cta-glow').forEach(button => {
        button.addEventListener('click', function() {
            alert('Subscription form would open here. In production, this would connect to your email marketing system.');
        });
    });
});
