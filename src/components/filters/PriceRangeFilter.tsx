import { type Dispatch } from "react";
import { Input } from "../ui/input";
import type { FilterAction } from "@/lib/filterReducer";

interface PriceRangeFilterProps {
  minPrice: number | "";
  maxPrice: number | "";
  onMinPriceChange: (value: number | "") => void;
  onMaxPriceChange: (value: number | "") => void;
  dispatch?: Dispatch<FilterAction>;
}

export function PriceRangeFilter({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  dispatch,
}: PriceRangeFilterProps) {
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);

    if (dispatch) {
      dispatch({ type: "SET_MIN_PRICE", payload: value });
    } else {
      onMinPriceChange(value);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);

    if (dispatch) {
      dispatch({ type: "SET_MAX_PRICE", payload: value });
    } else {
      onMaxPriceChange(value);
    }
  };

  return (
    <div className="flex flex-col space-y-2 mb-4">
      <h3 className="font-medium text-sm">價格範圍</h3>
      <div className="flex space-x-2">
        <Input
          type="number"
          placeholder="最低價"
          value={minPrice === "" ? "" : minPrice}
          onChange={handleMinPriceChange}
          className="w-24"
        />
        <span className="self-center">-</span>
        <Input
          type="number"
          placeholder="最高價"
          value={maxPrice === "" ? "" : maxPrice}
          onChange={handleMaxPriceChange}
          className="w-24"
        />
      </div>
    </div>
  );
}
