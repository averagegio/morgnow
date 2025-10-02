export default function MapPlaceholder({ points = [] }) {
	return (
		<div className="w-full h-64 sm:h-80 rounded-xl border border-black/[.08] dark:border-white/[.145] grid place-items-center text-sm text-neutral-400">
			<div>
				<div className="text-neutral-300">Map placeholder</div>
				<div className="mt-1">{points.length} locations</div>
			</div>
		</div>
	);
}
