/**
 * MYTHIKA STUDIO - Projetos Carousel
 * Sistema de carrossel para a seção de projetos
 * Funcionalidade responsiva com touch/swipe support
 */

class ProjetosCarousel {
  constructor() {
    this.currentIndex = 0;
    this.totalCards = 0;
    this.cardWidth = 300;
    this.gap = 24;
    this.visibleCards = 3;
    this.isAnimating = false;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.minSwipeDistance = 50;

    this.init();
  }

  /**
   * Detectar dispositivos móveis
   */
  isMobileDevice() {
    return window.innerWidth <= 768;
  }

  /**
   * Inicializar o carrossel
   */
  init() {
    // Aguardar DOM estar pronto
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  /**
   * Configurar elementos e eventos
   */
  setup() {
    this.track = document.getElementById("projectsTrack");
    this.prevBtn = document.getElementById("prevProject");
    this.nextBtn = document.getElementById("nextProject");
    this.cards = document.querySelectorAll(".s-projetos__card");

    if (!this.track || !this.cards.length) return;

    this.totalCards = this.cards.length;
    this.calculateDimensions();
    this.setupEventListeners();
    this.updateButtons();

    // Setup inicial
    this.updateCarousel();

    console.log("🎠 Projetos Carousel - Inicializado");
  }

  /**
   * Calcular dimensões baseado no viewport
   */
  calculateDimensions() {
    const containerWidth = this.track.parentElement.offsetWidth;

    if (window.innerWidth <= 480) {
      this.cardWidth = 260;
      this.gap = 12;
      this.visibleCards = 1.2;
    } else if (window.innerWidth <= 768) {
      this.cardWidth = 280;
      this.gap = 16;
      this.visibleCards = 1.5;
    } else if (window.innerWidth <= 1024) {
      this.cardWidth = 280;
      this.gap = 16;
      this.visibleCards = 2.5;
    } else {
      this.cardWidth = 300;
      this.gap = 24;
      this.visibleCards = 3;
    }

    // Calcular máximo de slides possíveis
    this.maxIndex = Math.max(
      0,
      this.totalCards - Math.floor(this.visibleCards)
    );
  }

  /**
   * Configurar event listeners
   */
  setupEventListeners() {
    // Botões de navegação
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prevSlide());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.nextSlide());
    }

    // Touch events para mobile
    if (this.track) {
      this.track.addEventListener(
        "touchstart",
        (e) => this.handleTouchStart(e),
        { passive: true }
      );
      this.track.addEventListener("touchend", (e) => this.handleTouchEnd(e), {
        passive: true,
      });
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });

    // Resize handler
    window.addEventListener("resize", () => this.handleResize());
  }

  /**
   * Navegar para slide anterior
   */
  prevSlide() {
    if (this.isAnimating || this.currentIndex <= 0) return;

    this.currentIndex--;
    this.updateCarousel();
  }

  /**
   * Navegar para próximo slide
   */
  nextSlide() {
    if (this.isAnimating || this.currentIndex >= this.maxIndex) return;

    this.currentIndex++;
    this.updateCarousel();
  }

  /**
   * Ir para slide específico
   */
  goToSlide(index) {
    if (this.isAnimating) return;

    this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
    this.updateCarousel();
  }

  /**
   * Atualizar posição do carrossel
   */
  updateCarousel() {
    if (!this.track) return;

    this.isAnimating = true;

    // Calcular translateX
    const translateX = -(this.currentIndex * (this.cardWidth + this.gap));

    // Aplicar transformação
    this.track.style.transform = `translateX(${translateX}px)`;

    // Atualizar botões
    this.updateButtons();

    // Reset animation flag
    setTimeout(() => {
      this.isAnimating = false;
    }, 400);
  }

  /**
   * Atualizar estado dos botões
   */
  updateButtons() {
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex <= 0;
    }

    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
    }
  }

  /**
   * Handle touch start
   */
  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
  }

  /**
   * Handle touch end
   */
  handleTouchEnd(e) {
    this.touchEndX = e.changedTouches[0].clientX;
    this.handleSwipe();
  }

  /**
   * Processar swipe gesture
   */
  handleSwipe() {
    const swipeDistance = this.touchStartX - this.touchEndX;

    if (Math.abs(swipeDistance) < this.minSwipeDistance) return;

    if (swipeDistance > 0) {
      // Swipe left - próximo slide
      this.nextSlide();
    } else {
      // Swipe right - slide anterior
      this.prevSlide();
    }
  }

  /**
   * Handle resize
   */
  handleResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.calculateDimensions();

      // Ajustar currentIndex se necessário
      this.currentIndex = Math.min(this.currentIndex, this.maxIndex);

      this.updateCarousel();
    }, 250);
  }

  /**
   * Método público para debug
   */
  getStatus() {
    return {
      currentIndex: this.currentIndex,
      maxIndex: this.maxIndex,
      totalCards: this.totalCards,
      visibleCards: this.visibleCards,
      cardWidth: this.cardWidth,
      gap: this.gap,
    };
  }

  /**
   * Auto-play (opcional)
   */
  startAutoPlay(interval = 5000) {
    this.stopAutoPlay();

    this.autoPlayTimer = setInterval(() => {
      if (this.currentIndex >= this.maxIndex) {
        this.goToSlide(0);
      } else {
        this.nextSlide();
      }
    }, interval);
  }

  /**
   * Parar auto-play
   */
  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }
}

// Inicializar o carrossel
const projetosCarousel = new ProjetosCarousel();

// Exportar para uso global se necessário
window.ProjetosCarousel = projetosCarousel;
