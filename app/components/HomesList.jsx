"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
const MapView = dynamic(() => import("./MapView"), { ssr: false });

async function fetchHomes(params) {
	const query = new URLSearchParams(params).toString();
	const res = await fetch(`/api/homes?${query}`);
	if (!res.ok) throw new Error("Failed to load homes");
	return res.json();
}

function Stat({ label, value }) {
	return (
		<div className="text-sm text-neutral-300"><span className="text-neutral-500">{label}:</span> {value}</div>
	);
}

export default function HomesList() {
    const [q, setQ] = useState("");
    const [city, setCity] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(6);
    const [data, setData] = useState({ results: [], total: 0, page: 1, pageSize: 6 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

	const cities = useMemo(() => {
		const set = new Set((data.results || []).map((h) => h.city));
		return Array.from(set);
	}, [data.results]);

    const load = async () => {
		setLoading(true);
		setError("");
		try {
            const json = await fetchHomes({ q, city, minPrice: Number(minPrice) || 0, maxPrice: Number(maxPrice) || 0, page, pageSize });
			setData(json);
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		load();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

    const totalPages = Math.max(1, Math.ceil((data.total || (data.results?.length || 0)) / pageSize));

    return (
		<section className="w-full mt-10">
			<h2 className="text-xl font-semibold mb-3">Browse homes</h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
				<input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name" className="w-full sm:w-64 rounded-md border border-black/[.08] dark:border-white/[.145] bg-transparent px-3 py-2" />
				<select value={city} onChange={(e) => setCity(e.target.value)} className="w-full sm:w-48 rounded-md border border-black/[.08] dark:border-white/[.145] bg-transparent px-3 py-2">
					<option value="">All cities</option>
					{cities.map((c) => (
						<option key={c} value={c}>{c}</option>
					))}
				</select>
                <input type="number" min={0} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min price" className="w-full sm:w-40 rounded-md border border-black/[.08] dark:border-white/[.145] bg-transparent px-3 py-2" />
                <input type="number" min={0} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max price" className="w-full sm:w-40 rounded-md border border-black/[.08] dark:border-white/[.145] bg-transparent px-3 py-2" />
                <button onClick={() => { setPage(1); load(); }} className="rounded-md bg-foreground text-background px-4 py-2">Find homes</button>
			</div>

			{error && <div className="mt-3 text-sm text-red-400">{error}</div>}
			{loading && <div className="mt-4 text-sm">Loading...</div>}

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{(data.results || []).map((h) => (
					<div key={h.id} className="rounded-xl border border-black/[.08] dark:border-white/[.145] p-4">
						<div className="flex items-baseline justify-between">
							<h3 className="font-semibold">{h.title}</h3>
							<div className="text-sm">${'{'}h.price.toLocaleString(){'}'}</div>
						</div>
						<div className="mt-1 text-sm text-neutral-400">{h.city}</div>
						<div className="mt-3 flex items-center gap-4">
							<Stat label="Beds" value={h.beds} />
							<Stat label="Baths" value={h.baths} />
						</div>
						<div className="mt-4 flex items-center gap-3">
							<button onClick={async () => fetch('/api/bid', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ homeId: h.id, amount: h.price }) })} className="rounded-full border border-black/[.08] dark:border-white/[.145] px-4 py-1 text-sm">Bid</button>
							<button onClick={async () => fetch('/api/tours', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ homeId: h.id, date: new Date().toISOString(), name: 'Guest', email: 'guest@example.com' }) })} className="rounded-full bg-foreground text-background px-4 py-1 text-sm">Book tour</button>
						</div>
					</div>
				))}
			</div>

            <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-neutral-400">Page {page} of {totalPages}</div>
                <div className="flex items-center gap-2">
                    <button disabled={page <= 1} onClick={() => { const p = Math.max(1, page - 1); setPage(p); setTimeout(load, 0); }} className="rounded-md border border-black/[.08] dark:border-white/[.145] px-3 py-1 text-sm disabled:opacity-50">Prev</button>
                    <button disabled={page >= totalPages} onClick={() => { const p = Math.min(totalPages, page + 1); setPage(p); setTimeout(load, 0); }} className="rounded-md border border-black/[.08] dark:border-white/[.145] px-3 py-1 text-sm disabled:opacity-50">Next</button>
                </div>
            </div>

            <div className="mt-6">
                <MapView points={(data.results || []).map((h) => ({ lat: h.lat, lng: h.lng }))} />
            </div>
		</section>
	);
}
