import React, { forwardRef, useEffect } from 'react'
import styled from 'styled-components';

const Modal = forwardRef(({ children }, modalRef) => {
  const close = () => {
    modalRef.current.close();
  }

  useEffect(() => {
    if(modalRef.current) {
      modalRef.current.addEventListener("click", e => {
        const dialogDimensions = modalRef.current.getBoundingClientRect()
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          close();
        }
      })
    }
  }, [modalRef])

  return (
    <Dialog ref={modalRef}>
      <button onClick={close}>Cerrar</button>
      {children}
    </Dialog>
  )
})

export default Modal

const Dialog = styled.dialog`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;