/**
 * MYTHIKA STUDIO - Hero Animations
 * Animações GSAP otimizadas para o hero section
 * Inclui detecção de dispositivos móveis para melhor performance
 */

class HeroAnimations {
  constructor() {
    this.resizeTimer = null;
    this.init();
  }

  /**
   * Detectar dispositivos móveis para otimização de performance
   */
  isMobileDevice() {
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768
    );
  }

  /**
   * Configurar as animações do hero
   */
  setupHeroAnimations() {
    if (this.isMobileDevice()) {
      // Em dispositivos móveis, apenas resetar opacity e transform sem animações
      gsap.set(
        [
          ".hero-left",
          ".hero-right",
          ".hero-title",
          ".hero-subtitle",
          ".hero-cta",
          ".hero-illustration",
        ],
        {
          opacity: 1,
          transform: "none",
        }
      );
      return;
    }

    // Animações para desktop/tablet
    const tl = gsap.timeline();

    // Animação da coluna esquerda
    tl.fromTo(
      ".hero-left",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" }
    )

      // Animação da coluna direita (paralelo)
      .fromTo(
        ".hero-right",
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" },
        "-=0.9"
      )

      // Animações sequenciais do texto
      .fromTo(
        ".hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.7"
      )

      .fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 0.9, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )

      .fromTo(
        ".hero-cta",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )

      // Animação especial da ilustração com levitação
      .fromTo(
        ".hero-illustration",
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "back.out(1.7)" },
        "-=1.2"
      );

    // Animação de levitação contínua apenas para desktop
    this.setupFloatingAnimation();
    this.setupGlowEffect();
  }

  /**
   * Configurar animação de levitação da ilustração
   */
  setupFloatingAnimation() {
    gsap.to(".hero-illustration", {
      y: -15,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.5,
    });
  }

  /**
   * Configurar efeito de brilho místico
   */
  setupGlowEffect() {
    gsap.to(".hero-illustration", {
      filter:
        "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.25)) drop-shadow(0 0 25px rgba(240, 199, 94, 0.4))",
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.5,
    });
  }

  /**
   * Limpar todas as animações
   */
  killAllAnimations() {
    gsap.killTweensOf([
      ".hero-left",
      ".hero-right",
      ".hero-title",
      ".hero-subtitle",
      ".hero-cta",
      ".hero-illustration",
    ]);
  }

  /**
   * Reconfigurar animações (usado no resize)
   */
  reconfigureAnimations() {
    this.killAllAnimations();
    this.setupHeroAnimations();
  }

  /**
   * Handler para redimensionamento de janela
   */
  handleResize() {
    // Debounce para evitar muitas execuções
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.reconfigureAnimations();
    }, 250);
  }

  /**
   * Inicializar todas as animações e event listeners
   */
  init() {
    // Executar animações quando DOM estiver pronto
    document.addEventListener("DOMContentLoaded", () => {
      this.setupHeroAnimations();
    });

    // Listener para resize
    window.addEventListener("resize", () => {
      this.handleResize();
    });
  }
}

// Instanciar a classe quando o script for carregado
const heroAnimations = new HeroAnimations();
