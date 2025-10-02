"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { homes } from "@/app/lib/homes";

export default function HomeSlider() {
	const trackRef = useRef(null);

	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;
		let animId;
		let offset = 0;
		const speed = 0.5; // px per frame
		const step = () => {
			offset -= speed;
			const width = track.scrollWidth / 2; // because we duplicate content
			if (Math.abs(offset) >= width) offset = 0;
			track.style.transform = `translateX(${offset}px)`;
			animId = requestAnimationFrame(step);
		};
		animId = requestAnimationFrame(step);
		return () => cancelAnimationFrame(animId);
	}, []);

	const items = [...homes, ...homes];

	return (
		<div className="w-full overflow-hidden rounded-2xl border border-black/[.08] dark:border-white/[.145]">
			<div ref={trackRef} className="flex items-center gap-4 p-3 will-change-transform" style={{ width: "max-content" }}>
				{items.map((h, i) => (
					<div key={`${h.id}-${i}`} className="relative h-40 w-72 shrink-0 overflow-hidden rounded-xl">
						<Image src={h.image} alt={h.title} fill className="object-cover" sizes="288px" />
						<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-xs text-white">
							<div className="font-medium">{h.title}</div>
							<div className="opacity-80">{h.city} â€¢ ${'{'}h.price.toLocaleString(){'}'}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
