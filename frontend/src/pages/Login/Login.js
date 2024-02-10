import { useState } from 'react';
import styles from './Login.module.css';
import LoginForm from '../../components/LoginForm';
import RegistrationForm from '../../components/RegistrationForm';
import logo from '../../public/images/EzComs_Logo_Black.png';
import wave from '../../public/images/wave.png';

const Login = () => {
    const [regFormSelected, setRegFormSelected] = useState(true);

    return (
        <div className={`${styles.landingBody} `}>
            <div className={`${styles.wave} w-100 h-100`}>
            <div className="flex-row justify-content-center w-100 h-100">
                <div className={`${styles.landingContainer}`}>
                    <div className={`${styles.landingExerpt} flex-col gap-3 align-items-center z-1`}>
                        <div className={`${styles.landingTitle} flex-row gap-2`}>
                            <img data-testid="login-ezcoms-logo" src={logo}></img>
                            <h1 className="font-size-5" data-testid="login-ezcoms-title">EzComs</h1>
                        </div>
                        <div className={`${styles.landingIntro} flex-col gap-3 justify-content-center`}>
                            <h2 className="text-align-center" data-testid="ezcoms-intro">Art commissions made ez for artists.</h2>
                            <ul className="flex-col gap-3 w-100">
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
                                    <label data-testid="ezcoms-intro-1">Customize and create commission forms</label>
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
                                    <label data-testid="ezcoms-intro-2">Track your orders</label>
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
                                    <label data-testid="ezcoms-intro-3">Upload reference photos and progress art to your workspace</label>
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
                                    <label data-testid="ezcoms-intro-4">Manage your income</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={`${styles.form} flex-col align-items-center z-1`}>
                        <div className={`${styles.buttons} flex-row gap-4 justify-content-center pady-3 w-100`}>
                            <button
                                className={`${
                                    regFormSelected
                                        ? 'outline-button bg-transparent white-outline-2 text-light-grey font-weight-700 font-size-2 pady-2 padx-3 radius-4'
                                        : 'fill-button turquoiseHoverButton text-dark-grey bg-grey-50 font-weight-700 font-size-2 pady-2 padx-3 radius-4'
                                }`}
                                id="newUserBtn"
                                onClick={(e) => setRegFormSelected(true)}
                                data-testid="new-user-btn"
                            >
                                New User
                            </button>
                            <button
                                className={
                                    !regFormSelected
                                        ? 'outline-button bg-transparent white-outline-2 text-light-grey font-weight-700 font-size-2 pady-2 padx-3 radius-4'
                                        : 'fill-button turquoiseHoverButton text-dark-grey bg-grey-50 font-weight-700 font-size-2 pady-2 padx-3 radius-4'
                                }
                                id="oldUserBtn"
                                onClick={(e) => setRegFormSelected(false)}
                                data-testid="old-user-btn"
                            >
                                Old User
                            </button>
                        </div>
                        {!regFormSelected && (
                            <div className={styles.actualForm}>
                                <LoginForm />
                            </div>
                        )}

                        {regFormSelected && (
                            <div className={styles.actualForm}>
                                <RegistrationForm />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            </div>
            <div className={styles.blob1}></div>
            <div className={styles.blob2}></div>
            <div className={styles.blob3}></div>
        </div>
    );
};

export default Login;
