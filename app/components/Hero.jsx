"use client";

export default function Hero() {
    return (
        <div className="relative h-full w-full">
            <video
                src="/morgnowgifreel1.mp4"
                className="w-full h-full object-contain"
                autoPlay
                muted
                playsInline
                loop
                poster="/morgnowlogo1.jpg"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
        </div>
    );
}
