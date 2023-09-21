import { useContext, memo } from "react";
import { ProductContext, ProductContextType } from "../context/ProductContext";

const ProductsTotalPrice: React.FC = () => {
  const { state } = useContext(ProductContext) as ProductContextType;

  return (
    <div className="flex flex-col  relative bottom-3 mb-8 text-s font-bold text-right">
      <span className="text-crimson">Sales Taxes: {state.totalTax}</span>
      <span className="text-aquamarine ">Total Price: {state.totalPrice}</span>
    </div>
  );
};

export default memo(ProductsTotalPrice);
