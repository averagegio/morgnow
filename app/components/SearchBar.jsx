"use client";

import { useState } from "react";

export default function SearchBar() {
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
		<form onSubmit={handleSubmit} className="flex w-full max-w-xl items-center gap-2">
			<input
				value={term}
				onChange={(e) => setTerm(e.target.value)}
				placeholder="Search by name or city"
				className="flex-1 rounded-md border border-black/[.08] dark:border-white/[.145] bg-black/50 text-white placeholder:text-neutral-400 px-3 py-2 backdrop-blur"
				aria-label="Search homes"
			/>
			<button type="submit" className="rounded-md bg-foreground text-background px-4 py-2">Search</button>
		</form>
	);
}
