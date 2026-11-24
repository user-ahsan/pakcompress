import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy - Files stay in your browser | PakCompress",
  description: "PakCompress works in your browser. Your photo and PDF never leave your device, and no account is needed for the free tool.",
  alternates: { canonical: "/privacy" }
};

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Privacy</h1>
      <p className="mt-4">PakCompress works in your browser. Your photo and PDF never leave your device. We do not upload, store, or share your files. Close the tab and the file is gone from memory.</p>
      <p className="mt-4">We do not ask for an account to use the free tool. If you pay for Pro in future, the payment provider will handle your payment details. We do not see your card number.</p>
      <p className="mt-4">This site may use simple, privacy-friendly analytics in future to count page views. It will not track your files.</p>
    </div>
  );
}
