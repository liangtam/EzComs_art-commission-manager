import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useState } from 'react';
import styles from './Navbar.module.css';
import image from '../../assets/images/EzComs_Logo_White.png';
import menuImage from '../../assets/images/navbar_menu.png';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [showMenu, setShowMenu] = useState(false);
    const nav = useNavigate();

    // console.log('User: ', user);

    const handleLogout = () => {
        logout();
        nav('/login');
    };

    return (
        <nav className={`${styles.nav_container} flex-row bg-grey-700`}>
            <div className={styles.menuContent}>
                <div className={styles.website_title}>
                    <Link to={user ? '/' : '/login'} onClick={(e) => setShowMenu(false)}>
                        <img src={image}></img>
                    </Link>
                    {/* <Link to={user ? '/' : '/login'} onClick={(e) => setShowMenu(false)}>
                        <h1>
                            <strong>EzComs</strong>
                        </h1>
                    </Link> */}
                </div>
                {user && (
                    <div className={styles.menuImage}>
                        <img id="menuImage" onClick={(e) => setShowMenu(!showMenu)} src={menuImage}></img>
                    </div>
                )}
            </div>

            {user && (
                <div className={`${showMenu ? styles.openMenu : ''} ${styles.nav_links}`}>
                    <Link to="/forms" onClick={(e) => setShowMenu(false)}>
                        <h4>Manage Forms</h4>
                    </Link>

                    <Link to="/form-builder" onClick={(e) => setShowMenu(false)}>
                        <h4>Form Builder</h4>
                    </Link>

                    <Link to="/orders" onClick={(e) => setShowMenu(false)}>
                        <h4>Orders</h4>
                    </Link>

                    <Link to="/commissions" onClick={(e) => setShowMenu(false)}>
                        <h4>Commissions</h4>
                    </Link>
                </div>
            )}
            {user && (
                <div className={`${showMenu ? styles.openMenu : ''} ${styles.loggedInDetails} `}>
                    <span id={styles.email}> {user.email}</span>
                    <button className={`filledWhiteButton turquoiseHoverButton ${styles.logoutButton}`} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
            {/* {!user && (
                <Link className={`${styles.signInBtn} font-size-2 filled-button bg-grey-50 pady-2 padx-3 radius-3 turquoiseHoverButton `} to="/login">
                    <h4>Sign In</h4>
                </Link>
            )} */}
            
        </nav>
    );
};


export default Navbar;
