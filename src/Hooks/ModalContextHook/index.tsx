/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

type ModalContextType = {
  modalIsOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const ModalContext = React.createContext<ModalContextType>({
  modalIsOpen: false,
  openModal: () => {},
  closeModal: () => {},
});
