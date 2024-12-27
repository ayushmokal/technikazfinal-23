import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "./navigation/Logo";
import { SocialLinks } from "./navigation/SocialLinks";
import { SearchBar } from "./navigation/SearchBar";
import { MobileMenu } from "./navigation/MobileMenu";
import { DesktopMenu } from "./navigation/DesktopMenu";

export function Navigation() {
  return (
    <nav className="bg-[#1A1F2C] shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-4">
            <MobileMenu />
            <Logo />
          </div>
          
          <div className="flex items-center space-x-8">
            <DesktopMenu />
            <SocialLinks />
            <Button variant="ghost" size="sm" className="hidden sm:block text-white hover:text-primary">
              <Link to="/contact">Contact</Link>
            </Button>
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  );
}