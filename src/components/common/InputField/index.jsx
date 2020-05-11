import React from 'react'
import { ErrorMessage, Field, useField } from 'formik'

export const InputField = ({ type = 'text', name, label, id, ...props }) => {
  const [field] = useField(name)

  return (
    <div className="input-group">
      <span className="input-header">
        <label htmlFor={id}>{label}</label>
        <ErrorMessage className="error" component="p" name={id} />
      </span>
      {type === 'password' && (
        <p className="password-info">
          Password must be more than 7 characters and include one digit, one
          lowercase and one uppercase letter.
        </p>
      )}
      <Field className="input" id={id} type={type} {...field} {...props} />
    </div>
  )
}

export const SelectField = ({ label, id, name, children, ...props }) => {
  const [field] = useField(name)

  return (
    <div className="input-group">
      <span className="input-header">
        <label htmlFor={id}>{label}</label>
        <ErrorMessage className="error" component="p" name={id} />
      </span>
      <select className="select" id={id} {...field} {...props}>
        {children}
      </select>
    </div>
  )
}
