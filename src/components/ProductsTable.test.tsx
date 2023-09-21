import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ProductsTable from "./ProductsTable";
import { ProductContext, ProductContextType } from "../context/ProductContext";

const mockContext = {
  state: {
    products: [
      {
        id: "1",
        name: "Product 1",
        price: 10,
        imported: false,
        taxPercentage: 5,
        totalTaxPaidPrice: 0,
      },
      {
        id: "2",
        name: "Product 2",
        price: 20,
        imported: true,
        taxPercentage: 10,
        totalTaxPaidPrice: 0,
      },
    ],
  },
  dispatch: jest.fn(),
} as unknown as ProductContextType;

const renderTableComponent = (): ReturnType<typeof render> => {
  return render(
    <ProductContext.Provider value={mockContext}>
      <ProductsTable />
    </ProductContext.Provider>
  );
};

describe("ProductsTable Component", () => {
  it("renders the table headers", () => {
    renderTableComponent();

    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(5);
    expect(headers[0]).toHaveTextContent("Name");
    expect(headers[1]).toHaveTextContent("Price");
    expect(headers[2]).toHaveTextContent("Imported");
    expect(headers[3]).toHaveTextContent("Tax");
    expect(headers[4]).toHaveTextContent("Actions");
  });

  it("renders product rows", () => {
    renderTableComponent();

    const productRows = screen.getAllByRole("row");
    // We have two products in the mock context
    expect(productRows).toHaveLength(3); // Including the header row

    // Check the content of the first product row
    expect(productRows[1]).toHaveTextContent("Product 1");
    expect(productRows[1]).toHaveTextContent("10");
    expect(productRows[1]).toHaveTextContent("No");
    expect(productRows[1]).toHaveTextContent("5");

    // Check the content of the second product row
    expect(productRows[2]).toHaveTextContent("Product 2");
    expect(productRows[2]).toHaveTextContent("20");
    expect(productRows[2]).toHaveTextContent("Yes");
    expect(productRows[2]).toHaveTextContent("10");
  });

  it("dispatches a REMOVE_ITEM action when delete button is clicked", () => {
    renderTableComponent();

    const deleteButtons = screen.getAllByRole("link");
    expect(deleteButtons).toHaveLength(2);

    fireEvent.click(deleteButtons[0]); // Click the delete button for the first product

    // Verify that the dispatch function was called with the REMOVE_ITEM action
    expect(mockContext.dispatch).toHaveBeenCalledWith({
      type: "REMOVE_ITEM",
      payload: "1", // ID of the first product
    });
  });

  it("renders NoProductsYet component when there are no products", () => {
    // Create a context with an empty product list
    const emptyContext = {
      state: {
        products: [],
      },
      dispatch: jest.fn(),
    } as unknown as ProductContextType;

    render(
      <ProductContext.Provider value={emptyContext}>
        <ProductsTable />
      </ProductContext.Provider>
    );

    // Check if the NoProductsYet component is rendered
    const noProductsMessage = screen.getByText("No products added yet");
    expect(noProductsMessage).toBeInTheDocument();
  });
});
