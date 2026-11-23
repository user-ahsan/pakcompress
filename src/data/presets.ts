export interface PortalPreset {
  slug: string;
  name: string;
  fullName: string;
  photoKB: number;
  signatureKB: number;
  pdfKB: number;
  width: number;
  height: number;
  note: string;
}

// Limits below are TYPICAL limits seen on forms in Pakistan. They are not
// official rules. Always check the official advertisement, because
// requirements change from one post to the next.
export const PORTAL_PRESETS: PortalPreset[] = [
  { slug: "fpsc", name: "FPSC", fullName: "Federal Public Service Commission", photoKB: 50, signatureKB: 20, pdfKB: 200, width: 413, height: 531, note: "FPSC online forms often ask for a photo under 50 KB and a signature under 20 KB." },
  { slug: "ppsc", name: "PPSC", fullName: "Punjab Public Service Commission", photoKB: 50, signatureKB: 20, pdfKB: 200, width: 413, height: 531, note: "PPSC forms in Punjab often ask for a photo under 50 KB." },
  { slug: "spsc", name: "SPSC", fullName: "Sindh Public Service Commission", photoKB: 50, signatureKB: 20, pdfKB: 200, width: 413, height: 531, note: "SPSC forms often use the same photo limits as other provincial commissions." },
  { slug: "kppsc", name: "KPPSC", fullName: "Khyber Pakhtunkhwa Public Service Commission", photoKB: 50, signatureKB: 20, pdfKB: 200, width: 413, height: 531, note: "KPPSC forms often ask for a photo under 50 KB." },
  { slug: "bpsc", name: "BPSC", fullName: "Balochistan Public Service Commission", photoKB: 50, signatureKB: 20, pdfKB: 200, width: 413, height: 531, note: "BPSC forms often ask for a photo under 50 KB." },
  { slug: "nts", name: "NTS", fullName: "National Testing Service", photoKB: 50, signatureKB: 20, pdfKB: 200, width: 200, height: 250, note: "NTS test forms often ask for a small photo, at times 200 by 250 px and under 50 KB." },
  { slug: "nadra", name: "NADRA", fullName: "National Database and Registration Authority", photoKB: 20, signatureKB: 20, pdfKB: 500, width: 413, height: 531, note: "NADRA uploads at times ask for a photo under 20 KB. Check the exact page before you upload." },
  { slug: "hec", name: "HEC", fullName: "Higher Education Commission Pakistan", photoKB: 100, signatureKB: 50, pdfKB: 500, width: 413, height: 531, note: "HEC attestation and scholarship portals often accept a photo under 100 KB." },
  { slug: "bise-lahore", name: "BISE Lahore", fullName: "Board of Intermediate and Secondary Education Lahore", photoKB: 50, signatureKB: 20, pdfKB: 200, width: 200, height: 250, note: "BISE exam forms often ask for a photo under 50 KB." },
  { slug: "bise-karachi", name: "BISE Karachi", fullName: "Board of Intermediate and Secondary Education Karachi", photoKB: 50, signatureKB: 20, pdfKB: 200, width: 200, height: 250, note: "BISE Karachi exam forms often ask for a photo under 50 KB." },
  { slug: "uhs", name: "UHS", fullName: "University of Health Sciences Lahore", photoKB: 100, signatureKB: 50, pdfKB: 500, width: 413, height: 531, note: "UHS admission forms often ask for a photo under 100 KB." },
  { slug: "nust", name: "NUST", fullName: "National University of Sciences and Technology", photoKB: 100, signatureKB: 50, pdfKB: 500, width: 413, height: 531, note: "NUST admission forms often ask for a photo under 100 KB." },
  { slug: "lums", name: "LUMS", fullName: "Lahore University of Management Sciences", photoKB: 200, signatureKB: 50, pdfKB: 500, width: 413, height: 531, note: "LUMS admission forms often accept a photo under 200 KB." },
  { slug: "pu", name: "PU", fullName: "University of the Punjab", photoKB: 100, signatureKB: 50, pdfKB: 500, width: 413, height: 531, note: "Punjab University admission forms often ask for a photo under 100 KB." },
  { slug: "iba", name: "IBA", fullName: "Institute of Business Administration Karachi", photoKB: 100, signatureKB: 50, pdfKB: 500, width: 413, height: 531, note: "IBA admission forms often ask for a photo under 100 KB." }
];

export const SIZES = [20, 50, 100, 200, 500];

export function getPortal(slug: string): PortalPreset | undefined {
  return PORTAL_PRESETS.find((p) => p.slug === slug);
}
