import { render, screen, fireEvent } from "../../utils/test-utils";
import { ModalContext } from "./index";
import React from "react";

describe("ModalContext", () => {
  it("provides and consumes context correctly", () => {
    const openModal = () => {
      return;
    };
    const closeModal = () => {
      return;
    };

    const TestComponent = () => {
      const { modalIsOpen, openModal, closeModal } =
        React.useContext(ModalContext);

      return (
        <>
          <div>{modalIsOpen ? "Open" : "Closed"}</div>
          <button onClick={openModal}>Open</button>
          <button onClick={closeModal}>Close</button>
        </>
      );
    };

    render(
      <ModalContext.Provider
        value={{ modalIsOpen: false, openModal, closeModal }}
      >
        <TestComponent />
      </ModalContext.Provider>
    );

    fireEvent.click(screen.getByText("Open"));
    expect(openModal).toBeCalledTimes(1);

    fireEvent.click(screen.getByText("Close"));
    expect(closeModal).toBeCalledTimes(1);
  });
});
