import { render, fireEvent } from "@testing-library/react";
import AddProductButton from "./AddProductButton";
import { useContext } from "react";

// Mock the useContext and ProductContext
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

describe("AddProductButton Component", () => {
  it("should open modal when Add Product button is clicked", () => {
    const mockDispatch = jest.fn();

    // Mock the useContext to return the mock dispatch
    (useContext as jest.Mock).mockReturnValue({ dispatch: mockDispatch });

    const { getByText } = render(<AddProductButton />);

    // Find the "Add Product" button and click it
    const addButton = getByText("Add Product");
    fireEvent.click(addButton);

    // Assert that the dispatch function was called with the correct action type
    expect(mockDispatch).toHaveBeenCalledWith({ type: "OPEN_MODAL" });
  });
});
