import { useState } from 'react';
import styles from './Login.module.css';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import logo from '../public/images/EzComs_Logo_Black.png';
import waveImg from '../public/images/waveImg.png';

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
            <canvas className={styles.blob2}></canvas>
            <img src={waveImg}></img>
            {/* <svg id={styles.mainWave} xmlns="http://www.w3.org/2000/svg" width="1036" height="1024" viewBox="0 0 1036 1024" fill="none">
                <path
                    d="M329.982 275.5C291.582 101.1 387.649 0.5 440.482 -28H1150.48L1187.98 213L1257.98 1063C814.149 1129.17 -78.0478 1208.1 5.49999 1043.5C107.018 843.5 84.4823 907.5 229.982 759.5C375.482 611.5 377.982 493.5 329.982 275.5Z"
                    fill="url(#paint0_linear_150_193)"
                />
                <defs>
                    <linearGradient id="paint0_linear_150_193" x1="633.991" y1="-28" x2="633.991" y2="1146.44" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#00ADFC" />
                        <stop offset="1" stop-color="#00E2C7" />
                    </linearGradient>
                </defs>
            </svg> */}
        </body>
    );
};

export default Login;
