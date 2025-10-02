import { NextResponse } from "next/server";
import { bookTour } from "@/app/lib/homes";

export async function POST(request) {
	const body = await request.json().catch(() => ({}));
	try {
		const tour = bookTour(body);
		return NextResponse.json({ tour }, { status: 201 });
	} catch (err) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}
