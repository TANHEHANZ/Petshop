import React, { useEffect, useRef, useState } from 'react'
import Input from './input';

const Form = ({ item, fields, route, onSuccess }) => {
  const getForm = () => {
    const form = {};
    fields.forEach(field => {
      form[field.name] = item ? String(item[field.name]) : ""
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
    const res = await fetch(`http://localhost:3000${route}`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      method: item ? "PUT" : "POST",
      body: JSON.stringify(form)
    });
    if(res.ok) {
      const resJson = await res.json();
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