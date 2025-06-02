/**
 * MYTHIKA STUDIO - Main Animations Controller
 * Controlador principal para todas as animações do site
 */

class MythikaAnimations {
  constructor() {
    this.isInitialized = false;
    this.init();
  }

  /**
   * Verificar se GSAP está carregado
   */
  checkGSAPReady() {
    return typeof gsap !== "undefined";
  }

  /**
   * Inicializar todas as animações do site
   */
  initializeAnimations() {
    if (!this.checkGSAPReady()) {
      console.warn("GSAP não está carregado. Aguardando...");
      setTimeout(() => this.initializeAnimations(), 100);
      return;
    }

    if (this.isInitialized) return;

    // Configurações globais do GSAP
    this.setupGlobalGSAPConfig();

    // Log de inicialização
    console.log("🎭 Mythika Animations - Sistema inicializado");

    this.isInitialized = true;
  }

  /**
   * Configurações globais do GSAP
   */
  setupGlobalGSAPConfig() {
    // Configurar autoKill para melhor performance
    gsap.config({
      autoKill: true,
      force3D: true,
    });

    // Definir eases customizados se necessário
    gsap.registerEase("mythikaEase", "power2.out");
  }

  /**
   * Detectar preferências de motion do usuário
   */
  respectsMotionPreferences() {
    // Verificar se o usuário prefere reduzir motion
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      // Desabilitar todas as animações se o usuário preferir
      gsap.globalTimeline.timeScale(0);
      return false;
    }
    return true;
  }

  /**
   * Método para pausar todas as animações
   */
  pauseAllAnimations() {
    gsap.globalTimeline.pause();
  }

  /**
   * Método para retomar todas as animações
   */
  resumeAllAnimations() {
    gsap.globalTimeline.resume();
  }

  /**
   * Método para debug - mostrar todas as animações ativas
   */
  debugAnimations() {
    if (typeof gsap !== "undefined") {
      console.log("Animações ativas:", gsap.globalTimeline.getChildren());
    }
  }

  /**
   * Inicializar o sistema
   */
  init() {
    // Aguardar DOM estar pronto
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.initializeAnimations();
      });
    } else {
      this.initializeAnimations();
    }

    // Verificar preferências de motion
    if (window.matchMedia) {
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      motionQuery.addListener(() => {
        if (!this.respectsMotionPreferences()) {
          console.log("🚫 Animações desabilitadas por preferência do usuário");
        }
      });
    }
  }
}

// Inicializar o controlador principal
const mythikaAnimations = new MythikaAnimations();

// Exportar para uso em outros scripts se necessário
window.MythikaAnimations = mythikaAnimations;
