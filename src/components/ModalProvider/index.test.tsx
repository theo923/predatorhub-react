import { act, render, screen } from "../../utils/test-utils";
import ModalProvider from "./index";
import { ModalContext } from "../../Hooks/ModalContextHook";
import React from "react";

describe("ModalProvider", () => {
  it("renders children", () => {
    const TestComponent = () => <div>Test</div>;
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("provides modal context with correct default values", () => {
    let contextValues;

    const TestComponent = () => {
      contextValues = React.useContext(ModalContext);
      return null;
    };

    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    expect(contextValues).toEqual({
      modalIsOpen: false,
      openModal: expect.any(Function),
      closeModal: expect.any(Function),
    });
  });

  it("openModal and closeModal functions work correctly", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let contextValues: any;

    const TestComponent = () => {
      contextValues = React.useContext(ModalContext);
      return null;
    };

    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    );

    expect(contextValues.modalIsOpen).toEqual(false);

    act(() => {
      contextValues.openModal();
    });

    expect(contextValues.modalIsOpen).toEqual(true);

    act(() => {
      contextValues.closeModal();
    });

    expect(contextValues.modalIsOpen).toEqual(false);
  });
});
