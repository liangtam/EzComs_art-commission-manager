import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import styles from './Navbar.module.css';
import image from '../public/images/EzComs_Logo_White.png';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const nav = useNavigate();

    console.log("User: ", user);

    const handleLogout = () => {
        logout();
        nav("/login");
    };

    return (
        <div className={styles.nav_header}>
            <div className={styles.nav_container}>
                <div className={styles.website_title}>
                    <Link to={user? "/orders" : "/login"}>
                        <img src={image}></img>
                    </Link>
                    <Link to={user? "/orders" : "/login"}>
                        <h1>
                            <strong>EzComs</strong>
                        </h1>
                    </Link>
                </div>
                <div className={styles.navbar_links}>
                    <ul>
                        <div className={styles.loggedIn_links}>
                        {user && (
                            <li>
                                <Link to="/forms">
                                    <h4>Manage Forms</h4>
                                </Link>
                            </li>
                        )}
                        {user && (
                            <li>
                                <Link to={`/form/${user.userID}`}>
                                    <h4>Form</h4>
                                </Link>
                            </li>
                        )}
                        {user && (
                            <li>
                                <Link to="/form-builder">
                                    <h4>Form Builder</h4>
                                </Link>
                            </li>
                        )}
                        {user && (
                            <li>
                                <Link to="/orders">
                                    <h4>Orders</h4>
                                </Link>
                            </li>
                        )}
                        {user && (
                            <li>
                                <Link to="/commissions">
                                    <h4>Commissions</h4>
                                </Link>
                            </li>
                        )}
                        {user && (
                            <div>
                                <span> {user.email}</span>
                                <button className="filledWhiteTurquoiseButton" onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                        </div>
                    
                        {!user && (
                            <div className={styles.regLinks}>
                                <li>
                                    <Link to="/login">
                                        <h4>Login</h4>
                                    </Link>
                                </li>
                                <li className={styles.signUpLink}>
                                    <Link to="/login">
                                        <h4>Sign Up</h4>
                                    </Link>
                                </li>
                            </div>
                        )}
                    
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
