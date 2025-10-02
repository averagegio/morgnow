"use client";

import { useRouter } from "next/navigation";
import BidList from "../components/BidList";

export default function BidsPage() {
    const router = useRouter();
    return (
        <div className="p-8 sm:p-20">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Place a bid</h1>
                <button onClick={() => router.back()} className="rounded-md border border-black/[.08] dark:border-white/[.145] px-3 py-1 text-sm">Back</button>
            </div>
            <BidList />
        </div>
    );
}
