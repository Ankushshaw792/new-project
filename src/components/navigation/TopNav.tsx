import React, { useState } from "react";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SearchOverlay from "../search/SearchOverlay";
import { Globe, Menu, User, LogOut } from "lucide-react";
import { AuthModal } from "../auth/AuthModal";
import { useAuth } from "@/lib/auth";

interface TopNavProps {
  onLogoClick?: () => void;
  onHomeClick?: () => void;
  onExperiencesClick?: () => void;
  onHostClick?: () => void;
  onLanguageChange?: (language: string) => void;
  onProfileClick?: () => void;
}

const TopNav = ({
  onLogoClick = () => {},
  onHomeClick = () => {},
  onExperiencesClick = () => {},
  onHostClick = () => {},
  onLanguageChange = () => {},
  onProfileClick = () => {},
}: TopNavProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b">
      {/* Logo */}
      <div className="flex-shrink-0" onClick={onLogoClick}>
        <svg
          className="h-8 w-auto text-[#FF385C] cursor-pointer"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-auto px-4">
        <SearchOverlay />
      </div>

      {/* Right Navigation */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="text-sm font-medium"
          onClick={onHostClick}
        >
          Airbnb your home
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => onLanguageChange("en")}
        >
          <Globe className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full p-3 flex items-center gap-3 border-gray-300"
            >
              <Menu className="h-4 w-4" />
              <Avatar className="h-8 w-8 border">
                <User className="h-5 w-5" />
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {user ? (
              <>
                <DropdownMenuItem onClick={onHomeClick}>Homes</DropdownMenuItem>
                <DropdownMenuItem onClick={onExperiencesClick}>
                  Experiences
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onProfileClick}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut} className="text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={() => setIsAuthModalOpen(true)}>
                  Sign in
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsAuthModalOpen(true)}>
                  Sign up
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onHomeClick}>Homes</DropdownMenuItem>
                <DropdownMenuItem onClick={onExperiencesClick}>
                  Experiences
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </nav>
  );
};

export default TopNav;
