"use client";

import { useEffect, useState } from "react";

export default function LiveGrid() {
	const [streams, setStreams] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch("/api/livestreams");
				const json = await res.json();
				setStreams(json.streams || []);
			} catch (e) {
				setError("Failed to load streams");
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) return <div>Loading streamsâ€¦</div>;
	if (error) return <div className="text-red-400">{error}</div>;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{streams.map((s) => (
				<a key={s.id} href="#" className="group relative overflow-hidden rounded-xl border border-black/[.08] dark:border-white/[.145]">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={s.thumbnail} alt="" className="h-48 w-full object-cover" />
					<div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
						<div className="flex items-center gap-2">
							{ s.live && <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-[11px] font-medium">â— Live</span> }
							<h3 className="font-semibold text-sm sm:text-base">{s.title}</h3>
						</div>
					</div>
				</a>
			))}
		</div>
	);
}
