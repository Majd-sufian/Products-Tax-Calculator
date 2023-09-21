import { createContext, useReducer, ReactNode, Dispatch } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  imported: boolean;
  taxPercentage: number;
  totalTaxPaidPrice: number;
}

export interface AppState {
  products: Product[];
  modalIsOpen: boolean;
  totalTax: number;
  totalPrice: number;
}

export type ProductContextType = {
  state: AppState;
  dispatch: Dispatch<Action>;
};

type Action =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "OPEN_MODAL" }
  | { type: "CLOSE_MODAL" };

interface ProductProviderProps {
  children: ReactNode;
}

const initialState: AppState = {
  products: [],
  modalIsOpen: false,
  totalTax: 0,
  totalPrice: 0,
};

const ProductContext = createContext<
  | {
      state: AppState;
      dispatch: Dispatch<Action>;
    }
  | undefined
>(undefined);

const productReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_ITEM":
      const updatedProductsAdd = [...state.products, action.payload];
      return {
        ...state,
        products: updatedProductsAdd,
        totalTax: calculateTotalTax(updatedProductsAdd),
        totalPrice: calculateTotalPrice(updatedProductsAdd),
      };
    case "REMOVE_ITEM":
      const updatedProductsRemove = state.products.filter(
        (product) => product.id !== action.payload
      );
      const removedProduct = state.products.find(
        (product) => product.id === action.payload
      );
      return {
        ...state,
        products: updatedProductsRemove,
        totalTax: state.totalTax - (removedProduct?.totalTaxPaidPrice || 0),
        totalPrice:
          state.totalPrice -
          (removedProduct?.price || 0) -
          (removedProduct?.totalTaxPaidPrice || 0),
      };
    case "OPEN_MODAL":
      return { ...state, modalIsOpen: true };
    case "CLOSE_MODAL":
      return { ...state, modalIsOpen: false };
    default:
      return state;
  }
};

const calculateTotalTax = (products: Product[]): number => {
  return products.reduce(
    (totalTax, product) => totalTax + product.totalTaxPaidPrice,
    0
  );
};

const calculateTotalPrice = (products: Product[]): number => {
  return products.reduce(
    (totalPrice, product) =>
      totalPrice + product.price + product.totalTaxPaidPrice,
    0
  );
};

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
