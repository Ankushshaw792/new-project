import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Share, Star, ArrowLeft, MapPin, Clock, Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ListingDetailProps {
  listing?: {
    id: number;
    image: string;
    location: string;
    distance: string;
    dates: string;
    price: string;
    rating?: number;
    isNew: boolean;
    isFavorite: boolean;
    description?: string;
    host?: {
      name: string;
      image: string;
      isSuperhost: boolean;
      joinedDate: string;
    };
    amenities?: string[];
  };
}

const ListingDetail = ({ listing }: ListingDetailProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Back Arrow - White background with green buttons */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Back Arrow */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackClick}
            className="rounded-full hover:bg-gray-100 text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {/* Center - Page Title */}
          <h1 className="text-lg font-semibold text-gray-900">
            Al Shanab Gents Salon
          </h1>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full text-gray-900">
              <Share className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-gray-900">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-[80px]">
        {/* Image Gallery */}
        <div className="grid grid-cols-4 gap-2 p-4">
          {/* Main large image */}
          <div className="col-span-2 row-span-2">
            <img
              src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop&q=60"
              alt="Salon main"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {/* Smaller images */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <img
                src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&auto=format&fit=crop&q=60"
                alt={`Salon ${i}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* Salon Info Card */}
        <div className="mx-4 mb-6 bg-white text-black rounded-2xl p-6">
          <h1 className="text-2xl font-bold mb-2">Al Shanab Gents Salon</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-semibold">5.0</span>
            <span className="text-purple-600">(469)</span>
          </div>
          <div className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full inline-block text-sm font-medium mb-4">
            Featured
          </div>
          <Button className="w-full bg-black text-white hover:bg-gray-800 py-3 rounded-xl text-lg font-medium mb-6">
            Book now
          </Button>
          
          {/* Opening hours */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gray-100 rounded-full">
              <Clock className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-medium">Open</span>
                <span className="text-gray-600">until 10:00 pm</span>
              </div>
              <button className="text-gray-500 text-sm hover:underline">See hours</button>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-full">
              <MapPin className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <div className="text-gray-900">14 B Street, Jumeirah 1, Dubai</div>
              <button className="text-purple-600 text-sm hover:underline">Get directions</button>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="px-4 mb-8">
          <div className="flex gap-2 mb-6 overflow-x-auto">
            <Button className="bg-black text-white rounded-full px-6 py-2 whitespace-nowrap">
              Featured
            </Button>
            <Button variant="outline" className="border-gray-600 text-white rounded-full px-6 py-2 whitespace-nowrap">
              Hair
            </Button>
            <Button variant="outline" className="border-gray-600 text-white rounded-full px-6 py-2 whitespace-nowrap">
              Beard
            </Button>
            <Button variant="outline" className="border-gray-600 text-white rounded-full px-6 py-2 whitespace-nowrap">
              Face
            </Button>
            <Button variant="outline" className="border-gray-600 text-white rounded-full px-6 py-2 whitespace-nowrap">
              Nails
            </Button>
          </div>

          {/* Service Items */}
          <div className="space-y-4">
            {[
              { name: "Threading/Trimming/Shaving", duration: "45 mins", price: "AED 40" },
              { name: "Gents Haircut", duration: "45 mins", price: "AED 70" },
              { name: "Manicure & Pedicure", duration: "45 mins", price: "AED 155" },
              { name: "Complete Head Shave", duration: "25 mins", price: "AED 30" }
            ].map((service, index) => (
              <div key={index} className="bg-gray-900 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold mb-1">{service.name}</h3>
                  <p className="text-gray-400 text-sm">{service.duration}</p>
                  <p className="text-white font-semibold mt-1">{service.price}</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6">
                  Book
                </Button>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-6 border-gray-600 text-white rounded-full py-3">
            See all
          </Button>
        </div>

        {/* Team Section */}
        <div className="px-4 mb-8">
          <h2 className="text-2xl font-bold mb-6">Team</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: "Elbie", role: "Therapist", rating: "5.0", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
              { name: "Liezel", role: "Head Therapist", rating: "5.0", initial: "L" },
              { name: "Ahmed", role: "Beard Specialist", rating: "4.9", initial: "A" },
              { name: "Romeo", role: "Senior Hairstylist", rating: "5.0", initial: "R" },
              { name: "Ayaz", role: "Beard Specialist", rating: "4.9", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
              { name: "Muhammad", role: "Beard Specialist", rating: "5.0", initial: "M" },
              { name: "Reynil", role: "Hairstylist", rating: "5.0", initial: "R" }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-3">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl text-purple-600 font-bold">{member.initial}</span>
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full px-2 py-1 shadow-md">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-black">{member.rating}</span>
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-sm">{member.name}</h3>
                <p className="text-gray-400 text-xs">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="px-4 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold">Reviews</h2>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold">5.0</span>
              <span className="text-purple-400">(469)</span>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { name: "Surendra singh T.", date: "Fri, 14 Feb, 2025 at 10:16 pm", review: "Liked the place . And hair stylist. He gave a nice hair cut.", initial: "S" },
              { name: "Odd arvid W.", date: "Thu, 30 Jan, 2025 at 10:59 pm", review: "Always great hair cutting at this salon. Thanks.😊", initial: "O" },
              { name: "Yahya", date: "Thu, 30 Jan, 2025 at 7:05 pm", review: "💚👍", initial: "Y" },
              { name: "Simon W.", date: "Tue, 14 Jan, 2025 at 9:38 pm", review: "Fantastic", initial: "S", bgColor: "bg-orange-600" },
              { name: "Rashid", date: "Fri, 3 Jan, 2025 at 2:16 am", review: "Very good and nice", initial: "R" },
              { name: "Osama M.", date: "Thu, 2 Jan, 2025 at 6:05 pm", review: "Best Hair Salon in Dubai!\nThe whole team is amazing at what they do.", initial: "O" }
            ].map((review, index) => (
              <div key={index}>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 ${review.bgColor || 'bg-purple-100'} rounded-full flex items-center justify-center`}>
                    <span className={`font-semibold ${review.bgColor ? 'text-white' : 'text-purple-600'}`}>
                      {review.initial}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-gray-400 text-sm">{review.date}</p>
                  </div>
                </div>
                <div className="flex mb-2 ml-13">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 ml-13">{review.review}</p>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-6 border-gray-600 text-white rounded-full py-3">
            See all
          </Button>
        </div>

        {/* About Section */}
        <div className="px-4 mb-8">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Located beside Seddiqi mosque behind Mercato mall, Al Shanab Gents Salon is the latest craze among the men of Dubai. It is the perfect blend of a classic old-school Emirati barbershop in a modern setting. We offer professional services from traditional blade shaves to taper fade haircuts, book your appointment today to experience some of Dubai's finest barbers.
          </p>

          {/* Map */}
          <div className="bg-gray-800 rounded-2xl h-48 mb-4 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Map View</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">14 B Street, Jumeirah 1, Dubai</h3>
              <button className="text-purple-400 hover:underline">Get directions</button>
            </div>
          </div>

          {/* Opening Times */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Opening times</h3>
            <div className="space-y-3">
              {[
                { day: "Monday", hours: "10:00 am - 10:00 pm" },
                { day: "Tuesday", hours: "10:00 am - 10:00 pm" },
                { day: "Wednesday", hours: "10:00 am - 10:00 pm" },
                { day: "Thursday", hours: "10:00 am - 10:00 pm" },
                { day: "Friday", hours: "3:00 pm - 11:00 pm" },
                { day: "Saturday", hours: "10:00 am - 10:00 pm" },
                { day: "Sunday", hours: "10:00 am - 10:00 pm" }
              ].map((schedule, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>{schedule.day}</span>
                  </div>
                  <span className="text-gray-400">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Additional information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-500" />
                <span>Pay by app</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Venues */}
        <div className="px-4 mb-8">
          <h2 className="text-2xl font-bold mb-6">Nearby venues</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: "Dubai Mall Salon", distance: "0.8 km away", rating: "4.9", reviews: "(238)" },
              { name: "Jumeirah Beach Salon", distance: "1.2 km away", rating: "4.8", reviews: "(186)" },
              { name: "Marina Walk Salon", distance: "1.5 km away", rating: "4.7", reviews: "(142)" }
            ].map((venue, index) => (
              <div key={index} className="space-y-3">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-800">
                  <img
                    src={`https://images.unsplash.com/photo-160060768${6527 + index}?w=400&auto=format&fit=crop&q=60`}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{venue.name}</h3>
                  <p className="text-gray-400 text-sm">{venue.distance}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{venue.rating}</span>
                    <span className="text-gray-400 text-sm">{venue.reviews}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;