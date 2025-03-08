import React from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search, MapPin, Users } from "lucide-react";

interface SearchOverlayProps {
  onSearch?: (searchParams: {
    location: string;
    dates: DateRange | undefined;
    guests: number;
  }) => void;
  isOpen?: boolean;
}

const SearchOverlay = ({
  onSearch = () => {},
  isOpen = true,
}: SearchOverlayProps) => {
  const [location, setLocation] = React.useState("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  });
  const [guests, setGuests] = React.useState(1);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-full border shadow-lg p-2">
      <div className="flex items-center divide-x">
        {/* Location Search */}
        <div className="flex-1 px-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <Input
              placeholder="Where are you going?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            />
          </div>
        </div>

        {/* Date Range Picker */}
        <div className="px-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-gray-500",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd")} -{" "}
                      {format(date.to, "LLL dd")}
                    </>
                  ) : (
                    format(date.from, "LLL dd")
                  )
                ) : (
                  <span>Select dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests Counter */}
        <div className="px-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {guests} Guest{guests !== 1 ? "s" : ""}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="flex items-center justify-between p-4">
                <span>Guests</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={guests <= 1}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{guests}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGuests(guests + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="pl-4">
          <Button
            onClick={() => onSearch({ location, dates: date, guests })}
            className="bg-[#FF385C] text-white hover:bg-[#FF385C]/90 rounded-full"
          >
            <Search className="h-4 w-4" />
            <span className="ml-2">Search</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
