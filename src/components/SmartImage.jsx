import { useEffect, useMemo, useRef, useState } from "react";

/**
 * SmartImage (No setState-in-effect warning)
 * - Lazy load via IntersectionObserver (load saat mendekati viewport)
 * - Placeholder selalu ada (tidak blank)
 * - Skeleton saat masih loading
 * - Tidak ada setState sinkron di dalam useEffect body untuk "reset status"
 */
export default function SmartImage({
    src,
    alt = "Product Image",
    className = "",
    imgClassName = "",
    roundedClassName = "rounded-2xl",
    priority = false,
    sizes,
    width,
    height,
}) {
    const containerRef = useRef(null);

    // kapan image boleh mulai diload
    const [shouldLoad, setShouldLoad] = useState(priority);

    // simpan src yang berhasil/gagal (diupdate lewat event onLoad/onError)
    const [loadedSrc, setLoadedSrc] = useState(null);
    const [failedSrc, setFailedSrc] = useState(null);

    const hasSrc = useMemo(() => Boolean(src && String(src).trim()), [src]);

    // Lazy-load: hanya setShouldLoad di callback observer (bukan setState sinkron di effect body)
    useEffect(() => {
        if (priority) return;

        const el = containerRef.current;
        if (!el) return;

        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setShouldLoad(true);
                    io.disconnect();
                }
            },
            { root: null, rootMargin: "300px", threshold: 0.01 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, [priority]);

    const isLoaded = hasSrc && loadedSrc === src;
    const isFailed = hasSrc && failedSrc === src;
    const isPending = shouldLoad && hasSrc && !isLoaded && !isFailed;

    // Placeholder tampil kalau: belum boleh load / src kosong / gagal / belum loaded untuk src ini
    const showPlaceholder = !shouldLoad || !hasSrc || isFailed || !isLoaded;

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden bg-slate-100 ${roundedClassName} ${className}`}
        >
            {/* Skeleton saat pending */}
            {isPending && <div className="absolute inset-0 animate-pulse bg-slate-200" />}

            {/* Gambar hanya dirender saat boleh load & ada src */}
            {shouldLoad && hasSrc && !isFailed && (
                <img
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"
                        } ${imgClassName}`}
                    loading={priority ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={priority ? "high" : "auto"}
                    referrerPolicy="no-referrer"
                    sizes={sizes}
                    width={width}
                    height={height}
                    onLoad={() => {
                        setLoadedSrc(src);
                        // kalau sebelumnya src ini pernah gagal, bersihkan status gagal
                        if (failedSrc === src) setFailedSrc(null);
                    }}
                    onError={() => {
                        setFailedSrc(src);
                    }}
                />
            )}

            {/* Placeholder */}
            {showPlaceholder && (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-cyan-100">
                    <div className="text-center px-4">
                        <div className="mx-auto w-12 h-12 rounded-2xl bg-white/70 border flex items-center justify-center">
                            <span className="text-indigo-700 font-extrabold">LCD</span>
                        </div>
                        <div className="mt-2 text-xs text-slate-600 line-clamp-2">{alt}</div>
                        <div className="mt-1 text-[11px] text-slate-500">
                            {!shouldLoad
                                ? "Loading…"
                                : !hasSrc
                                    ? "Tempel URL gambar"
                                    : isFailed
                                        ? "Gambar gagal dimuat"
                                        : "Loading…"}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
