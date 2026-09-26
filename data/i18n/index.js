// data/i18n/index.js — tüm dillerin çeviri sözlüklerini tek noktada toplar.
// Yeni bir dil eklemek için: bu klasöre "xx.js" dosyası ekleyin (tr.js ile
// birebir aynı anahtar yapısında), aşağıya import edin, "translations"
// nesnesine ekleyin ve data/i18n/languages.js listesine dahil edin.

import { tr } from "./tr.js";
import { en } from "./en.js";
import { de } from "./de.js";
import { fr } from "./fr.js";
import { it } from "./it.js";

export const translations = { tr, en, de, fr, it };
