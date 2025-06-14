import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { SlidersHorizontal } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface BottomNavProps {
  categories?: Category[];
  selectedCategory?: string;
  onCategorySelect?: (id: string) => void;
  onFiltersClick?: () => void;
  showTotalPrice?: boolean;
  onPriceDisplayToggle?: (checked: boolean) => void;
}

const defaultCategories: Category[] = [
  { id: "1", name: "Hair Cut", icon: "✂️" },
  { id: "2", name: "Hair Styling", icon: "💇‍♂️" },
  { id: "3", name: "Beard Trim", icon: "🧔" },
  { id: "4", name: "Shaving", icon: "🪒" },
  { id: "5", name: "Hair Wash", icon: "🚿" },
  { id: "6", name: "Massage", icon: "💆‍♂️" },
  { id: "7", name: "Facial", icon: "🧴" },
  { id: "8", name: "Manicure", icon: "💅" },
  { id: "9", name: "Hair Color", icon: "🎨" },
  { id: "10", name: "Premium", icon: "⭐" },
];

const BottomNav = ({
  categories = defaultCategories,
  selectedCategory = "",
  onCategorySelect = () => {},
  onFiltersClick = () => {},
  showTotalPrice = false,
  onPriceDisplayToggle = () => {},
}: BottomNavProps) => {
  return (
    <div className="w-full h-20 bg-white border-t border-gray-200 flex items-center justify-between px-6">
      <ScrollArea className="w-[calc(100%-300px)]">
        <div className="flex space-x-6 py-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`flex flex-col items-center min-w-[80px] py-2 px-4 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? "border-b-2 border-black"
                  : "hover:bg-gray-50"
              }`}
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-sm whitespace-nowrap">{category.name}</span>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={onFiltersClick}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>

        <div className="flex items-center gap-2">
          <Switch
            checked={showTotalPrice}
            onCheckedChange={onPriceDisplayToggle}
          />
          <span className="text-sm text-gray-600">
            Display total before taxes
          </span>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;