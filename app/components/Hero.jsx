"use client";

import { useState } from "react";

export default function Hero() {
    const [term, setTerm] = useState(() => {
        if (typeof window === "undefined") return "";
        const sp = new URLSearchParams(window.location.search);
        return sp.get("q") || "";
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeof window === "undefined") return;
        const sp = new URLSearchParams(window.location.search);
        sp.set("q", term || "");
        sp.set("page", "1");
        const url = `${window.location.pathname}?${sp.toString()}#homes`;
        window.history.pushState({}, "", url);
        window.dispatchEvent(new Event("homes:search"));
        const el = document.getElementById("homes");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="w-full text-center py-6 sm:py-10">
            <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-2xl border border-black/[.08] dark:border-white/[.145] bg-black">
                <video
                    src="/morgnowgifreel1.mp4"
                    className="w-full h-auto object-contain max-h-[360px] sm:max-h-[480px]"
                    autoPlay
                    muted
                    playsInline
                    loop
                    poster="/morgnowlogo1.jpg"
                />
            </div>
            <h1 className="mt-5 text-2xl sm:text-4xl font-bold tracking-tight">Find your next home, now</h1>
            <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-[60ch] mx-auto">
                Morgnow helps you discover properties quickly with a clean, fast experience.
            </p>
            <form onSubmit={handleSubmit} className="mt-5 mx-auto flex w-full max-w-xl items-center gap-2">
                <input
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search by name or city"
                    className="flex-1 rounded-md border border-black/[.08] dark:border-white/[.145] bg-transparent px-3 py-2"
                    aria-label="Search homes"
                />
                <button type="submit" className="rounded-md bg-foreground text-background px-4 py-2">Search</button>
            </form>
        </section>
    );
}
