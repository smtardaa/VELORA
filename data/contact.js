// data/contact.js
// İletişim kanalları. Tüm bilgiler VELORA markasına ait ÖRNEK/placeholder
// değerlerdir; gerçek kişisel bilgi içermez. Gerçek bilgiler netleştiğinde
// yalnızca bu dosya güncellenmelidir; HTML veya diğer JS dosyalarına
// dokunmaya gerek yoktur.
//
// "showInFooter: true" olan kanallar footer'daki sosyal ikon satırında da
// gösterilir.

// ---------------------------------------------------------------------
// LinkedIn / GitHub profil adresleri — TEK DÜZENLEME NOKTASI
// ---------------------------------------------------------------------
// Gerçek profil adresleri henüz verilmedi; bu yüzden alanlar BİLİNÇLİ
// olarak boş bırakıldı ("#", ana sayfaya dönen sahte bir bağlantı veya
// uydurma bir profil KULLANILMAZ).
//
// Alan boşken: kanal, İletişim bölümünde ve footer'da görsel olarak
// yerinde durur ama tıklanabilir bir bağlantı gibi davranmaz —
// components/contact.js onu href'siz bir <a role="link"
// aria-disabled="true"> olarak çizer (tab sırasına girmez, tıklanamaz,
// ekran okuyuculara "devre dışı bağlantı" olarak bildirilir) ve kartta
// "Yakında eklenecek" yazar.
//
// Gerçek adres girildiğinde (ör. "https://www.linkedin.com/company/..."),
// ek bir değişiklik gerekmeden normal, yeni sekmede açılan bir bağlantıya
// dönüşür.
export const socialProfileUrls = {
  linkedin: "",
  github: ""
};

// Not: whatsapp/instagram/facebook/tiktok/telegram kanalları ÖNCEDEN BERİ
// "#" placeholder'ı kullanıyor; kullanıcı isteği doğrultusunda (var olan
// sosyal bağlantılar değiştirilmesin diye) bu beşine dokunulmadı.

export const contactChannels = [
  {
    id: "email",
    name: "E-posta",
    icon: "mail",
    value: "info@velora.example",
    href: "mailto:info@velora.example"
  },
  {
    id: "phone",
    name: "Telefon",
    icon: "phone",
    value: "+90 (5xx) xxx xx xx",
    href: "tel:+905xxxxxxxx"
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: "whatsapp",
    value: "+90 (5xx) xxx xx xx",
    href: "#",
    showInFooter: true
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "instagram",
    value: "@velora.studio",
    href: "#",
    showInFooter: true
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "facebook",
    value: "/velora.digital",
    href: "#",
    showInFooter: true
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "tiktok",
    value: "@velora.team",
    href: "#",
    showInFooter: true
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: "telegram",
    value: "@velorasupport",
    href: "#",
    showInFooter: true
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "linkedin",
    // Kartta gösterilecek kısa metin (ör. "/company/velora"). Boş
    // bırakılırsa, adres girildiğinde adresin kendisi gösterilir.
    value: "",
    href: socialProfileUrls.linkedin,
    showInFooter: true
  },
  {
    id: "github",
    name: "GitHub",
    icon: "github",
    value: "",
    href: socialProfileUrls.github,
    showInFooter: true
  }
];
