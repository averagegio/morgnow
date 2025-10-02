import Image from "next/image";

const features = [
	{
		title: "Instant search",
		desc: "Filter by location, price, and amenities in milliseconds.",
		icon: "/window.svg",
	},
	{
		title: "Smart insights",
		desc: "Market trends and neighborhood stats to guide decisions.",
		icon: "/globe.svg",
	},
	{
		title: "Seamless tours",
		desc: "Book virtual or inâ€‘person tours straight from listings.",
		icon: "/file.svg",
	},
];

export default function FeatureGrid() {
	return (
		<section id="features" className="w-full py-8 sm:py-16">
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
				{features.map((f) => (
					<div key={f.title} className="rounded-xl border border-black/[.08] dark:border-white/[.145] p-5">
						<div className="flex items-center gap-3">
							<Image src={f.icon} alt="" width={20} height={20} aria-hidden />
							<h3 className="font-semibold">{f.title}</h3>
						</div>
						<p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{f.desc}</p>
					</div>
				))}
			</div>
		</section>
	);
}
