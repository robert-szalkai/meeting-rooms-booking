import { render, screen } from "@testing-library/react";
import React from "react";
import Error from "./NotFoundPage";

test("renders error message", () => {
    render(<Error />);
    const errorMessage = screen.getByText(
        /It looks like you've reached a meet id URL that doesn't exist/i
    );
    expect(errorMessage).toBeInTheDocument();
});

test("renders error status code", () => {
    render(<Error />);
    const statusCode = screen.getByText(/ERROR 404/i);
    expect(statusCode).toBeInTheDocument();
  });

  test("renders error message with correct formatting", () => {
    render(<Error />);
    const errorMessage = screen.getByText(/It looks like you've reached a meet id URL that doesn't exist/i);
    expect(errorMessage.tagName).toBe("P");
    expect(errorMessage).toHaveStyle({ fontSize: "20px" });
  });

  