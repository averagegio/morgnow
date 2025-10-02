"use client";

import { useEffect, useState } from "react";

export default function BidList() {
	const [data, setData] = useState({ results: [] });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch(`/api/homes`);
				const json = await res.json();
				setData(json);
			} catch (e) {
				setError("Failed to load homes");
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) return <div>Loading homesâ€¦</div>;
	if (error) return <div className="text-red-400">{error}</div>;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{(data.results || []).map((h) => (
				<div key={h.id} className="group relative overflow-hidden rounded-xl border border-black/[.08] dark:border-white/[.145]">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={h.image} alt={h.title} className="h-48 w-full object-cover" />
					<div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
						<div className="flex items-baseline justify-between">
							<h3 className="font-semibold text-sm sm:text-base">{h.title}</h3>
							<div className="text-xs sm:text-sm">${'{'}h.price.toLocaleString(){'}'}</div>
						</div>
						<div className="text-[11px] sm:text-xs opacity-85">{h.city} â€¢ {h.beds} bd â€¢ {h.baths} ba</div>
						<div className="mt-2 flex items-center gap-2">
							<button onClick={async () => fetch('/api/bid', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ homeId: h.id, amount: h.price }) })} className="rounded-full bg-white/90 text-black px-3 py-1 text-[11px] sm:text-xs hover:bg-white">Place bid</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
