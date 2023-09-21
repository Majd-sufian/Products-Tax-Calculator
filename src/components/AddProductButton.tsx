import { useContext } from "react";
import { ProductContext, ProductContextType } from "../context/ProductContext";

const AddProductButton: React.FC = () => {
  const { dispatch } = useContext(ProductContext) as ProductContextType;

  const openModal = () => {
    dispatch({ type: "OPEN_MODAL" });
  };

  return (
    <div className="text-center">
      <button
        type="button"
        onClick={openModal}
        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 focus:ring-green-800 font-medium rounded-lg text-sm px-7 py-3 text-center mr- mb-2"
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProductButton;
