import { NextResponse } from "next/server";
import { placeBid } from "@/app/lib/homes";

export async function POST(request) {
	const body = await request.json().catch(() => ({}));
	try {
		const bid = placeBid(body);
		return NextResponse.json({ bid }, { status: 201 });
	} catch (err) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}
