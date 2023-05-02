import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Menu from "./Menu";
import React from "react";

describe("Menu", () => {
    const props = {
        roomId: "1",
        roomName: "Room 1",
        roomStatus: 0,
        handleQuickBookDone: jest.fn(),
        isDurationOpen: false,
    };

    it("should render with the correct room name and status message", () => {
        render(
            <MemoryRouter>
                <Menu {...props} />
            </MemoryRouter>
        );

        const roomName = screen.getByText("Room 1 is currently available.");
        const subText = screen.getByText("Feel free to book a meeting.");
        const button = screen.getByText("Advanced Book");

        expect(roomName).toBeInTheDocument();
        expect(subText).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });
});
