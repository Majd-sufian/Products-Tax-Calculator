import { useContext } from "react";
import { ProductContext, ProductContextType } from "../context/ProductContext";
import NoProductsYet from "./NoProductsYet";
import ProductRow from "./ProductRow";
import { Product } from "../context/ProductContext";

const headers = ["Name", "Price", "Imported", "Tax", "Actions"];

const TableHeader: React.FC = () => (
  <thead className="bg-royalBlue text-center text-gray-100">
    <tr>
      {headers.map((header, index) => (
        <th key={index} className="p-3 text-left">
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

const ProductsTable: React.FC = () => {
  const { state, dispatch } = useContext(ProductContext) as ProductContextType;

  if (state.products.length === 0) {
    return <NoProductsYet />;
  }

  const deleteProduct = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  return (
    <table className="table text-gray-400 border-separate border-spacing-x-0 border-spacing-8 text-sm">
      <TableHeader />
      <tbody>
        {state.products.map((product: Product) => (
          <ProductRow
            key={product.id}
            product={product}
            onDelete={deleteProduct}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ProductsTable;
