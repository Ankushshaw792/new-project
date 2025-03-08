import React from "react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Globe, Menu, User } from "lucide-react";
import SearchBar from "../search/SearchBar";

interface MainNavProps {
  onLogoClick?: () => void;
  onHomeClick?: () => void;
  onExperiencesClick?: () => void;
  onHostClick?: () => void;
  onLanguageChange?: (language: string) => void;
  onProfileClick?: () => void;
}

const MainNav = ({
  onLogoClick = () => {},
  onHomeClick = () => {},
  onExperiencesClick = () => {},
  onHostClick = () => {},
  onLanguageChange = () => {},
  onProfileClick = () => {},
}: MainNavProps) => {
  return (
    <div className="h-20 w-full bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex-shrink-0 cursor-pointer" onClick={onLogoClick}>
        <svg
          className="h-8 w-auto text-[#FF385C]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      </div>

      {/* Center Navigation */}
      <div className="flex-1 flex justify-center">
        <SearchBar />
      </div>

      {/* Right Navigation */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          className="text-sm font-medium"
          onClick={onHostClick}
        >
          Airbnb your home
        </Button>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-10 w-10 p-0">
                <Globe className="h-5 w-5" />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-48 p-2">
                  <NavigationMenuLink
                    className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => onLanguageChange("en")}
                  >
                    English
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => onLanguageChange("es")}
                  >
                    Español
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => onLanguageChange("fr")}
                  >
                    Français
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button
          variant="outline"
          className="rounded-full border border-gray-200 shadow-sm"
          onClick={onProfileClick}
        >
          <Menu className="h-4 w-4 mr-2" />
          <User className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MainNav;
