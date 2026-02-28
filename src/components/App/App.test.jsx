/** @vitest-environment jsdom */
import { render, screen } from "@testing-library/react";
import App from "./App";
import { expect, test } from "vitest";

test("renders Seasonal Sips branding", () => {
  render(<App />);
  const brandingElements = screen.getAllByText(/Seasonal Sips/i);
  expect(brandingElements.length).toBeGreaterThan(0);
});
