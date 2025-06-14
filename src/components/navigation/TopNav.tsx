import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MapPin, Search, User, LogOut } from "lucide-react";
import { AuthModal } from "../auth/AuthModal";
import { useAuth } from "@/lib/auth";
import SearchFilters from "../search/SearchFilters";

interface TopNavProps {
  onLogoClick?: () => void;
  onHomeClick?: () => void;
  onExperiencesClick?: () => void;
  onHostClick?: () => void;
  onLanguageChange?: (language: string) => void;
  onProfileClick?: () => void;
  onSearch?: (query: string) => void;
}

const TopNav = ({
  onLogoClick = () => {},
  onHomeClick = () => {},
  onExperiencesClick = () => {},
  onHostClick = () => {},
  onLanguageChange = () => {},
  onProfileClick = () => {},
  onSearch = () => {},
}: TopNavProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, signOut } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b">
      {/* Logo */}
      <div className="flex-shrink-0" onClick={onLogoClick}>
        <h1 className="text-2xl font-bold text-black cursor-pointer">NYLOUR</h1>
      </div>

      {/* Center Section with Location, Search, and Filters */}
      <div className="flex items-center gap-4 flex-1 max-w-4xl mx-8">
        {/* Set Location Button */}
        <Button
          variant="outline"
          className="flex items-center gap-2 px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <MapPin className="h-4 w-4" />
          Set Location
        </Button>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search for Salon or Styles"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 w-full border-gray-300 rounded-full bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </form>

        {/* Search Filters */}
        <SearchFilters onFiltersChange={(filters) => console.log('Filters:', filters)} />

        {/* Register your Salon Button */}
        <Button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium"
          onClick={onHostClick}
        >
          Register your Salon
        </Button>
      </div>

      {/* Login/Profile Section */}
      <div className="flex items-center gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-gray-700 hover:bg-gray-50"
              >
                <User className="h-5 w-5" />
                Profile
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
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
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-700 hover:bg-gray-50"
            onClick={() => setIsAuthModalOpen(true)}
          >
            <User className="h-5 w-5" />
            Login
          </Button>
        )}
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