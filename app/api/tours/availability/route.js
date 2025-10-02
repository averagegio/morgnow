import { NextResponse } from "next/server";

const slots = [
	{ id: "t1", start: "2025-10-03T14:00:00Z", durationMin: 30 },
	{ id: "t2", start: "2025-10-03T15:00:00Z", durationMin: 30 },
	{ id: "t3", start: "2025-10-04T18:00:00Z", durationMin: 45 },
];

export async function GET() {
	return NextResponse.json({ slots });
}
