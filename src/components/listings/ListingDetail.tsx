import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Share, Star, ArrowLeft, Search, Menu, MapPin, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth";

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
  const { user, signOut } = useAuth();

  const handleBackClick = () => {
    // Go back to previous page if available, otherwise go to home
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  // This would typically fetch the listing data based on the ID
  const listingData = listing || {
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
    description:
      "Experience luxury in the heart of Jaipur. This stunning salon space offers a perfect blend of traditional and modern aesthetics.",
    host: {
      name: "Rajesh",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=host1",
      isSuperhost: true,
      joinedDate: "January 2020",
    },
    amenities: [
      "Free WiFi",
      "Air conditioning",
      "Professional equipment",
      "Waiting area",
      "Refreshments",
      "Parking available",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* New Header Design */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b">
        <div className="flex items-center gap-4 px-6 py-4">
          {/* Back Arrow */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackClick}
            className="rounded-full hover:bg-gray-100 flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-black">NYLOUR</h1>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-lg mx-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for Salon or Styles"
              className="pl-10 pr-4 py-3 w-full border-gray-300 rounded-full bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Menu Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100 flex-shrink-0"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <span>For customers</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {user ? (
                <>
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Log in or sign up
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Download the app
              </DropdownMenuItem>
              <DropdownMenuItem>
                Help and support
              </DropdownMenuItem>
              <DropdownMenuItem>
                🌐 English
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="font-medium">For businesses</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-[80px]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold mb-2">{listingData.location}</h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>{listingData.rating}</span>
                </div>
                <span>·</span>
                <span className="underline">{listingData.distance}</span>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="flex items-center gap-2">
                  <Share className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-4 gap-4 mb-8 rounded-xl overflow-hidden">
            <div className="col-span-2 row-span-2">
              <img
                src={listingData.image}
                alt={listingData.location}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <img
                src={listingData.image}
                alt={listingData.location}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <img
                src={listingData.image}
                alt={listingData.location}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <img
                src={listingData.image}
                alt={listingData.location}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <img
                src={listingData.image}
                alt={listingData.location}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-3 gap-12">
            <div className="col-span-2">
              {/* Service Section */}
              <div className="mt-16">
                <h1 className="text-5xl font-bold mb-8">Services</h1>

                <div className="flex gap-4 mb-6">
                  <Button
                    variant="outline"
                    className="rounded-full px-6 py-2 bg-black text-white hover:bg-black/90"
                  >
                    Featured
                  </Button>
                  <Button variant="outline" className="rounded-full px-6 py-2">
                    Hair
                  </Button>
                  <Button variant="outline" className="rounded-full px-6 py-2">
                    Beard
                  </Button>
                  <Button variant="outline" className="rounded-full px-6 py-2">
                    Face
                  </Button>
                  <Button variant="outline" className="rounded-full px-6 py-2">
                    Nails
                  </Button>
                  <Button variant="outline" className="rounded-full px-6 py-2">
                    Massage
                  </Button>
                  <Button variant="outline" className="rounded-full px-6 py-2">
                    Waxing
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Threading/Trimming/Shaving */}
                  <div className="flex items-center justify-between p-6 rounded-2xl border hover:shadow-md transition-shadow">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Threading/Trimming/Shaving
                      </h3>
                      <p className="text-gray-500">45 mins</p>
                      <p className="text-xl font-semibold mt-2">AED 40</p>
                    </div>
                    <Button className="rounded-full px-8">Book</Button>
                  </div>

                  {/* Gents Haircut */}
                  <div className="flex items-center justify-between p-6 rounded-2xl border hover:shadow-md transition-shadow">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Gents Haircut</h3>
                      <p className="text-gray-500">45 mins</p>
                      <p className="text-xl font-semibold mt-2">AED 70</p>
                    </div>
                    <Button className="rounded-full px-8">Book</Button>
                  </div>

                  {/* Manicure & Pedicure */}
                  <div className="flex items-center justify-between p-6 rounded-2xl border hover:shadow-md transition-shadow">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Manicure & Pedicure
                      </h3>
                      <p className="text-gray-500">45 mins</p>
                      <p className="text-xl font-semibold mt-2">AED 155</p>
                    </div>
                    <Button className="rounded-full px-8">Book</Button>
                  </div>

                  {/* Complete Head Shave */}
                  <div className="flex items-center justify-between p-6 rounded-2xl border hover:shadow-md transition-shadow">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Complete Head Shave
                      </h3>
                      <p className="text-gray-500">25 mins</p>
                      <p className="text-xl font-semibold mt-2">AED 30</p>
                    </div>
                    <Button className="rounded-full px-8">Book</Button>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="mt-8 text-lg font-medium rounded-full px-8 py-6"
                >
                  See all
                </Button>
              </div>

              {/* Team Section */}
              <div className="mt-16">
                <h2 className="text-5xl font-bold mb-12">Team</h2>
                <div className="grid grid-cols-4 gap-8">
                  {/* Elbie */}
                  <div className="text-center">
                    <div className="relative mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                        alt="Elbie"
                        className="w-full aspect-square object-cover rounded-full"
                      />
                      <div className="absolute bottom-0 right-0 bg-white rounded-full px-3 py-1 shadow-md">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">5.0</span>
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">Elbie</h3>
                    <p className="text-gray-500">Therapist</p>
                  </div>

                  {/* Liezel and Elbie */}
                  <div className="text-center">
                    <div className="relative mb-4 bg-[#F5F3FF] rounded-full aspect-square flex items-center justify-center">
                      <span className="text-6xl text-[#7C3AED]">L</span>
                      <div className="absolute bottom-0 right-0 bg-white rounded-full px-3 py-1 shadow-md">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">5.0</span>
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">Liezel and Elbie</h3>
                    <p className="text-gray-500">Head Therapist</p>
                  </div>

                  {/* Ahmed */}
                  <div className="text-center">
                    <div className="relative mb-4 bg-[#F5F3FF] rounded-full aspect-square flex items-center justify-center">
                      <span className="text-6xl text-[#7C3AED]">A</span>
                      <div className="absolute bottom-0 right-0 bg-white rounded-full px-3 py-1 shadow-md">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">4.9</span>
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">Ahmed</h3>
                    <p className="text-gray-500">Beard Specialist</p>
                  </div>

                  {/* Romeo */}
                  <div className="text-center">
                    <div className="relative mb-4 bg-[#F5F3FF] rounded-full aspect-square flex items-center justify-center">
                      <span className="text-6xl text-[#7C3AED]">R</span>
                      <div className="absolute bottom-0 right-0 bg-white rounded-full px-3 py-1 shadow-md">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">5.0</span>
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">Romeo</h3>
                    <p className="text-gray-500">Senior Hairstylist</p>
                  </div>

                  {/* Ayaz */}
                  <div className="text-center">
                    <div className="relative mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                        alt="Ayaz"
                        className="w-full aspect-square object-cover rounded-full"
                      />
                      <div className="absolute bottom-0 right-0 bg-white rounded-full px-3 py-1 shadow-md">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">4.9</span>
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">Ayaz</h3>
                    <p className="text-gray-500">Beard Specialist</p>
                  </div>

                  {/* Muhammad */}
                  <div className="text-center">
                    <div className="relative mb-4 bg-[#F5F3FF] rounded-full aspect-square flex items-center justify-center">
                      <span className="text-6xl text-[#7C3AED]">M</span>
                      <div className="absolute bottom-0 right-0 bg-white rounded-full px-3 py-1 shadow-md">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">5.0</span>
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">Muhammad</h3>
                    <p className="text-gray-500">Beard Specialist</p>
                  </div>

                  {/* Reynil */}
                  <div className="text-center">
                    <div className="relative mb-4 bg-[#F5F3FF] rounded-full aspect-square flex items-center justify-center">
                      <span className="text-6xl text-[#7C3AED]">R</span>
                      <div className="absolute bottom-0 right-0 bg-white rounded-full px-3 py-1 shadow-md">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold">5.0</span>
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">Reynil</h3>
                    <p className="text-gray-500">Hairstylist</p>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="mt-16">
                <div className="flex items-baseline gap-4 mb-12">
                  <h2 className="text-5xl font-bold">Reviews</h2>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <span className="text-xl font-semibold">5.0</span>
                    <span className="text-[#7C3AED] text-xl">(469)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-16 gap-y-12">
                  {/* Surendra singh T. */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-[#F5F3FF] rounded-full h-12 w-12 flex items-center justify-center">
                        <span className="text-xl text-[#7C3AED]">S</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Surendra singh T.</h3>
                        <p className="text-gray-500">
                          Fri, 14 Feb, 2025 at 10:16 pm
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p>
                      Liked the place . And hair stylist. He gave a nice hair cut.
                    </p>
                  </div>

                  {/* Odd arvid W. */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-[#F5F3FF] rounded-full h-12 w-12 flex items-center justify-center">
                        <span className="text-xl text-[#7C3AED]">O</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Odd arvid W.</h3>
                        <p className="text-gray-500">
                          Thu, 30 Jan, 2025 at 10:59 pm
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p>Always great hair cutting at this salon. Thanks.😊</p>
                  </div>

                  {/* Yahya */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-[#F5F3FF] rounded-full h-12 w-12 flex items-center justify-center">
                        <span className="text-xl text-[#7C3AED]">Y</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Yahya</h3>
                        <p className="text-gray-500">
                          Thu, 30 Jan, 2025 at 7:05 pm
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p>💚👍</p>
                  </div>

                  {/* Simon W. */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-[#C2410C] rounded-full h-12 w-12 flex items-center justify-center">
                        <span className="text-xl text-white">S</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Simon W.</h3>
                        <p className="text-gray-500">
                          Tue, 14 Jan, 2025 at 9:38 pm
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p>Fantastic</p>
                  </div>

                  {/* Rashid */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-[#F5F3FF] rounded-full h-12 w-12 flex items-center justify-center">
                        <span className="text-xl text-[#7C3AED]">R</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Rashid</h3>
                        <p className="text-gray-500">Fri, 3 Jan, 2025 at 2:16 am</p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p>Very good and nice</p>
                  </div>

                  {/* Osama M. */}
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-[#F5F3FF] rounded-full h-12 w-12 flex items-center justify-center">
                        <span className="text-xl text-[#7C3AED]">O</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Osama M.</h3>
                        <p className="text-gray-500">Thu, 2 Jan, 2025 at 6:05 pm</p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p>
                      Best Hair Salon in Dubai!
                      <br />
                      The whole team is amazing at what they do.
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="mt-12 text-lg font-medium rounded-full px-8 py-6"
                >
                  See all
                </Button>
              </div>

              {/* About Section */}
              <div className="mt-16">
                <h1 className="text-5xl font-bold mb-8">About</h1>
                <p className="text-lg leading-relaxed mb-8">
                  Located beside Seddiqi mosque behind Mercato mall, Al Shanab Gents
                  Salon is the latest craze among the men of Dubai. It is the
                  perfect blend of a classic old-school Emirati barbershop in a
                  modern setting. We offer professional services from traditional
                  blade shaves to taper fade haircuts, book your appointment today
                  to experience some of Dubai's finest barbers.
                </p>

                {/* Map Section */}
                <div className="mb-8 rounded-2xl overflow-hidden h-[400px] bg-gray-100">
                  <img
                    src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/55.2667,25.2048,12,0/800x400@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
                    alt="Map showing 14 B Street, Jumeirah 1, Dubai"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg">14 B Street, Jumeirah 1, Dubai</h3>
                    <button className="text-[#7C3AED]">Get directions</button>
                  </div>
                </div>

                {/* Opening Times */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">Opening times</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Monday</span>
                      </div>
                      <span>10:00 am - 10:00 pm</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Tuesday</span>
                      </div>
                      <span>10:00 am - 10:00 pm</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Wednesday</span>
                      </div>
                      <span>10:00 am - 10:00 pm</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Thursday</span>
                      </div>
                      <span>10:00 am - 10:00 pm</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Friday</span>
                      </div>
                      <span>3:00 pm - 11:00 pm</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Saturday</span>
                      </div>
                      <span>10:00 am - 10:00 pm</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Sunday</span>
                      </div>
                      <span>10:00 am - 10:00 pm</span>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Additional information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
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
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Instant Confirmation</span>
                    </div>
                    <div className="flex items-center gap-2">
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
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                      <span>Pay by app</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nearby Venues Section */}
              <div className="mt-16">
                <h2 className="text-5xl font-bold mb-12">Nearby venues</h2>
                <div className="grid grid-cols-3 gap-8">
                  {/* Venue 1 */}
                  <div className="space-y-4">
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1600607686527-6fb886090705"
                        alt="Venue 1"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">Dubai Mall Salon</h3>
                      <p className="text-gray-500">0.8 km away</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span>4.9</span>
                        <span className="text-gray-500">(238)</span>
                      </div>
                    </div>
                  </div>

                  {/* Venue 2 */}
                  <div className="space-y-4">
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
                        alt="Venue 2"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">
                        Jumeirah Beach Salon
                      </h3>
                      <p className="text-gray-500">1.2 km away</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span>4.8</span>
                        <span className="text-gray-500">(186)</span>
                      </div>
                    </div>
                  </div>

                  {/* Venue 3 */}
                  <div className="space-y-4">
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1600607687644-c7f34c5a7b3d"
                        alt="Venue 3"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">Marina Walk Salon</h3>
                      <p className="text-gray-500">1.5 km away</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span>4.7</span>
                        <span className="text-gray-500">(142)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking card */}
            <div className="sticky top-8 h-fit">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h1 className="text-4xl font-bold mb-4">Al Shanab Gents Salon</h1>
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xl font-semibold">5.0</span>
                  <span className="text-purple-600 text-xl">(469)</span>
                </div>

                <div className="bg-purple-100 rounded-full px-6 py-2 inline-block mb-8">
                  <span className="text-purple-600 font-medium">Featured</span>
                </div>

                <Button className="w-full bg-black text-white hover:bg-gray-900 text-lg py-6 rounded-xl mb-8">
                  Book now
                </Button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-medium">Open</span>
                      <span>until 10:00 pm</span>
                    </div>
                    <button className="text-gray-600 hover:underline">
                      See hours
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div>14 B Street, Jumeirah 1, Dubai</div>
                    <button className="text-purple-600 hover:underline">
                      Get directions
                    </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;