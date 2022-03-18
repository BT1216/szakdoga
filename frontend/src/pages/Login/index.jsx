import { useState } from "react";
import classnames from "classnames";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import styles from "./Login.module.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (username.length !== 0 && password.length !== 0) {
      const loginObject = {
        username,
        password,
      };
      console.log("loginObject", loginObject);
    } else {
      // TODO: handle error
    }
  }
  return (
    <div className={styles.loginContainer}>
      <Input className={classnames(styles.loginInput, styles.textBox)} placeHolder="Felhasználói név" value={username} onChangeHandler={setUsername} />
      <Input className={classnames(styles.loginInput, styles.textBox)} inputType="password" placeHolder="Jelszó" value={password} onChangeHandler={setPassword} />
      <Button
        label="Bejelentkezés"
        onClickHandler={() => handleLogin()}
        className={styles.loginInput}
      />
    </div>
  );
}

export default Login;
