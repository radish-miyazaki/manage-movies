import React, {ChangeEvent, SyntheticEvent, useState} from 'react';
import Alert, {AlertProps} from "./ui/Alert";
import FormInput from "./form/FormInput";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [errorFields, setErrorFields] = useState<string[]>([])
  const [alert, setAlert] = useState<AlertProps>({alertType: "d-none", message: ""})

  const hasError = (key: string) => {
    return errorFields.indexOf(key) !== -1;
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <h2>Login</h2>

      <hr />

      <Alert alertType={alert.alertType} message={alert.message} />

      <form className="pt-3" onSubmit={handleSubmit}>
        <FormInput
          name={"email"}
          title={"Email"}
          type={"email"}
          value={email}
          handleChange={handleEmailChange}
          className={hasError("email") ? "is-invalid" : ""}
          errorDiv={hasError("email") ? "text-danger" : "d-none"}
          errorMessage={"Please enter your valid email!"}
        />
        <FormInput
          name={"password"}
          title={"Password"}
          type={"password"}
          value={password}
          handleChange={handlePasswordChange}
          className={hasError("password") ? "is-invalid" : ""}
          errorDiv={hasError("password") ? "text-danger" : "d-none"}
          errorMessage={"Please enter your password!"}
        />
        <hr/>
        <button className="btn btn-primary">Login</button>
      </form>

    </>
  );
};

export default Login;
