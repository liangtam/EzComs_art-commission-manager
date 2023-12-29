import { useState } from 'react';
import styles from './Login.module.css';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import logo from '../public/images/EzComs_Logo_Black.png';

const Login = () => {
    const [regFormSelected, setRegFormSelected] = useState(true);

    return (
        <body>
            <div className={styles.loginContainer}>
                <div className={styles.loginContent}>
                    <div className={styles.loginTitleIntro}>
                        <div className={styles.landingTitle}>
                            <img src={logo}></img>
                            <h1>EzComs</h1>
                        </div>
                        <div className={styles.landingIntro}>
                            <h2>Art commissions made easy for artists.</h2>
                            <ul>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
                                        <path d="M11.6609 22.2878L17.4574 28.0843L30.9826 14.5591" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M21.3217 40.6435C31.9927 40.6435 40.6435 31.9927 40.6435 21.3217C40.6435 10.6506 31.9927 2 21.3217 2C10.6506 2 2 10.6506 2 21.3217C2 31.9927 10.6506 40.6435 21.3217 40.6435Z"
                                            stroke="black"
                                            stroke-width="3"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <label>Customize and create commission forms</label>
                                </li>
                                <li>
                                    {' '}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
                                        <path d="M11.6609 22.2878L17.4574 28.0843L30.9826 14.5591" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M21.3217 40.6435C31.9927 40.6435 40.6435 31.9927 40.6435 21.3217C40.6435 10.6506 31.9927 2 21.3217 2C10.6506 2 2 10.6506 2 21.3217C2 31.9927 10.6506 40.6435 21.3217 40.6435Z"
                                            stroke="black"
                                            stroke-width="3"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <label>Track your orders</label>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
                                        <path d="M11.6609 22.2878L17.4574 28.0843L30.9826 14.5591" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M21.3217 40.6435C31.9927 40.6435 40.6435 31.9927 40.6435 21.3217C40.6435 10.6506 31.9927 2 21.3217 2C10.6506 2 2 10.6506 2 21.3217C2 31.9927 10.6506 40.6435 21.3217 40.6435Z"
                                            stroke="black"
                                            stroke-width="3"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <label>Upload reference photos and progress art to your workspace</label>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
                                        <path d="M11.6609 22.2878L17.4574 28.0843L30.9826 14.5591" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                        <path
                                            d="M21.3217 40.6435C31.9927 40.6435 40.6435 31.9927 40.6435 21.3217C40.6435 10.6506 31.9927 2 21.3217 2C10.6506 2 2 10.6506 2 21.3217C2 31.9927 10.6506 40.6435 21.3217 40.6435Z"
                                            stroke="black"
                                            stroke-width="3"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    <label>Manage your income</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.form}>
                        <div className={styles.buttons}>
                            <button className={regFormSelected ? styles.clickedButton : styles.notClickedButton} onClick={(e) => setRegFormSelected(true)}>
                                New User
                            </button>
                            <button className={!regFormSelected ? styles.clickedButton : styles.notClickedButton} onClick={(e) => setRegFormSelected(false)}>
                                Old User
                            </button>
                        </div>
                        {!regFormSelected && <LoginForm />}

                        {regFormSelected && <RegistrationForm />}
                    </div>
                </div>
            </div>
            <canvas className={styles.blob1}></canvas>
            <div className={styles.blob2}></div>
        </body>
    );
};

export default Login;
