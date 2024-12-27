import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "./navigation/Logo";
import { SocialLinks } from "./navigation/SocialLinks";
import { SearchBar } from "./navigation/SearchBar";
import { MobileMenu } from "./navigation/MobileMenu";
import { DesktopMenu } from "./navigation/DesktopMenu";

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      {/* Top Header */}
      <div className="bg-[#1A1F2C] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <SocialLinks />
          <Button variant="ghost" size="sm" className="hidden sm:block text-white hover:text-primary">
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-[#F1F0FB] border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-4">
              <MobileMenu />
              <Logo />
            </div>
            
            <DesktopMenu />
            
            <div className="flex items-center space-x-4">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}