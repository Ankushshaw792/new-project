import React from 'react';
import { Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SalonCardProps {
  salon: {
    id: number;
    name: string;
    image: string;
    location: string;
    distance: string;
    rating: number;
    reviewCount: number;
    isOpen: boolean;
    openUntil?: string;
    services: string[];
    priceRange: string;
  };
  onBookNow: (salonId: number) => void;
  onViewDetails: (salonId: number) => void;
}

const SalonCard = ({ salon, onBookNow, onViewDetails }: SalonCardProps) => {
  return (
    <div className="group relative cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Salon Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={salon.image}
          alt={salon.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            salon.isOpen 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {salon.isOpen ? 'Open' : 'Closed'}
          </div>
        </div>

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200">
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
      </div>

      {/* Salon Details */}
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {salon.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="text-sm font-medium">{salon.rating}</span>
            <span className="text-sm text-gray-500">({salon.reviewCount})</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-600 mb-2">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{salon.location}</span>
          <span className="text-sm">• {salon.distance}</span>
        </div>

        {/* Opening Hours */}
        {salon.isOpen && salon.openUntil && (
          <div className="flex items-center gap-1 text-green-600 mb-3">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Open until {salon.openUntil}</span>
          </div>
        )}

        {/* Services */}
        <div className="flex flex-wrap gap-1 mb-3">
          {salon.services.slice(0, 3).map((service, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {service}
            </span>
          ))}
          {salon.services.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{salon.services.length - 3} more
            </span>
          )}
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <span className="text-sm text-gray-600">Starting from </span>
          <span className="font-semibold text-lg">{salon.priceRange}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onViewDetails(salon.id)}
          >
            View Details
          </Button>
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={() => onBookNow(salon.id)}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalonCard;