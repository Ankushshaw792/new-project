import React, { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Star,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Search,
  Settings,
  Bell,
  UserCheck,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Salon {
  id: number;
  name: string;
  owner: string;
  location: string;
  phone: string;
  email: string;
  status: 'active' | 'pending' | 'suspended';
  rating: number;
  totalBookings: number;
  revenue: number;
  joinedDate: string;
}

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  salonName: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  amount: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  totalSpent: number;
  joinedDate: string;
  status: 'active' | 'inactive';
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [isAddSalonOpen, setIsAddSalonOpen] = useState(false);

  // Sample data
  const stats = {
    totalSalons: 156,
    totalUsers: 2847,
    totalBookings: 1234,
    totalRevenue: 45678,
    monthlyGrowth: 12.5,
    activeBookings: 89,
  };

  const salons: Salon[] = [
    {
      id: 1,
      name: 'Al Shanab Gents Salon',
      owner: 'Ahmed Al Mansouri',
      location: 'Jumeirah 1, Dubai',
      phone: '+971 4 123 4567',
      email: 'info@alshanab.com',
      status: 'active',
      rating: 5.0,
      totalBookings: 1234,
      revenue: 45678,
      joinedDate: '2023-01-15',
    },
    {
      id: 2,
      name: 'Royal Barber Shop',
      owner: 'Mohammed Hassan',
      location: 'Downtown Dubai',
      phone: '+971 4 234 5678',
      email: 'contact@royalbarber.com',
      status: 'active',
      rating: 4.8,
      totalBookings: 987,
      revenue: 32456,
      joinedDate: '2023-02-20',
    },
    {
      id: 3,
      name: 'Elite Men\'s Grooming',
      owner: 'Khalid Al Zaabi',
      location: 'Marina Walk',
      phone: '+971 4 345 6789',
      email: 'hello@elitegrooming.com',
      status: 'pending',
      rating: 4.9,
      totalBookings: 567,
      revenue: 28934,
      joinedDate: '2024-06-01',
    },
  ];

  const recentBookings: Booking[] = [
    {
      id: 'BK001',
      customerName: 'John Doe',
      customerPhone: '+971 50 123 4567',
      salonName: 'Al Shanab Gents Salon',
      service: 'Hair Cut + Beard Trim',
      date: '2024-06-20',
      time: '2:00 PM',
      status: 'confirmed',
      amount: 65,
    },
    {
      id: 'BK002',
      customerName: 'Mike Johnson',
      customerPhone: '+971 50 234 5678',
      salonName: 'Royal Barber Shop',
      service: 'Premium Hair Cut',
      date: '2024-06-20',
      time: '3:30 PM',
      status: 'completed',
      amount: 80,
    },
    {
      id: 'BK003',
      customerName: 'David Smith',
      customerPhone: '+971 50 345 6789',
      salonName: 'Elite Men\'s Grooming',
      service: 'Hair Color + Styling',
      date: '2024-06-19',
      time: '11:00 AM',
      status: 'cancelled',
      amount: 150,
    },
  ];

  const users: User[] = [
    {
      id: 'U001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+971 50 123 4567',
      totalBookings: 15,
      totalSpent: 1250,
      joinedDate: '2023-03-15',
      status: 'active',
    },
    {
      id: 'U002',
      name: 'Mike Johnson',
      email: 'mike.j@example.com',
      phone: '+971 50 234 5678',
      totalBookings: 8,
      totalSpent: 680,
      joinedDate: '2023-05-20',
      status: 'active',
    },
    {
      id: 'U003',
      name: 'David Smith',
      email: 'david.smith@example.com',
      phone: '+971 50 345 6789',
      totalBookings: 3,
      totalSpent: 245,
      joinedDate: '2024-01-10',
      status: 'inactive',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'confirmed':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
      case 'cancelled':
      case 'no-show':
        return 'bg-red-100 text-red-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your salon booking platform</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Salons</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalSalons}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBookings.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">AED {stats.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="salons">Salons</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{booking.customerName}</p>
                          <p className="text-sm text-gray-600">{booking.salonName}</p>
                          <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                          <p className="text-sm font-medium mt-1">AED {booking.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Salons */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Top Performing Salons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salons.slice(0, 5).map((salon) => (
                      <div key={salon.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{salon.name}</p>
                          <p className="text-sm text-gray-600">{salon.location}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-4 w-4 fill-current text-yellow-400" />
                            <span className="text-sm">{salon.rating}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">AED {salon.revenue.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{salon.totalBookings} bookings</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Salons Tab */}
          <TabsContent value="salons" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search salons..." className="pl-10 w-64" />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={isAddSalonOpen} onOpenChange={setIsAddSalonOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Salon
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Salon</DialogTitle>
                    <DialogDescription>
                      Register a new salon on the platform
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="salon-name">Salon Name</Label>
                      <Input id="salon-name" placeholder="Enter salon name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="owner-name">Owner Name</Label>
                      <Input id="owner-name" placeholder="Enter owner name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="+971 4 123 4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="salon@example.com" />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="Enter full address" />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Salon description..." />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddSalonOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Add Salon
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Salon</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salons.map((salon) => (
                      <TableRow key={salon.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{salon.name}</p>
                            <p className="text-sm text-gray-600">{salon.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{salon.owner}</TableCell>
                        <TableCell>{salon.location}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(salon.status)}>
                            {salon.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-current text-yellow-400" />
                            <span>{salon.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>{salon.totalBookings}</TableCell>
                        <TableCell>AED {salon.revenue.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search bookings..." className="pl-10 w-64" />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Salon</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.customerName}</p>
                            <p className="text-sm text-gray-600">{booking.customerPhone}</p>
                          </div>
                        </TableCell>
                        <TableCell>{booking.salonName}</TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>
                          <div>
                            <p>{booking.date}</p>
                            <p className="text-sm text-gray-600">{booking.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>AED {booking.amount}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search users..." className="pl-10 w-64" />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Users
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Total Bookings</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Joined Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{user.email}</p>
                            <p className="text-sm text-gray-600">{user.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>{user.totalBookings}</TableCell>
                        <TableCell>AED {user.totalSpent}</TableCell>
                        <TableCell>{user.joinedDate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <UserCheck className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Revenue Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Revenue Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Booking Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Booking Trends Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">User Growth Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Geographic Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Geographic Map Placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;