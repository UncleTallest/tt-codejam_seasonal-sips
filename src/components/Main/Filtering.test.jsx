/** @vitest-environment jsdom */
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App/App";
import { expect, test, describe } from "vitest";

describe("Drink Filtering Logic", () => {
  test("filters drinks by alcohol type", async () => {
    render(<App />);

    // Force Spring season to ensure drinks like Gimlet are in the pool
    const toggle = screen.getByLabelText(/Toggle Dev Menu/i);
    fireEvent.click(toggle);
    const springBtn = screen.getByRole("button", { name: /Spring/i });
    fireEvent.click(springBtn);
    
    // Initial state check (some drinks should be visible)
    const initialDrinks = screen.getAllByRole("listitem", {
      className: /card-item/i,
    });
    expect(initialDrinks.length).toBeGreaterThan(0);

    // Filter by Vodka
    const vodkaCheckbox = screen.getByRole("checkbox", { name: "Vodka" });
    fireEvent.click(vodkaCheckbox);

    // Check if Lemon Drop (known Vodka drink) is visible
    expect(screen.getByText(/Lemon Drop/i)).toBeInTheDocument();

    // Check if Bourbon drink is NOT visible
    const filteredDrinks = screen.getAllByRole("heading", { level: 4 });
    const drinkNames = filteredDrinks.map((h) => h.textContent);
    
    expect(drinkNames).toContain("Lemon Drop");
    expect(drinkNames).not.toContain("Bourbon and Peach Smash");
  });

  test("filters drinks by multiple categories (Alcohol + Ingredient)", async () => {
    render(<App />);

    // Force Spring season
    const toggle = screen.getByLabelText(/Toggle Dev Menu/i);
    fireEvent.click(toggle);
    const springBtn = screen.getByRole("button", { name: /Spring/i });
    fireEvent.click(springBtn);

    // Select Gin
    const ginCheckbox = screen.getByRole("checkbox", { name: "Gin" });
    fireEvent.click(ginCheckbox);

    // Select Lime
    const limeCheckbox = screen.getByRole("checkbox", { name: "Lime" });
    fireEvent.click(limeCheckbox);

    const filteredDrinks = screen.getAllByRole("heading", { level: 4 });
    const drinkNames = filteredDrinks.map((h) => h.textContent);

    // Gimlet is Gin + Lime
    expect(drinkNames).toContain("Gimlet");
    // Lemon Drop is Vodka + Lemon, should be hidden
    expect(drinkNames).not.toContain("Lemon Drop");
  });
});
