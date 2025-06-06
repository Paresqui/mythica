/**
 * MYTHIKA STUDIO - Quem Somos Animations
 * Animações GSAP otimizadas para a seção s-quemsomos
 * Animações habilitadas apenas no desktop para melhor performance
 */

class QuemSomosAnimations {
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

    const section = document.querySelector(".s-quemsomos");
    if (section) {
      this.observer.observe(section);
    }
  }

  /**
   * Configurar as animações da seção quem somos
   */
  setupQuemSomosAnimations() {
    if (this.isMobileDevice()) {
      // Em dispositivos móveis, apenas garantir visibilidade sem animações
      gsap.set(
        [
          ".s-quemsomos__illustration",
          ".s-quemsomos__badge",
          ".s-quemsomos__title--primary",
          ".s-quemsomos__title--highlight",
          ".s-quemsomos__text p",
          ".s-quemsomos__cta",
        ],
        {
          opacity: 1,
          transform: "none",
        }
      );
      return;
    }

    // Definir estados iniciais para desktop
    gsap.set(".s-quemsomos__illustration", {
      opacity: 0,
      scale: 0.8,
      y: 30,
    });

    gsap.set(".s-quemsomos__badge", {
      opacity: 0,
      y: 20,
      scale: 0.9,
    });

    gsap.set(".s-quemsomos__title--primary", {
      opacity: 0,
      y: 30,
    });

    gsap.set(".s-quemsomos__title--highlight", {
      opacity: 0,
      y: 30,
    });

    gsap.set(".s-quemsomos__text p", {
      opacity: 0,
      y: 20,
    });

    gsap.set(".s-quemsomos__cta", {
      opacity: 0,
      y: 20,
      scale: 0.95,
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

    // Animação da ilustração (lado esquerdo)
    tl.to(".s-quemsomos__illustration", {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      ease: "back.out(1.2)",
    })

      // Animação do badge (início suave)
      .to(
        ".s-quemsomos__badge",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.8"
      )

      // Animação do título - primeira parte
      .to(
        ".s-quemsomos__title--primary",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      )

      // Animação do título - segunda parte (highlight)
      .to(
        ".s-quemsomos__title--highlight",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      )

      // Animação dos parágrafos (stagger para entrada sequencial)
      .to(
        ".s-quemsomos__text p",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
        },
        "-=0.3"
      )

      // Animação do CTA (finalização)
      .to(
        ".s-quemsomos__cta",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.1)",
        },
        "-=0.2"
      );

    // Adicionar animação sutil de levitação na ilustração após completar
    tl.call(() => {
      this.setupFloatingAnimation();
    });
  }

  /**
   * Configurar animação de levitação sutil da ilustração
   */
  setupFloatingAnimation() {
    if (this.isMobileDevice()) return;

    gsap.to(".s-quemsomos__illustration", {
      y: -8,
      duration: 4,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 0.5,
    });
  }

  /**
   * Limpar todas as animações
   */
  killAllAnimations() {
    gsap.killTweensOf([
      ".s-quemsomos__illustration",
      ".s-quemsomos__badge",
      ".s-quemsomos__title--primary",
      ".s-quemsomos__title--highlight",
      ".s-quemsomos__text p",
      ".s-quemsomos__cta",
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
    this.setupQuemSomosAnimations();
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
      this.setupQuemSomosAnimations();
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
const quemSomosAnimations = new QuemSomosAnimations();

// Exportar para uso global se necessário
window.QuemSomosAnimations = quemSomosAnimations;
