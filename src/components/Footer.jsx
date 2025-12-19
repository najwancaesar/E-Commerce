export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="font-bold">LCD — Local Central Digital</div>
            <div className="text-sm text-slate-600">
              Toko online perangkat digital untuk kebutuhan belajar, kerja, dan hiburan.
            </div>
          </div>

          <div className="text-sm text-slate-600">
            © {new Date().getFullYear()} <b>PT Local Central Digital</b>. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
