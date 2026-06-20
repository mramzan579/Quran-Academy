/* =========================================
   REUSABLE QURAN ACADEMY TEMPLATE JS (DEMO)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // 2. Scroll Animations (Intersection Observer)
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  animatedElements.forEach(el => scrollObserver.observe(el));

  // 3. Counter Animations
  const counters = document.querySelectorAll('.counter-value');
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16); 
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            entry.target.innerText = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.innerText = target;
          }
        };
        updateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => counterObserver.observe(counter));

  // 4. Modal System (Trial Booking)
  const modals = document.querySelectorAll('.modal-overlay');
  const modalTriggers = document.querySelectorAll('.trigger-modal');
  const closeBtns = document.querySelectorAll('.modal-close');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetModal = document.getElementById(trigger.getAttribute('data-modal-target') || 'trialModal');
      if (targetModal) targetModal.classList.add('active');
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay').classList.remove('active');
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // 5. Exit Intent Popup
  let exitIntentTriggered = false;
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 0 && !exitIntentTriggered) {
      exitIntentTriggered = true;
      const exitModal = document.getElementById('exitModal');
      if (exitModal) exitModal.classList.add('active');
    }
  });

  // 6. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // 7. Form Validation & Demo Success Behavior
  const forms = document.querySelectorAll('form');
  const successModal = document.getElementById('successModal');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'red';
        } else {
          field.style.borderColor = 'var(--border)';
        }
      });

      if (isValid) {
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'Processing...';
        btn.disabled = true;
        
        // Simulate network request for the demo
        setTimeout(() => {
          btn.innerText = originalText;
          btn.disabled = false;
          
          // Close any open modals
          modals.forEach(m => m.classList.remove('active'));
          
          // Reset form
          form.reset();
          
          // Show Demo Success Modal
          if (successModal) successModal.classList.add('active');
        }, 800);
      }
    });
  });

});
