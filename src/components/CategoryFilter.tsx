import { Input } from "./ui/input";

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

export function CategoryFilter({
  categories,
  selectedCategories,
  onChange,
}: CategoryFilterProps) {
  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter((c) => c !== category));
    } else {
      onChange([...selectedCategories, category]);
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
