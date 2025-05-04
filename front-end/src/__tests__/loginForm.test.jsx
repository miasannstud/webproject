/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../pages/auth/loginPage";
import '@testing-library/jest-dom';


beforeEach(() => {
  // Mock fetch globally
  global.fetch = jest.fn();

  // Mock location.href using a getter/setter
  let href = "";
  delete window.location; // Must delete before redefining
  window.location = {
    get href() {
      return href;
    },
    set href(val) {
      href = val;
    },
  };

  localStorage.clear();
});

afterEach(() => {
  // Restore mock for fetch and window.location.assign
  global.fetch.mockRestore();
});

describe("LoginForm", () => {
  test("renders login form elements", () => {
    render(<LoginPage />);

    // Check for username input
    expect(screen.getByPlaceholderText("Enter Username")).toBeInTheDocument();

    // Check for password input
    expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();

    // Check for login button
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();

    // Check for sign up link
    expect(screen.getByText(/Sign Up here/i)).toBeInTheDocument();
  });

  test("successful login stores token and redirects to /dashboard", async () => {
    const mockResponse = {
      token: "test-token",
      id: "user-123",
    };

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<LoginPage />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter username/i),
      "testuser"
    );
    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      "password123"
    );
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(localStorage.getItem("token")).toBe("test-token");
    expect(localStorage.getItem("userId")).toBe("user-123");

    expect(window.location.href).toBe("/dashboard");
  });
});
