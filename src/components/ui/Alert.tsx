import React from 'react'

export type AlertProps = {
  alertType: string;
  message: string;
}

const Alert: React.FC<AlertProps> = (props) => {
  return (
    <div className={`alert ${props.alertType}`}>
      {props.message}
    </div>
  );
};

export default Alert;
