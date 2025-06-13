import React from "react";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import { DateRange } from "react-day-picker";

interface HeaderProps {
  onLogoClick?: () => void;
  onHomeClick?: () => void;
  onExperiencesClick?: () => void;
  onHostClick?: () => void;
  onLanguageChange?: (language: string) => void;
  onProfileClick?: () => void;
  onSearch?: (searchParams: {
    location: string;
    dates: DateRange | undefined;
    guests: number;
  }) => void;
  onCategorySelect?: (id: string) => void;
  onFiltersClick?: () => void;
  onPriceDisplayToggle?: (checked: boolean) => void;
  selectedCategory?: string;
  showTotalPrice?: boolean;
  showSearchOverlay?: boolean;
}

const Header = ({
  onLogoClick = () => {},
  onHomeClick = () => {},
  onExperiencesClick = () => {},
  onHostClick = () => {},
  onLanguageChange = () => {},
  onProfileClick = () => {},
  onSearch = () => {},
  onCategorySelect = () => {},
  onFiltersClick = () => {},
  onPriceDisplayToggle = () => {},
  selectedCategory = "",
  showTotalPrice = false,
  showSearchOverlay = false,
}: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <TopNav
        onLogoClick={onLogoClick}
        onHomeClick={onHomeClick}
        onExperiencesClick={onExperiencesClick}
        onHostClick={onHostClick}
        onLanguageChange={onLanguageChange}
        onProfileClick={onProfileClick}
      />
      <BottomNav
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
        onFiltersClick={onFiltersClick}
        showTotalPrice={showTotalPrice}
        onPriceDisplayToggle={onPriceDisplayToggle}
      />
    </header>
  );
};

export default Header;