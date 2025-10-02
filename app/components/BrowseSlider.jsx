"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { homes } from "@/app/lib/homes";

export default function BrowseSlider() {
	const trackRef = useRef(null);

	useEffect(() => {
		const track = trackRef.current;
		if (!track) return;
		let animId;
		let offset = 0;
		const speed = 0.6;
		const step = () => {
			offset -= speed;
			const width = track.scrollWidth / 2;
			if (Math.abs(offset) >= width) offset = 0;
			track.style.transform = `translateX(${offset}px)`;
			animId = requestAnimationFrame(step);
		};
		animId = requestAnimationFrame(step);
		return () => cancelAnimationFrame(animId);
	}, []);

	const items = [...homes, ...homes];

	return (
		<div className="w-full overflow-hidden">
			<div ref={trackRef} className="flex items-center gap-4 px-1 sm:px-3 will-change-transform" style={{ width: "max-content" }}>
				{items.map((h, i) => (
					<div key={`${h.id}-${i}`} className="relative h-40 sm:h-52 w-64 sm:w-96 shrink-0 overflow-hidden rounded-xl shadow-lg">
						<Image src={h.image} alt={h.title} fill className="object-cover" sizes="(min-width:640px) 384px, 64vw" />
						<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white text-xs sm:text-sm">
							<div className="flex items-baseline justify-between">
								<div className="font-medium">{h.title}</div>
								<div>${'{'}h.price.toLocaleString(){'}'}</div>
							</div>
							<div className="opacity-85">{h.city}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
