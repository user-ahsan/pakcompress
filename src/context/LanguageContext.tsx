"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ur" | "roman" | "sd" | "pa";

export interface LanguageOption {
  code: Language;
  label: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "ur", label: "اردو" },
  { code: "roman", label: "Roman Urdu" },
  { code: "sd", label: "سنڌي" },
  { code: "pa", label: "پنجابی" }
];

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    siteTitle: "PakCompress",
    heroTitle: "Compress photo and PDF to exact KB for Pakistan forms",
    heroSubtitle: "Free, fast, and private. Pick 20 KB, 50 KB, 100 KB or 200 KB. Your file never leaves your browser.",
    photoTab: "Photo Compressor",
    photoTabSub: "JPG, PNG to 20, 50, 100, 200 KB",
    pdfTab: "PDF Compressor",
    pdfTabSub: "Challan, Degrees to exact KB",
    passportTab: "Passport Photo Maker",
    passportTabSub: "35 by 45 mm, 413 by 531 px",
    dropPhotoTitle: "Drop your photo here",
    dropPhotoUrdu: "Photo ya signature yahan drop karein, ya click karke photo chunein.",
    dropPhotoLimits: "JPG, PNG, WebP up to 25 MB. Strips EXIF and GPS data.",
    dropPdfTitle: "Drop your PDF here",
    dropPdfUrdu: "PDF document yahan drop karein, ya click karke PDF chunein.",
    dropPdfLimits: "PDF files up to 50 MB. 100% in-browser processing.",
    dropPassportTitle: "Drop photo for passport crop",
    dropPassportUrdu: "Tasweer yahan drop karein passport crop ke liye. Auto crop 35 by 45 mm.",
    dropPassportLimits: "JPG, PNG, WebP up to 25 MB. Converts to 413 by 531 px standard crop.",
    targetSize: "Target size",
    formatLabel: "Output format",
    compressNow: "Compress now",
    compressPhotoBtn: "Compress photo to",
    compressPdfBtn: "Compress PDF to",
    makePassportBtn: "Make passport photo",
    cropBtn: "Crop photo",
    batchPro: "Batch (Pro)",
    downloadPhoto: "Download photo",
    downloadPdf: "Download compressed PDF",
    downloadPassport: "Download passport photo (35x45 mm)",
    freeNote: "Free: 1 file at a time. No upload. Your file never leaves this browser.",
    guides: "Guides",
    pricing: "Pricing"
  },
  ur: {
    siteTitle: "PakCompress",
    heroTitle: "پاکستان فارمز کے لیے فوٹو اور پی ڈی ایف کا درست سائز بنائیں",
    heroSubtitle: "مفت، تیز رفتار اور محفوظ۔ 20، 50، 100 یا 200 KB منتخب کریں۔ فائل آپ کے براؤزر میں رہتی ہے۔",
    photoTab: "فوٹو کمپریسر",
    photoTabSub: "تصویر کو 20، 50، 100، 200 KB بنائیں",
    pdfTab: "پی ڈی ایف کمپریسر",
    pdfTabSub: "چالان، ڈگری اور سرکاری دستاویزات",
    passportTab: "پاسپورٹ سائز فوٹو",
    passportTabSub: "35 ضرب 45 ملی میٹر",
    dropPhotoTitle: "اپنی تصویر یہاں ڈراپ کریں",
    dropPhotoUrdu: "تصویر یا دستخط یہاں ڈراپ کریں، یا کلک کر کے فائل منتخب کریں۔",
    dropPhotoLimits: "جے پی جی، پی این جی 25 MB تک۔ جی پی ایس ڈیٹا خود بخود ہٹ جاتا ہے۔",
    dropPdfTitle: "اپنی پی ڈی ایف فائل یہاں ڈراپ کریں",
    dropPdfUrdu: "پی ڈی ایف دستاویز یہاں ڈراپ کریں، یا کلک کر کے فائل منتخب کریں۔",
    dropPdfLimits: "پی ڈی ایف 50 MB تک۔ فائل آپ کے ڈیوائس پر ہی رہتی ہے۔",
    dropPassportTitle: "پاسپورٹ سائز کے لیے تصویر ڈراپ کریں",
    dropPassportUrdu: "پاسپورٹ کٹ کے لیے تصویر یہاں رکھیں۔ خودکار 35 ضرب 45 ملی میٹر۔",
    dropPassportLimits: "413 ضرب 531 پکسل، سفید بیک گراؤنڈ۔",
    targetSize: "مطلوبہ سائز (KB)",
    formatLabel: "آؤٹ پٹ فارمیٹ",
    compressNow: "کمپریس کریں",
    compressPhotoBtn: "تصویر کمپریس کریں",
    compressPdfBtn: "پی ڈی ایف کمپریس کریں",
    makePassportBtn: "پاسپورٹ فوٹو بنائیں",
    cropBtn: "تصویر کراپ کریں",
    batchPro: "بیچ (Pro)",
    downloadPhoto: "تصویر ڈاؤن لوڈ کریں",
    downloadPdf: "پی ڈی ایف ڈاؤن لوڈ کریں",
    downloadPassport: "پاسپورٹ فوٹو ڈاؤن لوڈ کریں",
    freeNote: "مفت: 1 فائل ایک وقت میں۔ فائل کبھی اپلوڈ نہیں ہوتی۔",
    guides: "رہنمائی",
    pricing: "پلانز"
  },
  roman: {
    siteTitle: "PakCompress",
    heroTitle: "Pakistan forms ke liye photo aur PDF exact KB mein compress karein",
    heroSubtitle: "Muft, tez aur private. 20 KB, 50 KB, 100 KB ya 200 KB chunein. File browser se bahar nahi jati.",
    photoTab: "Photo Compressor",
    photoTabSub: "Photo ko 20, 50, 100, 200 KB banayein",
    pdfTab: "PDF Compressor",
    pdfTabSub: "Challan, Degree aur Documents",
    passportTab: "Passport Photo Maker",
    passportTabSub: "35 by 45 mm, 413 by 531 px",
    dropPhotoTitle: "Photo yahan drop karein",
    dropPhotoUrdu: "Photo ya signature yahan drop karein, ya click karke photo chunein.",
    dropPhotoLimits: "JPG, PNG, WebP up to 25 MB. Strips EXIF and GPS data.",
    dropPdfTitle: "PDF document yahan drop karein",
    dropPdfUrdu: "PDF document yahan drop karein, ya click karke PDF chunein.",
    dropPdfLimits: "PDF files up to 50 MB. 100% in-browser processing.",
    dropPassportTitle: "Passport photo ke liye drop karein",
    dropPassportUrdu: "Tasweer yahan drop karein passport crop ke liye. Auto crop 35 by 45 mm.",
    dropPassportLimits: "JPG, PNG, WebP up to 25 MB. Converts to 413 by 531 px standard crop.",
    targetSize: "Target size (KB)",
    formatLabel: "Output format",
    compressNow: "Compress karein",
    compressPhotoBtn: "Photo compress karein to",
    compressPdfBtn: "PDF compress karein to",
    makePassportBtn: "Passport photo banayein",
    cropBtn: "Crop photo",
    batchPro: "Batch (Pro)",
    downloadPhoto: "Photo download karein",
    downloadPdf: "PDF download karein",
    downloadPassport: "Passport photo download karein",
    freeNote: "Muft: 1 file aik waqt mein. No upload. File device par hi rehti hai.",
    guides: "Guides",
    pricing: "Pricing"
  },
  sd: {
    siteTitle: "PakCompress",
    heroTitle: "پاڪستان فارمن لاءِ فوٽو ۽ پي ڊي ايف جو درست سائيز ٺاهيو",
    heroSubtitle: "مفت، تيز ۽ محفوظ. 20، 50، 100 يا 200 KB چونڊيو. فائيل توهان جي براؤزر ۾ رهي ٿي.",
    photoTab: "فوٽو ڪمپريسر",
    photoTabSub: "تصوير کي 20، 50، 100، 200 KB ٺاهيو",
    pdfTab: "پي ڊي ايف ڪمپريسر",
    pdfTabSub: "چالان، ڊگري ۽ سرڪاري فائيلون",
    passportTab: "پاسپورٽ فوٽو",
    passportTabSub: "35 ضرب 45 ملي ميٽر",
    dropPhotoTitle: "پنهنجي تصوير هتي رکو",
    dropPhotoUrdu: "تصوير يا صحيح هتي ڇڏيو، يا ڪلڪ ڪري چونڊيو.",
    dropPhotoLimits: "JPG، PNG 25 MB تائين. GPS ڊيٽا هٽائي وڃي ٿي.",
    dropPdfTitle: "پنهنجي پي ڊي ايف هتي رکو",
    dropPdfUrdu: "پي ڊي ايف فائيل هتي رکو يا ڪلڪ ڪري چونڊيو.",
    dropPdfLimits: "پي ڊي ايف فائيلون 50 MB تائين. براؤزر ۾ ڪم ڪري ٿو.",
    dropPassportTitle: "پاسپورٽ ڪٽ لاءِ تصوير رکو",
    dropPassportUrdu: "پاسپورٽ تصوير لاءِ هتي فائل رکو. خودڪار 35x45 ملي ميٽر.",
    dropPassportLimits: "413 ضرب 531 پڪسل، اڇو بيڪ گرائونڊ.",
    targetSize: "گهربل سائيز (KB)",
    formatLabel: "فائل فارميٽ",
    compressNow: "ڪمپريس ڪريو",
    compressPhotoBtn: "تصوير ڪمپريس ڪريو",
    compressPdfBtn: "پي ڊي ايف ڪمپريس ڪريو",
    makePassportBtn: "پاسپورٽ فوٽو ٺاهيو",
    cropBtn: "ڪراپ ڪريو",
    batchPro: "بيچ (Pro)",
    downloadPhoto: "تصوير ڊائون لوڊ ڪريو",
    downloadPdf: "پي ڊي ايف ڊائون لوڊ ڪريو",
    downloadPassport: "پاسپورٽ فوٽو ڊائون لوڊ ڪريو",
    freeNote: "مفت: هڪ وقت ۾ 1 فائيل. فائيل توهان جي ڊوائيس تي رهي ٿي.",
    guides: "رهنمائي",
    pricing: "پلان"
  },
  pa: {
    siteTitle: "PakCompress",
    heroTitle: "پاکستان فارماں لئی فوٹو تے پی ڈی ایف دا پکا سائز بناؤ",
    heroSubtitle: "مفت، تیز تے پرائیویٹ۔ 20، 50، 100 یا 200 KB چنو۔ فائل تہاڈے براؤزر وچ ای رہندی اے۔",
    photoTab: "فوٹو کمپریسر",
    photoTabSub: "فوٹو نوں 20، 50، 100، 200 KB بناؤ",
    pdfTab: "پی ڈی ایف کمپریسر",
    pdfTabSub: "چالان، ڈگری تے سرکاری کاغذات",
    passportTab: "پاسپورٹ فوٹو میکر",
    passportTabSub: "35 ضرب 45 ملی میٹر",
    dropPhotoTitle: "اپنی فوٹو ایتھے سٹّو یا چنو",
    dropPhotoUrdu: "فوٹو یا دستخط ایتھے سٹّو یا کلک کر کے چنو۔",
    dropPhotoLimits: "JPG، PNG 25 MB تیکر۔ ڈیوائس تے محفوظ۔",
    dropPdfTitle: "پی ڈی ایف فائل ایتھے سٹّو",
    dropPdfUrdu: "پی ڈی ایف فائل ایتھے سٹّو یا کلک کر کے چنو۔",
    dropPdfLimits: "پی ڈی ایف فائل 50 MB تیکر۔ براؤزر وچ پروسیسنگ۔",
    dropPassportTitle: "پاسپورٹ سائز لئی فوٹو سٹّو",
    dropPassportUrdu: "پاسپورٹ کٹنگ لئی فوٹو ایتھے رکھو۔ 35 ضرب 45 ملی میٹر۔",
    dropPassportLimits: "413 ضرب 531 پکسل، چٹا بیک گراؤنڈ۔",
    targetSize: "لوڑیندا سائز (KB)",
    formatLabel: "فائل فارمیٹ",
    compressNow: "کمپریس کرو",
    compressPhotoBtn: "فوٹو سائز گھٹاؤ",
    compressPdfBtn: "پی ڈی ایف سائز گھٹاؤ",
    makePassportBtn: "پاسپورٹ فوٹو بناؤ",
    cropBtn: "کراپ کرو",
    batchPro: "بیچ موڈ (Pro)",
    downloadPhoto: "فوٹو ڈاؤن لوڈ کرو",
    downloadPdf: "پی ڈی ایف ڈاؤن لوڈ کرو",
    downloadPassport: "پاسپورٹ فوٹو ڈاؤن لوڈ کرو",
    freeNote: "مفت: اک ویلے وچ اک فائل۔ فائل کدی اپلوڈ نئیں ہوندی۔",
    guides: "گائیڈز",
    pricing: "قیمتاں"
  }
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("pakcompress_lang") as Language | null;
    if (saved && (saved === "en" || saved === "ur" || saved === "roman" || saved === "sd" || saved === "pa")) {
      setLangState(saved);
    }
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    try {
      localStorage.setItem("pakcompress_lang", l);
    } catch {}
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
