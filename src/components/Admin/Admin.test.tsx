import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Admin from "./Admin";
import { wait } from "@testing-library/user-event/dist/utils";
test("test-open-modal", async () => {
    render(<Admin />);
    const openform = screen.getByTestId("openform");
    fireEvent.click(openform);
    expect(screen.getByTestId("newroommodal")).toBeVisible();
});
test("test-delete", async () => {
    render(<Admin />);
    await waitFor(() => {
        expect(screen.getByTestId("cards1")).toBeInTheDocument();
    }).then(async () => {
        const delbtn = screen.getByTestId("delbtn1");
        const card = screen.getByTestId("cards1");
        fireEvent.click(delbtn);
        await waitFor(() => {
            expect(screen.getByTestId("deletemodal")).toBeInTheDocument();
        }).then(async () => {
            const deletecard = screen.getByTestId("deleteelement");
            fireEvent.click(deletecard);
            await waitFor(() => {
                expect(card).not.toBeInTheDocument();
            });
        });
    });
});