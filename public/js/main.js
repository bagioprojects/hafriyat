/**
 * Adem Hafriyat - İstemci Taraflı Etkileşimler
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
});

// 4. Hızlı Teklif Formu WhatsApp Göndericisi
function handleQuoteSubmit(event) {
  event.preventDefault();
  const district = document.getElementById('quoteDistrict').value;
  const service = document.getElementById('quoteService').value;
  const phone = document.getElementById('quotePhone').value;
  const note = document.getElementById('quoteNote').value;

  const message = `Merhaba Adem Hafriyat, internet sitenizden teklif almak istiyorum:\n\n📍 Bölge: ${district}\n🚜 Hizmet: ${service}\n📞 İletişim Numaram: ${phone}\n📝 Not: ${note || 'Keşif ve fiyat teklifi rica ediyorum.'}`;

  const whatsappUrl = `https://wa.me/905325557716?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

