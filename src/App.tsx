import {
  ProdcutsTable,
  ProdcutsTotalPrice,
  AddProductButton,
  AddProductModal,
} from "./components";
import { ProductProvider } from "./context/ProductContext";

const App: React.FC = () => {
  return (
    <ProductProvider>
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="col-span-12 overflow-auto lg:overflow-visible">
          <h1 className="text-3xl text-center	font-bold text-white mb-2">
            Products Tax Calculator
          </h1>
          <ProdcutsTable />
          <ProdcutsTotalPrice />
          <AddProductButton />
          <AddProductModal />
        </div>
      </div>
    </ProductProvider>
  );
};

export default App;
