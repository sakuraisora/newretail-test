import { useState, useEffect, useMemo } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { CategoryFilter } from "./components/CategoryFilter";
import { PriceRangeFilter } from "./components/PriceRangeFilter";
import { StockFilter } from "./components/StockFilter";
import { SortControl } from "./components/SortControl";
import { ItemTable } from "./components/ItemTable";
import { ItemCards } from "./components/ItemCards";
import { Pagination } from "./components/Pagination";
import type { Item } from "./interface/item.interface";

/**
 * 創建一個複雜篩選功能，用於篩選一組物品（如商品清單）。清單資料為靜態 JSON，包含屬性：name（名稱）、category（類別）、price（價格）、inStock（是否有庫存）。
 * 資料來源：
 * 使用 /mockData/items.json，包含 10,000 筆資料，模擬大型數據集。
 * 每筆資料包含屬性：
 * [{
 *   "name": "Item 1",
 *   "category": "A",
 *   "price": 100,
 *   "inStock": true
 * }]
 * 篩選條件：
 * 類別篩選：允許用戶多選類別，名稱關鍵字搜尋。
 * 價格範圍篩選：支援用戶輸入最低和最高價格。
 * 庫存篩選：用戶可選擇是否僅顯示「有庫存」的商品。
 * 排序功能：
 * 支援按價格升序、降序排列。
 * 需要考量效能問題局部顯示 (Virtual Scrolling or Pagination)
 * RWD（響應式設計）需求：
 * 桌面端：商品以表格形式顯示，每行顯示一個商品。
 * 手機端：商品以卡片形式顯示，每行顯示最多兩個商品。
 * 範例效果參考：
 * 桌面端：
 * 顯示商品表格，類似：
 * css
 * | 商品名稱 | 類別 | 價格 | 有庫存 |
 * |----------|------|------|--------|
 * | Item 1   | A    | 100  | 是     |
 * 手機端：
 * 顯示卡片樣式，類似：
 * css
 * [商品名稱]  Item 1
 * [類別]      A
 * [價格]      $100
 * [庫存]      有庫存
 * */

// Define the filter state interface
interface FilterState {
  search: string;
  categories: string[];
  minPrice: number | "";
  maxPrice: number | "";
  inStockOnly: boolean;
  sortBy: "priceAsc" | "priceDesc" | "";
  currentPage: number;
  itemsPerPage: number;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  // Initialize filter state
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    categories: [],
    minPrice: "",
    maxPrice: "",
    inStockOnly: false,
    sortBy: "",
    currentPage: 1,
    itemsPerPage: 10,
  });

  // Load data from JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/mockData/items.json");
        const data = await response.json();
        setItems(data);

        // Extract categories
        const categories = [
          ...new Set(data.map((item: Item) => item.category)),
        ] as string[];
        setCategories(categories);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    fetchData();

    // Add event listener for window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Apply filters and sorting with memoization for better performance
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchLower),
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter((item) =>
        filters.categories.includes(item.category),
      );
    }

    // Apply price range filter
    if (filters.minPrice !== "") {
      result = result.filter(
        (item) => item.price >= (filters.minPrice as number),
      );
    }
    if (filters.maxPrice !== "") {
      result = result.filter(
        (item) => item.price <= (filters.maxPrice as number),
      );
    }

    // Apply stock filter
    if (filters.inStockOnly) {
      result = result.filter((item) => item.inStock);
    }

    // Apply sorting
    if (filters.sortBy === "priceAsc") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "priceDesc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [items, filters]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    setFilters({
      ...filters,
      search: searchQuery,
      currentPage: 1,
    });
  };

  // Handle category filter change
  const handleCategoryChange = (selectedCategories: string[]) => {
    setFilters({
      ...filters,
      categories: selectedCategories,
      currentPage: 1,
    });
  };

  // Handle price range filter change
  const handleMinPriceChange = (value: number | "") => {
    setFilters({
      ...filters,
      minPrice: value,
      currentPage: 1,
    });
  };

  const handleMaxPriceChange = (value: number | "") => {
    setFilters({
      ...filters,
      maxPrice: value,
      currentPage: 1,
    });
  };

  // Handle stock filter change
  const handleStockFilterChange = (inStockOnly: boolean) => {
    setFilters({
      ...filters,
      inStockOnly,
      currentPage: 1,
    });
  };

  // Handle sort change
  const handleSortChange = (sortBy: "priceAsc" | "priceDesc" | "") => {
    setFilters({
      ...filters,
      sortBy,
      currentPage: 1,
    });
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setFilters({
      ...filters,
      currentPage: page,
    });
  };

  // Handle items per page change
  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setFilters({
      ...filters,
      itemsPerPage,
      currentPage: 1,
    });
  };

  // Get paginated items
  const getPaginatedItems = () => {
    const startIndex = (filters.currentPage - 1) * filters.itemsPerPage;
    const endIndex = startIndex + filters.itemsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">商品清單</h1>
      {/* Search query */}
      <div className="flex w-full max-w-sm items-center space-x-2 mx-auto mb-4">
        <Input
          placeholder="搜尋商品名稱"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button variant="outline" onClick={handleSearchClick}>
          搜尋
        </Button>
      </div>
      {/* Filter controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Apply category */}
        <CategoryFilter
          categories={categories}
          selectedCategories={filters.categories}
          onChange={handleCategoryChange}
        />
        {/* Apply price range */}
        <PriceRangeFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
        />
        {/* Apply stock status */}
        <StockFilter
          inStockOnly={filters.inStockOnly}
          onChange={handleStockFilterChange}
        />
        {/* Apply sort */}
        <SortControl sortBy={filters.sortBy} onChange={handleSortChange} />
      </div>
      {/* Desktop */}
      {!isMobile && <ItemTable items={getPaginatedItems()} />}
      {/* Mobile */}
      {isMobile && <ItemCards items={getPaginatedItems()} />}
      {/* Pagination */}
      <Pagination
        currentPage={filters.currentPage}
        totalItems={filteredItems.length}
        itemsPerPage={filters.itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}

export default App;
