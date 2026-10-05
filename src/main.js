import './tailwind.css'
import './style.scss'

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({
        autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
      });
    }

    function refreshAll() {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }

    // ==========================================
    // СЕКЦИЯ 1: ЦЕЛЬ ПРОЕКТА (.hr-goal)
    // ==========================================
    const goalSection = document.querySelector('.hr-goal');
    if (goalSection) {
      const step1 = goalSection.querySelector('.goal-step-1');
      const line1 = goalSection.querySelector('.goal-line-1');
      const step2 = goalSection.querySelector('.goal-step-2');
      const line2 = goalSection.querySelector('.goal-line-2');
      const step3 = goalSection.querySelector('.goal-step-3');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: goalSection,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // 1. Появление шага "найм"
      if (step1) {
        tl.fromTo(
          step1,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.7)' }
        );
      }

      // 2. Отрисовка соединительной линии "найм -> прием"
      if (line1) {
        tl.fromTo(
          line1,
          { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.5, ease: 'power2.inOut' },
          '-=0.1'
        );
      }

      // 3. Появление шага "прием"
      if (step2) {
        tl.fromTo(
          step2,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.7)' },
          '-=0.1'
        );
      }

      // 4. Отрисовка соединительной линии "прием -> адаптация"
      if (line2) {
        tl.fromTo(
          line2,
          { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.5, ease: 'power2.inOut' },
          '-=0.1'
        );
      }

      // 5. Появление шага "адаптация"
      if (step3) {
        tl.fromTo(
          step3,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.7)' },
          '-=0.1'
        );
      }
    }

    // ==========================================
    // ==========================================
    // СЕКЦИЯ 2: АВТОМАТИЗАЦИЯ (.hr-auto-item)
    // Анимация активна ТОЛЬКО когда экран больше или равен xl (>= 1280px).
    // Если меньше xl (< 1280px) анимация отключена (элементы статичны).
    // ==========================================
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1280px)', () => {
      const autoItems = document.querySelectorAll('.hr-auto-item');
      const timelines = [];

      autoItems.forEach((item, index) => {
        const header = item.querySelector('.auto-header-wrap');
        const badge = item.querySelector('.auto-badge');
        const line = item.querySelector('.auto-line');
        const desc = item.querySelector('.auto-desc');
        const img = item.querySelector('.auto-img');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        timelines.push({ el: item, tl });

        // Заголовок "05 Как происходила автоматизация" (в 1-м блоке)
        if (header) {
          tl.fromTo(
            header,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
          );
        }

        // 1. Появление круглого бейджа шага (01, 02, 03) с легкой упругостью
        if (badge) {
          tl.fromTo(
            badge,
            { scale: 0.35, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.8)' },
            header ? '-=0.2' : '0'
          );
        }

        // 2. Рисование вертикальной SVG линии сверху вниз
        if (line) {
          tl.fromTo(
            line,
            { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 },
            { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.8, ease: 'power2.inOut' },
            '-=0.15'
          );
        }

        // 3. Плавное появление описания и цитаты
        if (desc) {
          const fromLeft = index % 2 === 0;
          tl.fromTo(
            desc,
            { opacity: 0, x: fromLeft ? -35 : 35 },
            { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
            '-=0.65'
          );
        }

        // 4. Появление 3D-иллюстрации
        if (img) {
          const imgFromRight = index % 2 === 0;
          tl.fromTo(
            img,
            { opacity: 0, x: imgFromRight ? 50 : -50, scale: 0.94 },
            { opacity: 1, x: 0, scale: 1, duration: 0.75, ease: 'power2.out' },
            '-=0.6'
          );
        }
      });

      // Финал: появление ноутбука справа и цветка слева
      const visualBlock = document.querySelector('.hr-auto-visual');
      if (visualBlock) {
        const laptop = visualBlock.querySelector('.auto-laptop');
        const flower = visualBlock.querySelector('.auto-flower');

        const visualTl = gsap.timeline({
          scrollTrigger: {
            trigger: visualBlock,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        timelines.push({ el: visualBlock, tl: visualTl });

        if (laptop) {
          visualTl.fromTo(
            laptop,
            { opacity: 0, x: 100, scale: 0.95 },
            { opacity: 1, x: 0, scale: 1, duration: 1.0, ease: 'power3.out' }
          );
        }

        if (flower) {
          visualTl.fromTo(
            flower,
            { opacity: 0, x: -50, scale: 0.85 },
            { opacity: 1, x: 0, scale: 1, duration: 0.85, ease: 'back.out(1.4)' },
            '-=0.75'
          );
        }
      }

      // Проверка видимости при обновлении (F5):
      // Если страница уже проскроллена к блокам, немедленно отображаем их
      const revealIfVisible = () => {
        const vh = window.innerHeight || document.documentElement.clientHeight;
        timelines.forEach(({ el, tl }) => {
          if (!el || !tl) return;
          const rect = el.getBoundingClientRect();
          if (rect.top < vh * 0.9) {
            tl.play();
          }
        });
      };

      revealIfVisible();
      requestAnimationFrame(revealIfVisible);
      setTimeout(revealIfVisible, 150);
      setTimeout(revealIfVisible, 400);

      return () => {
        // Очистка анимаций при ресайзе экрана выше 2xl
      };
    });

    // ==========================================
    // ==========================================
    // СЕКЦИЯ 4: РЕЗУЛЬТАТ (.hr-result) - ПАРАЛЛАКС
    // ==========================================
    const resultSection = document.querySelector('.hr-result');
    if (resultSection) {
      const parallImg1 = resultSection.querySelector('.result-parall-img');
      const parallImg2 = resultSection.querySelector('.result-parall-img-2');
      const parallImg3 = resultSection.querySelector('.result-parall-img-3');

      if (parallImg1) {
        gsap.fromTo(
          parallImg1,
          { y: -60 },
          {
            y: 80,
            ease: 'none',
            immediateRender: false,
            lazy: false,
            scrollTrigger: {
              trigger: resultSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      if (parallImg2) {
        gsap.fromTo(
          parallImg2,
          { y: -90 },
          {
            y: 70,
            ease: 'none',
            immediateRender: false,
            lazy: false,
            scrollTrigger: {
              trigger: resultSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      if (parallImg3) {
        gsap.fromTo(
          parallImg3,
          { y: -70 },
          {
            y: 90,
            ease: 'none',
            immediateRender: false,
            lazy: false,
            scrollTrigger: {
              trigger: resultSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.4,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }

    // ==========================================
    // ГАРАНТИЯ ОБНОВЛЕНИЯ КООРДИНАТ ПРИ ЗАГРУЗКЕ И ОБНОВЛЕНИИ (F5)
    // ==========================================
    // Слушатели на завершение загрузки окна и шрифтов
    window.addEventListener('load', () => {
      refreshAll();
      [100, 300, 600, 1000].forEach((delay) => setTimeout(refreshAll, delay));
    });

    if (document.fonts) {
      document.fonts.ready.then(refreshAll);
    }

    // Обновление ScrollTrigger по мере загрузки картинок
    document.querySelectorAll('img').forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', refreshAll, { once: true });
        img.addEventListener('error', refreshAll, { once: true });
      }
    });

    // Автоматическое обновление при любых сдвигах высоты страницы (DOM/ассеты)
    if (window.ResizeObserver) {
      let roTimer;
      const ro = new ResizeObserver(() => {
        clearTimeout(roTimer);
        roTimer = setTimeout(refreshAll, 60);
      });
      ro.observe(document.body);
    }
  }

  // ==========================================
  // СИНХРОНИЗАЦИЯ НАХЛЕСТА BANNER-2 (50% НАХЛЕСТ И РОВНО 100PX ОТСТУП СНИЗУ)
  // ТОЛЬКО НА ЭКРАНАХ >= 2xl (>= 1536px)
  // ==========================================
  const banner2 = document.querySelector('.hr-banner-2');
  if (banner2) {
    const syncBanner2Offset = () => {
      if (window.innerWidth >= 1536) {
        const halfH = banner2.offsetHeight / 2;
        banner2.style.marginBottom = `-${halfH}px`;
      } else {
        banner2.style.marginBottom = '';
      }
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    };
    syncBanner2Offset();
    window.addEventListener('resize', syncBanner2Offset);
    window.addEventListener('load', syncBanner2Offset);
    if (document.fonts) {
      document.fonts.ready.then(syncBanner2Offset);
    }
  }

  // ==========================================
  // СЛАЙДЕР В СЕКЦИИ ОТЗЫВ (.hr-review)
  // ==========================================
  const reviewSlider = document.querySelector('.hr-review .review-slider');
  if (reviewSlider) {
    const track = reviewSlider.querySelector('.review-track');
    const slides = reviewSlider.querySelectorAll('.review-slide');
    const dots = document.querySelectorAll('.hr-review .review-dot');
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoplayTimer = null;
    const AUTOPLAY_DELAY = 5000; // 5 секунд

    const goToSlide = (index) => {
      currentIndex = (index + totalSlides) % totalSlides;
      const offsetPercent = (currentIndex * 100) / totalSlides;
      track.style.transform = `translateX(-${offsetPercent}%)`;

      dots.forEach((dot, i) => {
        if (i === currentIndex) {
          dot.classList.remove('bg-[#D7E3EE]', 'hover:bg-brandBlue/50');
          dot.classList.add('bg-brandBlue');
        } else {
          dot.classList.remove('bg-brandBlue');
          dot.classList.add('bg-[#D7E3EE]', 'hover:bg-brandBlue/50');
        }
      });
    };

    const startAutoplay = () => {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, AUTOPLAY_DELAY);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    // Автоматический запуск слайдера
    startAutoplay();

    // Клик по точкам
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        startAutoplay();
      });
    });

    // Пауза при наведении курсора
    reviewSlider.addEventListener('mouseenter', stopAutoplay);
    reviewSlider.addEventListener('mouseleave', startAutoplay);

    // Touch swipe (смартфоны и планшеты)
    let touchStartX = 0;
    let touchStartY = 0;

    reviewSlider.addEventListener('touchstart', (e) => {
      stopAutoplay();
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    reviewSlider.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
        if (diffX < 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
      }
      startAutoplay();
    }, { passive: true });

    // Drag мыши на ПК
    let mouseStartX = 0;
    let isMouseDown = false;

    reviewSlider.addEventListener('mousedown', (e) => {
      stopAutoplay();
      isMouseDown = true;
      mouseStartX = e.clientX;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      const diffX = e.clientX - mouseStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
      }
      startAutoplay();
    });

    // Клавиатура (стрелки)
    reviewSlider.setAttribute('tabindex', '0');
    reviewSlider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        goToSlide(currentIndex + 1);
        startAutoplay();
      }
      if (e.key === 'ArrowLeft') {
        goToSlide(currentIndex - 1);
        startAutoplay();
      }
    });

    // Остановка при сворачивании вкладки
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });
  }

  // ==========================================
  // СЛАЙДЕР ПЛАНШЕТА (.tablet-slider)
  // ==========================================
  const tabletSlider = document.querySelector('.tablet-slider');
  if (tabletSlider) {
    const track = tabletSlider.querySelector('.tablet-track');
    const dots = document.querySelectorAll('.tablet-dot');
    let currentIndex = 0;
    const totalSlides = 2;
    let autoplayTimer = null;
    const AUTOPLAY_DELAY = 4500; // 4.5 секунды

    const goToSlide = (index) => {
      currentIndex = (index + totalSlides) % totalSlides;
      const offsetPercent = (currentIndex * 100) / totalSlides;
      track.style.transform = `translateX(-${offsetPercent}%)`;

      dots.forEach((dot, i) => {
        if (i === currentIndex) {
          dot.classList.remove('bg-white');
          dot.classList.add('bg-[#356DD4]');
        } else {
          dot.classList.remove('bg-[#356DD4]');
          dot.classList.add('bg-white');
        }
      });
    };

    const startAutoplay = () => {
      stopAutoplay();
      autoplayTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, AUTOPLAY_DELAY);
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    };

    startAutoplay();

    // Клик по точкам
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        startAutoplay();
      });
    });

    // Пауза при наведении
    tabletSlider.addEventListener('mouseenter', stopAutoplay);
    tabletSlider.addEventListener('mouseleave', startAutoplay);

    // Touch swipe (мобильные и планшеты)
    let touchStartX = 0;
    let touchStartY = 0;

    tabletSlider.addEventListener('touchstart', (e) => {
      stopAutoplay();
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    tabletSlider.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
        if (diffX < 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
      }
      startAutoplay();
    }, { passive: true });

    // Drag мыши на ПК
    let mouseStartX = 0;
    let isMouseDown = false;

    tabletSlider.addEventListener('mousedown', (e) => {
      stopAutoplay();
      isMouseDown = true;
      mouseStartX = e.clientX;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      const diffX = e.clientX - mouseStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
      }
      startAutoplay();
    });

    // Остановка при сворачивании вкладки
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });
  }
});

