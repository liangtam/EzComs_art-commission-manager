import { useState } from 'react';
import styles from './LoginReg.module.css';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { error, isLoading, login } = useLogin();

    const nav = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email, password);

        console.log('b4: ', isLoading);
        await login(email, password);
        if (!error) {
            nav('/orders');
        }
        // console.log(isLoading)
    };

    return (
        <form className={styles.container}>
            <div className={styles.intro}>
                <h3>
                    <b>Login</b>
                </h3>
                <p>Welcome back!</p>
            </div>
            <div className={styles.content}>
                <label>
                    Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="amazingyou@example.com"></input>
                </label>
                <label>
                    Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </label>
                <p>Password must be at least 8 characters long, contain a number and a special character (?!@#$%&)</p>
                {/* <label>Confirm password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input></label> */}
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <button disabled={isLoading} onClick={handleLogin}>
                Login
            </button>
        </form>
    );
};

export default LoginForm;
