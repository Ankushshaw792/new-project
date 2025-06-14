import React, { useState } from 'react';
import { Filter, MapPin, Star, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

interface SearchFiltersProps {
  onFiltersChange?: (filters: any) => void;
}

const SearchFilters = ({ onFiltersChange = () => {} }: SearchFiltersProps) => {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [rating, setRating] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('');
  const [openNow, setOpenNow] = useState(false);

  const serviceOptions = [
    'Hair Cut',
    'Hair Styling',
    'Beard Trim',
    'Shaving',
    'Hair Wash',
    'Massage',
    'Facial',
    'Manicure',
    'Hair Color',
    'Premium Services'
  ];

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setServices([...services, service]);
    } else {
      setServices(services.filter(s => s !== service));
    }
  };

  const applyFilters = () => {
    const filters = {
      location,
      priceRange,
      rating,
      services,
      sortBy,
      openNow,
    };
    onFiltersChange(filters);
  };

  const clearFilters = () => {
    setLocation('');
    setPriceRange([0, 200]);
    setRating('');
    setServices([]);
    setSortBy('');
    setOpenNow(false);
    onFiltersChange({});
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Search Filters</SheetTitle>
          <SheetDescription>
            Refine your search to find the perfect salon
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Location Filter */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            <Input
              placeholder="Enter area or landmark"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Price Range (AED)
            </Label>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={200}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>AED {priceRange[0]}</span>
                <span>AED {priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Minimum Rating
            </Label>
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger>
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                <SelectItem value="4.0">4.0+ Stars</SelectItem>
                <SelectItem value="3.5">3.5+ Stars</SelectItem>
                <SelectItem value="3.0">3.0+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Services Filter */}
          <div className="space-y-3">
            <Label>Services</Label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {serviceOptions.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={services.includes(service)}
                    onCheckedChange={(checked) => 
                      handleServiceChange(service, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={service}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {service}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Open Now Filter */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="openNow"
              checked={openNow}
              onCheckedChange={setOpenNow}
            />
            <Label htmlFor="openNow" className="flex items-center gap-2 cursor-pointer">
              <Clock className="h-4 w-4" />
              Open Now
            </Label>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={clearFilters} className="flex-1">
              Clear All
            </Button>
            <Button onClick={applyFilters} className="flex-1 bg-green-600 hover:bg-green-700">
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchFilters;