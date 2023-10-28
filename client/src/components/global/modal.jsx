import React, { forwardRef, useEffect } from 'react'
import styled from 'styled-components';
import { FlexComun, colors } from '../../style/styleGlobal';

const Modal = forwardRef(({ children }, modalRef) => {
  const close = () => {
    modalRef.current.close();
  }

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
      <button onClick={close}>X</button>
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
border:none;
/* box-shadow: 0 5px 10px #0005; */
padding:2em 1em;
border-radius:.5em;
width:25em;
& > button{
  width:30px;
  height:30px;
border-radius:50%;
border:none;
cursor: pointer;
font-size:.6em;
box-shadow: 0 1px 2px #0005;
background-color:${colors.primary};
color:${colors.white};
margin-bottom:3em ;
}
  & form{
    ${FlexComun}
flex-direction:row;
flex-wrap:wrap;
width:100%;
gap:2em;
justify-content:start;
& div{
width:45%;
 margin:0 auto;
}
& label{
  width:100%;
  text-align:start;
  font-size:.9em;
  &::first-letter{
    text-transform:uppercase;
  }
}
& b{
  color:red;
  font-size:0.7em;
  font-weight:100;
  content:"*";
}
& input{
  border:none;
  border-bottom:solid 1px ${colors.secundary};
  padding:.5em;
  outline:none;
}
& > button{
    background-color:${colors.primary};
    color:${colors.tercery};
    padding:.5em 2em;
    margin:1em auto 0 auto;
    border-radius:.5em;
  }
  }
`;