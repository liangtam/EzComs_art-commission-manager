import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext, useOrdersContext } from '../hooks/index';
import ezComsHead from '../public/images/ezComs_placeholder_head.png';
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
        const response = await fetch('http://localhost:4000/api/orders', {
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
                <h1>Welcome back, {user.email}</h1>
                <div className={styles.gridContent}>
                    {/* <div className={styles.firstRow}> */}
                    <div className={styles.widget} id={styles.dateWidget}>
                        <div id={styles.monthYear}>
                            <h1>{`${monthAbbreviations[currDate.getMonth()]} ${currDate.getDate()}`}</h1>
                            <h2>{`${currDate.getFullYear()}`}</h2>
                        </div>
                        <h1>{`${currDate.getHours()} : ${currDate.getMinutes()} : ${currDate.getSeconds().toString().padStart(2, '0')}`}</h1>
                    </div>
                    {orders.length === 0 && (
                        <div className={styles.widget} id={styles.noOrderWidget}>
                            <h1>No Upcoming Orders</h1>
                            <h2>You can chillax for now.</h2>
                        </div>
                    )}
                    {orders.length !== 0 && orders[0].status !== 'Completed' && (
                        <div className={styles.widget} id={styles.nextOrderWidget}>
                            <Link to={`orders/${orders[0]._id}`}>
                                <h1>Upcoming Order</h1>
                            </Link>
                            <p>
                                <b>{orders[0].orderName}</b>
                            </p>
                            <p>
                                <b>Deadline: </b>
                                {orders[0].deadline}
                            </p>
                            <p>
                                <b>Date ordered: </b>
                                {orders[0].dateReqqed}
                            </p>
                            <p>
                                <b>Price: </b>
                                {orders[0].price === -1 ? 'Not set' : orders[0].price}
                            </p>
                        </div>
                    )}

                    {/* </div> */}
                    {/* <div className={styles.secondRow}> */}
                    <div className={styles.widget} id={styles.activeFormWidget}>
                        <Link to={`/form/${user.userID}`}>
                            <h1>Active Form</h1>
                        </Link>
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
