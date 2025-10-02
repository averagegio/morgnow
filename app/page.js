import Image from "next/image";
import LogoHeader from "./components/LogoHeader";
import Hero from "./components/Hero";
import FeatureGrid from "./components/FeatureGrid";
import HomesList from "./components/HomesList";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <LogoHeader />
      <main className="flex-1 p-8 sm:p-20">
        <Hero />
        <FeatureGrid />
        <HomesList />
      </main>
      <SiteFooter />
    </div>
  );
}
