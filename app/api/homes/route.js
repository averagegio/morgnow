import { NextResponse } from "next/server";
import { searchHomes } from "@/app/lib/homes";

export async function GET(request) {
	const { searchParams } = new URL(request.url);
	const q = searchParams.get("q") || "";
	const city = searchParams.get("city") || "";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 6);
    const { items, total } = searchHomes({ q, city, minPrice, maxPrice, page, pageSize });
    return NextResponse.json({ results: items, total, page, pageSize });
}
