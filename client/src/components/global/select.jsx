import React, { forwardRef, useId } from 'react'
import styled from 'styled-components';

const Select = forwardRef(({ name, value, onChange, error, options = [], nodefault = false }, ref) => {
  const id = useId();

  return (
    <InputContainer>
      <label htmlFor={id}>{name}</label>
      <select ref={ref} id={id} value={value} onChange={onChange}>
        {nodefault && <option value="">Seleccione un {name}</option>}
        {
          options.map((option, i) => (
            <option key={i} value={option.value}>{option.text}</option>
          ))
        }
      </select>
      {error && <b>{error}</b>}
    </InputContainer>
  )
})

export default Select

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;