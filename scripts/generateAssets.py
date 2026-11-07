"""
Adem Hafriyat — Otomatik Vektör & Görsel Varlık Üreticisi
Eksik 43 adet 1200x675 yüksek çözünürlüklü JPG görseli,
favicon.ico ve PWA manifest ikonlarını üretir.
"""

import os
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'images')
PUBLIC_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public')
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Renk Paleti (CAT Endüstriyel Sarı & Asil Antrasit)
COLOR_BG_DARK = (20, 24, 27)         # #14181B Derin Karbon
COLOR_BG_LIGHT = (28, 34, 38)        # #1C2226 Açık Grafit
COLOR_YELLOW = (255, 199, 20)        # #FFC714 CAT Sarısı
COLOR_YELLOW_BRIGHT = (255, 213, 79) # #FFD54F Parlak Sarı
COLOR_WHITE = (255, 255, 255)
COLOR_TEXT_MUTED = (160, 174, 184)
COLOR_GRID = (36, 44, 50)
COLOR_PILL_BG = (31, 38, 43)

# Font Yükleme
def get_font(size, bold=True):
    font_path = "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"
    try:
        return ImageFont.truetype(font_path, size)
    except Exception:
        return ImageFont.load_default()

def draw_industrial_card(filename, category, title, subtitle, bullets, badge_type='kepce'):
    w, h = 1200, 675
    img = Image.new('RGB', (w, h), COLOR_BG_DARK)
    draw = ImageDraw.Draw(img)

    # 1. Arka Plan Degrade Benzetimi & Izgara (Grid)
    for y in range(h):
        factor = y / h
        r = int(COLOR_BG_DARK[0] * (1 - factor * 0.4) + COLOR_BG_LIGHT[0] * (factor * 0.4))
        g = int(COLOR_BG_DARK[1] * (1 - factor * 0.4) + COLOR_BG_LIGHT[1] * (factor * 0.4))
        b = int(COLOR_BG_DARK[2] * (1 - factor * 0.4) + COLOR_BG_LIGHT[2] * (factor * 0.4))
        draw.line([(0, y), (w, y)], fill=(r, g, b))

    # Teknik Mimari Çizgiler / Grid
    for x in range(0, w, 60):
        draw.line([(x, 0), (x, h)], fill=COLOR_GRID, width=1)
    for y in range(0, h, 60):
        draw.line([(0, y), (w, y)], fill=COLOR_GRID, width=1)

    # Sağ Taraf Geometrik Endüstriyel Vurgu Bloğu
    poly = [(w - 380, 0), (w, 0), (w, h), (w - 240, h)]
    draw.polygon(poly, fill=(24, 30, 34))
    draw.line([(w - 380, 0), (w - 240, h)], fill=COLOR_YELLOW, width=3)

    # Sol Üst Emniyet / Uyarı Çapraz Çizgili İnce Şerit (Safety Stripes)
    for i in range(-50, 450, 24):
        draw.line([(i, 0), (i + 40, 10)], fill=COLOR_YELLOW, width=8)

    # 2. Üst Marka Rozeti (Header Tag)
    tag_font = get_font(20, bold=True)
    draw.rounded_rectangle([70, 45, 470, 85], radius=8, fill=COLOR_YELLOW)
    draw.text((85, 52), "🚜 ADEM HAFRİYAT | YALOVA & ÇİFTLİKKÖY", fill=(20, 24, 27), font=tag_font)

    # Kategori Rozeti
    cat_font = get_font(18, bold=True)
    cat_text = f"• {category.upper()} •"
    draw.rounded_rectangle([490, 45, 750, 85], radius=8, fill=COLOR_PILL_BG, outline=COLOR_GRID, width=2)
    draw.text((515, 53), cat_text, fill=COLOR_YELLOW_BRIGHT, font=cat_font)

    # 3. Ana Başlık (Word-Wrap ile 2 Satır Destekli)
    title_font = get_font(48, bold=True)
    words = title.split(' ')
    lines = []
    curr_line = []
    for word in words:
        test_line = ' '.join(curr_line + [word])
        bbox = draw.textbbox((0, 0), test_line, font=title_font)
        if bbox[2] - bbox[0] > 720:
            lines.append(' '.join(curr_line))
            curr_line = [word]
        else:
            curr_line.append(word)
    if curr_line:
        lines.append(' '.join(curr_line))

    y_pos = 140
    for line in lines[:2]:
        draw.text((70, y_pos), line, fill=COLOR_WHITE, font=title_font)
        y_pos += 62

    # Vurgu Çizgisi
    draw.line([(70, y_pos + 10), (220, y_pos + 10)], fill=COLOR_YELLOW, width=5)
    y_pos += 30

    # 4. Alt Başlık / Açıklama
    sub_font = get_font(24, bold=False)
    draw.text((70, y_pos), subtitle, fill=COLOR_YELLOW_BRIGHT, font=sub_font)
    y_pos += 50

    # 5. Özellik Maddeleri (Bullets)
    bullet_font = get_font(22, bold=True)
    bullet_sub_font = get_font(18, bold=False)
    for b_title, b_desc in bullets:
        draw.rounded_rectangle([70, y_pos, 92, y_pos + 22], radius=4, fill=COLOR_YELLOW)
        draw.text((75, y_pos + 1), "✔", fill=(20, 24, 27), font=bullet_font)
        draw.text((105, y_pos), b_title, fill=COLOR_WHITE, font=bullet_font)
        draw.text((105, y_pos + 28), b_desc, fill=COLOR_TEXT_MUTED, font=bullet_sub_font)
        y_pos += 64

    # 6. Sağ Taraf İkonografi / Makine Silueti Rozeti
    center_x, center_y = w - 160, 260
    draw.ellipse([center_x - 90, center_y - 90, center_x + 90, center_y + 90], fill=(20, 24, 27), outline=COLOR_YELLOW, width=4)
    icon_font = get_font(72, bold=True)
    icon_char = "🚜" if "kepce" in badge_type or "kaz" in badge_type or "temel" in badge_type else "🏗️"
    if "forklift" in badge_type:
        icon_char = "📦"
    draw.text((center_x - 45, center_y - 48), icon_char, font=icon_font, fill=COLOR_YELLOW)
    
    badge_label_font = get_font(18, bold=True)
    draw.text((center_x - 65, center_y + 115), "7/24 KESİNTİSİZ", fill=COLOR_YELLOW, font=badge_label_font)
    draw.text((center_x - 60, center_y + 140), "15 DK SERVİS", fill=COLOR_WHITE, font=badge_label_font)

    # 7. Alt Bilgi Çubuğu (Footer Bar)
    draw.rectangle([0, h - 75, w, h], fill=(14, 17, 20))
    draw.line([(0, h - 75), (w, h - 75)], fill=COLOR_YELLOW, width=2)

    footer_font = get_font(22, bold=True)
    draw.text((70, h - 50), "📞 0532 720 20 10", fill=COLOR_YELLOW, font=footer_font)
    draw.text((320, h - 50), "🌐 yalovakepcehafriyat.com.tr", fill=COLOR_WHITE, font=footer_font)
    draw.text((w - 380, h - 50), "📍 Taşköprü Sanayi / Yalova", fill=COLOR_TEXT_MUTED, font=footer_font)

    target_path = os.path.join(OUTPUT_DIR, filename)
    img.save(target_path, 'JPEG', quality=92, optimize=True)
    print(f"✔ Üretildi: {filename}")

