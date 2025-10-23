(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Hero Canvas Constellation ---------- */
  const canvas = document.getElementById("hero-canvas");
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let particles = [];
    let rafId = null;

    const config = {
      baseCount: 70,
      maxVelocity: 0.45,
      connectionDistance: 120,
    };

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = initial ? Math.random() * width : Math.random() < 0.1 ? Math.random() * width : this.x;
        this.y = initial ? Math.random() * height : Math.random() < 0.1 ? Math.random() * height : this.y;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.2 + Math.random() * config.maxVelocity;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.radius = 1 + Math.random();
        this.opacity = 0.4 + Math.random() * 0.6;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }
    }

    const resize = () => {
      width = canvas.clientWidth * dpr;
      height = canvas.clientHeight * dpr;
      canvas.width = width;
      canvas.height = height;
      ctx.scale(dpr, dpr);

      const displayCount = Math.floor(config.baseCount * (canvas.clientWidth / 1024 + 0.4));
      particles = Array.from({ length: displayCount }, () => new Particle());
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(124, 58, 237, 0.6)";

      particles.forEach((particle) => {
        particle.update();
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < config.connectionDistance) {
            const alpha = 0.3 * (1 - dist / config.connectionDistance);
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize, { passive: true });

    window.addEventListener(
      "beforeunload",
      () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      },
      { once: true }
    );
  } else if (canvas) {
    canvas.remove();
  }

  /* ---------- Scroll Reveal ---------- */
  const animatedElements = document.querySelectorAll("[data-animate]");
  if (animatedElements.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animatedElements.forEach((el) => observer.observe(el));
  }

  /* ---------- Tilt Interaction ---------- */
  const tiltElements = document.querySelectorAll("[data-tilt]");
  const isTouch = window.matchMedia("(hover: none)").matches;

  if (!isTouch) {
    tiltElements.forEach((el) => {
      const handlePointerMove = (event) => {
        const rect = el.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotationX = ((y - rect.height / 2) / rect.height) * -10;
        const rotationY = ((x - rect.width / 2) / rect.width) * 10;

        el.style.transform = `perspective(600px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) translateZ(12px)`;
        el.classList.add("is-hovered");
      };

      const reset = () => {
        el.style.transform = "";
        el.classList.remove("is-hovered");
      };

      el.addEventListener("pointermove", handlePointerMove);
      el.addEventListener("pointerleave", reset);
      el.addEventListener("pointerdown", reset);
    });
  }

  /* ---------- Navigation ---------- */
  const nav = document.querySelector(".nav");
  const heroSection = document.querySelector(".hero");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  const updateNavState = () => {
    if (!nav || !heroSection) return;
    const threshold = heroSection.offsetHeight * 0.2;
    if (window.scrollY > threshold) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }
  };

  updateNavState();
  window.addEventListener("scroll", updateNavState, { passive: true });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuToggle.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");
      })
    );

    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target)) {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");
      }
    });

    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth > 960) {
          navLinks.classList.remove("open");
          menuToggle.classList.remove("open");
        }
      },
      { passive: true }
    );
  }
})();
