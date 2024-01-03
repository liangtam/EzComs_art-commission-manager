import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext, useOrdersContext } from '../hooks/index';
import ezComsHead from '../public/images/ezComs_placeholder_head.png';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const { user } = useAuthContext();
    const { orders } = useOrdersContext();

    const [currDate, setCurrDate] = useState(new Date());
    const monthAbbreviations = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    // console.log(currDate.toDateString());

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardContent}>
                <h1>Welcome back, {user.email}</h1>
                <div className={styles.gridContent}>
                    {/* <div className={styles.firstRow}> */}
                    <div className={styles.widget} id={styles.dateWidget}>
                        <div id={styles.monthYear}>
                        <h1>{`${monthAbbreviations[currDate.getMonth()]} ${currDate.getDate()}`}</h1>
                        <h2>{`${currDate.getFullYear()}`}</h2>
                        </div>
                    </div>
                    <div className={styles.widget} id={styles.nextOrderWidget}>
                        <h1>Next Order</h1>
                    </div>
                    {/* </div> */}
                    {/* <div className={styles.secondRow}> */}
                    <div className={styles.widget} id={styles.activeFormWidget}>
                        <Link to={`/form/${user.userID}`}><h1>Active Form</h1></Link>
                    </div>
                    <div className={styles.widget} id={styles.ordersWidget}>
                        <h1>Orders</h1>
                    </div>
                    <div className={styles.widget} id={styles.commissionsWidget}>
                        <h1>Commissions</h1>
                    </div>
                    <div id={styles.ezComsHead}>
                        <img src={ezComsHead}></img>
                    </div>

                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
