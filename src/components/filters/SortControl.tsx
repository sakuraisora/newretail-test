import type { FilterAction } from "@/lib/filterReducer";
import type { Dispatch } from "react";

type SortOption = "priceAsc" | "priceDesc" | "";

interface SortControlProps {
  sortBy: SortOption;
  onChange: (option: SortOption) => void;
  dispatch?: Dispatch<FilterAction>;
}

export function SortControl({ sortBy, onChange, dispatch }: SortControlProps) {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      <h3 className="font-medium text-sm">排序</h3>
      <select
        value={sortBy}
        onChange={(e) => {
          const value = e.target.value as SortOption;
          if (dispatch) {
            dispatch({ type: "SET_SORT_BY", payload: value });
          } else {
            onChange(value);
          }
        }}
        className="p-2 border rounded-md text-sm"
      >
        <option value="">預設</option>
        <option value="priceAsc">價格: 低到高</option>
        <option value="priceDesc">價格: 高到低</option>
      </select>
    </div>
  );
}
