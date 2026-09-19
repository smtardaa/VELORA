// data/site-config.js
// Site genelinde tekrar kullanılan merkezi ayarlar.
// Logo dosyası değiştiğinde yalnızca "path" değerini güncellemeniz yeterlidir;
// header otomatik olarak yeni dosyayı kullanır.

export const logoConfig = {
  // Header logosunun assets/ klasörüne göre yolu.
  // Header'da yalnızca bu logo kullanılır (marka adı ayrıca metin olarak
  // gösterilmez); logo dosyası "as-is" kullanılır, üzerine border/çerçeve/
  // efekt eklenmez.
  path: "assets/Velora Second logo.png",
  alt: "VELORA logosu",
  // Logonun orijinal en/boy oranı korunur (bkz. css/main.css .brand-logo).
  width: 375,
  height: 401
};

export const siteConfig = {
  brandName: "VELORA",
  tagline: "Markanız için sade, hızlı ve etkili web deneyimleri.",
  homeAnchor: "#anasayfa"
};
