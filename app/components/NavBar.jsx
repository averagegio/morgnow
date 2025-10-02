"use client";

import { useState } from "react";

function Icon({ path, label }) {
	return (
		<svg aria-label={label} role="img" width="22" height="22" viewBox="0 0 24 24" className="shrink-0">
			<path d={path} fill="currentColor" />
		</svg>
	);
}

async function apiJson(url, opts) {
	const res = await fetch(url, { ...opts, headers: { "Content-Type": "application/json" } });
	if (!res.ok) {
		throw new Error((await res.json()).error || "Request failed");
	}
	return res.json();
}

export default function NavBar() {
	const [loading, setLoading] = useState("");
	const [message, setMessage] = useState("");

	const goHome = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		setMessage("Back to top");
	};

    const handleBrowse = () => {
        window.location.href = "/browse";
    };

    const handleBid = () => {
        window.location.href = "/bids";
    };

	const handleBook = async () => {
		setLoading("tour");
		try {
			const { tour } = await apiJson(`/api/tours`, { method: "POST", body: JSON.stringify({ homeId: "h1", date: new Date().toISOString(), name: "Guest", email: "guest@example.com" }) });
			setMessage(`Tour scheduled for ${new Date(tour.date).toLocaleString()}`);
		} catch (e) {
			setMessage(e.message);
		} finally {
			setLoading("");
		}
	};

	return (
		<div className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50">
			<div className="flex items-center gap-6 rounded-full border border-white/20 bg-white/10 dark:bg-white/10 backdrop-blur-md px-6 py-3 shadow-lg ring-1 ring-white/10">
				<button onClick={goHome} className="flex flex-col items-center text-sm" aria-label="Home">
					<Icon label="home" path="M12 3l9 8h-3v10h-12v-10h-3l9-8z" />
					<span>Home</span>
				</button>
				<button onClick={handleBid} className="flex flex-col items-center text-sm" aria-label="Bid">
					<Icon label="auction" path="M7 4h2l8 8-2 2-8-8v-2zm10 10l2 2-4 4h-2v-2l4-4zM3 20h8v2h-8v-2z" />
					<span>{loading === "bid" ? "Bidding..." : "Bid"}</span>
				</button>
				<button onClick={handleBook} className="flex flex-col items-center text-sm" aria-label="Book tour">
					<Icon label="book" path="M4 4h12a2 2 0 0 1 2 2v14l-4-2-4 2-4-2v-14a2 2 0 0 1 2-2z" />
					<span>{loading === "tour" ? "Booking..." : "Book"}</span>
				</button>
				<button onClick={handleBrowse} className="flex flex-col items-center text-sm" aria-label="Browse">
					<Icon label="browse" path="M12 5a7 7 0 0 1 7 7s-3 5-7 5-7-5-7-5 3-7 7-7zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
					<span>{loading === "browse" ? "Loading..." : "Browse"}</span>
				</button>
			</div>
			{message && (
				<div className="mt-2 text-center text-xs text-neutral-300">{message}</div>
			)}
		</div>
	);
}
