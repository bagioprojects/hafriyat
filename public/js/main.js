/**
 * Adem Hafriyat - İstemci Taraflı Etkileşimler & Custom Select Motoru
 * İletişim & WhatsApp: +90 532 720 20 10
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobil Menü Açma / Kapama & Backdrop Etkileşimi
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openDrawer();
    });
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeDrawer);
  }

  if (mobileDrawerBackdrop) {
    mobileDrawerBackdrop.addEventListener('click', closeDrawer);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  if (mobileDrawer) {
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // 2. SSS (FAQ) Akordeon Etkileşimi
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');

    if (questionBtn && answerDiv) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Diğerlerini kapat
        faqItems.forEach(other => {
          other.classList.remove('active');
          const otherAns = other.querySelector('.faq-answer');
          const otherBtn = other.querySelector('.faq-question');
          if (otherAns) otherAns.style.display = 'none';
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          answerDiv.style.display = 'block';
          questionBtn.setAttribute('aria-expanded', 'true');
        } else {
          questionBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  // 3. Scroll Header Shadow (Pasif Dinleyici ile Yüksek Performans)
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }, { passive: true });
  }

  // 5. PWA Service Worker Kaydı (Modern Tarayıcılar ve Çevrimdışı Hız)
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }

  // 6. Telefon Numarası Alanı Akıllı Otomatik Formatlama (05XX XXX XX XX)
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.startsWith('90')) v = v.substring(2);
      if (!v.startsWith('0') && v.length > 0) v = '0' + v;
      if (v.length > 11) v = v.substring(0, 11);

      let formatted = v;
      if (v.length > 4) formatted = v.substring(0, 4) + ' ' + v.substring(4);
      if (v.length > 7) formatted = formatted.substring(0, 8) + ' ' + formatted.substring(8);
      if (v.length > 9) formatted = formatted.substring(0, 11) + ' ' + formatted.substring(11);
      e.target.value = formatted;
    });
  });
});

// ==========================================================================
// Custom UI Selectbox Motoru (Modern Dropdown Component)
// ==========================================================================
function toggleCustomSelect(wrapperId) {
  const targetWrapper = document.getElementById(wrapperId);
  if (!targetWrapper) return;

  const isOpen = targetWrapper.classList.contains('open');
  const triggerBtn = targetWrapper.querySelector('.custom-select-trigger');

  // Önce açık olan tüm selectleri kapat
  closeAllCustomSelects();

  // Tıklananı aç (eğer açık değilse)
  if (!isOpen) {
    targetWrapper.classList.add('open');
    if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'true');
  }
}

function closeAllCustomSelects() {
  const allWrappers = document.querySelectorAll('.custom-select-wrapper');
  allWrappers.forEach(w => {
    w.classList.remove('open');
    const btn = w.querySelector('.custom-select-trigger');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });
}

function selectCustomOption(wrapperId, inputId, value, displayText, icon = '', badge = '', elementRef = null) {
  // 1. Gizli input değerini güncelle
  const hiddenInput = document.getElementById(inputId);
  if (hiddenInput) {
    hiddenInput.value = value;
  }

  // 2. Trigger butonundaki metni ve ikonu güncelle
  const wrapper = document.getElementById(wrapperId);
  if (wrapper) {
    const triggerText = wrapper.querySelector('.trigger-text');
    const triggerIcon = wrapper.querySelector('.trigger-icon');
    const triggerBtn = wrapper.querySelector('.custom-select-trigger');
    if (triggerText) {
      triggerText.innerText = displayText;
      triggerText.style.color = '#0B0F19';
      triggerText.style.fontWeight = '700';
    }
    if (triggerIcon && icon) {
      triggerIcon.innerText = icon;
    }
    if (triggerBtn) {
      triggerBtn.setAttribute('aria-expanded', 'false');
    }

    // 3. Seçili öğeye active class'ı ekle
    const allOptions = wrapper.querySelectorAll('.custom-option-item');
    allOptions.forEach(opt => opt.classList.remove('selected'));

    let targetOpt = elementRef;
    if (!targetOpt && typeof event !== 'undefined' && event && event.currentTarget) {
      targetOpt = event.currentTarget;
    }
    if (!targetOpt) {
      allOptions.forEach(opt => {
        if (opt.textContent.includes(value) || opt.textContent.includes(displayText)) {
          targetOpt = opt;
        }
      });
    }
    if (targetOpt) {
      targetOpt.classList.add('selected');
    }

    // 4. Dropdown menüsünü kapat
    wrapper.classList.remove('open');
  }
}

// ==========================================================================
// Hızlı Teklif Formu WhatsApp Göndericisi (+90 532 720 20 10)
// ==========================================================================
function handleQuoteSubmit(event) {
  event.preventDefault();
  const district = document.getElementById('quoteDistrict').value;
  const service = document.getElementById('quoteService').value;
  const phone = document.getElementById('quotePhone').value;
  const note = document.getElementById('quoteNote').value;

  if (!district) {
    alert('Lütfen hizmet almak istediğiniz ilçeyi / bölgeyi seçiniz.');
    toggleCustomSelect('districtSelectWrapper');
    return;
  }

  if (!service) {
    alert('Lütfen ihtiyacınız olan kepçe veya forklift hizmetini seçiniz.');
    toggleCustomSelect('serviceSelectWrapper');
    return;
  }

  if (!phone || phone.replace(/\D/g, '').length < 10) {
    alert('Lütfen size ulaşabileceğimiz geçerli bir telefon numarası giriniz (Örn: 0532 XXX XX XX).');
    const phoneInput = document.getElementById('quotePhone');
    if (phoneInput) phoneInput.focus();
    return;
  }

  const message = `Merhaba Adem Hafriyat (+90 532 720 20 10), internet siteniz üzerinden teklif ve keşif talep ediyorum:\n\n📍 Seçtiğim İlçe / Bölge: ${district}\n🚜 Talep Ettiğim Hizmet: ${service}\n📞 İletişim Numaram: ${phone}\n📝 Not / Detay: ${note || 'Fiyat ve en yakın müsait makine bilgisini rica ediyorum.'}`;

  // Kullanıcının belirttiği resmi hat: +90 532 720 20 10
  const whatsappUrl = `https://wa.me/905327202010?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}
