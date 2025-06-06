// ===============================================
// BANNER SECTION ANIMATIONS
// ===============================================

// Banner Animation Controller
class BannerAnimations {
  constructor() {
    this.section = document.querySelector(".s-banner");
    this.elements = {
      left: this.section?.querySelector(".s-banner__left"),
      right: this.section?.querySelector(".s-banner__right"),
      title: this.section?.querySelector(".s-banner__title"),
      text: this.section?.querySelector(".s-banner__text"),
      cta: this.section?.querySelector(".s-banner__cta"),
      illustration: this.section?.querySelector(".s-banner__illustration"),
    };

    this.isAnimated = false;
    this.observer = null;

    this.init();
  }

  init() {
    if (!this.section) return;

    this.setupObserver();
    this.addHoverEffects();
  }

  setupObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.isAnimated) {
            this.animateEntrance();
            this.isAnimated = true;
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    this.observer.observe(this.section);
  }

  animateEntrance() {
    // Animate left side (illustration)
    if (this.elements.left) {
      setTimeout(() => {
        this.elements.left.classList.add("animate");
      }, 200);
    }

    // Animate right side content
    if (this.elements.right) {
      setTimeout(() => {
        this.elements.right.classList.add("animate");
      }, 400);
    }

    // Animate title
    if (this.elements.title) {
      setTimeout(() => {
        this.elements.title.classList.add("animate");
      }, 600);
    }

    // Animate text
    if (this.elements.text) {
      setTimeout(() => {
        this.elements.text.classList.add("animate");
      }, 800);
    }

    // Animate CTA button
    if (this.elements.cta) {
      setTimeout(() => {
        this.elements.cta.classList.add("animate");
        this.addButtonSparkle();
      }, 1000);
    }
  }

  addHoverEffects() {
    // Illustration hover effect
    if (this.elements.illustration) {
      this.elements.illustration.addEventListener("mouseenter", () => {
        this.elements.illustration.style.transform = "scale(1.05)";
      });

      this.elements.illustration.addEventListener("mouseleave", () => {
        this.elements.illustration.style.transform = "scale(1)";
      });
    }

    // CTA button enhanced hover effects
    if (this.elements.cta) {
      this.elements.cta.addEventListener("mouseenter", () => {
        this.createButtonRipple();
      });
    }
  }

  addButtonSparkle() {
    if (!this.elements.cta) return;

    // Create sparkle effect around the button
    const sparkles = [];
    for (let i = 0; i < 5; i++) {
      const sparkle = document.createElement("div");
      sparkle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #f0c75e;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        animation: sparkle 2s infinite;
        animation-delay: ${i * 0.2}s;
      `;

      // Random position around button
      const angle = (i / 5) * Math.PI * 2;
      const radius = 60;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      sparkle.style.left = `calc(50% + ${x}px)`;
      sparkle.style.top = `calc(50% + ${y}px)`;

      this.elements.cta.style.position = "relative";
      this.elements.cta.appendChild(sparkle);
      sparkles.push(sparkle);
    }

    // Remove sparkles after animation
    setTimeout(() => {
      sparkles.forEach((sparkle) => sparkle.remove());
    }, 4000);
  }

  createButtonRipple() {
    if (!this.elements.cta) return;

    const ripple = document.createElement("div");
    ripple.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;

    this.elements.cta.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Clean up method
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// CSS Animations (injected dynamically)
const bannerAnimationStyles = `
  @keyframes sparkle {
    0%, 100% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes ripple {
    0% {
      width: 20px;
      height: 20px;
      opacity: 0.5;
    }
    100% {
      width: 60px;
      height: 60px;
      opacity: 0;
    }
  }
`;

// Inject styles
const styleSheet = document.createElement("style");
styleSheet.textContent = bannerAnimationStyles;
document.head.appendChild(styleSheet);

// Initialize Banner Animations when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new BannerAnimations();
});

// Export for potential external use
if (typeof module !== "undefined" && module.exports) {
  module.exports = BannerAnimations;
}
