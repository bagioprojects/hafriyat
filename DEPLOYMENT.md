# 🚜 Adem Hafriyat — Canlı Sunucu (Production) Kurulum ve Dağıtım Rehberi

Bu kılavuz, **`https://yalovakepcehafriyat.com.tr`** web platformunun Ubuntu / Debian Linux sunucuya (DigitalOcean, Hetzner, AWS, Linode, Turhost vb.) sıfırdan kurulması ve GitHub deposundan (`https://github.com/bagioprojects/hafriyat.git`) canlıya alınması adımlarını içerir.

---

## 📋 Hızlı Özellikler & Gereksinimler

- **İşletim Sistemi:** Ubuntu 22.04 LTS veya 24.04 LTS (Tavsiye edilen)
- **Node.js:** v18.x veya v20.x+ LTS
- **Web Sunucusu:** Nginx (Reverse Proxy & HTTP/2 & Gzip)
- **Süreç Yöneticisi:** PM2 (Cluster Mode & Sıfır Kesinti)
- **SSL Sertifikası:** Let's Encrypt (Certbot ile ücretsiz ve otomatik yenilenen)
- **Port:** 7450 (Nginx arkasında yerel olarak çalışır)

---

## 🚀 1. Adım: Sunucu Temel Paketlerinin Kurulumu

Sunucunuza SSH ile bağlandıktan sonra sistem paketlerini güncelleyin:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx ufw certbot python3-certbot-nginx build-essential
```

### Node.js 20 LTS Kurulumu:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Sürümleri doğrulayın:
node -v   # v20.x.x
npm -v    # 10.x.x
```

### PM2 Global Kurulumu:
```bash
sudo npm install -g pm2
```

---

## 📂 2. Adım: Projenin GitHub'dan Çekilmesi

Projenizi `/var/www/yalovakepce` dizinine klonlayın:

```bash
sudo mkdir -p /var/www/yalovakepce
sudo chown -R $USER:$USER /var/www/yalovakepce

git clone https://github.com/bagioprojects/hafriyat.git /var/www/yalovakepce
cd /var/www/yalovakepce
```

### Bağımlılıkların Yüklenmesi & Çevresel Değişkenler:
```bash
# Üretim paketlerini kurun:
npm install --omit=dev

# .env dosyasını oluşturun:
cp .env.example .env

# deploy.sh betiğine çalıştırma yetkisi verin:
chmod +x deploy.sh

# Testleri çalıştırarak ortamı doğrulayın:
npm test
```

---

## ⚙️ 3. Adım: PM2 ile Uygulamanın Başlatılması

Proje dizinindeyken (`/var/www/yalovakepce`):

```bash
# Cluster modunda tüm CPU çekirdeklerini kullanarak başlat:
pm2 start ecosystem.config.js

# Sunucu yeniden başladığında PM2'nin otomatik açılması için:
pm2 startup
# (Terminalde size verilen 'sudo env PATH=...' komutunu kopyalayıp yapıştırın)

pm2 save
```

### PM2 Faydalı Komutlar:
- Durum kontrolü: `pm2 status`
- Canlı log izleme: `pm2 logs yalovakepce-hafriyat`
- Performans monitörü: `pm2 monit`
- Sıfır kesintiyle yeniden başlatma: `pm2 reload ecosystem.config.js`

---

## 🌐 4. Adım: Nginx Yapılandırması ve Alan Adı Bağlantısı

Proje içerisinde hazır gelen Nginx konfigürasyonunu sisteme bağlayın:

```bash
sudo cp /var/www/yalovakepce/nginx-yalovakepce.conf /etc/nginx/sites-available/yalovakepcehafriyat.com.tr
sudo ln -s /etc/nginx/sites-available/yalovakepcehafriyat.com.tr /etc/nginx/sites-enabled/

# Varsayılan nginx default sitesini kaldırın:
sudo rm -f /etc/nginx/sites-enabled/default

# Sentaks kontrolü yapın:
sudo nginx -t

# Nginx'i yeniden yükleyin:
sudo systemctl reload nginx
```

---

## 🔒 5. Adım: Ücretsiz SSL (HTTPS) Sertifikası Kurulumu

Certbot ile tek komutla Let's Encrypt SSL sertifikanızı oluşturun ve otomatik yenilemeyi açın:

```bash
sudo certbot --nginx -d yalovakepcehafriyat.com.tr -d www.yalovakepcehafriyat.com.tr
```

Certbot e-posta adresinizi soracak ve Nginx konfigürasyonunu otomatik olarak SSL ile donatacaktır.

---

## 🛡️ 6. Adım: Güvenlik Duvarı (UFW) Ayarları

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---

## 🔄 7. Gelecekteki Güncellemeler (Tek Tıkla Otomasyon)

GitHub'a yeni kod gönderdiğinizde sunucuya bağlanıp tek bir komut çalıştırmanız yeterlidir:

```bash
cd /var/www/yalovakepce
./deploy.sh
```

Bu betik otomatik olarak:
1. GitHub'dan en güncel kodları çeker (`git pull`),
2. Varsa yeni npm paketlerini yükler (`npm install --omit=dev`),
3. Bütün testleri koşturur (`npm test`),
4. PM2 süreçlerini **kullanıcılara sıfır kesinti yansıtmadan (zero-downtime)** yeniler.

---

## 📞 Destek ve İletişim

- **Platform:** https://yalovakepcehafriyat.com.tr
- **Firma:** Adem Hafriyat — Yalova Kepçe & Forklift Kiralama
- **Telefon:** 0532 720 20 10
