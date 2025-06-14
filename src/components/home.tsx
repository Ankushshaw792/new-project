import React from "react";
import Header from "./navigation/Header";
import SalonGrid from "./salon/SalonGrid";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  onLogoClick?: () => void;
  onHomeClick?: () => void;
  onExperiencesClick?: () => void;
  onHostClick?: () => void;
  onLanguageChange?: (language: string) => void;
  onProfileClick?: () => void;
  onSearch?: () => void;
  onCategorySelect?: (id: string) => void;
  onFiltersClick?: () => void;
  onPriceDisplayToggle?: (showTotal: boolean) => void;
}

const Home = ({
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
}: HomeProps) => {
  const navigate = useNavigate();

  const handleBookNow = (salonId: number) => {
    // Navigate to booking page or open booking modal
    console.log('Book salon:', salonId);
    // navigate(`/booking/${salonId}`);
  };

  const handleViewDetails = (salonId: number) => {
    // Navigate to salon details page
    navigate(`/listing/${salonId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onLogoClick={onLogoClick}
        onHomeClick={onHomeClick}
        onExperiencesClick={onExperiencesClick}
        onHostClick={onHostClick}
        onLanguageChange={onLanguageChange}
        onProfileClick={onProfileClick}
        onSearch={onSearch}
        onCategorySelect={onCategorySelect}
        onFiltersClick={onFiltersClick}
        onPriceDisplayToggle={onPriceDisplayToggle}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find the Perfect Salon Near You
          </h1>
          <p className="text-gray-600">
            Book appointments at top-rated salons in Dubai
          </p>
        </div>

        {/* Salon Grid */}
        <SalonGrid
          onBookNow={handleBookNow}
          onViewDetails={handleViewDetails}
        />
      </main>
    </div>
  );
};

export default Home;