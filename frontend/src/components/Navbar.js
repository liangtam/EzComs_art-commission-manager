import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

import styles from './Navbar.module.css';
import { useAuthContext } from '../hooks/useAuthContext';
const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className={styles.nav_header}>
            <div className={styles.nav_container}>
                <div className={styles.website_title}>
                    <Link to="/">
                        <h1>
                            <strong>EzCom</strong>
                        </h1>
                    </Link>
                </div>
                <div className={styles.navbar_links}>
                    <ul>
                        {user && (
                            <li>
                                <Link to="/forms">
                                    <h4>Manage Forms</h4>
                                </Link>
                            </li>
                        )}
                        {user && (
                            <li>
                                <Link to="/form">
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
                        {!user && (
                            <div>
                                <li>
                                    <Link to="/login">
                                        <h4>Login</h4>
                                    </Link>
                                </li>
                            </div>
                        )}
                        {user && (
                            <div>
                                <span> {user.email}</span>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
