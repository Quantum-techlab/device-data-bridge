
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Copy, Download, Upload, File, X, FileAudio } from "lucide-react";
import { motion } from "framer-motion";

const AudioToText = () => {
  const [transcription, setTranscription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Function to handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an audio file
    if (!file.type.match("audio.*")) {
      toast.error("Please upload a valid audio file (MP3, WAV, etc)");
      return;
    }

    setAudioFile(file);
    
    // Create audio URL for preview
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    
    // Process audio file
    processAudio(file);
  };

  // Function to process audio with Speech-to-Text
  const processAudio = async (file: File) => {
    try {
      setIsProcessing(true);
      setProgress(0);
      setTranscription("");
      
      // Simulate processing
      const progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 98) {
            clearInterval(progressInterval);
            return 98;
          }
          return prevProgress + 3;
        });
      }, 200);

      // Simulate processing delay
      setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        
        // Mock transcription result
        setTranscription(
          "This is a simulated transcription result. In a real implementation, a speech-to-text API would convert your audio into text.\n\nConnect your app to a Speech-to-Text API like Web Speech API, OpenAI Whisper, or Google Speech API to enable real transcription functionality."
        );
        
        setIsProcessing(false);
        toast.success("Audio transcription complete!");
      }, 4000);
      
    } catch (error) {
      console.error("Error processing audio:", error);
      toast.error("Failed to transcribe audio. Please try again.");
      setIsProcessing(false);
    }
  };

  // Function to handle the copy button
  const handleCopy = () => {
    if (transcription) {
      navigator.clipboard.writeText(transcription);
      toast.success("Transcription copied to clipboard!");
    }
  };

  // Function to handle drag over event
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Function to handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      if (!file.type.match("audio.*")) {
        toast.error("Please upload a valid audio file");
        return;
      }
      
      // Create a new file input event
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        const event = new Event('change', { bubbles: true });
        fileInputRef.current.dispatchEvent(event);
      }
    }
  };

  // Function to handle transcription download
  const handleDownload = () => {
    if (!transcription) return;
    
    const element = document.createElement("a");
    const file = new Blob([transcription], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcription.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Transcription downloaded as TXT file");
  };

  // Function to clear current audio and result
  const handleClear = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setAudioFile(null);
    setTranscription("");
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Format duration time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Audio to Text Transcription
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="h-full">
            <CardContent className="p-6">
              <div
                className={`border-2 border-dashed rounded-lg p-6 ${
                  audioFile ? "border-accent" : "border-muted"
                } transition-all flex flex-col items-center justify-center text-center`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {!audioFile ? (
                  <>
                    <FileAudio className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Audio</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop your audio file here, or click to select a file
                    </p>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    <Button onClick={() => fileInputRef.current?.click()}>
                      <Upload className="mr-2 h-4 w-4" /> Select Audio
                    </Button>
                  </>
                ) : (
                  <div className="w-full">
                    <div className="flex justify-end mb-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleClear}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="bg-secondary/30 p-4 rounded-lg">
                      <p className="font-medium mb-2 truncate">{audioFile.name}</p>
                      {audioUrl && (
                        <audio 
                          ref={audioRef}
                          controls 
                          className="w-full mb-2"
                          src={audioUrl}
                        />
                      )}
                      <p className="text-sm text-muted-foreground">
                        {audioFile.type} • {Math.round(audioFile.size / 1024)} KB
                      </p>
                    </div>
                    
                    {isProcessing && (
                      <div className="mt-4">
                        <p className="text-sm mb-2">Transcribing audio...</p>
                        <Progress value={progress} className="h-2 mb-1" />
                        <p className="text-xs text-right text-muted-foreground">{progress}%</p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-center mt-4">
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isProcessing}
                      >
                        <Upload className="mr-2 h-4 w-4" /> Change Audio
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transcription Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardContent className="p-6">
              <Tabs defaultValue="transcription">
                <TabsList className="mb-4">
                  <TabsTrigger value="transcription">Transcription</TabsTrigger>
                  <TabsTrigger value="info">File Info</TabsTrigger>
                </TabsList>
                <TabsContent value="transcription" className="mt-0">
                  <div className="mb-3 flex justify-between">
                    <h3 className="text-lg font-medium">Transcript</h3>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        disabled={!transcription}
                      >
                        <Copy className="mr-2 h-4 w-4" /> Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                        disabled={!transcription}
                      >
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    </div>
                  </div>
                  <div className="min-h-[400px]">
                    <Textarea
                      placeholder="Transcription will appear here..."
                      value={transcription}
                      onChange={(e) => setTranscription(e.target.value)}
                      className="min-h-[400px] resize-none"
                      disabled={isProcessing}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="info" className="mt-0">
                  <div className="space-y-4 min-h-[400px] p-4">
                    {audioFile ? (
                      <>
                        <div className="flex items-center">
                          <File className="h-5 w-5 mr-2" />
                          <span className="text-sm">
                            File: {audioFile.name}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm">
                            Size: {Math.round(audioFile.size / 1024)} KB
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm">
                            Type: {audioFile.type}
                          </span>
                        </div>
                        {audioRef.current && !isNaN(audioRef.current.duration) && (
                          <div className="flex items-center">
                            <span className="text-sm">
                              Duration: {formatTime(audioRef.current.duration)}
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-muted-foreground text-center pt-10">
                        No audio uploaded yet
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AudioToText;
