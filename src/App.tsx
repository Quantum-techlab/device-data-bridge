
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RootLayout from "./layout/RootLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ImageToText from "./pages/ImageToText";
import AudioToText from "./pages/AudioToText";
import MyTranscripts from "./pages/MyTranscripts";
import Profile from "./pages/Profile";
import UploadHistory from "./pages/UploadHistory";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Landing />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="image-to-text" element={<ImageToText />} />
                <Route path="audio-to-text" element={<AudioToText />} />
                <Route path="transcripts" element={<MyTranscripts />} />
                <Route path="upload-history" element={<UploadHistory />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
