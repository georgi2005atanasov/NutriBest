import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

// eslint-disable-next-line react/prop-types
const Modal = forwardRef(function Modal({ children }, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            close() {
                dialog.current.close();
            }
        };
    }, [])

    return createPortal(<dialog ref={dialog}>
        {children}
    </dialog>,
        document.getElementById("modal"));
});

export default Modal;