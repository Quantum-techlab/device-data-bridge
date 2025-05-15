
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, Download, Trash2, FileText, Image as ImageIcon, FileArchive, File } from "lucide-react";
import { toast } from "sonner";
import DeviceIcon from "../ui/device-icon";

interface FileEntry {
  id: string;
  name: string;
  size: number;
  type: string;
  device: "PC" | "Phone";
  timestamp: Date;
  url: string;
}

const FileManager = () => {
  const [files, setFiles] = useState<FileEntry[]>([
    {
      id: "1",
      name: "project-proposal.pdf",
      size: 2500000,
      type: "application/pdf",
      device: "PC",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      url: "#"
    },
    {
      id: "2",
      name: "meeting-screenshot.png",
      size: 1200000,
      type: "image/png",
      device: "Phone",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      url: "#"
    },
    {
      id: "3",
      name: "archive.zip",
      size: 5000000,
      type: "application/zip",
      device: "PC",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      url: "#"
    }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: FileEntry[] = Array.from(e.target.files).map(file => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        device: "PC", // Assuming it's coming from PC
        timestamp: new Date(),
        url: URL.createObjectURL(file)
      }));
      
      setFiles([...newFiles, ...files]);
      toast.success(`Uploaded ${newFiles.length} file(s)`);
      e.target.value = ""; // Reset the input
    }
  };

  const handleDeleteFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
    toast.success("File deleted");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
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

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="h-8 w-8" />;
    if (type.includes("pdf")) return <FileText className="h-8 w-8" />;
    if (type.includes("zip") || type.includes("rar") || type.includes("tar")) return <FileArchive className="h-8 w-8" />;
    return <File className="h-8 w-8" />;
  };

  return (
    <div className="space-y-6">
      <Card className="w-full animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadCloud className="h-5 w-5" />
            <span>File Manager</span>
          </CardTitle>
          <CardDescription>
            Upload and manage files across your devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="mb-2 text-sm font-medium">
              Drag files here or click to upload
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Files you upload will be available on all your devices
            </p>
            <label 
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
            >
              Choose Files
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Recent Files</h3>
        <div className="grid grid-cols-1 gap-4">
          {files.map((file, index) => (
            <Card key={file.id} className="animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 h-14 w-14 rounded bg-secondary/50 flex items-center justify-center">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DeviceIcon deviceType={file.device} className="h-6 w-6" />
                      <span>{formatFileSize(file.size)}</span>
                      <span className="text-xs">•</span>
                      <span>{formatTime(file.timestamp)}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                    >
                      <a href={file.url} download={file.name} target="_blank" rel="noreferrer">
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteFile(file.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileManager;
