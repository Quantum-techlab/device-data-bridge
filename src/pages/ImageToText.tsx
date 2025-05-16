
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Copy, Download, Upload, File, X, Image } from "lucide-react";
import { motion } from "framer-motion";

const ImageToText = () => {
  const [recognizedText, setRecognizedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.match("image.*")) {
      toast.error("Please upload a valid image file (JPG, PNG, etc)");
      return;
    }

    // Display image preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Process image with Tesseract
    processImage(file);
  };

  // Function to process image with Tesseract.js
  const processImage = async (file: File) => {
    try {
      setIsProcessing(true);
      setProgress(0);
      setRecognizedText("");
      
      // Simulating Tesseract loading since we can't directly import it here
      // In a real implementation, you would use the imported Tesseract library
      const progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 98) {
            clearInterval(progressInterval);
            return 98;
          }
          return prevProgress + 5;
        });
      }, 200);

      // Simulating OCR processing delay
      setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        
        // Mock result for demonstration
        // In a real implementation, this would be actual OCR result
        setRecognizedText(
          "This is a simulated OCR result. In a real implementation, Tesseract.js would extract the actual text from your uploaded image.\n\nConnect to the Tesseract.js library to enable real OCR functionality."
        );
        
        setIsProcessing(false);
        toast.success("Text extracted successfully!");
      }, 3000);
      
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image. Please try again.");
      setIsProcessing(false);
    }
  };

  // Function to handle the copy button
  const handleCopy = () => {
    if (recognizedText) {
      navigator.clipboard.writeText(recognizedText);
      toast.success("Text copied to clipboard!");
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
      
      if (!file.type.match("image.*")) {
        toast.error("Please upload a valid image file");
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

  // Function to handle text download
  const handleDownload = () => {
    if (!recognizedText) return;
    
    const element = document.createElement("a");
    const file = new Blob([recognizedText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "extracted-text.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Text downloaded as TXT file");
  };

  // Function to clear current image and result
  const handleClear = () => {
    setImagePreview(null);
    setRecognizedText("");
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="container py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Image to Text Conversion
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
                  imagePreview ? "border-primary" : "border-muted"
                } transition-all flex flex-col items-center justify-center text-center`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {!imagePreview ? (
                  <>
                    <Image className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Image</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop your image here, or click to select a file
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    <Button onClick={() => fileInputRef.current?.click()}>
                      <Upload className="mr-2 h-4 w-4" /> Select Image
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
                    <div className="relative rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-auto max-h-[400px] object-contain"
                      />
                      {isProcessing && (
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                          <p className="text-white mb-2">Processing image...</p>
                          <div className="w-2/3">
                            <Progress value={progress} className="h-2" />
                          </div>
                          <p className="text-white text-sm mt-1">{progress}%</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-center mt-4">
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="mr-2"
                      >
                        <Upload className="mr-2 h-4 w-4" /> Change Image
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Result Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardContent className="p-6">
              <Tabs defaultValue="text">
                <TabsList className="mb-4">
                  <TabsTrigger value="text">Extracted Text</TabsTrigger>
                  <TabsTrigger value="info">File Info</TabsTrigger>
                </TabsList>
                <TabsContent value="text" className="mt-0">
                  <div className="mb-3 flex justify-between">
                    <h3 className="text-lg font-medium">Recognized Text</h3>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopy}
                        disabled={!recognizedText}
                      >
                        <Copy className="mr-2 h-4 w-4" /> Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownload}
                        disabled={!recognizedText}
                      >
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    </div>
                  </div>
                  <div className="min-h-[400px]">
                    <Textarea
                      placeholder="Extracted text will appear here..."
                      value={recognizedText}
                      onChange={(e) => setRecognizedText(e.target.value)}
                      className="min-h-[400px] resize-none"
                      disabled={isProcessing}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="info" className="mt-0">
                  <div className="space-y-4 min-h-[400px] p-4">
                    {imagePreview ? (
                      <>
                        <div className="flex items-center">
                          <File className="h-5 w-5 mr-2" />
                          <span className="text-sm">
                            File: {fileInputRef.current?.files?.[0]?.name || "Unknown"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm">
                            Size: {fileInputRef.current?.files?.[0]?.size
                              ? `${Math.round(fileInputRef.current.files[0].size / 1024)} KB`
                              : "Unknown"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm">
                            Type: {fileInputRef.current?.files?.[0]?.type || "Unknown"}
                          </span>
                        </div>
                      </>
                    ) : (
                      <p className="text-muted-foreground text-center pt-10">
                        No image uploaded yet
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

export default ImageToText;