def generate_favicons():
    # 48x48 Multi-Resolution Favicon.ico
    sizes = [(16, 16), (32, 32), (48, 48)]
    imgs = []
    for sz in sizes:
        icon = Image.new('RGBA', sz, (0, 0, 0, 0))
        d = ImageDraw.Draw(icon)
        # Sarı Yuvarlak Kutu
        d.rounded_rectangle([0, 0, sz[0] - 1, sz[1] - 1], radius=sz[0] // 4, fill=(255, 199, 20, 255))
        # İç Antrasit Çerçeve
        d.rounded_rectangle([2, 2, sz[0] - 3, sz[1] - 3], radius=sz[0] // 5, fill=(24, 28, 31, 255))
        # Küçük kepçe sembolü
        d.ellipse([sz[0]//4, sz[1]//4, sz[0]*3//4, sz[1]*3//4], fill=(255, 199, 20, 255))
        imgs.append(icon)

    ico_path = os.path.join(PUBLIC_DIR, 'favicon.ico')
    imgs[0].save(ico_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48)], append_images=imgs[1:])
    print("✔ Üretildi: public/favicon.ico")

    # PWA İkonları (192x192 ve 512x512)
    for pwa_sz in [192, 512]:
        pwa_img = Image.new('RGBA', (pwa_sz, pwa_sz), (24, 28, 31, 255))
        d = ImageDraw.Draw(pwa_img)
        d.rounded_rectangle([8, 8, pwa_sz - 9, pwa_sz - 9], radius=pwa_sz // 6, outline=(255, 199, 20, 255), width=pwa_sz // 32)
        f = get_font(pwa_sz // 4, bold=True)
        d.text((pwa_sz // 4, pwa_sz // 3), "🚜", font=f, fill=(255, 199, 20, 255))
        pwa_path = os.path.join(OUTPUT_DIR, f'icon-{pwa_sz}.png')
        pwa_img.save(pwa_path, 'PNG')
        print(f"✔ Üretildi: public/images/icon-{pwa_sz}.png")

def generate_pwa_manifest():
    manifest_content = '''{
  "name": "Adem Hafriyat — Yalova Kepçe & Forklift Kiralama",
  "short_name": "Adem Hafriyat",
  "description": "Yalova, Çiftlikköy ve Taşköprü genelinde 7/24 saatlik, günlük, aylık kiralık kepçe (JCB 3CX) ve forklift hizmeti. 15 dakikada adreste!",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#181c1f",
  "theme_color": "#ffc714",
  "icons": [
    {
      "src": "/images/favicon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any maskable"
    },
    {
      "src": "/images/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/images/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "lang": "tr",
  "orientation": "portrait"
}'''
    p = os.path.join(PUBLIC_DIR, 'manifest.json')
    with open(p, 'w', encoding='utf-8') as f:
        f.write(manifest_content)
    print("✔ Üretildi: public/manifest.json")

# Tüm 43 Görselin Tanım Listesi
ALL_IMAGES = [
  # Core & Hero
  ('hero-kepce.jpg', 'Yalova Geneli 7/24 Servis', 'Yalova Kepçe & Forklift Kiralama Hizmetleri', 'Taşköprü Sanayi Merkezli 15 Dakikada Adrese İntikal', [('JCB 3CX & Ekskavatör Filosu', 'Tüm ataşmanlar (kırıcı, dar kova) hazır'), ('G Sınıfı Ehliyetli Uzman Ekip', 'İş güvenliği ve hassas kazı garantisi'), ('Şeffaf Saatlik & Günlük Fiyat', 'Sürpriz maliyet olmadan garantili iş')], 'kepce'),
  ('kepce-kiralama.jpg', 'Kepçe Hizmetleri', 'Yalova Kiralık Kepçe & JCB 3CX Bekoloder', 'Saatlik, Günlük & Proje Bazlı İş Makinesi Temini', [('Kazıcı ve Yükleyici Fonksiyon', '4x4 yüksek arazi performansı'), ('Hidrolik Kırıcı ve Tesviye', 'Beton kırma ve zemin düzleme'), ('Yalova ve Tüm İlçelerde Adrese Teslim', 'Hemen arayın, işiniz aksamasın')], 'kepce'),
  ('forklift-kiralama.jpg', 'Forklift Hizmetleri', 'Yalova Forklift Kiralama (3.0 - 5.0 Ton)', 'Sanayi, Tersane ve Depolarda Profesyonel Yük İndirme', [('Geniş Asansör ve Yan Kaydırma', 'Tripleks mast ile yüksek istifleme'), ('Operatörlü & Operatörsüz Çözüm', 'Tır boşaltma ve fabrika içi taşıma'), ('Taşköprü ve Altınova 20 Dk Teslim', 'Ağır tonajlı sanayi makineleri nakli')], 'forklift'),
  ('operatorlu-forklift.jpg', 'Forklift Hizmetleri', 'Operatörlü Forklift Kiralama Hizmeti', 'G Sınıfı Ehliyetli ve ISG Sertifikalı Sürücüler ile', [('Sıfır Hata ve Sıfır Kaza Prensibi', 'Hassas yüklerde maksimum güvenlik'), ('Zaman Tasarruflu Hızlı Tahliye', 'Tır başına ortalama 20-25 dakika'), ('Saatlik ve Günlük Çağrı İmkânı', 'Acil fabrika ve şantiye yüklemeleri')], 'forklift'),
  ('operatorsuz-forklift.jpg', 'Forklift Hizmetleri', 'Operatörsüz Forklift Kiralama Filosu', 'Aylık, Sezonluk ve Proje Bazlı Kurumsal Kiralama', [('Düzenli Bakımlı Genç Makine Parkı', 'Kesintisiz performans garantisi'), ('Yerinde Teknik Servis & Destek', 'Olası arızalara anında müdahale'), ('Projenize Özel Esnek Sözleşmeler', 'Şirketiniz için en avantajlı maliyet')], 'forklift'),
  ('kanal-kazma.jpg', 'Altyapı Hizmetleri', 'Kanal Kazma (Su, Elektrik, Doğalgaz & Fiber)', '30-40-60 cm Dar Kova ile Hassas Altyapı Kazıları', [('Lazer Nivo ile Milimetrik Eğim', 'Akış eğiminin kusursuz ayarlanması'), ('Güvenlik İkaz Bandı ve Yataklama', 'Kum dolgusu ile hat güvenliği'), ('Köy ve Şehir İçi Dar Alan Uzmanlığı', 'Mevcut borulara sıfır hasar')], 'kaz'),
  ('su-kuyusu.jpg', 'Kuyu & Drenaj', 'Su Kuyusu Açma ve Keson Kuyu Kazımı', 'Tarla ve Bahçeler İçin 10-15 Metre Derin Kuyu Açımı', [('Beton Kuyu Halkası Yerleştirme', 'Vinç ataşmanlı kontrollü indirme'), ('Taban Filtre Mıcırı Uygulaması', 'Tortusuz ve berrak kaynak suyu'), ('Yalova Köylerinde Sulama Güvencesi', 'Samanlı, Kadıköy, Kabaklı ve Çukurköy')], 'kaz'),
  ('yagmur-kanalizasyon.jpg', 'Altyapı & Şebeke', 'Yağmur Suyu ve Kanalizasyon Hattı Bağlantısı', 'Ruhsatlı Altyapı ve Ana Şebeke Bağlantı Kazıları', [('Beton Menhol ve Rögar Montajı', 'Standartlara uygun sızdırmazlık'), ('Temel Çevresi Koruma Drenajı', 'Bina bodrumlarında su baskınına son'), ('Kanalizasyon Arıza ve Yenileme', 'Çöken hatların hızlı onarımı')], 'kaz'),
  ('tamir-onarim.jpg', 'Acil Müdahale', 'Altyapı Tamir ve Acil Hat Onarımı', 'Patlayan Su Boruları ve Kanalizasyon Tıkanıklıkları', [('7/24 Nöbetçi Kepçe Hizmeti', 'Gece çağrılarında 15 dk intikal'), ('Noktasal Kazı ile Minimum Hasar', 'Asfalt ve parke taşını koruyan hassasiyet'), ('Hızlı Dolgu ve Alan Temizliği', 'Çalışma sonrası çevre teslimi')], 'kaz'),
  ('arazi-duzleme.jpg', 'Zemin & Tesviye', 'Arazi Düzleme ve Parsel Tesviyesi', 'Lazer Kot ile Kot Alma, Eğim Verme ve Temizleme', [('Hafriyat Kübaj Dengesi', 'Toprak çekme ve doldurma optimizasyonu'), ('Tarla ve Arsa Çit Öncesi Hazırlık', 'Tel örgü hattı düzeltme'), ('Taş ve Kök Söküm Temizliği', 'Tarım ve yapıma hazır arazi')], 'kepce'),
  ('dolgu-micir.jpg', 'Zemin & Dolgu', 'Dolgu ve Mıcır Yayma / Serme Hizmeti', 'Şantiye Yolları ve Otopark Zemin Stabilizasyonu', [('Kademeli Sıkıştırma Teknolojisi', 'Çökme ve oturmalara kesin çözüm'), ('Mekanik ve By-Pass Malzeme Temini', 'İhtiyaca uygun malzeme serimi'), ('Lazer Düzleme ile Sıfır Göllenme', 'Yağmur suyunun akış yönü ayarı')], 'kepce'),
  ('elektrik-kanal.jpg', 'Kablo & Altyapı', 'Elektrik ve Telekom Fiber Kanal Kazısı', 'TEDAŞ ve Telekom Şartnamelerine Tam Uyumlu Kazı', [('30 cm İnce Kanal Kovası', 'Minimum zemin tahribatı'), ('Kablo Koruma Borusu Yerleşimi', 'İkaz levhası ve emniyet şeridi'), ('Hızlı Kapatma ve Zemin İyileştirme', 'Aynı gün içinde teslim')], 'kaz'),
  ('bina-cevre.jpg', 'Peyzaj & Koruma', 'Bina Çevre Düzenleme ve Fransız Drenajı', 'Temel Duvarı İzolasyon Koruma ve Perde Dolgusu', [('Perde Duvarı Arkası Mıcır Yataklama', 'Drenaj borusu ile su tahliyesi'), ('Bina Giriş Yolu ve Otopark Düzenleme', 'Kilit taşı altı stabilize tesviye'), ('Eğim Açısı ile Yüzey Suyu İzolasyonu', 'Binaya su sızmasını önleyen eğim')], 'kepce'),
  ('peyzaj-hafriyat.jpg', 'Peyzaj & Bahçe', 'Peyzaj ve Bahçe Hafriyat İşleri', 'Elenmiş Nebati Toprak Serimi ve Kademeli Bahçe', [('Kademeli Teraslama ve Şev Kazısı', 'Eğimli arazide kullanılabilir alanlar'), ('Ağaç Dikim Çukurları Açımı', 'Geniş hacimli derin dikim alanları'), ('Eski Toprak ve Moloz Temizliği', 'Yalova genelinde temiz bahçe teslimi')], 'kepce'),
  ('temel-kazma.jpg', 'Temel Kazısı', 'Bina ve Villa Temel Kazısı Hizmetleri', 'Harita Mühendisi Kotlarında, İksalı ve Şevli Kazı', [('Radye ve Mütemadi Temel Kazımı', 'Lazer nivo kontrollü milimetrik derinlik'), ('Güvenli Şev ve İksa Emniyeti', 'Toprak kaymasına karşı koruma'), ('Kamyon Dolgusu ve Moloz Nakli', 'Ruhsatlı döküm sahasına taşıma')], 'kaz'),

  # Machinery
  ('jcb-3cx.jpg', 'Makine Parkuru', 'JCB 3CX Bekoloder Kazıcı Yükleyici', '4x4 Yüksek Arazi Gücü, Teleskopik Kol & Kırıcı Ataşmanı', [('Kazıcı ve Yükleyici Çift Fonksiyon', 'Dar alanlarda üstün manevra kabiliyeti'), ('Kırıcı Ataşmanı ile Beton Kırma', 'Sert kaya ve zeminlerde yüksek darbe gücü'), ('Yalova Merkez ve İlçelerine Hızlı Sevk', 'Operatörlü çalışmaya hazır')], 'kepce'),
  ('cat-303.jpg', 'Makine Parkuru', 'CAT 303 CR Mini Ekskavatör', '3.5 Ton Kauçuk Palet, Sıfır Kuyruk Salınımı', [('Bahçe ve Dar Sokak Kazıları', 'Zemine zarar vermeyen kauçuk palet'), ('Bina İçi Yıkım ve Kırma İşleri', 'Kompakt boyutlarla kapalı alan erişimi'), ('Hassas Hidrolik Kontrol Sistemi', 'Kablo ve boru yakınında güvenli kazı')], 'kepce'),
  ('forklift-35.jpg', 'Makine Parkuru', '3.5 Ton Dizel Saha Forklifti', '4.70 Metre Tripleks Asansör, Side-Shifter', [('Tır ve Kamyon Boşaltma Gücü', 'Paletli yüklerde 20 dakikada tahliye'), ('Açık Saha ve Şantiye Şartlarına Uyum', 'Pnömatik ağır hizmet lastikleri'), ('G Sınıfı Ehliyetli Deneyimli Sürücü', 'Fabrika içi sıfır hata istifleme')], 'forklift'),
  ('forklift-50.jpg', 'Makine Parkuru', '5.0 Ton Ağır Sanayi Forklifti', 'Tersane, Liman ve Ağır İmalat Sanayi Çözümleri', [('5 Ton Net Kaldırma Kapasitesi', 'Gemi sacı, profil ve kalıp taşımacılığı'), ('Genişletilmiş Çatal ve Çift Teker', 'Ağır tonajda maksimum denge'), ('Altınova Tersaneler Bölgesine 15 Dk', 'Proje bazlı saatlik & aylık filo')], 'forklift'),
  ('mini-ekskavator.jpg', 'Makine Parkuru', 'Mini Ekskavatör Parkı (1.5 - 3.5 Ton)', 'Dar Alanlarda Büyük İşler Başaran Kompakt Güç', [('Sıfır Kuyruk Salınımı Tasarımı', 'Duvar diplerinde tam manevra'), ('Hafif Tonaj ve Kauçuk Palet', 'Çim ve parke taşını koruyan yapı'), ('Kırıcı ve Dar Kova Seçenekleri', 'Her türlü altyapı kazısına hazır')], 'kepce'),
  ('paletli-ekskavator.jpg', 'Makine Parkuru', 'Paletli Ağır Ekskavatör Parkuru (22 Ton)', 'Büyük İnşaat Projeleri, Taş Ocağı ve Derin Temel Kazıları', [('Yüksek Kübajlı Hafriyat Kapasitesi', 'Günde yüzlerce metreküp kazı'), ('Ağır Hidrolik Kaya Kırıcı Gücü', 'Sert zeminlerde kesintisiz ilerleme'), ('Profesyonel Şantiye Ekibi', 'Yalova genelinde büyük projeler')], 'kepce'),
  ('forklift-3ton.jpg', 'Makine Parkuru', '3.0 Ton Endüstriyel Saha Forklifti', 'Konteyner İçi Boşaltma ve Depo İçi İstifleme', [('Serbest Kaldırmalı (Free-Lift) Asansör', 'Alçak tavanlı alanlarda tavan temassız çalışma'), ('Hızlı ve Dengeli Hidrolik Güç', 'Seri yükleme ve boşaltma operasyonu'), ('Taşköprü Sanayi Bölgesinde Hazır', 'Saatlik çağrılarda anında intikal')], 'forklift'),
  ('forklift-5ton.jpg', 'Makine Parkuru', '5.0 Ton Ağır Tonaj Dizel Forklift', 'Tersane, Sac, Mermer ve Ağır Makine Elleçleme', [('5000 kg Güçlendirilmiş Kaldırma', 'Ağır sanayi parçaları için tam emniyet'), ('Uzun Çatal ve Hidrolik Kaydırıcı', 'Geniş yüklerin emniyetli taşınması'), ('Operatörlü veya Operatörsüz Kiralama', 'Şantiyenize özel proje desteği')], 'forklift'),
  ('forklift-akulu.jpg', 'Makine Parkuru', 'Elektrikli Akülü Forklift (2.5 - 3.0 Ton)', 'Kapalı Depolar İçin Sıfır Emisyon ve Sessiz Çalışma', [('Egzoz Gazı ve Ses Yok', 'Gıda, ilaç ve kimya depolarına %100 uyum'), ('Hassas Elektronik Kontrol Ünitesi', 'Dar depo koridorlarında milimetrik yanaşma'), ('Yüksek Akü Kapasitesi', 'Tam vardiya kesintisiz operasyon')], 'forklift'),

  # Blog Articles
  ('blog-kepce-rehberi.jpg', 'Teknik Rehber', 'Yalova Kepçe Kiralama ve Fiyat Kılavuzu', 'Doğru İş Makinesi Seçimi ve 2026 Saatlik Maliyetler', [('Bekoloder mi Mini Kepçe mi?', 'Projenize en uygun makine seçimi'), ('Yalova İlçe Bazlı Fiyat Analizi', 'Merkez, Çiftlikköy, Çınarcık karşılaştırması'), ('Sözleşme ve Güvenlik İpuçları', 'İş güvenliği ve operatör sertifikasyonu')], 'kepce'),
  ('blog-forklift-rehberi.jpg', 'Lojistik Rehber', 'Yalova Forklift Kiralama ve Güvenlik Rehberi', 'Depo, Fabrika ve Şantiyelerde Hatasız Yükleme', [('Operatörlü vs Operatörsüz Tercih', 'Hangi durumda hangisi daha ekonomik?'), ('Ağır Sanayi ve Tersane İpuçları', 'Altınova ve Taşköprü pratikleri'), ('Yük Güvenliği ve ISG Standartları', 'İş kazalarını önleyen 5 altın kural')], 'forklift'),
  ('blog-ciftlikkoy-temel.jpg', 'Zemin & Statik', 'Çiftlikköy Zemin Yapısı ve Temel Kazısı', 'Sıvılaşma Riski, Şev Güvenliği ve İksa Çözümleri', [('Çiftlikköy Alüvyon Zemin Özellikleri', 'Kazı öncesi zemin etüdü analizi'), ('Radye Temel ve Drenaj İlişkisi', 'Taban suyu baskısına karşı koruma'), ('Lazer Nivo ile Kot Alma', 'Hatasız derinlik ve kübaj hesabı')], 'kaz'),
  ('blog-kanalizasyon.jpg', 'Altyapı Rehberi', 'Köy ve Yazlık Sitelerde Kanalizasyon Hatları', 'Fosseptik Çukuru, Menhol ve Şebeke Bağlantısı', [('Koku ve Sızıntıya Karşı Önlemler', 'Sızdırmaz beton bileşenler'), ('Eğim Açısı ve Tıkanıklık Önleme', 'Doğru boru çapı ve meyil hesabı'), ('Yalova Köylerinde Pratik Çözümler', 'Kanalizasyon hattı olmayan bölgeler')], 'kaz'),
  ('blog-arazi-duzleme.jpg', 'Arazi & Tarım', 'Tarla ve Arsa Tesviyesinde Lazer Nivo Teknolojisi', 'Toprak Kübaj Dengesi ve Eğim Ayarlama Kılavuzu', [('Lazer Kot ile Sıfır Hata Eğim', 'Sulama ve yağmur suyu yönlendirme'), ('Nebati Üst Toprağı Koruma', 'Verimli toprağın sıyrılıp tekrar serilmesi'), ('Taş Kırma ve Kök Sökümü', 'Ekim ve yapıma hazır temiz zemin')], 'kepce'),
  ('blog-su-kuyusu.jpg', 'Kuyu & Drenaj', 'Keson Su Kuyusu Nasıl Açılır? Kuyu Kazım Rehberi', '15 Metre Derinlik, Beton Büz ve Taban Filtre Mıcırı', [('Doğru Su Damarını Tespit Etme', 'Toprak katmanları ve nem analizi'), ('Beton Kuyu Halkası İndirme', 'Kepçe kolu ile kontrollü yerleşim'), ('Kaynak Suyunu Koruyan Mıcır Filtre', 'Bulanıklık ve kum çekmesini önleme')], 'kaz'),
  ('blog-yagmur-suyu.jpg', 'Drenaj & Koruma', 'Bina Temeli Yağmur Suyu Drenaj Rehberi', 'Fransız Drenajı ile Bodrum Su Baskınlarına Son', [('Temel Perde Duvarı Koruma', 'Membran ve drenaj levhası arkası dolgu'), ('Drenaj Borusu ve Geotekstil Keçe', 'Tıkanmayan uzun ömürlü su tahliyesi'), ('Yağmur Suyu Rögar Bağlantısı', 'Suların ana hatta tahliyesi')], 'kaz'),
  ('blog-temel-kazisi.jpg', 'İnşaat Rehberi', 'Bina ve Villa Temel Kazısı Güvenliği ve İksa', 'Şev Açısı, Harita Kotu ve Güvenli Çalışma', [('Toprak Kaymasını Önleyen Şev Açısı', 'Farklı zemin tiplerinde güvenli meyil'), ('Harita Mühendisi Koordinatları', 'Kazık çakımı ve sınır hassasiyeti'), ('Hafriyat Kamyonu Yükleme Planı', 'Trafiği aksatmadan hızlı tahliye')], 'kaz'),
  ('blog-mini-kepce.jpg', 'Kompakt Kazı', 'Dar Alanlarda Mini Kepçe Kiralama Avantajları', 'Bahçe, Bodrum Kat ve Sıfır Kuyruk Salınımı', [('3.5 Ton Mini Ekskavatör Gücü', 'Büyük kepçenin giremediği alanlar'), ('Kauçuk Palet ile Sıfır Zemin Hasarı', 'Asfalt ve peyzaj alanlarını koruma'), ('Kırıcı Ataşmanı ile Beton Kırma', 'Bina içi revizyon ve tadilat kazıları')], 'kepce'),
  ('blog-altinova-forklift.jpg', 'Tersane Lojistiği', 'Altınova Tersanelerinde Ağır Tonaj Forklift', 'Gemi İnşaatı, Sac ve Profil Taşımacılığı', [('5.0 Ton Dizel Forklift Çözümleri', 'Ağır metal blokların indirilmesi'), ('Liman Sahası ve Rıhtım Emniyeti', 'Kaygan zeminlerde yüksek çekiş gücü'), ('Sertifikalı G Sınıfı Sürücüler', 'Tersane ISG kurallarına tam uyum')], 'forklift'),
  ('blog-foseptik.jpg', 'Kırsal Altyapı', 'Fosseptik Çukuru Kazımı ve Standartları', 'Köy ve Yazlık Konutlarda Güvenli Atık Yönetimi', [('Doğru Hacim ve Ölçü Hesabı', 'Hane halkı sayısına göre boyutlandırma'), ('Sızdırmaz Betonarme Kuyu İmalatı', 'Yeraltı su kaynaklarını koruma'), ('Periyodik Vidanjör Bacası Montajı', 'Kolay tahliye ve bakım kapağı')], 'kaz'),
  ('blog-havuz-kazisi.jpg', 'Lüks Yapı Kazısı', 'Villa Havuz Kazısı ve Altyapı Hazırlığı', 'Lazer Kot ile Milimetrik Havuz Tabanı Tesviyesi', [('Hassas Havuz Çukuru Kazımı', 'Kalıp öncesi sıfır hata toleransı'), ('Denge Tankı ve Makine Dairesi Kazısı', 'Tesisat geçiş kanallarının açımı'), ('Bahçe Peyzajını Bozmadan Çalışma', 'Dar kovalı mini kazıcı çözümü')], 'kaz'),
  ('blog-tir-bosaltma.jpg', 'Sanayi Lojistiği', 'Tır Boşaltma ve Konteyner Tahliyesinde Forklift', 'Taşköprü Sanayi Bölgesinde 20 Dk Hızlı İntikal', [('Hızlı Palet İndirme ve İstifleme', 'Tır bekleme sürelerine son'), ('Konteyner İçi Alçak Kabinli Forklift', 'Konteyner tavanına çarpmadan çalışma'), ('Hassas Makine ve Koli Güvenliği', 'Ambalajlı ürünlerde sıfır hasar')], 'forklift'),
  ('blog-kentsel-donusum.jpg', 'Yıkım & Dönüşüm', 'Kentsel Dönüşüm ve Bina Yıkım Hafriyatı', 'Beton Kırma, Moloz Yükleme ve Çevre Emniyeti', [('Hidrolik Kırıcı ile Güvenli Yıkım', 'Bitişik nizam binalarda sıfır sarsıntı'), ('Moloz Ayrıştırma ve Nakliye', 'Demir ve betonu yerinde ayrıştırma'), ('Toz Bastırma ve Sulama Önlemleri', 'Çevre sakinlerini rahatsız etmeyen çalışma')], 'kaz'),
  ('blog-cinarcik-altyapi.jpg', 'Yamaç & Eğim', 'Çınarcık Eğimli Arazide Hafriyat ve Kazı', 'Yazlık Siteler ve Tepe Yamaçlarında Güvenli Kazı', [('Kademeli Teraslama ve Taş Duvar', 'Toprak kaymasını engelleyen setler'), ('Dar ve Dik Sokaklarda JCB Gücü', 'Zorlu virajlarda 4x4 manevra'), ('Yazlık Temel ve Bahçe Düzenleme', 'Yamaç arazide maksimum kullanım alanı')], 'kaz'),
  ('blog-micir-dolgu.jpg', 'Yol & Dolgu', 'Mıcır Dolgu ve Zemin Sıkıştırma Standartları', 'Şantiye Yolları ve Otoparklarda Kalıcı Stabilite', [('Farklı Boyut Mıcır Katmanları', 'By-pass, 1 numara ve 2 numara mıcır serimi'), ('Silindir ile Kademeli Kompaksiyon', 'Tonlarca yüke dayanıklı taban'), ('Yağmur Çamuruna Karşı Kesin Çözüm', 'Ağır tonajlı araçların batmasını önleme')], 'kepce'),
  ('blog-tarimsal-islah.jpg', 'Tarımsal Islah', 'Tarımsal Arazi Islahı ve Kök Temizliği', 'Kivi ve Meyve Bahçelerinde Taban Suyu Tahliyesi', [('Eski Ağaç Köklerini Sökme', 'Güçlü tırnaklı kova ile kökten temizlik'), ('Toprak Havalandırma ve Derin Kazı', 'Kök gelişimini hızlandıran zemin'), ('Yalova Kivi Bahçesi Drenajı', 'Aşırı yağışlarda kök çürümesini önleme')], 'kaz'),
  ('blog-acil-tamir.jpg', 'Acil Durum', '7/24 Acil Altyapı ve Su Borusu Patlağı Müdahalesi', 'Gece ve Hafta Sonu Nöbetçi Kepçe Servisi', [('15 Dakikada Adrese Ulaşım', 'Yalova, Çiftlikköy ve Taşköprü garantisi'), ('Patlak Noktasını Güvenle Açma', 'Şebeke hattına zarar vermeden kazı'), ('Tamir Sonrası Hızlı Geri Dolgu', 'Yolu ve bahçeyi anında ulaşıma açma')], 'kaz'),
  ('blog-fiyat-rehberi.jpg', 'Fiyatlandırma', '2026 Kepçe ve Forklift Kiralama Fiyat Analizi', 'Yalova Saatlik, Günlük ve Aylık Şeffaf Tarifeler', [('Fiyatı Belirleyen Temel Unsurlar', 'Zemin sertliği, mesafe ve ataşman tipi'), ('Operatör ve Yakıt Dahil Seçenekler', 'Sürpriz ek maliyet olmadan net bütçe'), ('Kurumsal Proje İndirimleri', 'Uzun dönem kiralamalarda avantajlı oranlar')], 'kepce')
]

if __name__ == '__main__':
    print("==================================================")
    print("🚜 ADEM HAFRİYAT - GÖRSEL & VARLIK MOTORU BAŞLADI")
    print("==================================================")
    
    generate_favicons()
    generate_pwa_manifest()
    
    print(f"\nToplam {len(ALL_IMAGES)} adet yüksek çözünürlüklü JPG üretiliyor...")
    for item in ALL_IMAGES:
        draw_industrial_card(item[0], item[1], item[2], item[3], item[4], item[5])
        
    print("\n==================================================")
    print("🎉 TÜM EKSİK GÖRSELLER VE VARLIKLAR ÜRETİLDİ!")
    print("==================================================")

