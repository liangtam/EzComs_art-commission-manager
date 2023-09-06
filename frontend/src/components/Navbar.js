import {Link} from 'react-router-dom';

import styles from './Navbar.module.css'
const Navbar = () => {
    return (
        <div className={styles.nav_header}>
            <div className={styles.nav_container}>
                <div className={styles.website_title}>
                    <Link to="/">
                        <h1><strong>EzCom</strong></h1>
                    </Link>
                </div>
                <div className={styles.navbar_links}>
                    <ul>
                        <li>
                            <Link to="/forms">
                            <h4>Manage Forms</h4>
                            </Link>
                        </li>
                        <li> <Link to="/form">
                                <h4>Form</h4>
                            </Link>
                        </li>
                        <li> <Link to="/form-builder">
                                <h4>Form Builder</h4>
                            </Link>
                        </li>
                        <li> <Link to="/orders">
                                <h4>Orders</h4>
                            </Link>
                        </li>
                        <li> <Link to="/commissions">
                                <h4>Commissions</h4>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>        
    )
}

export default Navbar;