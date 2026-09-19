// data/contact.js
// İletişim kanalları. Tüm bilgiler VELORA markasına ait ÖRNEK/placeholder
// değerlerdir; gerçek kişisel bilgi içermez. Gerçek bilgiler netleştiğinde
// yalnızca bu dosya güncellenmelidir; HTML veya diğer JS dosyalarına
// dokunmaya gerek yoktur.
//
// "showInFooter: true" olan kanallar footer'daki sosyal ikon satırında da
// gösterilir.

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
  }
];
