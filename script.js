document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("nav-active");
      // Toggle body scroll
      if (navLinks.classList.contains("nav-active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Close menu when clicking a link
    const links = navLinks.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("nav-active");
        document.body.style.overflow = "";
      });
    });
  }

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll(".reveal");
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach((el) => {
    revealOnScroll.observe(el);
  });

  // Custom Cursor Glowing effect (subtle interaction)
  const initCursorGlow = () => {
    const ambientGlow = document.querySelector(".ambient-glow");
    if (!ambientGlow) return;

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateGlow = () => {
      // Smoothly interpolate glow position
      glowX += (mouseX - glowX) * 0.05;
      glowY += (mouseY - glowY) * 0.05;

      // Limit movement so it mostly stays roughly centered but drifts toward cursor
      const maxOffset = 150;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      let dx = glowX - centerX;
      let dy = glowY - centerY;

      // Normalize constraint
      const length = Math.sqrt(dx * dx + dy * dy);
      if (length > maxOffset) {
        dx = (dx / length) * maxOffset;
        dy = (dy / length) * maxOffset;
      }

      ambientGlow.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1.1)`;
      requestAnimationFrame(animateGlow);
    };

    animateGlow();
  };

  // Only run cursor effect on non-touch devices
  if (window.matchMedia("(pointer: fine)").matches) {
    initCursorGlow();
  }
});
