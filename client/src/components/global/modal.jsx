import React, { forwardRef, useEffect } from "react";
import styled from "styled-components";
import { FlexComun, colors } from "../../style/styleGlobal";

const Modal = forwardRef(({ children }, modalRef) => {
  const close = () => {
    modalRef.current.close();
  };

  /* useEffect(() => {
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
  }, [modalRef]) */

  return (
    <Dialog ref={modalRef}>
      <div>
        <button onClick={close}>X</button>
      </div>
      {children}
    </Dialog>
  );
});

export default Modal;

const Dialog = styled.dialog`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: none;
 padding: 5px;
  /* box-shadow: 0 5px 10px #0005; */
 max-height: 600px;
 overflow: auto;
  border-radius: 0.5em;
  width: 45em;
  & > div {
    width: 100%;
    border-bottom: solid 1px rgba(0,0,0,.2);
    padding: 1em 2em;
    display: flex;
    justify-content: end;
    & > button {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      font-size: 0.6em;
      box-shadow: 0 1px 2px #0005;
      background-color: #1877F2;
      color: #fff;
    }
  }
  & form {
    ${FlexComun}
    flex-direction:row;
    flex-wrap: wrap;
    width: 100%;
    gap: 1em;
    justify-content: start;
    padding: 2em;
    & div {
      width: 30%;
      position: relative;
      height: 3em;
    }
    & label {
      position: absolute;
      text-align: start;
      font-size: 0.7em;
      color: #1877F2;
      top: -7px;
      left: 10px;
      transition: 0.3s;
      pointer-events: none;
      background-color: #fff;
      font-weight: 600;
      &::first-letter {
        text-transform: uppercase;
      }
    }
    & b {
      color: red;
      font-size: 0.7em;
      font-weight: 100;
      content: "*";
    }
    & input {
      border: solid 1px #0005;
      height: 90%;
      padding: 1em;
      outline: none;
      border-radius: 0.2em;
    }
    & select {
      border: solid 1px #0005;
      height: 90%;
      outline: none;
      border-radius: 0.2em;
    }
    

    & textarea {
      height: 150px;
    }
    & > button {
      background-color: #1877F2;
      color: #fff;
      padding: 0.7em 3.5em;
      margin: 1em auto 0 auto;
      border-radius: 0.5em;
      border:none;
    cursor: pointer;
    }
 
  }
`;
