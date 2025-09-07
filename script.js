// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(248, 231, 28, 0.1)';
        navbar.style.borderBottom = '1px solid rgba(248, 231, 28, 0.2)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottom = '1px solid rgba(248, 231, 28, 0.1)';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // EmailJS parameters
    const templateParams = {
        from_email: email,
        message: message,
        to_email: 'troubleshootandfixhandyman@gmail.com'
    };
    
    // Send email using EmailJS - Updated template ID
    emailjs.send('service_j74lhje', 'template_qen7pf9', templateParams)
        .then(function(response) {
            showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Track form submission success
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'Contact',
                    'event_label': 'Contact Form',
                    'value': 1
                });
            }
        }, function(error) {
            console.error('EmailJS Error:', error);
            showNotification('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});

// Email Modal System
function showEmailModal(emailContent) {
    // Remove existing modal
    const existingModal = document.querySelector('.email-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'email-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Email Content Ready</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Copy the content below and paste it into your email app:</p>
                    <textarea readonly class="email-textarea">${emailContent}</textarea>
                    <div class="modal-buttons">
                        <button class="btn btn-primary copy-btn">Copy to Clipboard</button>
                        <button class="btn btn-secondary close-btn">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const overlay = modal.querySelector('.modal-overlay');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        background: white;
        border-radius: 10px;
        max-width: 600px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    const header = modal.querySelector('.modal-header');
    header.style.cssText = `
        padding: 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    const body = modal.querySelector('.modal-body');
    body.style.cssText = `
        padding: 20px;
    `;
    
    const textarea = modal.querySelector('.email-textarea');
    textarea.style.cssText = `
        width: 100%;
        height: 200px;
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-family: monospace;
        font-size: 14px;
        resize: vertical;
        margin: 15px 0;
    `;
    
    const buttons = modal.querySelector('.modal-buttons');
    buttons.style.cssText = `
        display: flex;
        gap: 10px;
        justify-content: flex-end;
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    `;
    
    // Add event listeners
    closeBtn.addEventListener('click', () => modal.remove());
    modal.querySelector('.close-btn').addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) modal.remove();
    });
    
    modal.querySelector('.copy-btn').addEventListener('click', () => {
        textarea.select();
        document.execCommand('copy');
        showNotification('Email content copied to clipboard!', 'success');
    });
    
    // Add to page
    document.body.appendChild(modal);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .feature, .stat');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Phone number formatting removed - no longer needed

// Service area information
function showServiceArea() {
    const serviceAreas = [
        'Seattle',
        'Bellevue',
        'Redmond',
        'Kirkland',
        'Bothell',
        'Shoreline',
        'Edmonds',
        'Lynnwood',
        'Mountlake Terrace',
        'Kenmore'
    ];
    
    showNotification(`We serve: ${serviceAreas.join(', ')} and surrounding areas!`, 'info');
}

// Add click event to service area contact item
document.addEventListener('DOMContentLoaded', () => {
    const serviceAreaItem = document.querySelector('.contact-item:nth-child(3)');
    if (serviceAreaItem) {
        serviceAreaItem.style.cursor = 'pointer';
        serviceAreaItem.addEventListener('click', showServiceArea);
    }
});

// Emergency contact functionality
function showEmergencyContact() {
    const emergencyMessage = `
        <strong>Emergency Service Available!</strong><br>
        For urgent repairs outside business hours, call:<br>
        <a href="tel:+12065551234" style="color: #fbbf24; font-weight: bold;">(206) 555-1234</a><br>
        <small>Additional charges may apply for emergency services</small>
    `;
    
    showNotification(emergencyMessage, 'info');
}

// Add emergency contact info to hours section
document.addEventListener('DOMContentLoaded', () => {
    const hoursItem = document.querySelector('.contact-item:nth-child(4)');
    if (hoursItem) {
        hoursItem.style.cursor = 'pointer';
        hoursItem.addEventListener('click', showEmergencyContact);
    }
});

// Quote calculator removed - no longer needed

// Quote button removed - no longer needed

// Add loading states and better UX
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.type === 'submit') return; // Skip for form submit
            
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 1000);
        });
    });
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #2563eb';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});
