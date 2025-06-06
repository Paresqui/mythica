/**
 * MYTHIKA STUDIO - Processos Animations
 * Animações GSAP otimizadas para a seção s-processos
 * Animações habilitadas apenas no desktop para melhor performance
 */

class ProcessosAnimations {
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

    const section = document.querySelector(".s-processos");
    if (section) {
      this.observer.observe(section);
    }
  }

  /**
   * Configurar as animações da seção processos
   */
  setupProcessosAnimations() {
    if (this.isMobileDevice()) {
      // Em dispositivos móveis, apenas garantir visibilidade sem animações
      gsap.set(
        [
          ".s-processos__title",
          ".s-processos__step",
          ".s-processos__illustration",
        ],
        {
          opacity: 1,
          transform: "none",
        }
      );
      return;
    }

    // Definir estados iniciais para desktop
    gsap.set(".s-processos__title", {
      opacity: 0,
      y: 40,
      scale: 0.95,
    });

    gsap.set(".s-processos__step", {
      opacity: 0,
      x: -50,
      y: 30,
    });

    gsap.set(".s-processos__step-icon", {
      scale: 0.5,
      rotation: -45,
    });

    gsap.set(".s-processos__step-title", {
      opacity: 0,
      y: 20,
    });

    gsap.set(".s-processos__step-description", {
      opacity: 0,
      y: 15,
    });

    gsap.set(".s-processos__illustration", {
      opacity: 0,
      scale: 0.7,
      y: 50,
      rotation: -5,
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

    // Animação da ilustração (lado esquerdo) - entrada mágica
    tl.to(".s-processos__illustration", {
      opacity: 1,
      scale: 1,
      y: 0,
      rotation: 0,
      duration: 1.4,
      ease: "back.out(1.3)",
    })

      // Animação do título principal com efeito mágico
      .to(
        ".s-processos__title",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      )

      // Animação sequencial dos steps com stagger
      .to(
        ".s-processos__step",
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=0.5"
      )

      // Animação dos ícones com rotação mágica
      .to(
        ".s-processos__step-icon",
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.2)",
          stagger: 0.2,
        },
        "-=1.2"
      )

      // Animação dos títulos dos steps
      .to(
        ".s-processos__step-title",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=1"
      )

      // Animação das descrições dos steps
      .to(
        ".s-processos__step-description",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=0.8"
      );

    // Adicionar animação flutuante contínua para a ilustração
    this.setupFloatingAnimation();

    // Configurar efeitos de hover nos steps
    this.setupStepHoverEffects();
  }

  /**
   * Animação flutuante contínua para a ilustração
   */
  setupFloatingAnimation() {
    if (this.isMobileDevice()) return;

    const illustration = document.querySelector(".s-processos__illustration");
    if (illustration) {
      gsap.to(illustration, {
        y: "-=15",
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Animação sutil de rotação
      gsap.to(illustration, {
        rotation: "+=2",
        duration: 6,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }

  /**
   * Efeitos de hover interativos nos steps
   */
  setupStepHoverEffects() {
    if (this.isMobileDevice()) return;

    const steps = document.querySelectorAll(".s-processos__step");

    steps.forEach((step, index) => {
      const icon = step.querySelector(".s-processos__step-icon");
      const title = step.querySelector(".s-processos__step-title");

      step.addEventListener("mouseenter", () => {
        gsap.to(step, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(icon, {
          scale: 1.1,
          rotation: "+=15",
          duration: 0.3,
          ease: "back.out(1.2)",
        });

        gsap.to(title, {
          color: "#fff1da",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      step.addEventListener("mouseleave", () => {
        gsap.to(step, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(icon, {
          scale: 1,
          rotation: "-=15",
          duration: 0.3,
          ease: "back.out(1.2)",
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
   * Animação especial para os ícones com brilho mágico
   */
  setupIconShineEffect() {
    if (this.isMobileDevice()) return;

    const icons = document.querySelectorAll(".s-processos__step-icon");

    icons.forEach((icon, index) => {
      // Criar timeline para efeito de brilho sequencial
      const shineTl = gsap.timeline({ repeat: -1, delay: index * 0.5 });

      shineTl
        .to(icon, {
          boxShadow: "0 4px 25px rgba(240, 199, 94, 0.6)",
          duration: 0.5,
          ease: "power2.out",
        })
        .to(icon, {
          boxShadow: "0 4px 15px rgba(240, 199, 94, 0.3)",
          duration: 0.5,
          ease: "power2.out",
        })
        .to({}, { duration: 2 }); // Pausa entre brilhos
    });
  }

  /**
   * Limpar todas as animações
   */
  killAllAnimations() {
    if (typeof gsap !== "undefined") {
      gsap.killTweensOf(".s-processos *");
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

    this.setupProcessosAnimations();
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

      this.setupProcessosAnimations();
      this.setupIconShineEffect();

      // Listener para resize
      window.addEventListener("resize", () => this.handleResize());

      console.log("🔮 Processos Animations - Inicializado");
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initWhenReady);
    } else {
      initWhenReady();
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

// Inicializar as animações da seção processos
const processosAnimations = new ProcessosAnimations();

// Exportar para uso global se necessário
window.ProcessosAnimations = processosAnimations;
