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
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !service || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

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

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        e.target.value = value;
    });
}

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

// Quote calculator (basic)
function calculateQuote() {
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    if (!service || !message) {
        showNotification('Please select a service and describe your project for a quote.', 'error');
        return;
    }
    
    // Basic quote estimates (in reality, this would be more sophisticated)
    const baseRates = {
        'general-repairs': 75,
        'electrical': 100,
        'plumbing': 90,
        'painting': 60,
        'furniture': 50,
        'custom': 120,
        'other': 80
    };
    
    const baseRate = baseRates[service] || 80;
    const complexity = message.length > 100 ? 1.5 : 1;
    const estimatedHours = Math.ceil(Math.random() * 4) + 1; // 1-5 hours
    const total = Math.round(baseRate * estimatedHours * complexity);
    
    const quoteMessage = `
        <strong>Estimated Quote:</strong><br>
        Service: ${document.querySelector(`option[value="${service}"]`).textContent}<br>
        Estimated Time: ${estimatedHours} hours<br>
        Estimated Cost: $${total} - $${total + 50}<br>
        <small>Final quote provided after on-site assessment</small>
    `;
    
    showNotification(quoteMessage, 'success');
}

// Add quote button to form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    const quoteBtn = document.createElement('button');
    quoteBtn.type = 'button';
    quoteBtn.className = 'btn btn-secondary';
    quoteBtn.textContent = 'Get Quick Quote';
    quoteBtn.style.marginLeft = '1rem';
    
    quoteBtn.addEventListener('click', calculateQuote);
    
    submitBtn.parentNode.appendChild(quoteBtn);
});

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
