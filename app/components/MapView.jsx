"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export default function MapView({ points = [] }) {
	const mapRef = useRef(null);
	const containerRef = useRef(null);

	useEffect(() => {
		if (!containerRef.current) return;
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
	}, [points]);

	return <div ref={containerRef} className="w-full h-64 sm:h-80 rounded-xl overflow-hidden" />;
}
