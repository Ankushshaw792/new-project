import React, { useState } from 'react';
import SalonCard from './SalonCard';
import BookingModal from '../booking/BookingModal';

interface Salon {
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
}

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface SalonGridProps {
  salons?: Salon[];
  onBookNow?: (salonId: number) => void;
  onViewDetails?: (salonId: number) => void;
}

const defaultSalons: Salon[] = [
  {
    id: 1,
    name: "Al Shanab Gents Salon",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&auto=format&fit=crop&q=60",
    location: "Jumeirah 1, Dubai",
    distance: "0.5 km away",
    rating: 5.0,
    reviewCount: 591,
    isOpen: true,
    openUntil: "11:00 PM",
    services: ["Hair Cut", "Beard Trim", "Shaving", "Massage"],
    priceRange: "AED 40"
  },
  {
    id: 2,
    name: "Royal Barber Shop",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=60",
    location: "Downtown Dubai",
    distance: "1.2 km away",
    rating: 4.8,
    reviewCount: 324,
    isOpen: true,
    openUntil: "10:00 PM",
    services: ["Hair Cut", "Hair Styling", "Facial", "Manicure"],
    priceRange: "AED 60"
  },
  {
    id: 3,
    name: "Elite Men's Grooming",
    image: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=800&auto=format&fit=crop&q=60",
    location: "Marina Walk",
    distance: "2.1 km away",
    rating: 4.9,
    reviewCount: 456,
    isOpen: false,
    services: ["Premium Cut", "Beard Design", "Hair Color", "Massage"],
    priceRange: "AED 80"
  },
  {
    id: 4,
    name: "Classic Cuts Barbershop",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=60",
    location: "Business Bay",
    distance: "1.8 km away",
    rating: 4.7,
    reviewCount: 289,
    isOpen: true,
    openUntil: "9:00 PM",
    services: ["Hair Cut", "Shaving", "Hair Wash", "Facial"],
    priceRange: "AED 45"
  },
  {
    id: 5,
    name: "Gentleman's Choice",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=60",
    location: "DIFC",
    distance: "2.5 km away",
    rating: 4.6,
    reviewCount: 198,
    isOpen: true,
    openUntil: "8:00 PM",
    services: ["Hair Cut", "Beard Trim", "Manicure", "Premium"],
    priceRange: "AED 55"
  },
  {
    id: 6,
    name: "Modern Barber Lounge",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=60",
    location: "JBR",
    distance: "3.2 km away",
    rating: 4.8,
    reviewCount: 367,
    isOpen: true,
    openUntil: "11:30 PM",
    services: ["Hair Styling", "Hair Color", "Facial", "Massage"],
    priceRange: "AED 70"
  }
];

// Sample services data for each salon
const salonServices: Record<number, Service[]> = {
  1: [
    { id: 'haircut', name: 'Hair Cut', duration: 30, price: 40 },
    { id: 'beard', name: 'Beard Trim', duration: 20, price: 25 },
    { id: 'shave', name: 'Traditional Shave', duration: 25, price: 30 },
    { id: 'massage', name: 'Head Massage', duration: 15, price: 20 },
  ],
  2: [
    { id: 'haircut', name: 'Hair Cut', duration: 35, price: 60 },
    { id: 'styling', name: 'Hair Styling', duration: 45, price: 80 },
    { id: 'facial', name: 'Facial Treatment', duration: 60, price: 120 },
    { id: 'manicure', name: 'Manicure', duration: 30, price: 50 },
  ],
  3: [
    { id: 'premium-cut', name: 'Premium Hair Cut', duration: 45, price: 80 },
    { id: 'beard-design', name: 'Beard Design', duration: 30, price: 60 },
    { id: 'hair-color', name: 'Hair Coloring', duration: 90, price: 150 },
    { id: 'massage', name: 'Relaxing Massage', duration: 30, price: 70 },
  ],
  4: [
    { id: 'haircut', name: 'Classic Hair Cut', duration: 30, price: 45 },
    { id: 'shave', name: 'Classic Shave', duration: 25, price: 35 },
    { id: 'wash', name: 'Hair Wash & Style', duration: 20, price: 25 },
    { id: 'facial', name: 'Gentleman Facial', duration: 45, price: 90 },
  ],
  5: [
    { id: 'haircut', name: 'Gentleman Cut', duration: 35, price: 55 },
    { id: 'beard', name: 'Beard Grooming', duration: 25, price: 40 },
    { id: 'manicure', name: 'Hand Care', duration: 25, price: 45 },
    { id: 'premium', name: 'Premium Package', duration: 90, price: 150 },
  ],
  6: [
    { id: 'styling', name: 'Modern Styling', duration: 40, price: 70 },
    { id: 'color', name: 'Hair Coloring', duration: 120, price: 200 },
    { id: 'facial', name: 'Deep Cleanse Facial', duration: 50, price: 110 },
    { id: 'massage', name: 'Scalp Massage', duration: 20, price: 40 },
  ],
};

const SalonGrid = ({ 
  salons = defaultSalons, 
  onViewDetails = () => {} 
}: SalonGridProps) => {
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    salon: Salon | null;
  }>({
    isOpen: false,
    salon: null,
  });

  const handleBookNow = (salonId: number) => {
    const salon = salons.find(s => s.id === salonId);
    if (salon) {
      setBookingModal({
        isOpen: true,
        salon,
      });
    }
  };

  const closeBookingModal = () => {
    setBookingModal({
      isOpen: false,
      salon: null,
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {salons.map((salon) => (
          <SalonCard
            key={salon.id}
            salon={salon}
            onBookNow={handleBookNow}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {/* Booking Modal */}
      {bookingModal.salon && (
        <BookingModal
          isOpen={bookingModal.isOpen}
          onClose={closeBookingModal}
          salon={{
            id: bookingModal.salon.id,
            name: bookingModal.salon.name,
            image: bookingModal.salon.image,
            location: bookingModal.salon.location,
          }}
          services={salonServices[bookingModal.salon.id] || []}
        />
      )}
    </>
  );
};

export default SalonGrid;