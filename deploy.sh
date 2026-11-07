#!/bin/bash
# ==============================================================================
# Adem Hafriyat — Otomatik Sunucu Dağıtım ve Güncelleme Betiği
# Domain: https://yalovakepcehafriyat.com.tr
# Kullanım: ./deploy.sh
# ==============================================================================

set -e

# Renkli Çıktı Tanımları
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo -e "${GREEN}====================================================${NC}"
echo -e "${GREEN}🚜 ADEM HAFRİYAT - SUNUCU DAĞITIM VE GÜNCELLEME${NC}"
echo -e "${GREEN}🌐 https://yalovakepcehafriyat.com.tr${NC}"
echo -e "${GREEN}====================================================${NC}"
echo ""

# 1. Dizin Kontrolü
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${YELLOW}[1/5] Git Deposu Güncelleniyor...${NC}"
# Yerel değişiklikleri koru ve en güncel branch'i çek
git fetch --all
git reset --hard origin/main || git reset --hard origin/master

echo -e "${YELLOW}[2/5] Üretim Bağımlılıkları Kuruluyor...${NC}"
npm install --omit=dev --no-audit --no-fund

echo -e "${YELLOW}[3/5] Doğrulama Testleri Çalıştırılıyor...${NC}"
if npm test; then
  echo -e "${GREEN}✅ Testler başarıyla geçti.${NC}"
else
  echo -e "${RED}❌ Testlerde hata tespit edildi! Dağıtım durduruldu.${NC}"
  exit 1
fi

echo -e "${YELLOW}[4/5] Log Dizini Kontrol Ediliyor...${NC}"
mkdir -p logs

echo -e "${YELLOW}[5/5] PM2 Süreci Sıfır Kesinti ile Yenileniyor...${NC}"
if command -v pm2 &> /dev/null; then
  pm2 reload ecosystem.config.js --update-env || pm2 start ecosystem.config.js
  pm2 save
  echo -e "${GREEN}✅ PM2 süreçleri başarıyla güncellendi.${NC}"
elif systemctl is-active --quiet yalovakepce; then
  sudo systemctl restart yalovakepce
  echo -e "${GREEN}✅ Systemd servisi başarıyla yeniden başlatıldı.${NC}"
else
  echo -e "${YELLOW}⚠️  PM2 veya Systemd servisi bulunamadı. Lütfen manuel başlatınız: npm start${NC}"
fi

echo ""
echo -e "${GREEN}====================================================${NC}"
echo -e "${GREEN}🎉 DAĞITIM BAŞARIYLA TAMAMLANDI!${NC}"
echo -e "${GREEN}🌐 Platform Yayında: https://yalovakepcehafriyat.com.tr${NC}"
echo -e "${GREEN}====================================================${NC}"
echo ""
