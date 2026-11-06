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

// 5. İnteraktif Maliyet ve Makine Hesaplayıcı Mantığı
function updateCalcFields() {
  const service = document.getElementById('calcService').value;
  const amountLabel = document.getElementById('calcAmountLabel');
  const amountInput = document.getElementById('calcAmount');

  switch (service) {
    case 'kanal':
      amountLabel.innerText = 'Yaklaşık Metraj (Metre Tül):';
      amountInput.value = 50;
      break;
    case 'temel':
      amountLabel.innerText = 'Yaklaşık Temel Alanı (m²):';
      amountInput.value = 120;
      break;
    case 'duzleme':
      amountLabel.innerText = 'Arazi / Parsel Büyüklüğü (m²):';
      amountInput.value = 1000;
      break;
    case 'micir':
      amountLabel.innerText = 'Tahmini Malzeme (Kamyon Adedi):';
      amountInput.value = 3;
      break;
    case 'forklift_saat':
      amountLabel.innerText = 'İndirilecek Tır Sayısı (Adet):';
      amountInput.value = 1;
      break;
    case 'forklift_gun':
      amountLabel.innerText = 'Kiralama Süresi (Gün Sayısı):';
      amountInput.value = 7;
      break;
    case 'kepce_gun':
      amountLabel.innerText = 'Kepçe Çalışma Süresi (Gün Sayısı):';
      amountInput.value = 2;
      break;
    default:
      amountLabel.innerText = 'Miktar / Metraj:';
  }
}

function calculateCost(event) {
  event.preventDefault();
  const service = document.getElementById('calcService').value;
  const district = document.getElementById('calcDistrict').value;
  const ground = document.getElementById('calcGround').value;
  const amount = parseFloat(document.getElementById('calcAmount').value) || 1;

  let machine = 'JCB 3CX Eco Bekoloder';
  let duration = 'Yarım Gün (3-4 Saat)';
  let attachment = '40 cm Kanal Kovası & Ön Dozer Bıçağı';
  let response = '15-20 Dakika';

  if (district.includes('Taşköprü')) response = '10-15 Dakika (Garaj Yanı)';
  else if (district.includes('Çiftlikköy')) response = '15 Dakika';
  else if (district.includes('Yalova Merkez')) response = '20-25 Dakika';
  else if (district.includes('Altınova')) response = '25 Dakika';
  else if (district.includes('Çınarcık')) response = '30-35 Dakika';

  if (service === 'kanal') {
    if (amount <= 30) {
      machine = 'Cat 303.5 Mini Ekskavatör (Dar Sokak/Bahçe)';
      duration = '2 - 3 Saat';
      attachment = '30 cm Dar Hendek Kovası';
    } else if (amount <= 150) {
      machine = 'JCB 3CX Bekoloder';
      duration = '1 Günlük Çalışma';
      attachment = '40 cm Standart Kanal Kovası';
    } else {
      machine = 'JCB 3CX + Paletli Ekskavatör Filosu';
      duration = Math.ceil(amount / 150) + ' İş Günü';
      attachment = '60 cm Ağır Hizmet Kanal Kovası';
    }
    if (ground === 'tas') attachment += ' + Hidrolik Kırıcı';
  } else if (service === 'temel') {
    if (amount <= 150) {
      machine = 'JCB 3CX Bekoloder';
      duration = '1 - 2 İş Günü';
      attachment = 'Kazıcı Kova + Damperli Kamyon Sevk';
    } else {
      machine = '22 Ton Paletli Ağır Ekskavatör + JCB';
      duration = Math.ceil(amount / 120) + ' İş Günü';
      attachment = '1.2 m³ Ağır Hizmet Kovası + Lazer Nivo';
    }
  } else if (service === 'duzleme') {
    machine = 'JCB 3CX Ön Dozer Bıçaklı';
    duration = amount <= 1000 ? 'Yarım Gün' : Math.ceil(amount / 2000) + ' Gün';
    attachment = "4'ü 1 Arada Açılır Ön Tesviye Bıçağı";
  } else if (service === 'micir') {
    machine = 'JCB 3CX Ön Yükleyici';
    duration = amount <= 3 ? '2 - 3 Saat' : 'Yarım - Tam Gün';
    attachment = 'Ön Dozer Bıçağı + Zemin Ön Sıkıştırma';
  } else if (service.startsWith('forklift')) {
    machine = '3 Ton Dizel Forklift (Triplex Asansör)';
    if (service === 'forklift_saat') {
      duration = `${amount} Tır İçin Yaklaşık ${amount * 40} Dakika`;
    } else {
      duration = `${amount} Günlük Kesintisiz Kiralama`;
    }
    attachment = '1.80 m Uzatma Çatalı & Side-Shift';
  } else if (service === 'kepce_gun') {
    machine = 'JCB 3CX Bekoloder (Operatörlü)';
    duration = `${amount} Gün Tam Vardiya`;
    attachment = 'Tüm Standart Ataşmanlar Dahil';
  }

  // Sonuçları ekrana yazdır
  document.getElementById('resMachine').innerText = machine;
  document.getElementById('resDuration').innerText = duration;
  document.getElementById('resAttachment').innerText = attachment;
  document.getElementById('resResponse').innerText = response;

  const resultBox = document.getElementById('calcResultBox');
  resultBox.style.display = 'block';
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // WhatsApp butonuna özel parametreli URL oluştur
  const waMsg = `Merhaba Adem Hafriyat, sitenizdeki hesaplayıcıdan hesap yaptım:\n\n📍 İlçe: ${district}\n🚜 Hizmet: ${service}\n📐 Metraj/Miktar: ${amount}\n⛰️ Zemin: ${ground}\n💡 Önerilen: ${machine} (${duration})\n\nBu hesaplama için kesin teklif ve keşif rica ediyorum.`;
  document.getElementById('resWhatsappBtn').href = `https://wa.me/905325557716?text=${encodeURIComponent(waMsg)}`;
}

