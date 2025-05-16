
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileAudio, Search, Image } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const MyTranscripts = () => {
  // Mock data for demonstration
  const mockTranscripts = [
    {
      id: 1,
      title: "Business Meeting Notes.jpg",
      type: "image",
      date: "May 15, 2025",
      excerpt: "Discussion on Q3 goals and revenue targets...",
    },
    {
      id: 2,
      title: "Interview Recording.mp3",
      type: "audio",
      date: "May 14, 2025",
      excerpt: "Candidate background: 5 years experience in marketing...",
    },
    {
      id: 3,
      title: "Project Proposal.png",
      type: "image",
      date: "May 10, 2025",
      excerpt: "Timeline: 6 weeks for development, 2 weeks for testing...",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
      >
        <h1 className="text-3xl font-bold">My Transcripts</h1>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search transcripts" 
            className="pl-8"
          />
        </div>
      </motion.div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="image">Image Transcripts</TabsTrigger>
          <TabsTrigger value="audio">Audio Transcripts</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {mockTranscripts.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4"
            >
              {mockTranscripts.map((transcript) => (
                <TranscriptCard 
                  key={transcript.id}
                  transcript={transcript}
                  variants={itemVariants}
                />
              ))}
            </motion.div>
          ) : (
            <EmptyState />
          )}
        </TabsContent>
        
        <TabsContent value="image" className="mt-0">
          {mockTranscripts.filter(t => t.type === "image").length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4"
            >
              {mockTranscripts
                .filter(t => t.type === "image")
                .map((transcript) => (
                  <TranscriptCard 
                    key={transcript.id}
                    transcript={transcript}
                    variants={itemVariants}
                  />
                ))}
            </motion.div>
          ) : (
            <EmptyState type="image" />
          )}
        </TabsContent>
        
        <TabsContent value="audio" className="mt-0">
          {mockTranscripts.filter(t => t.type === "audio").length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4"
            >
              {mockTranscripts
                .filter(t => t.type === "audio")
                .map((transcript) => (
                  <TranscriptCard 
                    key={transcript.id}
                    transcript={transcript}
                    variants={itemVariants}
                  />
                ))}
            </motion.div>
          ) : (
            <EmptyState type="audio" />
          )}
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-0">
          <EmptyState type="favorite" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Transcript Card Component
interface TranscriptProps {
  transcript: {
    id: number;
    title: string;
    type: string;
    date: string;
    excerpt: string;
  };
  variants: any;
}

const TranscriptCard = ({ transcript, variants }: TranscriptProps) => {
  const TypeIcon = transcript.type === "image" ? Image : FileAudio;
  
  return (
    <motion.div variants={variants}>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-md ${transcript.type === "image" ? "bg-primary/10" : "bg-accent/10"}`}>
                <TypeIcon className={`h-4 w-4 ${transcript.type === "image" ? "text-primary" : "text-accent"}`} />
              </div>
              <div>
                <CardTitle className="text-base">{transcript.title}</CardTitle>
                <CardDescription className="text-xs">
                  {transcript.date}
                </CardDescription>
              </div>
            </div>
            <Badge variant={transcript.type === "image" ? "default" : "secondary"}>
              {transcript.type === "image" ? "Image" : "Audio"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {transcript.excerpt}
          </p>
          <div className="flex space-x-2 justify-end">
            <Button variant="outline" size="sm">View</Button>
            <Button size="sm">Edit</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Empty State Component
const EmptyState = ({ type = "all" }: { type?: string }) => {
  let message = "You haven't created any transcripts yet";
  let action = "Upload an image or audio file to get started";
  
  if (type === "image") {
    message = "No image transcripts found";
    action = "Upload an image to extract text";
  } else if (type === "audio") {
    message = "No audio transcripts found";
    action = "Upload an audio file to transcribe";
  } else if (type === "favorite") {
    message = "No favorite transcripts yet";
    action = "Mark transcripts as favorites to see them here";
  }
  
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-1">{message}</h3>
        <p className="text-sm text-muted-foreground mb-4">{action}</p>
        
        {type !== "favorite" && (
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              asChild
              className={type === "audio" ? "opacity-50 pointer-events-none" : ""}
            >
              <a href="/image-to-text">
                <Image className="mr-2 h-4 w-4" /> Upload Image
              </a>
            </Button>
            <Button 
              asChild
              className={type === "image" ? "opacity-50 pointer-events-none" : ""}
            >
              <a href="/audio-to-text">
                <FileAudio className="mr-2 h-4 w-4" /> Upload Audio
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyTranscripts;
