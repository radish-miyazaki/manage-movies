import React, {ChangeEventHandler} from 'react';

export type FormSelectOption = {
  id: number | string;
  value: string;
}

type FormSelectProps = {
  name: string;
  title: string;
  value?: string | ReadonlyArray<string> | number;
  handleChange?: ChangeEventHandler;
  placeholder?: string;
  options: FormSelectOption[]
}

const FormSelect: React.FC<FormSelectProps> = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <select
        id={props.name}
        name={props.name}
        className="form-select"
        value={props.value}
        onChange={props.handleChange}
      >
        <option className="form-select" value={""}>{props.placeholder}</option>
        {
          props.options.map((option) => (
            <option
              className="form-select"
              key={option.id}
              value={option.id}
              label={option.value}
            >
              {option.value}
            </option>
          ))
        }
      </select>
    </div>
  );
};

export default FormSelect;
