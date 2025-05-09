type SortOption = "priceAsc" | "priceDesc" | "";

interface SortControlProps {
  sortBy: SortOption;
  onChange: (option: SortOption) => void;
}

export function SortControl({ sortBy, onChange }: SortControlProps) {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      <h3 className="font-medium text-sm">排序</h3>
      <select
        value={sortBy}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="p-2 border rounded-md text-sm"
      >
        <option value="">預設</option>
        <option value="priceAsc">價格: 低到高</option>
        <option value="priceDesc">價格: 高到低</option>
      </select>
    </div>
  );
}
