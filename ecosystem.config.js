/**
 * PM2 Production Ecosystem Yapılandırması
 * Adem Hafriyat — yalovakepcehafriyat.com.tr
 * 
 * Kullanım Komutları:
 *   pm2 start ecosystem.config.js
 *   pm2 reload ecosystem.config.js --update-env
 *   pm2 logs yalovakepce-hafriyat
 *   pm2 monit
 */

module.exports = {
  apps: [
    {
      name: 'yalovakepce-hafriyat',
      script: 'server.js',
      // Sunucu CPU çekirdek sayısına göre maksimum performans (Cluster Mode)
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      // Bellek sızıntısı önleme (Belirtilen eşiği aşarsa otomatik zarif restart)
      max_memory_restart: '400M',
      // Ortam Değişkenleri
      env: {
        NODE_ENV: 'production',
        PORT: 7450
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 7450
      },
      // Log Yapılandırması
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 2000,
      listen_timeout: 8000,
      kill_timeout: 3000
    }
  ]
};
