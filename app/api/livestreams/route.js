import { NextResponse } from "next/server";

const streams = [
	{ id: "s1", title: "Open House: Austin Loft", live: true, thumbnail: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop" },
	{ id: "s2", title: "Tour: Seattle Bungalow", live: false, thumbnail: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop" },
	{ id: "s3", title: "Downtown Condo Live", live: true, thumbnail: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop" },
];

export async function GET() {
	return NextResponse.json({ streams });
}
