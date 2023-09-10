import { useState } from "react";
import styles from './LoginForm.module.css';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email, password);
    }

    return (
        <form className={styles.container}>
            <h3>Login</h3>
            <div className={styles.content}>
                <label>Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="amazingyou@example.com"></input></label>
                <label>Password: <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}></input></label>
            </div>
            <button onClick={handleLogin}>Login</button>
        </form>
    )
    
}

export default LoginForm;