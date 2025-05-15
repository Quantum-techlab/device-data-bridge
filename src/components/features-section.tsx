
import { Laptop, Smartphone, RefreshCw, UploadCloud, Clock } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <RefreshCw className="h-10 w-10 text-primary" />,
      title: "Seamless Sync",
      description: "Copy on one device, paste on another. Your clipboard follows you everywhere."
    },
    {
      icon: <UploadCloud className="h-10 w-10 text-primary" />,
      title: "Easy File Transfer",
      description: "Upload files from any device and access them anywhere without email or cables."
    },
    {
      icon: <Laptop className="h-10 w-10 text-primary" />,
      title: "Device Freedom",
      description: "Works across all your devices - computers, tablets, and phones."
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Instant Access",
      description: "No waiting for syncs or transfers. Everything is available immediately."
    },
    {
      icon: <Smartphone className="h-10 w-10 text-primary" />,
      title: "Mobile Friendly",
      description: "Fully responsive design that works perfectly on smaller screens."
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything You Need For <span className="text-gradient">Cross-Device Sync</span>
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform makes sharing content between all your devices simple and seamless.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center space-y-4 rounded-lg border p-4 gradient-card animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-2 rounded-full bg-secondary/70">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
