import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext, useOrdersContext } from '../hooks/index';
import ezComsHead from '../public/images/ezComs_placeholder_head.png';
import ezComsSleepy from '../public/images/ezComs_placeholder_sleepy.png';
import winterTrees from '../public/images/winterdate_trees_bg.png';
import activeFormBg from '../public/images/ezcoms_activeform_bg.png';
import ordersBg from '../public/images/ezcoms_orders_bg.png';
import commissionsBg from '../public/images/ezcoms_commissions_bg.png';
import ezComsWave from '../public/images/EzComs_LoginWave.png';


import styles from './Dashboard.module.css';

const Dashboard = () => {
    const { user } = useAuthContext();
    const { orders, setOrders } = useOrdersContext();

    const [currDate, setCurrDate] = useState(new Date());
    const monthAbbreviations = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    // console.log(currDate.toDateString());
    const fetchOrders = async () => {
        if (!user) {
            return;
        }

        // making a call to the backend
        const response = await fetch('https://ezcoms.onrender.com/api/orders', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        });

        // to parse the json from the above response into smt we can work w/
        const json = await response.json();

        if (response.ok) {
            setOrders(json);
            console.log('Fetched all forms in orders page! ', json);
        }
    };

    useEffect(() => {
        const updateSeconds = setInterval(() => {
            setCurrDate(new Date());
        }, 1000);

        return () => clearInterval(updateSeconds);
    }, []);

    useEffect(() => {
        fetchOrders();
    }, []);
    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dashboardContent}>
                <div className={styles.welcomeMessage}>
                    <h1>Welcome back, {user.email}</h1>
                </div>
                <div className={styles.gridContent}>
                    <div className={styles.widget} id={styles.dateWidget}>
                        <div id={styles.monthYear}>
                            <h1>{`${monthAbbreviations[currDate.getMonth()]} ${currDate.getDate()}`}</h1>
                            <h1>{`${currDate.getFullYear()}`}</h1>
                        </div>
                        <h1 className={styles.time}>{`${currDate.getHours().toString().padStart(2, '0')} : ${currDate.getMinutes().toString().padStart(2, '0')} : ${currDate.getSeconds().toString().padStart(2, '0')}`}</h1>
                        <img src={winterTrees}></img>
                    </div>
                    {(orders.length === 0 || (orders.length !== 0 && orders[0].status === 'Completed')) && (
                        <div className={`${styles.widget} ${styles.nextOrderWidget}`} id={styles.noOrderWidget}>
                            <div className={styles.title}>
                                <h1>No Upcoming Orders</h1>
                            </div>
                            <h2>You can chillax for now!</h2>
                            <img src={ezComsSleepy}></img>
                        </div>
                    )}
                    {orders.length !== 0 && orders[0].status !== 'Completed' && (
                        <Link to={`orders/${orders[0]._id}`} className={`${styles.widget} ${styles.nextOrderWidget}`} id={styles.upcomingOrderWidget}>
                            <div className={styles.title}>
                                <h1>Upcoming Order</h1>
                            </div>
                            <div className={styles.orderDetails}>
                                <ul>
                                    <li>
                                        <b>Order name:</b> {orders[0].orderName}
                                    </li>
                                    <li>
                                        <b>Deadline:</b> {orders[0].deadline !== "9999-12-31" && orders[0].deadline}
                                        {orders[0].deadline === "9999-12-31" && "--------"}
                                    </li>
                                    <li>
                                        <b>Date ordered:</b> {orders[0].dateReqqed}
                                    </li>
                                    <li>
                                        <b>Price:</b> {orders[0].price === -1 ? 'Not set' : orders[0].price}
                                    </li>
                                </ul>
                            </div>
                        </Link>
                    )}

                    <Link to={`/form/${user.userID}`} className={`${styles.widget} ${styles.smallerWidget}`} id={styles.activeFormWidget}>
                        <h1>Active Form</h1>
                        <img src={activeFormBg}></img>
                    </Link>
                    <Link to="/orders" className={`${styles.widget} ${styles.smallerWidget}`} id={styles.ordersWidget}>
                        <h1>Orders</h1>
                        <img src={ordersBg}></img>
                    </Link>
                    <Link to="/commissions" className={styles.widget} id={styles.commissionsWidget}>
                        <h1>Commissions</h1>
                        <img src={commissionsBg}></img>
                    </Link> 
                    <div id={styles.ezComsHead}>
                        <img src={ezComsHead}></img>
                    </div>
                </div>
            </div>
            <img id={styles.ezComsWave} src={ezComsWave}></img>
        </div>
    );
};

export default Dashboard;
