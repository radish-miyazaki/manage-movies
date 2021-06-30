import React, {ChangeEventHandler} from 'react';

type FormTextareaProps = {
  name: string;
  title: string;
  value?: string | ReadonlyArray<string> | number;
  handleChange?: ChangeEventHandler;
  placeholder?: string;
  rows?: number
}

const FormTextarea: React.FC<FormTextareaProps> = (props) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">
        Description
      </label>
      <textarea
        id={props.name}
        name={props.name}
        className="form-control"
        value={props.value}
        rows={props.rows}
        onChange={props.handleChange}
      />
    </div>
  );
};

export default FormTextarea;
