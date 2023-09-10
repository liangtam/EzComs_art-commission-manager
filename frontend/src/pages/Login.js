import { useState } from "react";
import styles from './Login.module.css';
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

const Login = () => {

    const [regFormSelected, setRegFormSelected] = useState(true);

    return (
        <div className={styles.loginContainer}>
            <button onClick={(e) => setRegFormSelected(true)}>New User</button>
            <button onClick={(e) => setRegFormSelected(false)}>Old User</button>
            <div className={styles.loginTitleIntro}>
                <h2>EzComms</h2>
                <p>Manage all your commmissions and clients in one place.</p>
            </div>
            <div className={styles.form}>
                {!regFormSelected && 
                <LoginForm/>}

                {regFormSelected &&
                <RegistrationForm/>}
            </div>
        </div>
    )
}

export default Login;