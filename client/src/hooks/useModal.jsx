import { useRef, useState } from "react";

export const useModal = () => {
  const [item, setItem] = useState();
  const modalRef = useRef(null);

  const open = (item = null) => {
    setItem(item);
    modalRef.current.showModal();
  }

  const close = () => {
    modalRef.current.close();
  }

  return {
    item,
    modalRef,
    open,
    close
  }
}