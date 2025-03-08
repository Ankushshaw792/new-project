import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Sliders } from "lucide-react";

interface CategoryBarProps {
  selectedCategory?: string;
  onCategorySelect?: (id: string) => void;
  onFiltersClick?: () => void;
  showTotalPrice?: boolean;
  onPriceDisplayToggle?: (checked: boolean) => void;
}

const CategoryBar = ({
  selectedCategory = "",
  onCategorySelect = () => {},
  onFiltersClick = () => {},
  showTotalPrice = false,
  onPriceDisplayToggle = () => {},
}: CategoryBarProps) => {
  const categories = [
    { id: "pools", label: "Amazing pools", icon: "🏊‍♂️" },
    { id: "beach", label: "Beach front", icon: "🏖️" },
    { id: "castles", label: "Castles", icon: "🏰" },
    { id: "islands", label: "Islands", icon: "🏝️" },
    { id: "camping", label: "Camping", icon: "⛺" },
    { id: "arctic", label: "Arctic", icon: "❄️" },
    { id: "desert", label: "Desert", icon: "🏜️" },
    { id: "boats", label: "Boats", icon: "⛵" },
    { id: "mountains", label: "Mountains", icon: "🏔️" },
    { id: "tropical", label: "Tropical", icon: "🌴" },
  ];

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <ScrollArea className="w-[800px]">
        <div className="flex space-x-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className={`flex flex-col items-center gap-2 hover:border-b-2 ${
                selectedCategory === category.id
                  ? "border-b-2 border-black"
                  : "border-transparent"
              }`}
              onClick={() => onCategorySelect(category.id)}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-sm font-medium">{category.label}</span>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Switch
            id="price-display"
            checked={showTotalPrice}
            onCheckedChange={onPriceDisplayToggle}
          />
          <label
            htmlFor="price-display"
            className="text-sm font-medium cursor-pointer"
          >
            Display total before taxes
          </label>
        </div>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={onFiltersClick}
        >
          <Sliders className="h-4 w-4" />
          Filters
        </Button>
      </div>
    </div>
  );
};

export default CategoryBar;
