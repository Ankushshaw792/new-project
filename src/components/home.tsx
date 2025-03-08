import React from "react";
import Header from "./navigation/Header";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              id: 1,
              image:
                "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop&q=60",
              location: "Jaipur, India",
              distance: "934 kilometres away",
              dates: "6–11 Mar",
              price: "₹3,194",
              rating: 5.0,
              isNew: false,
              isFavorite: false,
            },
            {
              id: 2,
              image:
                "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&auto=format&fit=crop&q=60",
              location: "Jaipur, India",
              distance: "930 kilometres away",
              dates: "18–23 Mar",
              price: "₹25,000",
              rating: null,
              isNew: true,
              isFavorite: false,
            },
            {
              id: 3,
              image:
                "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop&q=60",
              location: "Jaipur, India",
              distance: "934 kilometres away",
              dates: "1–6 Mar",
              price: "₹2,932",
              rating: 5.0,
              isNew: false,
              isFavorite: false,
            },
            {
              id: 4,
              image:
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=60",
              location: "Dharampur, India",
              distance: "987 kilometres away",
              dates: "1–6 Mar",
              price: "₹14,799",
              rating: 4.89,
              isNew: false,
              isFavorite: false,
            },
            {
              id: 1,
              image:
                "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop&q=60",
              location: "Jaipur, India",
              distance: "934 kilometres away",
              dates: "6–11 Mar",
              price: "₹3,194",
              rating: 5.0,
              isNew: false,
              isFavorite: false,
            },
            {
              id: 1,
              image:
                "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop&q=60",
              location: "Jaipur, India",
              distance: "934 kilometres away",
              dates: "6–11 Mar",
              price: "₹3,194",
              rating: 5.0,
              isNew: false,
              isFavorite: false,
            },
            {
              id: 1,
              image:
                "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop&q=60",
              location: "Jaipur, India",
              distance: "934 kilometres away",
              dates: "6–11 Mar",
              price: "₹3,194",
              rating: 5.0,
              isNew: false,
              isFavorite: false,
            },
            {
              id: 1,
              image:
                "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop&q=60",
              location: "Jaipur, India",
              distance: "934 kilometres away",
              dates: "6–11 Mar",
              price: "₹3,194",
              rating: 5.0,
              isNew: false,
              isFavorite: false,
            },
            {
              id: 1,
              image:
                "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop&q=60",
              location: "Jaipur, India",
              distance: "934 kilometres away",
              dates: "6–11 Mar",
              price: "₹3,194",
              rating: 5.0,
              isNew: false,
              isFavorite: false,
            },
            {
              id: 1,
              image:
                "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop&q=60",
              location: "Jaipur, India",
              distance: "934 kilometres away",
              dates: "6–11 Mar",
              price: "₹3,194",
              rating: 5.0,
              isNew: false,
              isFavorite: false,
            },
            {
              id: 1,
              image:
                "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop&q=60",
              location: "Jaipur, India",
              distance: "934 kilometres away",
              dates: "6–11 Mar",
              price: "₹3,194",
              rating: 5.0,
              isNew: false,
              isFavorite: false,
            },
            {
              id: 1,
              image:
                "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop&q=60",
              location: "Jaipur, India",
              distance: "934 kilometres away",
              dates: "6–11 Mar",
              price: "₹3,194",
              rating: 5.0,
              isNew: false,
              isFavorite: false,
            },
          ].map((listing) => (
            <div
              key={listing.id}
              className="group relative cursor-pointer"
              onClick={() => (window.location.href = `/listing/${listing.id}`)}
            >
              <div className="aspect-square overflow-hidden rounded-xl bg-gray-200 relative">
                <img
                  src={listing.image}
                  alt={`${listing.location} listing`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                  aria-label="Add to favorites"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>
                <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1">
                  <span className="text-sm font-medium">Guest favourite</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{listing.location}</h3>
                  {listing.rating && (
                    <div className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.4 7.4-6-4.6-6 4.6 2.4-7.4-6-4.6h7.6z" />
                      </svg>
                      <span>{listing.rating}</span>
                    </div>
                  )}
                  {listing.isNew && <span className="font-medium">New</span>}
                </div>
                <p className="text-gray-500">{listing.distance}</p>
                <p className="text-gray-500">{listing.dates}</p>
                <p className="mt-1">
                  <span className="font-medium">{listing.price}</span>
                  <span className="text-gray-500"> night</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
