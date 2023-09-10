import { useState } from "react";
import styles from './LoginForm.module.css';
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {error, isLoading, login } = useLogin();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email, password);

        
        console.log("b4: ", isLoading)
        await login(email, password);

        console.log(isLoading)

    }

    return (
        <form className={styles.container}>
            <h3>Login</h3>
            <div className={styles.content}>
                <label>Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="amazingyou@example.com"></input></label>
                <label>Password: <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}></input></label>
            </div>
            <button disabled={isLoading} onClick={handleLogin}>Login</button>
            {error && <div>{error}</div>}
        </form>
    )
    
}

export default LoginForm;