
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Sync Your Digital Life Across All Devices
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Share text and files between your devices instantly. No more emailing yourself or using 
                messaging apps to transfer content.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/login">
                <Button size="lg" className="animate-fade-in">
                  Get Started
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="animate-fade-in delay-150">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square overflow-hidden rounded-xl hero-gradient animate-pulse-slow">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/80 dark:bg-white/10 rounded-lg shadow-xl transform -rotate-6 animate-slide-up">
                <div className="h-4 w-1/2 bg-primary/20 rounded m-4 mb-2"></div>
                <div className="h-2 w-3/4 bg-primary/10 rounded m-4 mt-0"></div>
              </div>
              <div className="absolute top-1/3 right-1/4 w-40 h-28 bg-white/80 dark:bg-white/10 rounded-lg shadow-xl transform rotate-3 animate-slide-up delay-150">
                <div className="h-3 w-3/4 bg-accent/20 rounded m-4 mb-2"></div>
                <div className="h-2 w-1/2 bg-accent/10 rounded m-4 mt-0"></div>
              </div>
              <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-white/80 dark:bg-white/10 rounded-lg shadow-xl transform rotate-12 animate-slide-up delay-300">
                <div className="h-12 w-12 bg-secondary/30 rounded m-4"></div>
                <div className="h-2 w-2/3 bg-secondary/20 rounded m-4 mt-2"></div>
                <div className="h-2 w-1/2 bg-secondary/20 rounded m-4 mt-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
