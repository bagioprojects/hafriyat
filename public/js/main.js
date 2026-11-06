/**
 * Adem Hafriyat - İstemci Taraflı Etkileşimler & Custom Select Motoru
 * İletişim & WhatsApp: +90 532 720 20 10
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobil Menü Açma / Kapama
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
    });
  }

  if (closeDrawerBtn && mobileDrawer) {
    closeDrawerBtn.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
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
          if (otherAns) otherAns.style.display = 'none';
        });

        if (!isActive) {
          item.classList.add('active');
          answerDiv.style.display = 'block';
        }
      });
    }
  });

  // 3. Scroll Header Shadow
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // 4. Custom Select Dropdown Dışına Tıklama Kontrolü
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select-wrapper')) {
      closeAllCustomSelects();
    }
  });
});

// ==========================================================================
// Custom UI Selectbox Motoru (Modern Dropdown Component)
// ==========================================================================
function toggleCustomSelect(wrapperId) {
  const targetWrapper = document.getElementById(wrapperId);
  if (!targetWrapper) return;

  const isOpen = targetWrapper.classList.contains('open');

  // Önce açık olan tüm selectleri kapat
  closeAllCustomSelects();

  // Tıklananı aç (eğer açık değilse)
  if (!isOpen) {
    targetWrapper.classList.add('open');
  }
}

function closeAllCustomSelects() {
  const allWrappers = document.querySelectorAll('.custom-select-wrapper');
  allWrappers.forEach(w => w.classList.remove('open'));
}

function selectCustomOption(wrapperId, inputId, value, displayText, icon = '', badge = '') {
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
    if (triggerText) {
      triggerText.innerText = displayText;
      triggerText.style.color = '#0B0F19';
      triggerText.style.fontWeight = '700';
    }
    if (triggerIcon && icon) {
      triggerIcon.innerText = icon;
    }

    // 3. Seçili öğeye active class'ı ekle
    const allOptions = wrapper.querySelectorAll('.custom-option-item');
    allOptions.forEach(opt => opt.classList.remove('selected'));

    const currentOpt = event.currentTarget;
    if (currentOpt) {
      currentOpt.classList.add('selected');
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

  const message = `Merhaba Adem Hafriyat (+90 532 720 20 10), internet siteniz üzerinden teklif ve keşif talep ediyorum:\n\n📍 Seçtiğim İlçe / Bölge: ${district}\n🚜 Talep Ettiğim Hizmet: ${service}\n📞 İletişim Numaram: ${phone}\n📝 Not / Detay: ${note || 'Fiyat ve en yakın müsait makine bilgisini rica ediyorum.'}`;

  // Kullanıcının belirttiği resmi hat: +90 532 720 20 10
  const whatsappUrl = `https://wa.me/905327202010?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}
