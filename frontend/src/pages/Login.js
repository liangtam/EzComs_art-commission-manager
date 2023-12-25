import { useState } from 'react';
import styles from './Login.module.css';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import logo from '../public/images/EzComs_Logo_Black.png';

const Login = () => {
    const [regFormSelected, setRegFormSelected] = useState(true);

    return (
        <body>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="198" height="160" viewBox="0 0 198 160" fill="none">
                <ellipse cx="77" cy="49" rx="121" ry="111" fill="url(#paint0_linear_136_5)" />
                <defs>
                    <linearGradient id="paint0_linear_136_5" x1="77" y1="-62" x2="77" y2="160" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#00E2C7" />
                        <stop offset="1" stop-color="#00ADFC" />
                    </linearGradient>
                </defs>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="67" height="65" viewBox="0 0 67 65" fill="none">
                <ellipse cx="33.5" cy="32.5" rx="33.5" ry="32.5" fill="url(#paint0_linear_136_3)" />
                <defs>
                    <linearGradient id="paint0_linear_136_3" x1="33.5" y1="0" x2="33.5" y2="65" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#00E2C7" />
                        <stop offset="1" stop-color="#00ADFC" />
                    </linearGradient>
                </defs>
            </svg> */}
            <div className={styles.loginContainer}>
                <div className={styles.landingTitle}>
                    <img src={logo}></img>

                    <h1>EzComs</h1>
                </div>
                <div className={styles.loginContent}>
                    <div className={styles.loginTitleIntro}>
                        <h2>Art commissions made easy for artists.</h2>
                        <ul>
                            <li>Customize and create commission forms</li>
                            <li>Track your orders</li>
                            <li>Upload reference photos and progress art to your workspace</li>
                            <li>Manage your income</li>
                        </ul>
                    </div>
                    <div className={styles.form}>
                        <div className={styles.buttons}>
                            <button className={regFormSelected ? styles.notClickedButton : styles.clickedButton} onClick={(e) => setRegFormSelected(true)}>
                                New User
                            </button>
                            <button className={!regFormSelected ? styles.notClickedButton : styles.clickedButton} onClick={(e) => setRegFormSelected(false)}>
                                Old User
                            </button>
                        </div>
                        {!regFormSelected && <LoginForm />}

                        {regFormSelected && <RegistrationForm />}
                    </div>
                </div>
            </div>
        </body>
    );
};

export default Login;
