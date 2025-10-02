"use client";

import Image from "next/image";

export default function LogoHeader() {
	return (
		<header className="w-full flex items-center justify-between py-4 px-6">
			<div className="flex items-center gap-3">
				<Image
					src="/morgnowlogo1.jpg"
					alt="morgnow logo"
					width={48}
					height={48}
					priority
					className="rounded"
				/>
				<span className="text-xl font-semibold tracking-wide">morgnow</span>
			</div>
			<nav className="hidden sm:flex items-center gap-6 text-sm">
				<a href="#features" className="hover:underline">Features</a>
				<a href="#about" className="hover:underline">About</a>
				<a href="#contact" className="hover:underline">Contact</a>
			</nav>
		</header>
	);
}
