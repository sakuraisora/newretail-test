import { memo } from "react";
import type { Item } from "@/interface/item.interface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface ItemProps {
  items: Item[];
}

function ItemTableComponent({ items }: ItemProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>商品名稱</TableHead>
          <TableHead>類別</TableHead>
          <TableHead>價格</TableHead>
          <TableHead>庫存</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell className="item-center text-center" colSpan={4}>
              沒有商品
            </TableCell>
          </TableRow>
        ) : (
          items.map((item, index) => (
            <TableRow
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>NTD {item.price}</TableCell>
              <TableCell>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.inStock
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.inStock ? "有庫存" : "無庫存"}
                </span>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export const ItemTable = memo(ItemTableComponent);
