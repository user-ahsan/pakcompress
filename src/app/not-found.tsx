import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-3 text-slate-600">This page does not exist. Use the compressor on the home page instead.</p>
      <Link href="/" className="mt-6 inline-block rounded-lg bg-pak px-5 py-3 text-white">Go home</Link>
    </div>
  );
}
