import React, { useId, useRef, useState } from 'react'

const Datalist = () => {
  const id = useId();
  const [text, setText] = useState("");
  const [value, setValue] = useState("");
  const inputRef = useRef();

  function resetIfInvalid(){
    const el = inputRef.current;
    if (el.value == "") return;

    var options = el.list.options;
    for (var i = 0; i < options.length; i++) {
      if (newValue == options[i].value) {
        setValue(newValue);
        return;
      };
    }
    
    el.value = "";
  }

  const handleChange = (newValue) => {
    setText(newValue);
  }

  return (
    <div>
      <input 
        ref={inputRef} 
        onBlur={() => resetIfInvalid()}
        value={text}
        onChange={e => handleChange(e.target.value)}
        list={id} 
      />
      <datalist id={id}>
        <option value="1">comida de perro</option>
        <option value="2">comida de gato</option>
        <option value="3">comida de pajaro</option>
        <option value="4">plato de perro</option>
      </datalist>
    </div>
  )
}

export default Datalist