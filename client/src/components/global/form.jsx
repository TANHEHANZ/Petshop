import React, { useEffect, useRef, useState } from 'react'
import Input from './input';
import styled from 'styled-components';

const Form = ({ item = undefined, fields, route, onSuccess }) => {
  const getForm = () => {
    const form = {};
    fields.forEach(field => {
      form[field.name] = item ? String(item[field.name]) : field.default || ""
    });
    return form;
  }
  const [form, setForm] = useState(getForm());
  const [errors, setErrors] = useState({});
  const timesSendedRef = useRef(0);
  
  const validate = () => {
    const newErrors = {};
    fields.forEach(field => {
      if(field.validations) {
        if(field.validations.required && !form[field.name].trim()) {
          newErrors[field.name] = "Este campo es requerido";
        }
      }
    });
    setErrors(newErrors);
    timesSendedRef.current++;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  }

  const submit = async () => {
    const body = {}
    fields.forEach(field => {
      body[field.name] = (field.type === "number" || field.selectType === "number") ? Number(form[field.name]) : form[field.name]
    });
    console.log(body);
    const res = await fetch(`http://localhost:3000${route}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      method: item ? "PUT" : "POST",
      body: JSON.stringify(body)
    });
    if(res.ok) {
      const resJson = await res.json();
      setForm(getForm());
      onSuccess(resJson);
    }
  }

  useEffect(() => {
    if(Object.keys(errors).length === 0 && timesSendedRef.current !== 0) {
      submit();
    }
  }, [errors]);

  return (
    <form onSubmit={handleSubmit}>
      {
        fields.map((field, i) => (
          field.type === "select" ?
          <InputContainer key={i}>
            <label>{field.name}</label>
            <select 
              value={form[field.name]}
              onChange={e => setForm(old => ({...old, [field.name]: e.target.value }))}
            >
              {
                field.default === null &&
                <option value="">Seleccione un {field.name}</option>
              }
              {
                field.options.map((option, j) => (
                  <option key={j} value={option[field.optionValue]}>{option[field.optionDisplayName]}</option>
                ))
              }
            </select>
            {errors[field.name] && <b>{errors[field.name]}</b>}
          </InputContainer> :
          <Input
            key={i}
            name={field.name}
            value={form[field.name]}
            onChange={e => setForm(old => ({...old, [field.name]: e.target.value }))}
            type={field.type}
            error={errors[field.name]}
          />
        ))
      }
      <button>Enviar</button>
    </form>
  )
}

export default Form

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;