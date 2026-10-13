/**
 * PORTFOLIO EXPRESS - LUCAS FERNANDEZ
 * Lógica interactiva: Navegación móvil, desplazamiento suave, modal de contacto y notificaciones toast.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Elementos del DOM ---
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const currentYearSpan = document.getElementById('current-year');

  const btnContacto = document.getElementById('btn-contacto');
  const btnHeroContacto = document.getElementById('btn-hero-contacto');
  const contactModal = document.getElementById('contact-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');
  const projectActionBtns = document.querySelectorAll('.project-action-btn');

  // --- 2. Año actual dinámico en el footer ---
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --- 3. Menú móvil interactivo ---
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      toggleMobileMenu(!isOpen);
    });

    // Cerrar menú al hacer click en cualquier enlace de navegación
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          toggleMobileMenu(false);
        }
      });
    });

    // Cerrar si se hace click fuera del menú
    document.addEventListener('click', (event) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        toggleMobileMenu(false);
      }
    });
  }

  function toggleMobileMenu(open) {
    if (open) {
      navMenu.classList.add('open');
      navToggle.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
    } else {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }

  // --- 4. Sombra en Navbar al hacer scroll ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- 5. Enlace activo en navegación según la sección visible ---
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // --- 6. Modal de Contacto ---
  function openContactModal() {
    if (!contactModal) return;
    contactModal.classList.add('active');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Foco en el primer input
    const firstInput = document.getElementById('contact-name');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 150);
    }
  }

  function closeContactModal() {
    if (!contactModal) return;
    contactModal.classList.remove('active');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (btnContacto) {
    btnContacto.addEventListener('click', openContactModal);
  }

  if (btnHeroContacto) {
    btnHeroContacto.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal();
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeContactModal);
  }

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        closeContactModal();
      }
    });
  }

  // Cerrar modal con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal && contactModal.classList.contains('active')) {
      closeContactModal();
    }
  });

  // Envío del formulario de contacto
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('contact-name');
      const senderName = nameInput ? nameInput.value.trim() : 'amigo/a';

      showToast(`¡Gracias ${senderName}! Tu mensaje ha sido enviado. Lucas te responderá pronto. 🚀`);
      contactForm.reset();

      setTimeout(() => {
        closeContactModal();
      }, 700);
    });
  }

  // --- 7. Interacciones en botones de proyectos ---
  projectActionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const projectName = btn.getAttribute('data-project') || 'Proyecto';
      showToast(`⚡ Abriendo: ${projectName}`);
    });
  });

  // --- 8. Sistema de Notificaciones Toast ---
  let toastTimeout;
  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('active');

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastTimeout = setTimeout(() => {
      toast.classList.remove('active');
    }, 4000);
  }
});
