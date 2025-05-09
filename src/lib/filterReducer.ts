// Define the filter state interface
export interface FilterState {
  search: string;
  categories: string[];
  minPrice: number | "";
  maxPrice: number | "";
  inStockOnly: boolean;
  sortBy: "priceAsc" | "priceDesc" | "";
  currentPage: number;
  itemsPerPage: number;
}

// Define action types
export type FilterAction =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_CATEGORIES"; payload: string[] }
  | { type: "SET_MIN_PRICE"; payload: number | "" }
  | { type: "SET_MAX_PRICE"; payload: number | "" }
  | { type: "SET_IN_STOCK_ONLY"; payload: boolean }
  | { type: "SET_SORT_BY"; payload: "priceAsc" | "priceDesc" | "" }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "SET_ITEMS_PER_PAGE"; payload: number }
  | { type: "RESET_FILTERS" };

// Initial state
export const initialFilterState: FilterState = {
  search: "",
  categories: [],
  minPrice: "",
  maxPrice: "",
  inStockOnly: false,
  sortBy: "",
  currentPage: 1,
  itemsPerPage: 10,
};

// Reducer function
export function filterReducer(
  state: FilterState,
  action: FilterAction,
): FilterState {
  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload,
        currentPage: 1, // Reset to first page on search
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
        currentPage: 1,
      };
    case "SET_MIN_PRICE":
      return {
        ...state,
        minPrice: action.payload,
        currentPage: 1,
      };
    case "SET_MAX_PRICE":
      return {
        ...state,
        maxPrice: action.payload,
        currentPage: 1,
      };
    case "SET_IN_STOCK_ONLY":
      return {
        ...state,
        inStockOnly: action.payload,
        currentPage: 1,
      };
    case "SET_SORT_BY":
      return {
        ...state,
        sortBy: action.payload,
        currentPage: 1,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "SET_ITEMS_PER_PAGE":
      return {
        ...state,
        itemsPerPage: action.payload,
        currentPage: 1, // Reset to first page when changing items per page
      };
    case "RESET_FILTERS":
      return {
        ...initialFilterState,
        // Keep the current items per page setting
        itemsPerPage: state.itemsPerPage,
      };
    default:
      return state;
  }
}
