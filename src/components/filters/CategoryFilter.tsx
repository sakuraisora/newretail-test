import type { FilterAction } from "@/lib/filterReducer";
import { Input } from "../ui/input";
import type { Dispatch } from "react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
  dispatch?: Dispatch<FilterAction>;
}

export function CategoryFilter({
  categories,
  selectedCategories,
  onChange,
  dispatch,
}: CategoryFilterProps) {
  const handleCategoryChange = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    // If dispatch is provided, use it directly
    if (dispatch) {
      dispatch({ type: "SET_CATEGORIES", payload: newCategories });
    } else {
      // Otherwise fall back to the onChange prop for backward compatibility
      onChange(newCategories);
    }
  };

  return (
    <div className="flex flex-col space-y-2 mb-4">
      <h3 className="font-medium text-sm">類別</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <label key={category} className="flex items-center space-x-2">
            <Input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="text-sm">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
