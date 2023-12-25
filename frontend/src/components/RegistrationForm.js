import { useState } from "react";
import styles from './LoginReg.module.css';
import { useSignup } from '../hooks/useSignup';

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signUp, error, isLoading} = useSignup();

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log(email, password);

        await signUp(email, password);
    }

    return (
        <form className={styles.container}>
            <div className={styles.intro}>
                <h3><b>Sign Up Now</b></h3>
                <p>Guess what. It's just as Ez.</p>
            </div>
            <div className={styles.content}>
                <label>Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="amazingyou@example.com"></input></label>
                <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input></label>
                <p>Password must be at least 8 characters long, contain a number and a special character (?!@#$%&)</p>
                {/* <label>Confirm password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input></label> */}
            </div>
            <button disabled={isLoading} onClick={handleSignUp}>Sign Up</button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </form>
    )
    
}

export default RegistrationForm;