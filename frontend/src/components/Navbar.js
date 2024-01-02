import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import styles from './Navbar.module.css';
import image from '../public/images/EzComs_Logo_White.png';
import menuImage from '../public/images/navbar_menu.png';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [showMenu, setShowMenu] = useState(false);
    const nav = useNavigate();
    console.log(showMenu);

    console.log('User: ', user);

    const handleLogout = () => {
        logout();
        nav('/login');
    };

    return (
        <nav className={styles.nav_container}>
            <div className={styles.menuContent}>
                <div className={styles.website_title}>
                    <Link to={user ? '/' : '/login'}>
                        <img src={image}></img>
                    </Link>
                    <Link to={user ? '/' : '/login'}>
                        <h1>
                            <strong>EzComs</strong>
                        </h1>
                    </Link>
                </div>
                {user && (
                    <div className={styles.menuImage}>
                        <img id="menuImage" onClick={(e) => setShowMenu(!showMenu)} src={menuImage}></img>
                    </div>
                )}
            </div>

            {user && (
                <div className={`${showMenu ? styles.openMenu : ''} ${styles.nav_links}`}>
                    <NavLink to="/forms" >
                        <h4>Manage Forms</h4>
                    </NavLink>
                    {/* <Link to={`/form/${user.userID}`}>
                            <h4>Form</h4>
                        </Link> */}
                    <NavLink to="/form-builder">
                        <h4>Form Builder</h4>
                    </NavLink>

                    <NavLink to="/orders" >
                        <h4>Orders</h4>
                    </NavLink>

                    <NavLink to="/commissions">
                        <h4>Commissions</h4>
                    </NavLink>
                </div>
            )}
            {user && (
                <div className={`${showMenu ? styles.openMenu : ''} ${styles.loggedInDetails} `}>
                    <span id={styles.email}> {user.email}</span>
                    <button className={`filledWhiteTurquoiseButton ${styles.logoutButton}`} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}

            {/* {!user && (
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
                    )} */}
        </nav>
    );
};

export default Navbar;
