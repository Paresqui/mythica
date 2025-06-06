/**
 * MYTHIKA STUDIO - Projetos Animations
 * Animações GSAP otimizadas para a seção s-projetos
 * Animações habilitadas apenas no desktop para melhor performance
 */

class ProjetosAnimations {
  constructor() {
    this.resizeTimer = null;
    this.observer = null;
    this.hasAnimated = false;
    this.init();
  }

  /**
   * Detectar dispositivos móveis e tablets para otimização
   */
  isMobileDevice() {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 1024
    );
  }

  /**
   * Configurar Intersection Observer para trigger das animações
   */
  setupIntersectionObserver() {
    if (!window.IntersectionObserver) return;

    const options = {
      root: null,
      rootMargin: "0px 0px -100px 0px",
      threshold: 0.3,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.startAnimations();
          this.hasAnimated = true;
        }
      });
    }, options);

    const section = document.querySelector(".s-projetos");
    if (section) {
      this.observer.observe(section);
    }
  }

  /**
   * Configurar as animações da seção projetos
   */
  setupProjetosAnimations() {
    if (this.isMobileDevice()) {
      // Em dispositivos móveis, apenas garantir visibilidade sem animações
      gsap.set(
        [
          ".s-projetos__badge",
          ".s-projetos__title",
          ".s-projetos__subtitle",
          ".s-projetos__card",
          ".s-projetos__nav",
        ],
        {
          opacity: 1,
          transform: "none",
        }
      );
      return;
    }

    // Definir estados iniciais para desktop
    gsap.set(".s-projetos__badge", {
      opacity: 0,
      y: 30,
      scale: 0.8,
    });

    gsap.set(".s-projetos__title", {
      opacity: 0,
      y: 40,
      scale: 0.95,
    });

    gsap.set(".s-projetos__subtitle", {
      opacity: 0,
      y: 30,
    });

    gsap.set(".s-projetos__card", {
      opacity: 0,
      y: 50,
      scale: 0.9,
    });

    gsap.set(".s-projetos__nav", {
      opacity: 0,
      scale: 0.7,
      rotation: -90,
    });

    // Configurar Intersection Observer
    this.setupIntersectionObserver();
  }

  /**
   * Executar as animações quando a seção entrar em vista
   */
  startAnimations() {
    if (this.isMobileDevice()) return;

    const tl = gsap.timeline();

    // Animação do badge
    tl.to(".s-projetos__badge", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.2)",
    })

      // Animação do título principal
      .to(
        ".s-projetos__title",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      )

      // Animação do subtítulo
      .to(
        ".s-projetos__subtitle",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      )

      // Animação dos botões de navegação
      .to(
        ".s-projetos__nav",
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.3)",
          stagger: 0.2,
        },
        "-=0.4"
      )

      // Animação dos cards com stagger
      .to(
        ".s-projetos__card",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
        },
        "-=0.3"
      );

    // Configurar efeitos de hover nos cards
    this.setupCardHoverEffects();

    // Configurar animação de brilho nos botões
    this.setupNavButtonEffects();
  }

  /**
   * Efeitos de hover interativos nos cards
   */
  setupCardHoverEffects() {
    if (this.isMobileDevice()) return;

    const cards = document.querySelectorAll(".s-projetos__card");

    cards.forEach((card) => {
      const image = card.querySelector(".s-projetos__image");
      const title = card.querySelector(".s-projetos__card-title");

      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(image, {
          scale: 1.1,
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.to(title, {
          color: "#fff1da",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(image, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.to(title, {
          color: "#f0c75e",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }

  /**
   * Efeitos especiais nos botões de navegação
   */
  setupNavButtonEffects() {
    if (this.isMobileDevice()) return;

    const navButtons = document.querySelectorAll(".s-projetos__nav");

    navButtons.forEach((button, index) => {
      // Animação de brilho sutil contínua
      gsap.to(button, {
        boxShadow: "0 6px 25px rgba(240, 199, 94, 0.4)",
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: index * 1,
      });

      // Efeito de hover aprimorado
      button.addEventListener("mouseenter", () => {
        gsap.to(button, {
          scale: 1.15,
          rotation: index === 0 ? -10 : 10, // Rotação diferente para cada botão
          duration: 0.3,
          ease: "back.out(1.3)",
        });
      });

      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "back.out(1.3)",
        });
      });

      // Efeito de clique
      button.addEventListener("mousedown", () => {
        gsap.to(button, {
          scale: 0.95,
          duration: 0.1,
          ease: "power2.out",
        });
      });

      button.addEventListener("mouseup", () => {
        gsap.to(button, {
          scale: 1.15,
          duration: 0.1,
          ease: "power2.out",
        });
      });
    });
  }

  /**
   * Animação especial ao trocar de slide
   */
  animateSlideChange() {
    if (this.isMobileDevice()) return;

    const visibleCards = document.querySelectorAll(".s-projetos__card");

    // Pequena animação de "refresh" nos cards visíveis
    gsap.fromTo(
      visibleCards,
      {
        scale: 0.98,
        opacity: 0.8,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.1,
      }
    );
  }

  /**
   * Limpar todas as animações
   */
  killAllAnimations() {
    if (typeof gsap !== "undefined") {
      gsap.killTweensOf(".s-projetos *");
    }
  }

  /**
   * Reconfigurar animações em mudança de viewport
   */
  reconfigureAnimations() {
    this.killAllAnimations();
    this.hasAnimated = false;

    if (this.observer) {
      this.observer.disconnect();
    }

    this.setupProjetosAnimations();
  }

  /**
   * Handler para redimensionamento da janela
   */
  handleResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.reconfigureAnimations();
    }, 250);
  }

  /**
   * Inicializar sistema de animações
   */
  init() {
    // Aguardar DOM e GSAP estarem prontos
    const initWhenReady = () => {
      if (typeof gsap === "undefined") {
        setTimeout(initWhenReady, 100);
        return;
      }

      this.setupProjetosAnimations();

      // Listener para resize
      window.addEventListener("resize", () => this.handleResize());

      // Conectar com o carrossel se existir
      if (window.ProjetosCarousel) {
        this.connectWithCarousel();
      }

      console.log("🎨 Projetos Animations - Inicializado");
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initWhenReady);
    } else {
      initWhenReady();
    }
  }

  /**
   * Conectar animações com carrossel
   */
  connectWithCarousel() {
    // Hook para animar quando slides mudarem
    const originalUpdateCarousel = window.ProjetosCarousel.updateCarousel;

    if (originalUpdateCarousel) {
      window.ProjetosCarousel.updateCarousel = () => {
        originalUpdateCarousel.call(window.ProjetosCarousel);

        // Delay para sincronizar com a transição do carrossel
        setTimeout(() => {
          this.animateSlideChange();
        }, 200);
      };
    }
  }

  /**
   * Método público para forçar animação (útil para debug)
   */
  forceAnimate() {
    this.hasAnimated = false;
    this.startAnimations();
  }
}

// Inicializar as animações da seção projetos
const projetosAnimations = new ProjetosAnimations();

// Exportar para uso global se necessário
window.ProjetosAnimations = projetosAnimations;
