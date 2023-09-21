import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "./App";
import { ProductProvider } from "./context/ProductContext";

describe("App Component", () => {
  it("renders the component without errors", () => {
    render(
      <ProductProvider>
        <App />
      </ProductProvider>
    );
  });

  it("renders the Products Tax Calculator title", () => {
    const { getByText } = render(<App />);
    const titleElement = getByText("Products Tax Calculator");
    expect(titleElement).toBeInTheDocument();
  });
});
