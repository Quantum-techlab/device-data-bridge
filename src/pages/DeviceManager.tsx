
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Smartphone, Laptop, Edit, Trash, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Device {
  id: string;
  name: string;
  type: "PC" | "Phone" | "Tablet";
  lastActive: Date;
  isCurrentDevice: boolean;
}

const DeviceManager = () => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      name: "Work Laptop",
      type: "PC",
      lastActive: new Date(),
      isCurrentDevice: true
    },
    {
      id: "2",
      name: "iPhone 13",
      type: "Phone",
      lastActive: new Date(Date.now() - 1000 * 60 * 30),
      isCurrentDevice: false
    },
    {
      id: "3",
      name: "Home Desktop",
      type: "PC",
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24),
      isCurrentDevice: false
    }
  ]);

  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState<"PC" | "Phone" | "Tablet">("PC");
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddDevice = () => {
    if (!deviceName.trim()) {
      toast.error("Device name is required");
      return;
    }

    const newDevice: Device = {
      id: Date.now().toString(),
      name: deviceName,
      type: deviceType,
      lastActive: new Date(),
      isCurrentDevice: false
    };

    setDevices([...devices, newDevice]);
    setDeviceName("");
    setDeviceType("PC");
    setIsDialogOpen(false);
    toast.success("Device added successfully");
  };

  const handleEditDevice = (device: Device) => {
    setEditingDevice(device);
    setDeviceName(device.name);
    setDeviceType(device.type);
    setIsDialogOpen(true);
  };

  const handleUpdateDevice = () => {
    if (!deviceName.trim() || !editingDevice) return;

    const updatedDevices = devices.map(device => 
      device.id === editingDevice.id 
        ? { ...device, name: deviceName, type: deviceType }
        : device
    );

    setDevices(updatedDevices);
    setEditingDevice(null);
    setDeviceName("");
    setDeviceType("PC");
    setIsDialogOpen(false);
    toast.success("Device updated successfully");
  };

  const handleRemoveDevice = (id: string) => {
    setDevices(devices.filter(device => device.id !== id));
    toast.success("Device removed successfully");
  };

  const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "PC":
        return <Laptop className="h-10 w-10" />;
      case "Phone":
      case "Tablet":
      default:
        return <Smartphone className="h-10 w-10" />;
    }
  };

  return (
    <div className="container py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Devices</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Device
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingDevice ? "Edit Device" : "Add New Device"}</DialogTitle>
              <DialogDescription>
                {editingDevice 
                  ? "Update your device details below." 
                  : "Add a new device to your account."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="device-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="device-name"
                  value={deviceName}
                  onChange={e => setDeviceName(e.target.value)}
                  placeholder="e.g. Work Laptop"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="device-type" className="text-right">
                  Type
                </Label>
                <Select 
                  value={deviceType} 
                  onValueChange={(value) => setDeviceType(value as "PC" | "Phone" | "Tablet")}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select device type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PC">PC / Laptop</SelectItem>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="Tablet">Tablet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              {editingDevice ? (
                <Button onClick={handleUpdateDevice}>Update Device</Button>
              ) : (
                <Button onClick={handleAddDevice}>Add Device</Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {devices.map(device => (
          <Card key={device.id} className="animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-secondary/50 flex items-center justify-center">
                  {getDeviceIcon(device.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="text-xl font-medium">{device.name}</h3>
                    {device.isCurrentDevice && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        Current Device
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {device.type} • Last active {formatTime(device.lastActive)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditDevice(device)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {!device.isCurrentDevice && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveDevice(device.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Device Activity</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="border-l-2 border-primary pl-4">
                <p className="text-sm font-medium">Work Laptop connected</p>
                <p className="text-xs text-muted-foreground">{formatTime(new Date())}</p>
              </div>
              <div className="border-l-2 border-muted pl-4">
                <p className="text-sm font-medium">iPhone 13 synced 3 text items</p>
                <p className="text-xs text-muted-foreground">{formatTime(new Date(Date.now() - 1000 * 60 * 15))}</p>
              </div>
              <div className="border-l-2 border-muted pl-4">
                <p className="text-sm font-medium">Home Desktop uploaded file "meeting-notes.pdf"</p>
                <p className="text-xs text-muted-foreground">{formatTime(new Date(Date.now() - 1000 * 60 * 60 * 2))}</p>
              </div>
              <div className="border-l-2 border-muted pl-4">
                <p className="text-sm font-medium">iPhone 13 downloaded file "project-timeline.xlsx"</p>
                <p className="text-xs text-muted-foreground">{formatTime(new Date(Date.now() - 1000 * 60 * 60 * 5))}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeviceManager;
