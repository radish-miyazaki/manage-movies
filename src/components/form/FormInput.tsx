import React, {ChangeEventHandler} from 'react';

type FormInputProps = {
  name: string;
  title: string;
  value?: string | ReadonlyArray<string> | number;
  type?: string;
  handleChange?: ChangeEventHandler;
  placeholder?: string;
  className?: string;
  errorDiv?: string;
  errorMessage?: string;
}

const FormInput: React.FC<FormInputProps> = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <input
        id={props.name}
        name={props.name}
        type={props.type}
        className={`form-control ${props.className}`}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
      />
      <div className={props.errorDiv}>{props.errorMessage}</div>
    </div>
  );
};

export default FormInput;
