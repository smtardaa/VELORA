// data/projects.js — "Çalışmalarımız" bölümündeki örnek/demo proje verileri.
//
// Henüz gerçek proje görselleri olmadığı için `image` alanı boş (null)
// bırakılmıştır; bileşenler bunun yerine ikonlu, VELORA tasarım diline
// uygun sade bir görsel-yer-tutucu (placeholder) render eder. Gerçek
// projeler hazır olduğunda yalnızca bu dosyadaki `image` alanını
// doldurmak yeterlidir (örn. image: "assets/proje-1.jpg").
//
// `href`: her kart, Çalışmalarımız görünümünü açıp kendi detay bloğuna
// (aynı id'li <article id="...">) gider (#/calismalarimiz/<id>, bkz.
// js/viewRouter.js) — components/worksDetail.js
// bu id'leri kullanarak detay bloklarını render eder.

export const projectsData = [
  {
    id: "velora-kurumsal",
    name: "VELORA Web & Digital Solutions",
    category: "Kurumsal Web Sitesi",
    icon: "building",
    image: null,
    href: "#/calismalarimiz/velora-kurumsal"
  },
  {
    id: "lumen-kahve",
    name: "Lumen Kahve Dükkanı",
    category: "Restoran & Menü",
    icon: "utensils",
    image: null,
    href: "#/calismalarimiz/lumen-kahve"
  },
  {
    id: "atlas-hukuk",
    name: "Atlas Hukuk Bürosu",
    category: "Kurumsal Web Sitesi",
    icon: "scale",
    image: null,
    href: "#/calismalarimiz/atlas-hukuk"
  },
  {
    id: "fitcore-studyo",
    name: "FitCore Stüdyo",
    category: "Fitness & Spor",
    icon: "dumbbell",
    image: null,
    href: "#/calismalarimiz/fitcore-studyo"
  },
  {
    id: "vera-klinik",
    name: "Vera Cilt Kliniği",
    category: "Sağlık & Klinik",
    icon: "heart",
    image: null,
    href: "#/calismalarimiz/vera-klinik"
  },
  {
    id: "marka-vitrin",
    name: "Marka Vitrin E-Ticaret",
    category: "E-Ticaret",
    icon: "cart",
    image: null,
    href: "#/calismalarimiz/marka-vitrin"
  },
  {
    id: "ada-mimarlik",
    name: "Ada Mimarlık Portfolyo",
    category: "Kişisel Portfolyo",
    icon: "brush",
    image: null,
    href: "#/calismalarimiz/ada-mimarlik"
  }
];
