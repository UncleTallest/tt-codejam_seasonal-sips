/** @vitest-environment jsdom */
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App/App";
import { expect, test, describe, beforeEach } from "vitest";

describe("Seasonal & Theme Transitions", () => {
  beforeEach(() => {
    // Reset any overrides before each test
  });

  test("applies seasonal override classes", async () => {
    render(<App />);
    
    // Open Dev Menu
    const toggle = screen.getByLabelText(/Toggle Dev Menu/i);
    fireEvent.click(toggle);

    // Select Summer
    const summerBtn = screen.getByRole("button", { name: /Summer/i });
    fireEvent.click(summerBtn);

    const page = document.querySelector(".page");
    expect(page).toHaveClass("summer");
  });

  test("toggles Midnight Mode", async () => {
    render(<App />);

    const midnightBtn = screen.getByRole("button", { name: /Midnight Mode/i });
    fireEvent.click(midnightBtn);

    const page = document.querySelector(".page");
    expect(page).toHaveClass("midnight");
  });
});
