
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// This is our old Index page that now just redirects to the new Landing page
const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
};

export default Index;
