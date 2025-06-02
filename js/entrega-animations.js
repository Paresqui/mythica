/**
 * MYTHIKA STUDIO - Entrega Animations
 * Animações GSAP otimizadas para a seção s-entrega
 * Animações habilitadas apenas no desktop para melhor performance
 */

class EntregaAnimations {
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

    const section = document.querySelector(".s-entrega");
    if (section) {
      this.observer.observe(section);
    }
  }

  /**
   * Configurar as animações da seção entrega
   */
  setupEntregaAnimations() {
    if (this.isMobileDevice()) {
      // Em dispositivos móveis, apenas garantir visibilidade sem animações
      gsap.set(
        [
          ".s-entrega__badge",
          ".s-entrega__title",
          ".s-entrega__intro",
          ".s-entrega__subtitle",
          ".s-entrega__item",
          ".s-entrega__final",
          ".s-entrega__illustration",
        ],
        {
          opacity: 1,
          transform: "none",
        }
      );
      return;
    }

    // Definir estados iniciais para desktop
    gsap.set(".s-entrega__badge", {
      opacity: 0,
      y: 20,
      scale: 0.9,
    });

    gsap.set(".s-entrega__title", {
      opacity: 0,
      y: 30,
    });

    gsap.set(".s-entrega__intro", {
      opacity: 0,
      y: 20,
    });

    gsap.set(".s-entrega__subtitle", {
      opacity: 0,
      y: 20,
    });

    gsap.set(".s-entrega__item", {
      opacity: 0,
      x: -30,
      y: 20,
    });

    gsap.set(".s-entrega__final", {
      opacity: 0,
      y: 20,
    });

    gsap.set(".s-entrega__illustration", {
      opacity: 0,
      scale: 0.8,
      y: 30,
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

    // Animação da ilustração (lado direito) - começa primeiro
    tl.to(".s-entrega__illustration", {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      ease: "back.out(1.2)",
    })

      // Animação do badge (início do conteúdo)
      .to(
        ".s-entrega__badge",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.1)",
        },
        "-=0.8"
      )

      // Animação do título principal
      .to(
        ".s-entrega__title",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      )

      // Animação do parágrafo introdutório
      .to(
        ".s-entrega__intro",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      )

      // Animação do subtítulo
      .to(
        ".s-entrega__subtitle",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      )

      // Animação dos itens da lista (stagger sequencial)
      .to(
        ".s-entrega__item",
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
        },
        "-=0.3"
      )

      // Animação do texto final
      .to(
        ".s-entrega__final",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.2"
      );

    // Adicionar animações sutis após completar
    tl.call(() => {
      this.setupFloatingAnimation();
    });
  }

  /**
   * Configurar animação de levitação sutil da ilustração
   */
  setupFloatingAnimation() {
    if (this.isMobileDevice()) return;

    gsap.to(".s-entrega__illustration", {
      y: -10,
      duration: 4,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.5,
    });

    // Animação sutil nos ícones ✨ dos itens
    gsap.to(".s-entrega__item::before", {
      scale: 1.1,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.3,
      delay: 1,
    });
  }

  /**
   * Configurar efeitos especiais nos itens da lista
   */
  setupItemHoverEffects() {
    if (this.isMobileDevice()) return;

    const items = document.querySelectorAll(".s-entrega__item");

    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          x: 5,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          x: 0,
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
      ".s-entrega__badge",
      ".s-entrega__title",
      ".s-entrega__intro",
      ".s-entrega__subtitle",
      ".s-entrega__item",
      ".s-entrega__final",
      ".s-entrega__illustration",
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
    this.setupEntregaAnimations();
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
      this.setupEntregaAnimations();
      this.setupItemHoverEffects();
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
const entregaAnimations = new EntregaAnimations();

// Exportar para uso global se necessário
window.EntregaAnimations = entregaAnimations;
