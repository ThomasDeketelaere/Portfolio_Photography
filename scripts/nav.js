// nav.js
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const nav = document.querySelector('nav');

  if (!nav) return;

  // --- Mobile Menu Toggle ---
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // --- Navbar Hide/Show on Scroll ---
  let lastScrollY = window.scrollY;
  let ticking = false;
  let hasScrolledUp = false; // track first upward scroll
  let inactivityTimer;

  // start hidden
  nav.classList.add('translate-y-[-100%]', 'opacity-0');

  function showNav() {
    nav.classList.remove('translate-y-[-100%]', 'opacity-0');
    nav.classList.add('translate-y-0', 'opacity-100');
  }

  function hideNav() {
    nav.classList.add('translate-y-[-100%]', 'opacity-0');
    nav.classList.remove('translate-y-0', 'opacity-100');
  }

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      hideNav();
    }, 5000); // 5 seconds
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (!hasScrolledUp) {
          // only show on first upward scroll
          if (currentScrollY < lastScrollY) {
            hasScrolledUp = true;
            showNav();
            resetInactivityTimer();
          }
        } else {
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // scrolling down → hide navbar
            hideNav();
          } else {
            // scrolling up → show navbar
            showNav();
            resetInactivityTimer();
          }
        }

        // --- Always close mobile menu on scroll ---
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }

        // keep smooth transition always
        nav.classList.add('transition-all', 'duration-500', 'ease-in-out');

        lastScrollY = currentScrollY;
        ticking = false;
      });

      ticking = true;
    }
  });

  // Reset inactivity timer on interactions
  ['mousemove', 'keydown', 'touchstart'].forEach(evt => {
    document.addEventListener(evt, () => {
      if (hasScrolledUp) {
        showNav();
        resetInactivityTimer();
      }
    });
  });
});
