// data/site-config.js
// Site genelinde tekrar kullanılan merkezi ayarlar.
// Logo dosyası değiştiğinde yalnızca "path" değerini güncellemeniz yeterlidir;
// header ve olası diğer kullanım noktaları otomatik olarak yeni dosyayı kullanır.

export const logoConfig = {
  // Logo dosyasının assets/ klasörüne göre yolu.
  path: "assets/Velora First logo.png",
  alt: "VELORA logosu",
  // Logonun orijinal en/boy oranı (kare). Header'daki görünen boyut
  // css/main.css içindeki --logo-size değişkeni ile kontrol edilir.
  width: 2000,
  height: 2000
};

export const siteConfig = {
  brandName: "VELORA",
  tagline: "Markanız için sade, hızlı ve etkili web deneyimleri.",
  homeAnchor: "#anasayfa"
};
