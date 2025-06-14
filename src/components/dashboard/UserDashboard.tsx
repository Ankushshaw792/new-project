import React, { useState } from 'react';
import { Calendar, Clock, Star, MapPin, Phone, Mail, User, Heart, Settings, CreditCard, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface Booking {
  id: string;
  salonName: string;
  salonImage: string;
  service: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
  duration: number;
  location: string;
}

interface FavoriteSalon {
  id: number;
  name: string;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
}

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+971 50 123 4567',
    avatar: '',
    bio: 'Regular customer who loves great haircuts and professional service.',
  });

  const [notifications, setNotifications] = useState({
    bookingReminders: true,
    promotions: true,
    newSalons: false,
    reviews: true,
  });

  // Sample bookings data
  const bookings: Booking[] = [
    {
      id: '1',
      salonName: 'Al Shanab Gents Salon',
      salonImage: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400',
      service: 'Hair Cut + Beard Trim',
      date: '2024-06-20',
      time: '2:00 PM',
      status: 'upcoming',
      price: 65,
      duration: 45,
      location: 'Jumeirah 1, Dubai',
    },
    {
      id: '2',
      salonName: 'Royal Barber Shop',
      salonImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400',
      service: 'Premium Hair Cut',
      date: '2024-06-15',
      time: '4:30 PM',
      status: 'completed',
      price: 80,
      duration: 60,
      location: 'Downtown Dubai',
    },
    {
      id: '3',
      salonName: 'Elite Men\'s Grooming',
      salonImage: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=400',
      service: 'Hair Color + Styling',
      date: '2024-06-10',
      time: '11:00 AM',
      status: 'completed',
      price: 150,
      duration: 90,
      location: 'Marina Walk',
    },
  ];

  // Sample favorite salons
  const favoriteSalons: FavoriteSalon[] = [
    {
      id: 1,
      name: 'Al Shanab Gents Salon',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400',
      location: 'Jumeirah 1, Dubai',
      rating: 5.0,
      reviewCount: 591,
    },
    {
      id: 2,
      name: 'Royal Barber Shop',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400',
      location: 'Downtown Dubai',
      rating: 4.8,
      reviewCount: 324,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings = bookings.filter(b => b.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your bookings, favorites, and profile</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">{upcomingBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{pastBookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Favorites</p>
                  <p className="text-2xl font-bold text-gray-900">{favoriteSalons.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">AED 295</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingBookings.length > 0 ? (
                    upcomingBookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={booking.salonImage}
                              alt={booking.salonName}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="font-semibold">{booking.salonName}</h4>
                              <p className="text-sm text-gray-600">{booking.service}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-gray-400" />
                            <span>AED {booking.price}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">No upcoming bookings</p>
                  )}
                </CardContent>
              </Card>

              {/* Past Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Past Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pastBookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={booking.salonImage}
                            alt={booking.salonName}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-semibold">{booking.salonName}</h4>
                            <p className="text-sm text-gray-600">{booking.service}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-gray-400" />
                          <span>AED {booking.price}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Book Again
                        </Button>
                        <Button size="sm" variant="outline">
                          <Star className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Favorite Salons
                </CardTitle>
                <CardDescription>
                  Your saved salons for quick booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteSalons.map((salon) => (
                    <div key={salon.id} className="border rounded-lg p-4 space-y-3">
                      <img
                        src={salon.image}
                        alt={salon.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold">{salon.name}</h4>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {salon.location}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-current text-yellow-400" />
                          <span className="text-sm">{salon.rating}</span>
                          <span className="text-sm text-gray-500">({salon.reviewCount})</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          Book Now
                        </Button>
                        <Button size="sm" variant="outline">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profileData.avatar} />
                    <AvatarFallback className="text-lg">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Photo</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows={3}
                  />
                </div>

                <Button className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Manage your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="booking-reminders">Booking Reminders</Label>
                      <p className="text-sm text-gray-600">Get notified before your appointments</p>
                    </div>
                    <Switch
                      id="booking-reminders"
                      checked={notifications.bookingReminders}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, bookingReminders: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="promotions">Promotions & Offers</Label>
                      <p className="text-sm text-gray-600">Receive special deals and discounts</p>
                    </div>
                    <Switch
                      id="promotions"
                      checked={notifications.promotions}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, promotions: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-salons">New Salons</Label>
                      <p className="text-sm text-gray-600">Get notified about new salons in your area</p>
                    </div>
                    <Switch
                      id="new-salons"
                      checked={notifications.newSalons}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, newSalons: checked})
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reviews">Review Requests</Label>
                      <p className="text-sm text-gray-600">Get reminded to review your visits</p>
                    </div>
                    <Switch
                      id="reviews"
                      checked={notifications.reviews}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, reviews: checked})
                      }
                    />
                  </div>
                </div>

                <Button className="bg-green-600 hover:bg-green-700">
                  Save Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;