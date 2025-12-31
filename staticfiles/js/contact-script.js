
    // // Navbar scroll effect
    // window.addEventListener('scroll', function() {
    //     const navbar = document.querySelector('.navbar');
    //     if (window.scrollY > 50) {
    //         navbar.classList.add('scrolled');
    //     } else {
    //         navbar.classList.remove('scrolled');
    //     }
    // });
    
    // // Contact Form Functionality
    // document.addEventListener('DOMContentLoaded', function() {
    //     const contactForm = document.getElementById('contactForm');
    //     const submitBtn = document.getElementById('submitBtn');
    //     const submitText = document.getElementById('submitText');
    //     const submitSpinner = document.getElementById('submitSpinner');
    //     const successModal = document.getElementById('successModal');
    //     const closeSuccessModal = document.getElementById('closeSuccessModal');
        
    //     // Form submission
    //     contactForm.addEventListener('submit', function (e) {
    //         e.preventDefault();
        
    //         if (!contactForm.checkValidity()) {
    //             contactForm.classList.add('was-validated');
    //             return;
    //         }
        
    //         submitBtn.disabled = true;
    //         submitText.textContent = 'Sending...';
    //         submitSpinner.classList.remove('d-none');
        
    //         const formData = new FormData(contactForm);
        
    //         fetch(contactForm.action, {
    //             method: "POST",
    //             body: formData,
    //             headers: {
    //                 "X-Requested-With": "XMLHttpRequest"
    //             }
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //             submitBtn.disabled = false;
    //             submitText.textContent = 'Submit Inquiry';
    //             submitSpinner.classList.add('d-none');
        
    //             if (data.success) {
    //               // Show SUCCESS modal
    //         successModal.classList.add('active');
    //         document.body.style.overflow = 'hidden';

    //         // Reset form
    //         contactForm.reset();
    //         contactForm.classList.remove('was-validated');
    //         document.getElementById('formError').classList.add('d-none');
    //             } else {
    //                 let errorMsg = "Please correct the errors below.";
    //                 document.getElementById('formError').textContent = errorMsg;
    //                 document.getElementById('formError').classList.remove('d-none');
    //             }
    //         })
    //         .catch(() => {
    //             submitBtn.disabled = false;
    //             submitText.textContent = 'Submit Inquiry';
    //             submitSpinner.classList.add('d-none');
        
    //             document.getElementById('formError').textContent =
    //                 "Something went wrong. Please try again.";
    //             document.getElementById('formError').classList.remove('d-none');
    //         });
    //     });
        
        
    //     // Close success modal
    //     closeSuccessModal.addEventListener('click', function() {
    //         successModal.classList.remove('active');
    //         document.body.style.overflow = 'auto';
    //     });
        
    //     // Close modal when clicking outside
    //     successModal.addEventListener('click', function(e) {
    //         if (e.target === successModal) {
    //             successModal.classList.remove('active');
    //             document.body.style.overflow = 'auto';
    //         }
    //     });
        
    //     // Close modal with Escape key
    //     document.addEventListener('keydown', function(e) {
    //         if (e.key === 'Escape' && successModal.classList.contains('active')) {
    //             successModal.classList.remove('active');
    //             document.body.style.overflow = 'auto';
    //         }
    //     });
        
    //     // FAQ Toggle Functionality
    //     const faqQuestions = document.querySelectorAll('.faq-question');
        
    //     faqQuestions.forEach(question => {
    //         question.addEventListener('click', function() {
    //             const answer = this.nextElementSibling;
    //             const toggle = this.querySelector('.faq-toggle');
                
    //             // Close all other FAQs
    //             faqQuestions.forEach(otherQuestion => {
    //                 if (otherQuestion !== this) {
    //                     otherQuestion.classList.remove('active');
    //                     otherQuestion.nextElementSibling.classList.remove('open');
    //                 }
    //             });
                
    //             // Toggle current FAQ
    //             this.classList.toggle('active');
    //             answer.classList.toggle('open');
    //         });
    //     });
        
    //     // Animation on scroll
    //     function animateOnScroll() {
    //         const elements = document.querySelectorAll('.fade-in-up, .stagger-item');
            
    //         elements.forEach(element => {
    //             const elementTop = element.getBoundingClientRect().top;
    //             const windowHeight = window.innerHeight;
                
    //             if (elementTop < windowHeight - 100) {
    //                 element.classList.add('visible');
    //             }
    //         });
    //     }
        
    //     // Stagger animation for cards
    //     function staggerAnimation() {
    //         const staggerItems = document.querySelectorAll('.stagger-item');
    //         staggerItems.forEach((item, index) => {
    //             item.style.transitionDelay = `${index * 0.1}s`;
    //         });
    //     }
        
    //     // Initialize
    //     animateOnScroll();
    //     staggerAnimation();
        
    //     if (window.scrollY > 50) {
    //         document.querySelector('.navbar').classList.add('scrolled');
    //     }
        
    //     window.addEventListener('scroll', animateOnScroll);
        
    //     // Smooth scroll
    //     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //         anchor.addEventListener('click', function(e) {
    //             e.preventDefault();
                
    //             const targetId = this.getAttribute('href');
    //             if (targetId === '#') return;
                
    //             const targetElement = document.querySelector(targetId);
    //             if (targetElement) {
    //                 window.scrollTo({
    //                     top: targetElement.offsetTop - 140,
    //                     behavior: 'smooth'
    //                 });
    //             }
    //         });
    //     });
    // });


    // Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    const successModal = document.getElementById('successModal');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    
    // Clear previous error states on input
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                this.classList.remove('is-invalid');
                const feedback = this.nextElementSibling;
                if (feedback && feedback.classList.contains('invalid-feedback')) {
                    feedback.textContent = '';
                }
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
    
        // Reset all error states
        const invalidElements = contactForm.querySelectorAll('.is-invalid');
        invalidElements.forEach(el => {
            el.classList.remove('is-invalid');
            const feedback = el.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.textContent = '';
            }
        });
    
        submitBtn.disabled = true;
        submitText.textContent = 'Sending...';
        submitSpinner.classList.remove('d-none');
    
        const formData = new FormData(contactForm);
    
        fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        })
        .then(response => response.json())
        .then(data => {
            submitBtn.disabled = false;
            submitText.textContent = 'Submit Inquiry';
            submitSpinner.classList.add('d-none');
    
            if (data.success) {
                // Show SUCCESS modal
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
    
                // Reset form
                contactForm.reset();
            } else {
                // Display field-specific errors
                if (data.errors) {
                    Object.keys(data.errors).forEach(fieldName => {
                        const field = document.querySelector(`[name="${fieldName}"]`);
                        if (field) {
                            field.classList.add('is-invalid');
                            const feedback = field.nextElementSibling;
                            if (feedback && feedback.classList.contains('invalid-feedback')) {
                                feedback.textContent = data.errors[fieldName][0];
                            }
                        }
                    });
                    
                    // Special handling for checkbox
                    if (data.errors.privacy_policy) {
                        const privacyCheckbox = document.getElementById('privacyPolicy');
                        const formCheck = privacyCheckbox.closest('.form-check');
                        if (formCheck) {
                            const feedback = formCheck.querySelector('.invalid-feedback');
                            if (feedback) {
                                feedback.textContent = data.errors.privacy_policy[0];
                            }
                        }
                    }
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            submitBtn.disabled = false;
            submitText.textContent = 'Submit Inquiry';
            submitSpinner.classList.add('d-none');
    
            // alert("Something went wrong. Please try again.");
        });
    });
    
    // Rest of your existing JavaScript remains the same...
    // Close success modal
    closeSuccessModal.addEventListener('click', function() {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successModal.classList.contains('active')) {
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // FAQ Toggle Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const toggle = this.querySelector('.faq-toggle');
            
            // Close all other FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.classList.remove('open');
                }
            });
            
            // Toggle current FAQ
            this.classList.toggle('active');
            answer.classList.toggle('open');
        });
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
});
