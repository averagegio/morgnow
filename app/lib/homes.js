export const homes = [
	{ id: "h1", title: "Modern loft", city: "Austin", price: 520000, beds: 2, baths: 2, lat: 30.27, lng: -97.74 },
	{ id: "h2", title: "Cozy bungalow", city: "Seattle", price: 690000, beds: 3, baths: 2, lat: 47.61, lng: -122.33 },
	{ id: "h3", title: "Downtown condo", city: "Miami", price: 450000, beds: 1, baths: 1, lat: 25.76, lng: -80.19 },
	{ id: "h4", title: "Family house", city: "Denver", price: 780000, beds: 4, baths: 3, lat: 39.74, lng: -104.99 },
];

export function searchHomes({ q, city, minPrice, maxPrice, page = 1, pageSize = 6 }) {
    const query = (q || "").toLowerCase();
    const min = Number.isFinite(Number(minPrice)) ? Number(minPrice) : 0;
    const max = Number.isFinite(Number(maxPrice)) && Number(maxPrice) > 0 ? Number(maxPrice) : Number.MAX_SAFE_INTEGER;
    const filtered = homes.filter((h) => {
        const matchesQuery = !query || h.title.toLowerCase().includes(query);
        const matchesCity = !city || h.city.toLowerCase() === city.toLowerCase();
        const matchesMin = h.price >= min;
        const matchesMax = h.price <= max;
        return matchesQuery && matchesCity && matchesMin && matchesMax;
    });
    const total = filtered.length;
    const start = (Math.max(1, Number(page)) - 1) * Math.max(1, Number(pageSize));
    const end = start + Math.max(1, Number(pageSize));
    return { items: filtered.slice(start, end), total };
}

export function placeBid({ homeId, amount, user }) {
	if (!homeId || !amount) {
		throw new Error("homeId and amount are required");
	}
	return { id: `bid_${Date.now()}`, homeId, amount: Number(amount), user: user || "guest", status: "received" };
}

export function bookTour({ homeId, date, name, email }) {
	if (!homeId || !date || !name || !email) {
		throw new Error("homeId, date, name, email are required");
	}
	return { id: `tour_${Date.now()}`, homeId, date, name, email, status: "scheduled" };
}
