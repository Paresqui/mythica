// Animações para a seção Segmentos
document.addEventListener("DOMContentLoaded", function () {
  // Registrar plugin GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Verificar se é mobile para ajustar animações
  const isMobile = window.innerWidth <= 768;

  // Função para criar animações da seção Segmentos
  function createSegmentosAnimations() {
    // Timeline principal para entrada da seção
    const segmentosTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".s-segmentos",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        once: true,
      },
    });

    // Animação do badge
    segmentosTl.from(".s-segmentos__badge", {
      duration: 1,
      y: 50,
      opacity: 0,
      scale: 0.8,
      ease: "back.out(1.7)",
      delay: 0.2,
    });

    // Animação do título
    segmentosTl.from(
      ".s-segmentos__title",
      {
        duration: 1.2,
        y: 40,
        opacity: 0,
        ease: "power3.out",
      },
      "-=0.6"
    );

    // Animação do subtítulo
    segmentosTl.from(
      ".s-segmentos__subtitle",
      {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Animação dos cards com stagger
    segmentosTl.from(
      ".s-segmentos__card",
      {
        duration: 1,
        y: 60,
        opacity: 0,
        scale: 0.9,
        rotation: 5,
        ease: "power3.out",
        stagger: {
          amount: 0.8,
          from: "start",
        },
      },
      "-=0.4"
    );

    // Animação dos ícones dos cards
    segmentosTl.from(
      ".s-segmentos__icon",
      {
        duration: 0.8,
        scale: 0,
        rotation: 180,
        ease: "back.out(1.7)",
        stagger: 0.2,
      },
      "-=0.6"
    );
  }

  // Função para animações de hover nos cards
  function createCardHoverAnimations() {
    const cards = document.querySelectorAll(".s-segmentos__card");

    cards.forEach((card, index) => {
      const icon = card.querySelector(".s-segmentos__icon");
      const title = card.querySelector(".s-segmentos__card-title");
      const content = card.querySelector(".s-segmentos__card-content");

      // Timeline para hover
      const hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(card, {
          duration: 0.3,
          scale: 1.05,
          y: -10,
          ease: "power2.out",
        })
        .to(
          icon,
          {
            duration: 0.3,
            scale: 1.2,
            rotation: 15,
            ease: "power2.out",
          },
          0
        )
        .to(
          title,
          {
            duration: 0.3,
            color: "#e8b84a",
            ease: "power2.out",
          },
          0
        )
        .to(
          content,
          {
            duration: 0.3,
            y: -5,
            ease: "power2.out",
          },
          0
        );

      // Eventos de hover
      card.addEventListener("mouseenter", () => {
        hoverTl.play();
      });

      card.addEventListener("mouseleave", () => {
        hoverTl.reverse();
      });

      // Animação de pulso no ícone (apenas desktop)
      if (!isMobile) {
        gsap.to(icon, {
          duration: 2,
          scale: 1.1,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.5,
        });
      }
    });
  }

  // Função para animação de brilho nos ícones
  function createIconShineEffect() {
    if (isMobile) return; // Não executar em mobile

    const icons = document.querySelectorAll(".s-segmentos__icon");

    icons.forEach((icon, index) => {
      // Criar elemento de brilho
      const shine = document.createElement("div");
      shine.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(240, 199, 94, 0.6), transparent);
                transform: skewX(-20deg);
                transition: left 0.6s ease;
                pointer-events: none;
                z-index: 10;
            `;

      const iconContainer = icon.parentElement;
      iconContainer.style.position = "relative";
      iconContainer.style.overflow = "hidden";
      iconContainer.appendChild(shine);

      // Animação de brilho intermitente
      gsap.to(shine, {
        duration: 1.5,
        left: "100%",
        ease: "power2.inOut",
        repeat: -1,
        repeatDelay: 3 + index * 0.8,
        delay: index * 0.8,
      });
    });
  }

  // Função para animação de flutuação do badge
  function createBadgeFloatAnimation() {
    const badge = document.querySelector(".s-segmentos__badge");

    if (badge && !isMobile) {
      gsap.to(badge, {
        duration: 3,
        y: -10,
        rotation: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }

  // Função para animação de parallax nos elementos de fundo
  function createParallaxEffect() {
    if (isMobile) return; // Não executar em mobile

    gsap.to(".s-segmentos::before", {
      scrollTrigger: {
        trigger: ".s-segmentos",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: -50,
      rotation: 10,
      ease: "none",
    });

    gsap.to(".s-segmentos::after", {
      scrollTrigger: {
        trigger: ".s-segmentos",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
      y: 30,
      rotation: -15,
      ease: "none",
    });
  }

  // Função para animação sequencial dos títulos dos cards
  function createCardTitleSequence() {
    const titles = document.querySelectorAll(".s-segmentos__card-title");

    ScrollTrigger.create({
      trigger: ".s-segmentos__grid",
      start: "top 70%",
      onEnter: () => {
        gsap.from(titles, {
          duration: 0.8,
          x: -30,
          opacity: 0,
          ease: "power2.out",
          stagger: 0.15,
        });
      },
      once: true,
    });
  }

  // Inicializar todas as animações
  createSegmentosAnimations();
  createCardHoverAnimations();
  createIconShineEffect();
  createBadgeFloatAnimation();
  createParallaxEffect();
  createCardTitleSequence();

  // Função para otimização em resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });

  // Cleanup no beforeunload
  window.addEventListener("beforeunload", () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  });
});
