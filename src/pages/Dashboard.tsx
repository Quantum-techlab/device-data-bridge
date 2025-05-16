
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { FileAudio, FileImage, History, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

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
    <motion.div
      className="container py-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground mb-8">
          Manage your extracted text and audio transcriptions
        </p>
      </motion.div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Link to="/image-to-text">
                <Card className="hover:shadow-md transition-all cursor-pointer h-full">
                  <CardHeader>
                    <div className="p-2 bg-primary/10 w-fit rounded-md mb-2">
                      <FileImage className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Image to Text</CardTitle>
                    <CardDescription>
                      Upload images and extract text content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Supports JPG, PNG, WebP formats with high accuracy text recognition
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/audio-to-text">
                <Card className="hover:shadow-md transition-all cursor-pointer h-full">
                  <CardHeader>
                    <div className="p-2 bg-accent/10 w-fit rounded-md mb-2">
                      <FileAudio className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle>Audio to Text</CardTitle>
                    <CardDescription>
                      Convert audio recordings to text transcripts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Supports MP3, WAV formats with automatic language detection
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/transcripts">
                <Card className="hover:shadow-md transition-all cursor-pointer h-full">
                  <CardHeader>
                    <div className="p-2 bg-secondary/30 w-fit rounded-md mb-2">
                      <FileText className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <CardTitle>My Transcripts</CardTitle>
                    <CardDescription>
                      Access and manage your saved transcripts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      View, edit, download, and share your previously extracted content
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/upload-history">
                <Card className="hover:shadow-md transition-all cursor-pointer h-full">
                  <CardHeader>
                    <div className="p-2 bg-muted w-fit rounded-md mb-2">
                      <History className="h-6 w-6" />
                    </div>
                    <CardTitle>Upload History</CardTitle>
                    <CardDescription>
                      View your previous uploads
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Browse through your uploaded files with metadata
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest text extractions and uploads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                No recent activity. Start by uploading an image or audio file!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Dashboard;
