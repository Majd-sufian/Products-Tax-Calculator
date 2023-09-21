import { memo } from "react";
import { Product } from "../context/ProductContext";

interface ProductRowProps {
  product: Product;
  onDelete: (id: string) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({ product, onDelete }) => {
  const { id, name, price, imported, taxPercentage } = product;

  return (
    <tr key={id} className="bg-gray-800 text-center">
      <td className="p-3 text-left">{name}</td>
      <td className="p-3 font-bold">{price}</td>
      <td className="p-3">
        <span
          className={`bg-${imported ? "green" : "red"}-400 text-${
            imported ? "green" : "red"
          }-700 py-1 px-3 rounded-full text-xs`}
        >
          {imported ? "Yes" : "No"}
        </span>
      </td>
      <td className="p-3">%{taxPercentage}</td>
      <td className="p-3">
        <a
          onClick={() => onDelete(id)}
          href="#"
          className="text-gray-400 hover:text-gray-100 pr-2"
        >
          <i className="material-icons-round text-base">delete_outline</i>
        </a>
      </td>
    </tr>
  );
};

export default memo(ProductRow);
