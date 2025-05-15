
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      </main>
    </div>
  );
};

export default Landing;
