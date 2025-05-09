import type { FilterAction } from "@/lib/filterReducer";
import { Button } from "../ui/button";
import type { Dispatch } from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  dispatch?: Dispatch<FilterAction>;
}

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  dispatch,
}: PaginationProps) {
  const itemsPerPageOptions = [10, 20, 50, 100];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      if (dispatch) {
        dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage - 1 });
      } else {
        onPageChange(currentPage - 1);
      }
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      if (dispatch) {
        dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage + 1 });
      } else {
        onPageChange(currentPage + 1);
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">每頁顯示數量:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (dispatch) {
              dispatch({ type: "SET_ITEMS_PER_PAGE", payload: value });
            } else {
              onItemsPerPageChange(value);
            }
          }}
          className="border rounded-md p-1 text-sm"
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
        >
          前一頁
        </Button>

        <span className="text-sm px-2">
          第 {currentPage} of {totalPages || 1} 頁
        </span>

        <Button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          variant="outline"
          size="sm"
        >
          後一頁
        </Button>
      </div>
    </div>
  );
}
