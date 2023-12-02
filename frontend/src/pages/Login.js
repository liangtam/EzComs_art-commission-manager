import { useState } from "react";
import styles from './Login.module.css';
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

const Login = () => {

    const [regFormSelected, setRegFormSelected] = useState(true);

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginTitleIntro}>
                <h2>Art commissions made easy for artists.</h2>
                <p>Customize and create commission forms, track your orders, upload reference photos and progress art to your workspace, and manage your income. All in one place.</p>
            </div>
            <div className={styles.form}>
                <div className={styles.buttons}>
                    <button className={regFormSelected? styles.notClickedButton : styles.clickedButton} onClick={(e) => setRegFormSelected(true)}>New User</button>
                    <button className={!regFormSelected? styles.notClickedButton : styles.clickedButton} onClick={(e) => setRegFormSelected(false)}>Old User</button>
                </div>
                {!regFormSelected && 
                <LoginForm/>}

                {regFormSelected &&
                <RegistrationForm/>}
            </div>
        </div>
    )
}

export default Login;