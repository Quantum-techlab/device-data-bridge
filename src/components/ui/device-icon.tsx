
import React from "react";
import { Laptop, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeviceIconProps {
  deviceType: "PC" | "Phone";
  className?: string;
}

const DeviceIcon: React.FC<DeviceIconProps> = ({ deviceType, className }) => {
  return (
    <div className={cn("device-icon", className)}>
      {deviceType === "PC" ? (
        <Laptop className="h-4 w-4" />
      ) : (
        <Smartphone className="h-4 w-4" />
      )}
    </div>
  );
};

export default DeviceIcon;
