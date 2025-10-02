import LiveGrid from "../components/LiveGrid";

export const dynamic = "force-dynamic";

export default async function BrowsePage() {
	return (
		<div className="p-8 sm:p-20">
			<h1 className="text-2xl font-bold mb-4">Livestream open houses</h1>
			<LiveGrid />
		</div>
	);
}
