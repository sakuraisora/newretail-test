import { memo } from "react";
import type { Item } from "@/interface/item.interface";

interface ItemProps {
  items: Item[];
}

function ItemCardsComponent({ items }: ItemProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.length === 0 ? (
        <div className="col-span-2 p-4 text-center text-gray-500 mb-8">
          沒有商品
        </div>
      ) : (
        items.map((item, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-sm bg-white">
            <div className="flex flex-col space-y-2">
              <div>
                <span className="text-xs text-gray-500">商品名稱</span>
                <p className="font-medium">{item.name}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">類別</span>
                <p>{item.category}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">價格</span>
                <p>${item.price}</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">庫存</span>
                {item.inStock ? (
                  <p className="text-green-600">有庫存</p>
                ) : (
                  <p className="text-red-600">無庫存</p>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export const ItemCards = memo(ItemCardsComponent);
