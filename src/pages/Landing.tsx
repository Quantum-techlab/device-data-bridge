
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { FileText, Headphones, Image } from "lucide-react";

const Landing = () => {
  const { isAuthenticated } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48">
        <motion.div 
          className="container px-4 md:px-6 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
            variants={itemVariants}
          >
            Extract Text from <span className="text-primary">Images</span> & <span className="text-accent">Audio</span>
          </motion.h1>
          
          <motion.p 
            className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8"
            variants={itemVariants}
          >
            Instantly convert your images and audio files to editable, searchable text with our powerful AI-driven platform.
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            <Link to={isAuthenticated ? "/dashboard" : "/register"}>
              <Button size="lg" className="w-full md:w-auto">
                {isAuthenticated ? "Go to Dashboard" : "Get Started"}
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full md:w-auto">
                {isAuthenticated ? "My Account" : "Login"}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Image className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Image to Text</h3>
              <p className="text-muted-foreground">
                Upload images and our advanced OCR technology will extract all text instantly.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="mb-4 p-3 bg-accent/10 rounded-full w-fit">
                <Headphones className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Audio to Text</h3>
              <p className="text-muted-foreground">
                Convert audio files to text transcripts quickly and accurately.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="mb-4 p-3 bg-secondary/30 rounded-full w-fit">
                <FileText className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">Manage Transcripts</h3>
              <p className="text-muted-foreground">
                Save, edit, and manage all your extracted text in one secure dashboard.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
