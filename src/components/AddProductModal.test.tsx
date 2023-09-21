import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import AddProductModal from "./AddProductModal";
import { ProductContext, ProductContextType } from "../context/ProductContext";

const mockContext = {
  state: {
    products: [],
    modalIsOpen: true,
  },
  dispatch: jest.fn(),
} as unknown as ProductContextType;

const renderModalComponent = (): ReturnType<typeof render> => {
  return render(
    <ProductContext.Provider value={mockContext}>
      <AddProductModal />
    </ProductContext.Provider>
  );
};

describe("AddProductModal", () => {
  it("renders without errors", () => {
    renderModalComponent();

    const modalHeader = screen.getByText("Add Product");
    expect(modalHeader).toBeInTheDocument();
  });

  it("allows user to input product name and price", () => {
    renderModalComponent();

    const nameInput = screen.getByPlaceholderText(
      "MacBook Pro"
    ) as HTMLInputElement;
    const priceInput = screen.getByPlaceholderText("29.99") as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Test Product" } });
    fireEvent.change(priceInput, { target: { value: "50" } });

    // Check if the input values are updated
    expect(nameInput.value).toBe("Test Product");
    expect(priceInput.value).toBe("50");
  });

  it("displays an error message when name or price is not filled", () => {
    renderModalComponent();

    const saveButton = screen.getByText("Save Changes");
    fireEvent.click(saveButton);

    const errorMessage = screen.getByText("Please fill all the fields");
    expect(errorMessage).toBeInTheDocument();
  });

  it("selects a product category", () => {
    renderModalComponent();

    const categoryOption = screen.getByText("Books");
    fireEvent.click(categoryOption);

    const selectedCategory = screen.getByText("Books");
    expect(selectedCategory).toHaveClass("bg-blue-500");
  });

  it("allows the user to select whether the product is imported", () => {
    renderModalComponent();

    // Find the "Yes" option for imported and click it
    const yesOption = screen.getByText("Yes");
    fireEvent.click(yesOption);

    // Check if the "Yes" option is selected
    const selectedOption = screen.getByText("Yes");
    expect(selectedOption).toHaveClass("bg-blue-500");

    // Find the "No" option for imported and click it
    const noOption = screen.getByText("No");
    fireEvent.click(noOption);

    // Check if the "No" option is selected
    const selectedNoOption = screen.getByText("No");
    expect(selectedNoOption).toHaveClass("bg-indianred");
  });
});
