import "@testing-library/jest-dom";
import { useContext } from "react";
import { render } from "@testing-library/react";
import ProductsTotalPrice from "./ProductsTotalPrice";
import { ProductContextType } from "../context/ProductContext";

// Mock the useContext hook to return the mock context
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

test("renders the sales taxes and total price correctly", () => {
  // Mock the context value
  const mockContextValue = {
    state: {
      totalTax: 10, // Replace with your desired values
      totalPrice: 100, // Replace with your desired values
    },
  } as unknown as ProductContextType;

  // Set up the useContext mock to return the mock context value
  (useContext as jest.Mock).mockReturnValue(mockContextValue);

  const { getByText } = render(<ProductsTotalPrice />);

  // Verify that the component displays the sales taxes and total price
  expect(getByText("Sales Taxes: 10")).toBeInTheDocument();
  expect(getByText("Total Price: 100")).toBeInTheDocument();
});
