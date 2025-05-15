
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextSync from "@/components/dashboard/text-sync";
import FileManager from "@/components/dashboard/file-manager";
import { Clipboard, FolderOpen } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("text");

  return (
    <div className="container py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
      
      <Tabs defaultValue="text" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="text" className="flex items-center gap-2">
            <Clipboard className="h-4 w-4" />
            <span>Text Sync</span>
          </TabsTrigger>
          <TabsTrigger value="files" className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            <span>Files</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="text" className="mt-0 animate-fade-in">
          <TextSync />
        </TabsContent>
        
        <TabsContent value="files" className="mt-0 animate-fade-in">
          <FileManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
