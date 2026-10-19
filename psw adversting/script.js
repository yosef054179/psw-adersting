/**
 * PSW Advertising — Main Script
 * Plexy / Steel / Wood (P.S.W.)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.getElementById('site-nav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      siteNav.classList.toggle('open');
    });

    // Close mobile nav when clicking a link
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!siteNav.contains(e.target) && !menuToggle.contains(e.target) && siteNav.classList.contains('open')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('open');
      }
    });
  }

  // 2. Sticky Header Scroll Effect
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Image Lightbox Modal
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');

  const zoomTriggers = document.querySelectorAll('[data-lightbox-src]');

  zoomTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-lightbox-src');
      const title = trigger.getAttribute('data-lightbox-title') || '';
      const desc = trigger.getAttribute('data-lightbox-desc') || '';

      if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxDesc) lightboxDesc.textContent = desc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 4. WhatsApp Contact Form Integration
  const contactForm = document.getElementById('contact-form');
  const defaultWhatsAppNumber = '201050753322';

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value.trim() || '';
      const business = document.getElementById('business')?.value.trim() || '';
      const service = document.getElementById('service')?.value || '';
      const message = document.getElementById('message')?.value.trim() || '';

      // Build friendly Arabic WhatsApp message
      let waText = `مرحباً PSW Advertising، أرغب في الاستفسار عن مشروع:\n\n`;
      waText += `👤 *الاسم:* ${name}\n`;
      if (business) {
        waText += `🏢 *اسم المشروع/الشركة:* ${business}\n`;
      }
      waText += `⚙️ *الخدمة المطلوبة:* ${service}\n`;
      if (message) {
        waText += `📝 *تفاصيل إضافية:* ${message}\n`;
      }
      waText += `\nأتطلع للتواصل معكم ومناقشة تفاصيل التنفيذ والأسعار. شكراً!`;

      const encodedText = encodeURIComponent(waText);
      const waUrl = `https://wa.me/${defaultWhatsAppNumber}?text=${encodedText}`;

      // Open WhatsApp in new tab
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      // Feedback toast/message
      const formStatus = document.getElementById('form-status');
      if (formStatus) {
        formStatus.textContent = 'جاري تحويلك إلى واتساب لإرسال تفاصيل طلبك مباشرة...';
        formStatus.style.color = '#25d366';
        formStatus.style.marginTop = '0.5rem';
      }
    });
  }

  // 5. Dynamic Copyright Year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 6. Active Navigation Link on Scroll
  const sections = document.querySelectorAll('main > section[id]');
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // ==========================================================================
  // 7. ANIMATED BACKGROUND LOGO MOUSE PARALLAX
  // ==========================================================================
  const bgLogos = document.querySelectorAll('.bg-floating-logo');
  if (bgLogos.length > 0 && window.innerWidth > 768) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 35;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 35;
    }, { passive: true });

    const animateParallax = () => {
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      bgLogos.forEach((logo, index) => {
        const factor = (index + 1) * 0.4;
        logo.style.transform = `translate3d(${currentX * factor}px, ${currentY * factor}px, 0)`;
      });

      requestAnimationFrame(animateParallax);
    };
    animateParallax();
  }

  // ==========================================================================
  // 8. INTERACTIVE SIGN SIMULATOR
  // ==========================================================================
  const simInput = document.getElementById('sim-input');
  const simSignText = document.getElementById('sim-sign-text');
  const simStyleBtns = document.querySelectorAll('.sim-style-btn');
  const simWhatsappBtn = document.getElementById('sim-whatsapp-btn');
  let currentSimStyle = 'neon';
  let currentSimStyleName = 'نيون فليكس ساطع';

  if (simInput && simSignText) {
    simInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      simSignText.textContent = val ? val : 'PSW ADVERTISING';
    });

    simStyleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        simStyleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentSimStyle = btn.getAttribute('data-style');
        currentSimStyleName = btn.querySelector('strong')?.textContent || currentSimStyle;

        // Remove all style classes
        simSignText.classList.remove('style-neon', 'style-gold', 'style-plexy', 'style-wood');
        simSignText.classList.add(`style-${currentSimStyle}`);
      });
    });

    if (simWhatsappBtn) {
      simWhatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const brandName = simInput.value.trim() || 'اسم شركتي';
        const waMsg = `مرحباً مصنع PSW Advertising،\nجربت محاكي تصميم اللوحات على موقعكم وحابب أستفسر عن تكلفة تصنيع:\n\n🏷️ *اسم العلامة:* ${brandName}\n✨ *نوع الخامة والستايل:* ${currentSimStyleName}\n\nأتمنى إفادتي بالمقايسة والمقاسات المقترحة. شكراً!`;
        const waUrl = `https://wa.me/${defaultWhatsAppNumber}?text=${encodeURIComponent(waMsg)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      });
    }
  }

  // ==========================================================================
  // 9. REQUEST DETAILS BUILDER
  // ==========================================================================
  const calcRadios = document.querySelectorAll('.calc-radio');
  const calcSummaryType = document.getElementById('calc-summary-type');
  const calcSummaryMaterial = document.getElementById('calc-summary-material');
  const calcSummaryLighting = document.getElementById('calc-summary-lighting');
  const calcSubmitBtn = document.getElementById('calc-submit-btn');

  if (calcRadios.length > 0) {
    const updateCalculator = () => {
      const selectedType = document.querySelector('input[name="sign-type"]:checked')?.value || 'حروف بارزة 3D';
      const selectedMaterial = document.querySelector('input[name="sign-material"]:checked')?.value || 'أكريليك بلكسي ناصع';
      const selectedSize = document.querySelector('input[name="sign-size"]:checked')?.value || 'متوسطة (3-5 متر)';
      const selectedLighting = document.querySelector('input[name="sign-lighting"]:checked')?.value || 'إضاءة هالة خلفية Backlit';

      // Update parent labels active class
      calcRadios.forEach(radio => {
        const parentLabel = radio.closest('.calc-option-label');
        if (parentLabel) {
          if (radio.checked) {
            parentLabel.classList.add('selected');
          } else {
            parentLabel.classList.remove('selected');
          }
        }
      });

      if (calcSummaryType) calcSummaryType.textContent = selectedType;
      if (calcSummaryMaterial) calcSummaryMaterial.textContent = `${selectedMaterial} (${selectedSize})`;
      if (calcSummaryLighting) calcSummaryLighting.textContent = selectedLighting;

    };

    calcRadios.forEach(radio => {
      radio.addEventListener('change', updateCalculator);
    });

    updateCalculator();

    if (calcSubmitBtn) {
      calcSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedType = document.querySelector('input[name="sign-type"]:checked')?.value || 'حروف بارزة';
        const selectedMaterial = document.querySelector('input[name="sign-material"]:checked')?.value || 'أكريليك بلكسي';
        const selectedSize = document.querySelector('input[name="sign-size"]:checked')?.value || 'متوسطة';
        const selectedLighting = document.querySelector('input[name="sign-lighting"]:checked')?.value || 'هالة خلفية';

        const waMsg = `مرحباً PSW Advertising،\nأرغب في طلب عرض سعر مبدئي للعمل التالي:\n\n📐 *نوع العمل:* ${selectedType}\n💎 *الخامة المطلوبة:* ${selectedMaterial}\n📏 *المقاس التقريبي:* ${selectedSize}\n💡 *نظام الإضاءة:* ${selectedLighting}\n\nيرجى التواصل معي لمناقشة التفاصيل والتكلفة.`;
        const waUrl = `https://wa.me/${defaultWhatsAppNumber}?text=${encodeURIComponent(waMsg)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      });
    }
  }
});
