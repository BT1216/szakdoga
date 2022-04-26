import { useState, useContext } from "react";
import classnames from "classnames";
import { useNavigate, useLocation } from "react-router-dom";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import styles from "./Login.module.scss";
import AuthContext from "../../context/AuthContext/context";
import { fakeUsers } from "../../fakeApi/fakeUsers";
import SuccessReg from "./components/SuccessReg";

function Login() {
  const { state } = useLocation();
  console.log("searchParams", state);
  const [username, setUsername] = useState(
    process.env.NODE_ENV === "development"
      ? fakeUsers.find((user) => user.email.includes("zilahi")).email
      : "",
  );
  const [password, setPassword] = useState(
    process.env.NODE_ENV === "development"
      ? fakeUsers.find((user) => user.email.includes("zilahi")).password
      : "",
  );

  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogin() {
    if (username.length !== 0 && password.length !== 0) {
      const loginObject = {
        email: username,
        password,
      };
      signIn(loginObject, () => navigate("/tasks"));
    } else {
      // TODO: handle error
    }
  }
  return (
    <div className={styles.loginContainer}>
      {state && Object.hasOwn(state, "newReg") && <SuccessReg />}
      <div className={styles.innerContainer}>
        <Input
          className={classnames(styles.loginInput, styles.textBox)}
          placeHolder="Felhasználói név"
          value={username}
          onChangeHandler={setUsername}
        />
        <Input
          className={classnames(styles.loginInput, styles.textBox)}
          inputType="password"
          placeHolder="Jelszó"
          value={password}
          onChangeHandler={setPassword}
        />
        <Button
          label="Bejelentkezés"
          onClickHandler={() => handleLogin()}
          className={styles.loginInput}
        />
      </div>
    </div>
  );
}

export default Login;
