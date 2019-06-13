import React from 'react';
import T from 'prop-types';
import cn from 'classnames';
import s from './FormInput.module.scss';

function FormInput({
  field,
  form: { touched, errors },
  label,
  primaryClass,
  ...attrs
}) {
  if (field.name !== 'description') {
    return (
      <div cn={s.container}>
        <label className={s.label} htmlFor={field.name}>
          {label}
          <input
            style={
              touched[field.name] &&
              errors[field.name] && { borderColor: 'red' }
            }
            id={field.name}
            className={cn(s.input, s[primaryClass])}
            {...attrs}
            {...field}
          />
        </label>
        {touched[field.name] && errors[field.name] && (
          <p className={s.error}>{errors[field.name]}</p>
        )}
      </div>
    );
  }
  return (
    <div cn={s.container}>
      <label className={s.label} htmlFor={field.name}>
        {label}
        <textarea
          style={
            touched[field.name] && errors[field.name] && { borderColor: 'red' }
          }
          id={field.name}
          className={cn(s.textarea, s[primaryClass])}
          {...attrs}
          {...field}
        />
      </label>
      {touched[field.name] && errors[field.name] && (
        <p className={s.error}>{errors[field.name]}</p>
      )}
    </div>
  );
}

FormInput.propTypes = {
  label: T.string,
  form: T.object.isRequired,
  primaryClass: T.string,
  field: T.object.isRequired,
};

FormInput.defaultProps = {
  label: '',
  primaryClass: '',
};

export default FormInput;
