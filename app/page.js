import Image from "next/image";
import LogoHeader from "./components/LogoHeader";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import FeatureGrid from "./components/FeatureGrid";
import HomeSlider from "./components/HomeSlider";
import HomesList from "./components/HomesList";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Fixed top-half black viewport with hero video */}
      <div className="fixed inset-x-0 top-0 h-[50vh] bg-black z-0">
        <div className="absolute inset-0">
          <Hero />
        </div>
        <div className="relative z-10">
          <LogoHeader />
        </div>
      </div>
      <main className="flex-1 p-8 sm:p-20 pt-[52vh] relative z-10">
        <div className="mt-6">
          <HomeSlider />
        </div>
        <div className="max-w-xl mx-auto my-6">
          <SearchBar />
        </div>
        <FeatureGrid />
        <HomesList />
      </main>
      <SiteFooter />
    </div>
  );
}
