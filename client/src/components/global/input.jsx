import React, { forwardRef, useId } from 'react'
import styled from 'styled-components'

const Input = forwardRef(({ name, type, value, onChange, error }, ref) => {
  const id = useId();

  return (
    <InputContainer>
      <label htmlFor={id}>{name}</label>
      <input
        ref={ref} 
        id={id}
        type={type || "text"}
        value={value}
        onChange={onChange}
      />
      {error && <b>{error}</b>}
    </InputContainer>
  )
})

export default Input

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;