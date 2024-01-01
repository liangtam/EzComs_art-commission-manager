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
        console.log("regForm: ", error);
    }

    return (
        <form className={styles.container}>
            <div className={styles.intro}>
                <h3><b><span style={{color: "#00E2C7"}}> Sign Up </span>Now</b></h3>
                <p>Guess what. It's just as Ez.</p>
            </div>
            <div className={styles.content}>
                <label>Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="amazingyou@example.com"></input></label>
                <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input></label>
                <p>Password must be at least 8 characters long, contain a number and a special character (?!@#$%&)</p>
                {/* <label>Confirm password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input></label> */}
            </div>
            {error && <div className={`errorMessage ${styles.smallErrorMessage}`}>{error}</div>}
            <button disabled={isLoading} className={`blueButton ${styles.smallBlueButton}`} onClick={handleSignUp}>Sign Up</button>
        </form>
    )
    
}

export default RegistrationForm;