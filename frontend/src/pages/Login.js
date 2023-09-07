import { useState } from "react";
import styles from './Login.module.css';

const Login = () => {

    const [regFormSelected, setRefFormSelected] = useState(true);

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginTitleIntro}>
                <h2>EzComms</h2>
                <p>Manage all your commmissions and clients in one place.</p>
            </div>

        </div>
    )
}

export default Login;