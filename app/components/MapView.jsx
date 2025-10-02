"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
if (TOKEN) {
	mapboxgl.accessToken = TOKEN;
}

export default function MapView({ points = [] }) {
	const mapRef = useRef(null);
	const containerRef = useRef(null);
	const [error, setError] = useState("");

	const hasToken = Boolean(TOKEN && TOKEN.startsWith("pk."));

	useEffect(() => {
		if (!hasToken) return;
		if (!containerRef.current) return;
		try {
			if (!mapRef.current) {
				mapRef.current = new mapboxgl.Map({
					container: containerRef.current,
					style: "mapbox://styles/mapbox/streets-v12",
					center: [-96.9, 37.8],
					zoom: 3.2,
				});
			}
			const map = mapRef.current;
			const markers = points
				.filter((p) => Number.isFinite(p.lng) && Number.isFinite(p.lat))
				.map((p) => new mapboxgl.Marker().setLngLat([p.lng, p.lat]).addTo(map));

			return () => {
				markers.forEach((m) => m.remove());
			};
		} catch (e) {
			setError(e?.message || "Failed to initialize map");
		}
	}, [points, hasToken]);

	if (!hasToken) {
		return (
			<div className="w-full h-64 sm:h-80 rounded-xl border border-black/[.08] dark:border-white/[.145] grid place-items-center text-sm text-neutral-400">
				Enable map by setting NEXT_PUBLIC_MAPBOX_TOKEN.
			</div>
		);
	}

	return (
		<div className="relative">
			<div ref={containerRef} className="w-full h-64 sm:h-80 rounded-xl overflow-hidden" />
			{error && (
				<div className="absolute inset-x-0 bottom-2 mx-auto w-max rounded bg-black/70 px-3 py-1 text-xs text-white">
					{error}
				</div>
			)}
		</div>
	);
}
