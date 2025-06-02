/**
 * MYTHIKA STUDIO - Main Scripts
 * Scripts principais do site (menu mobile, etc.)
 */

class MythikaScripts {
  constructor() {
    this.init();
  }

  /**
   * Inicializar menu mobile
   */
  initMobileMenu() {
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileMenuClose = document.getElementById("mobileMenuClose");
    const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
    const mobileMenuLinks = document.querySelectorAll(".mobile-menu__link");

    if (!mobileMenuToggle || !mobileMenu) return;

    // Abrir menu mobile
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.add("mobile-menu--active");
      document.body.style.overflow = "hidden";
    });

    // Função para fechar menu mobile
    const closeMobileMenu = () => {
      mobileMenu.classList.remove("mobile-menu--active");
      document.body.style.overflow = "";
    };

    // Event listeners para fechar menu
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener("click", closeMobileMenu);
    }

    if (mobileMenuOverlay) {
      mobileMenuOverlay.addEventListener("click", closeMobileMenu);
    }

    // Fechar menu ao clicar em um link
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  /**
   * Inicializar banner (se existir)
   */
  initBanner() {
    const closeBanner = document.querySelector(".close-banner");
    if (closeBanner) {
      closeBanner.addEventListener("click", () => {
        const banner = document.querySelector(".top-banner");
        if (banner) {
          banner.style.display = "none";
        }
      });
    }
  }

  /**
   * Inicializar AOS (se não estiver sendo usado para o hero)
   */
  initAOS() {
    if (typeof AOS !== "undefined") {
      // Configuração comentada para economia de performance
      // AOS.init({
      //   duration: 1000,
      //   disable: "mobile"
      // });
    }
  }

  /**
   * Smooth scroll para navegação
   */
  initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          const offsetTop = target.offsetTop - 80; // Ajustar para altura do header

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  }

  /**
   * Lazy loading para imagens (se necessário)
   */
  initLazyLoading() {
    if ("loading" in HTMLImageElement.prototype) {
      // Browser suporta lazy loading nativo
      const images = document.querySelectorAll("img[data-src]");
      images.forEach((img) => {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
      });
    } else {
      // Fallback para browsers mais antigos
      // Implementar Intersection Observer se necessário
    }
  }

  /**
   * Inicializar todos os scripts
   */
  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.initMobileMenu();
      this.initBanner();
      this.initAOS();
      this.initSmoothScroll();
      this.initLazyLoading();

      console.log("🚀 Mythika Scripts - Inicializados com sucesso");
    });
  }
}

// Instanciar a classe
const mythikaScripts = new MythikaScripts();
