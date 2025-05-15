
import { Link } from "react-router-dom";
import { RefreshCw } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-6 border-t">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          <p className="text-sm font-medium">SyncBridge</p>
        </div>
        <nav className="flex gap-4 md:gap-6 flex-wrap justify-center">
          <Link to="/" className="text-xs md:text-sm hover:text-primary">
            Home
          </Link>
          <Link to="/dashboard" className="text-xs md:text-sm hover:text-primary">
            Dashboard
          </Link>
          <Link to="#" className="text-xs md:text-sm hover:text-primary">
            Privacy
          </Link>
          <Link to="#" className="text-xs md:text-sm hover:text-primary">
            Terms
          </Link>
        </nav>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2025 SyncBridge. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
