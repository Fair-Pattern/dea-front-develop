import React, { Fragment, MouseEventHandler, useEffect } from "react";
import Portal from "./portal";

type ModalProps = {
  children: React.ReactNode;
  onCancel?: MouseEventHandler<HTMLElement>;
  cancelOnClickOutSide?: boolean;
};

const Modal = ({
  onCancel,
  children,
  cancelOnClickOutSide = true,
}: ModalProps) => {
  useEffect(() => {});
  return (
    <Fragment>
      <div
        onClick={cancelOnClickOutSide ? onCancel : () => {}}
        className="fixed inset-0 bg-black opacity-50"
      />
      <Portal>
        <div
          onClick={cancelOnClickOutSide ? onCancel : () => {}}
          className="fixed top-0 w-full z-20 px-4 min-h-screen md:flex md:items-center md:justify-center"
        >
          <div className="bg-black opacity-10 w-full h-full absolute inset-0"></div>
          <div className="opacity-100 z-30"> {children}</div>
        </div>
      </Portal>
    </Fragment>
  );
};

export default Modal;
