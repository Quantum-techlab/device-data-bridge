
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Clipboard, Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";
import DeviceIcon from "../ui/device-icon";

interface TextEntry {
  id: string;
  text: string;
  device: "PC" | "Phone";
  timestamp: Date;
}

const TextSync = () => {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState<TextEntry[]>([
    {
      id: "1",
      text: "Here's the address: 123 Example Street",
      device: "Phone",
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    },
    {
      id: "2",
      text: "Meeting notes: Discuss project timeline and resource allocation for Q3",
      device: "PC",
      timestamp: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: "3",
      text: "https://example.com/important-document",
      device: "PC",
      timestamp: new Date(Date.now() - 1000 * 60 * 120)
    }
  ]);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAddText = () => {
    if (!text.trim()) return;
    
    const newEntry: TextEntry = {
      id: Date.now().toString(),
      text: text,
      device: "PC", // Assuming it's coming from PC
      timestamp: new Date()
    };
    
    setEntries([newEntry, ...entries]);
    setText("");
    textareaRef.current?.focus();
    toast.success("Text added to cloud clipboard");
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleDeleteText = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast.success("Entry removed");
  };

  const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <Card className="w-full animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clipboard className="h-5 w-5" />
            <span>Text Sync</span>
          </CardTitle>
          <CardDescription>
            Copy text between your devices instantly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to sync across devices..."
            className="min-h-[120px]"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddText} className="ml-auto">
            Add to Cloud Clipboard
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Recent Entries</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map((entry, index) => (
            <Card key={entry.id} className="animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <DeviceIcon deviceType={entry.device} />
                    <span className="text-sm text-muted-foreground">
                      {formatTime(entry.timestamp)}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleCopyText(entry.text)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteText(entry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm break-words text-left">{entry.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextSync;
