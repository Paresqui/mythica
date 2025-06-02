/**
 * MYTHIKA STUDIO - Serviços Animations
 * Animações GSAP otimizadas para a seção s-servicos
 * Animações habilitadas apenas no desktop para melhor performance
 */

class ServicosAnimations {
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
      threshold: 0.2,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.startAnimations();
          this.hasAnimated = true;
        }
      });
    }, options);

    const section = document.querySelector(".s-servicos");
    if (section) {
      this.observer.observe(section);
    }
  }

  /**
   * Configurar as animações da seção serviços
   */
  setupServicosAnimations() {
    if (this.isMobileDevice()) {
      // Em dispositivos móveis, apenas garantir visibilidade sem animações
      gsap.set(
        [
          ".s-servicos__badge",
          ".s-servicos__title",
          ".s-servicos__subtitle",
          ".s-servicos__card",
          ".s-servicos__cta",
        ],
        {
          opacity: 1,
          transform: "none",
        }
      );
      return;
    }

    // Definir estados iniciais para desktop
    gsap.set(".s-servicos__badge", {
      opacity: 0,
      y: 30,
      scale: 0.9,
    });

    gsap.set(".s-servicos__title", {
      opacity: 0,
      y: 30,
    });

    gsap.set(".s-servicos__subtitle", {
      opacity: 0,
      y: 20,
    });

    gsap.set(".s-servicos__card", {
      opacity: 0,
      y: 40,
      scale: 0.95,
    });

    gsap.set(".s-servicos__cta", {
      opacity: 0,
      y: 30,
      scale: 0.9,
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

    // Animação do badge (início)
    tl.to(".s-servicos__badge", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.2)",
    })

      // Animação do título principal
      .to(
        ".s-servicos__title",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      )

      // Animação do subtítulo
      .to(
        ".s-servicos__subtitle",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      )

      // Animação dos cards (stagger para entrada sequencial)
      .to(
        ".s-servicos__card",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.1)",
          stagger: 0.2,
        },
        "-=0.3"
      )

      // Animação do CTA (finalização)
      .to(
        ".s-servicos__cta",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
        },
        "-=0.2"
      );

    // Adicionar animações sutis após completar
    tl.call(() => {
      this.setupFloatingIcons();
    });
  }

  /**
   * Configurar animações sutis contínuas nos ícones
   */
  setupFloatingIcons() {
    if (this.isMobileDevice()) return;

    // Animação de "respiração" nos ícones
    gsap.to(".s-servicos__icon", {
      scale: 1.05,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: {
        amount: 1,
        from: "start",
      },
      delay: 0.5,
    });

    // Efeito de brilho sutil nos cards
    gsap.to(".s-servicos__card", {
      boxShadow: "0 8px 25px rgba(240, 199, 94, 0.15)",
      duration: 4,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
      delay: 1,
    });
  }

  /**
   * Configurar hover especial para cards (usado apenas no desktop)
   */
  setupCardHoverEffects() {
    if (this.isMobileDevice()) return;

    const cards = document.querySelectorAll(".s-servicos__card");

    cards.forEach((card) => {
      const icon = card.querySelector(".s-servicos__icon");

      card.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          rotation: 5,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }

  /**
   * Limpar todas as animações
   */
  killAllAnimations() {
    gsap.killTweensOf([
      ".s-servicos__badge",
      ".s-servicos__title",
      ".s-servicos__subtitle",
      ".s-servicos__card",
      ".s-servicos__cta",
      ".s-servicos__icon",
    ]);
  }

  /**
   * Resetar e reconfigurar animações
   */
  reconfigureAnimations() {
    this.killAllAnimations();

    // Desconectar observer anterior
    if (this.observer) {
      this.observer.disconnect();
    }

    // Resetar flag de animação
    this.hasAnimated = false;

    // Reconfigurar
    this.setupServicosAnimations();
  }

  /**
   * Handler para redimensionamento de janela
   */
  handleResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.reconfigureAnimations();
    }, 300);
  }

  /**
   * Inicializar todas as animações e event listeners
   */
  init() {
    // Aguardar DOM e GSAP estarem prontos
    const initWhenReady = () => {
      if (typeof gsap === "undefined") {
        setTimeout(initWhenReady, 100);
        return;
      }
      this.setupServicosAnimations();
      this.setupCardHoverEffects();
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initWhenReady);
    } else {
      initWhenReady();
    }

    // Listener para resize
    window.addEventListener("resize", () => {
      this.handleResize();
    });
  }

  /**
   * Método público para forçar animação (útil para debug)
   */
  forceAnimate() {
    if (!this.hasAnimated) {
      this.startAnimations();
      this.hasAnimated = true;
    }
  }
}

// Instanciar a classe quando o script for carregado
const servicosAnimations = new ServicosAnimations();

// Exportar para uso global se necessário
window.ServicosAnimations = servicosAnimations;
