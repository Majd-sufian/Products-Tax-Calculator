import { memo, useContext, useState } from "react";
import { ProductContext, ProductContextType } from "../context/ProductContext";

const productCategories = ["Books", "Food", "Medical Products", "Others"];

const emptyProduct = {
  name: "",
  price: "",
  category: "Others",
  imported: false,
  taxPercentage: "",
  taxPaid: "",
};

const generateUUID = () => {
  return Math.random().toString(36).substr(2, 9);
};

const AddProductModal: React.FC = () => {
  const { state, dispatch } = useContext(ProductContext) as ProductContextType;
  const [currentProduct, setCurrentProduct] = useState(emptyProduct);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

  const getCategoryBackgroundColor = (category: string) =>
    category === currentProduct.category ? "bg-blue-500" : "bg-gray-600";

  const editCurrentProduct = (key: string, value: string | boolean) => {
    setCurrentProduct({ ...currentProduct, [key]: value });
  };

  const calculateTotalTaxPaidPrice = () => {
    return (
      (((currentProduct.category === "Others" ? 10 : 0) +
        (currentProduct.imported ? 5 : 0)) /
        100) *
      +currentProduct.price
    );
  };

  const saveChanges = () => {
    if (!currentProduct.name || !currentProduct.price) {
      setDisplayErrorMessage(true);
      return;
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: generateUUID(),
        name: currentProduct.name,
        price: parseFloat(currentProduct.price),
        imported: currentProduct.imported,
        taxPercentage: currentProduct.category === "Others" ? 10 : 0,
        totalTaxPaidPrice: calculateTotalTaxPaidPrice(),
      },
    });

    closeModal();
  };

  const closeModal = () => {
    setCurrentProduct(emptyProduct);
    setDisplayErrorMessage(false);
    dispatch({ type: "CLOSE_MODAL" });
  };

  const renderCategoryOptions = () => (
    <ul className="my-4 space-y-3">
      {productCategories.map((category, index) => (
        <li key={index}>
          <span
            onClick={() => editCurrentProduct("category", category)}
            className={`flex items-center p-3 text-base font-bold rounded-lg group hover:shadow text-white hover:bg-blue-400 ${getCategoryBackgroundColor(
              category
            )}`}
          >
            {category}
          </span>
        </li>
      ))}
    </ul>
  );

  const renderImportedOptions = () => (
    <ul className="my-4 space-y-3">
      <li className="">
        <span
          className={`flex items-center p-3 text-base font-bold rounded-lg group hover:shadow hover:bg-blue-500 text-white ${
            currentProduct.imported ? "bg-blue-500" : "bg-gray-600"
          }`}
          onClick={() => editCurrentProduct("imported", true)}
        >
          Yes
        </span>
      </li>
      <li>
        <span
          className={`flex items-center p-3 text-base font-bold  rounded-lg group hover:shadow hover:bg-indianred text-white ${
            currentProduct.imported ? "bg-gray-600" : "bg-indianred"
          }`}
          onClick={() => editCurrentProduct("imported", false)}
        >
          No
        </span>
      </li>
    </ul>
  );

  const renderErrorMessage = () =>
    displayErrorMessage && (
      <div className="flex items-center justify-center mb-6">
        <div className="col-span-12">
          <div className="overflow-auto lg:overflow-visible ">
            <div className="text-center">
              <span className="text-red-500 text-3xl font-bold">
                Please fill all the fields
              </span>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <>
      {state.modalIsOpen && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-0 left-0 right-0 inset-0 z-50 w-full p-4 outline-none focus:outline-none max-h-full">
          <div className="relative my-6 mx-auto max-w-3xl text-white rounded-lg shadow bg-gray-700 h-600px w-inherit overflow-auto">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
              <div className="p-5 border-b border-solid border-white rounded-t text-3xl text-center font-semibold">
                Add Product
              </div>

              <div className="relative p-6 flex-auto">
                <form className="space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Product name
                    </label>
                    <input
                      onChange={(e) =>
                        editCurrentProduct("name", e.target.value)
                      }
                      value={currentProduct.name}
                      type="text"
                      name="name"
                      className="text-sm rounded-lg focus:ring-blac block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                      placeholder="MacBook Pro"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-white"
                    >
                      Price
                    </label>
                    <input
                      onChange={(e) =>
                        editCurrentProduct("price", e.target.value)
                      }
                      value={currentProduct.price}
                      type="number"
                      name="price"
                      className="text-sm rounded-lg focus:ring-blac block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                      placeholder="29.99"
                      required
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      Select a category
                    </p>
                    {renderCategoryOptions()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      The product is imported?
                    </p>
                    {renderImportedOptions()}
                  </div>
                </form>
              </div>

              {renderErrorMessage()}

              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={closeModal}
                  type="button"
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={saveChanges}
                  type="button"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(AddProductModal);
