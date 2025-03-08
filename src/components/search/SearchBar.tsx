import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { addDays } from "date-fns";

interface SearchBarProps {
  onSearch?: () => void;
  defaultLocation?: string;
  defaultDates?: {
    from: Date;
    to: Date;
  };
  defaultGuests?: {
    adults: number;
    children: number;
    infants: number;
  };
}

const SearchBar = ({
  onSearch = () => {},
  defaultLocation = "Anywhere",
  defaultDates = {
    from: new Date(),
    to: addDays(new Date(), 7),
  },
  defaultGuests = {
    adults: 1,
    children: 0,
    infants: 0,
  },
}: SearchBarProps) => {
  return (
    <div className="bg-white w-full max-w-[350px] h-12 rounded-full border shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-between px-2">
      <Button
        variant="ghost"
        className="h-10 rounded-full px-4 flex items-center gap-3 text-sm font-medium"
      >
        <Search className="h-4 w-4" />
        <div className="flex flex-col items-start">
          <span className="font-medium">Anywhere</span>
          <span className="text-xs text-muted-foreground">
            Any week · Add guests
          </span>
        </div>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-full border border-gray-200"
      >
        <SlidersHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchBar;
