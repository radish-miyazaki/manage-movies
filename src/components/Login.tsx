import React, {ChangeEvent, SyntheticEvent, useState} from 'react';
import Alert, {AlertProps} from "./ui/Alert";
import FormInput from "./form/FormInput";
import axios from "axios";
import {useHistory} from "react-router-dom";

type LoginProps = {
  setToken:  React.Dispatch<React.SetStateAction<string>>
}

const Login = (props: LoginProps) => {
  const { setToken } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorFields, setErrorFields] = useState<string[]>([])
  const [alert, setAlert] = useState<AlertProps>({alertType: "d-none", message: ""})
  const history = useHistory()

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

    if (email === '') setErrorFields(prev => [...prev, "email"])

    if (password === '') setErrorFields(prev => [...prev, "password"])

    await axios.post('/login', {
      email,
      password,
    })
      .then(res => {
        window.localStorage.setItem("jwt", res.data.response)
        setToken(res.data.response)
        history.push({pathname: '/admin'})
      })
      .catch(err => setAlert({alertType: "alert-danger", message: err.response.data.errors.message}))
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
          errorMessage={"Please enter a password!"}
        />
        <hr/>
        <button className="btn btn-primary">Login</button>
      </form>
    </>
  );
};

export default Login;
