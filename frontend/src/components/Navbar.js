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
                    <li>
                        <ul>
                            <Link to="/forms">
                            <h4>Manage Forms</h4>
                            </Link>
                        </ul>
                        <ul> <Link to="/form">
                                <h4>Form</h4>
                            </Link>
                        </ul>
                        <ul> <Link to="/form-builder">
                                <h4>Form Builder</h4>
                            </Link>
                        </ul>
                        <ul> <Link to="/orders">
                                <h4>Orders</h4>
                            </Link>
                        </ul>
                    </li>
                </div>
            </div>
        </div>        
    )
}

export default Navbar;