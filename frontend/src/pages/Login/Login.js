import { useState } from 'react';
import styles from './Login.module.css';
import { RegistrationForm, LoginForm } from '../../components';
import logo from '../../assets/images/EzComs_Logo_Black.png';
import Checkmark from '../../components/checkmark/Checkmark';

const Login = () => {
    const [regFormSelected, setRegFormSelected] = useState(false);

    return (
        <div className={`${styles.landingBody} `}>
            <div className={`${styles.wave} w-100 h-100`}>
                <div className="flex-row justify-content-center w-100 h-100">
                    <div className={`${styles.landingContainer}`}>
                        <div className={`${styles.landingExerpt} flex-col gap-3 align-items-center z-1`}>
                            <div className={`${styles.landingTitle} flex-row gap-2`}>
                                <img data-testid="login-ezcoms-logo" src={logo}></img>
                                <h1 className="font-size-5" data-testid="login-ezcoms-title">
                                    EzComs
                                </h1>
                            </div>
                            <div className={`${styles.landingIntro} flex-col gap-3 justify-content-center`}>
                                <h2 className="text-align-center" data-testid="ezcoms-intro">
                                    Art commissions made ez for artists.
                                </h2>
                                <ul className="flex-col gap-3 w-100">
                                    <li>
                                        <Checkmark />
                                        <label data-testid="ezcoms-intro-1">Customize and create commission forms</label>
                                    </li>
                                    <li>
                                        <Checkmark />
                                        <label data-testid="ezcoms-intro-2">Track your orders</label>
                                    </li>
                                    <li>
                                        <Checkmark />
                                        <label data-testid="ezcoms-intro-3">Upload reference photos and progress art to your workspace</label>
                                    </li>
                                    <li>
                                        <Checkmark />
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
                                            ? 'outline-button bg-transparent white-outline-2 text-grey-50 font-weight-700 font-size-2 pady-2 padx-3 radius-4'
                                            : 'fill-button turquoiseHoverButton text-grey-800 bg-grey-50 font-weight-700 font-size-2 pady-2 padx-3 radius-4'
                                    }`}
                                    id="newUserBtn"
                                    onClick={() => setRegFormSelected(true)}
                                    data-testid="new-user-btn"
                                >
                                    New User
                                </button>
                                <button
                                    className={
                                        !regFormSelected
                                            ? 'outline-button bg-transparent white-outline-2 text-grey-50 font-weight-700 font-size-2 pady-2 padx-3 radius-4'
                                            : 'fill-button turquoiseHoverButton text-grey-800 bg-grey-50 font-weight-700 font-size-2 pady-2 padx-3 radius-4'
                                    }
                                    id="oldUserBtn"
                                    onClick={() => setRegFormSelected(false)}
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
