interface StockFilterProps {
  inStockOnly: boolean;
  onChange: (inStockOnly: boolean) => void;
}

export function StockFilter({ inStockOnly, onChange }: StockFilterProps) {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      <h3 className="font-medium text-sm">庫存</h3>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300"
        />
        <span className="text-sm">只顯示有庫存</span>
      </label>
    </div>
  );
}
