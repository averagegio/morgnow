export default function Hero() {
	return (
		<section className="w-full text-center py-6 sm:py-10">
			<div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-2xl border border-black/[.08] dark:border-white/[.145] bg-black">
				<video
					src="/morgnowgifreel1.mp4"
					className="w-full h-auto object-contain max-h-[360px] sm:max-h-[480px]"
					autoPlay
					muted
					playsInline
					loop
					poster="/morgnowlogo1.jpg"
				/>
			</div>
			<h1 className="mt-5 text-2xl sm:text-4xl font-bold tracking-tight">Find your next home, now</h1>
			<p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-[60ch] mx-auto">
				Morgnow helps you discover properties quickly with a clean, fast experience.
			</p>
			<div className="mt-5 flex items-center justify-center gap-3">
				<a href="#features" className="rounded-full bg-foreground text-background px-5 py-2 text-sm sm:text-base hover:opacity-90">Explore features</a>
				<a href="#contact" className="rounded-full border border-black/[.08] dark:border-white/[.145] px-5 py-2 text-sm sm:text-base hover:bg-black/[.04] dark:hover:bg-white/[.06]">Contact us</a>
			</div>
		</section>
	);
}
