"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ur";

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
    dropPhoto: "Drop your photo here",
    dropPdf: "Drop your PDF document here",
    dropPassport: "Drop photo for passport crop",
    targetSize: "Target size",
    compressNow: "Compress now",
    cropTool: "Crop photo",
    cropSquare: "1:1 Square",
    cropPassport: "35:45 Passport",
    cropFree: "Free Crop",
    cropApply: "Apply Crop",
    cropReset: "Reset",
    batchPro: "Batch (Pro)",
    download: "Download",
    guides: "Guides",
    pricing: "Pricing",
    freeBadge: "Free - 1 file",
    noUploadBadge: "No upload",
    mobileBadge: "Works on mobile"
  },
  ur: {
    siteTitle: "PakCompress",
    heroTitle: "پاکستان فارمز کے لیے فوٹو اور پی ڈی ایف کا درست سائز بنائیں",
    heroSubtitle: "مفت، تیز رفتار اور محفوظ۔ 20، 50، 100 یا 200 KB منتخب کریں۔ فائل آپ کے براؤزر میں رہتی ہے۔",
    photoTab: "فوٹو کمپریسر",
    photoTabSub: "تصویر کو 20، 50، 100، 200 KB بنائیں",
    pdfTab: "پی ڈی ایف کمپریسر",
    pdfTabSub: "چالان، ڈگری اور دستاویزات کا سائز کم کریں",
    passportTab: "پاسپورٹ سائز فوٹو",
    passportTabSub: "35 ضرب 45 ملی میٹر، سفید بیک گراؤنڈ",
    dropPhoto: "اپنی تصویر یہاں ڈراپ کریں",
    dropPdf: "اپنی پی ڈی ایف فائل یہاں ڈراپ کریں",
    dropPassport: "پاسپورٹ کٹ کے لیے تصویر یہاں ڈراپ کریں",
    targetSize: "مطلوبہ سائز (KB)",
    compressNow: "کمپریس کریں",
    cropTool: "تصویر کراپ کریں",
    cropSquare: "1:1 اسکوائر (مربع)",
    cropPassport: "35:45 پاسپورٹ سائز",
    cropFree: "آزاد کراپ",
    cropApply: "کراپ لاگو کریں",
    cropReset: "دوبارہ شروع کریں",
    batchPro: "ایک ساتھ زیادہ فائلیں (Pro)",
    download: "ڈاؤن لوڈ کریں",
    guides: "رہنمائی",
    pricing: "پلانز",
    freeBadge: "مفت - 1 فائل",
    noUploadBadge: "کوئی اپلوڈ نہیں",
    mobileBadge: "موبائل پر کام کرتا ہے"
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
    if (saved === "en" || saved === "ur") {
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
