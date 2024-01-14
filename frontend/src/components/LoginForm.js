import { useState, useEffect } from 'react';
import styles from './LoginReg.module.css';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading} = useLogin();
    const nav = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email, password);

        // console.log('b4: ', isLoading);
        await login(email, password);

        if (!error) {
            nav("/");
        }
        // console.log(isLoading)
    };


    return (
        <form className={`${styles.container} bg-dark-grey flex-col gap-3 align-items-center w-100 pad-4`}>
            <div className={`${styles.intro} flex-col gap-3 align-items-center text-light-grey w-100`}>
                <h3>
                    <b className='font-size-4'>Login</b>
                </h3>
                <p className='font-size-2'>Welcome back!</p>
            </div>
            <div className={`${styles.content} flex-col justify-content-center align-items-center text-light-grey`}>
                <label className='flex-col justify-content-start gap-2 marb-2 w-100'>
                    <p>Email:</p>
                    <input className="font-size-2 pad-2 radius-2 w-100" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="amazingyou@example.com"></input>
                </label>
                <label className='flex-col justify-content-start gap-2 marb-2 w-100'>
                    <p>Password:</p>
                    <input className="font-size-2 pad-2 radius-2 w-100" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </label>
                {/* <label>Confirm password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input></label> */}
            </div>
            {error && <div className="errorMessage">{error}</div>}
            <button className={` ${styles.signInBtn} fill-button font-size-2 bg-ezcoms-blue pady-2 padx-3 radius-2 font-weight-700 text-light-grey w-100`} disabled={isLoading} onClick={handleLogin}>
                Login
            </button>
        </form>
    );
};

export default LoginForm;
