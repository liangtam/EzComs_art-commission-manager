import { useState, useEffect } from 'react';
import styles from './OriginalOrderComponent.module.css';
import orderDetailsStyles from '../../pages/Order/OrderDetails.module.css';

const OriginalOrderComponent = ({ origOrder, fillouts, referenceImages }) => {
    const [order, setOrder] = useState(origOrder);
    //const [fillouts, setFillouts] = useState([]);

    // useEffect = (() => {
    //     if (order != undefined && order != null) {
    //         setFillouts(parseFillouts(order.fillouts));
    //     }
    // }, [order]);
    useEffect(() => {
        let order = console.log(origOrder);
    }, []);

    return (
        <div className={styles.orderDetailsContainer}>
            <div className={styles.orderDetailsContent}>
                <p>
                    <strong>Client name: </strong>
                    {order && origOrder.clientName}
                </p>
                <p>
                    <strong> Client contact: </strong> {order && order.clientContact}
                </p>
                <p>
                    <strong> Request: </strong> {order && order.requestDetail}
                </p>
                <p>
                    <strong> Requested on: </strong> {order && order.dateReqqed}
                </p>
                <p>
                    <strong> Deadline: </strong> {order && order.deadline}
                </p>
                <div className={styles.fillouts}>
                    <h4>Form fillouts:</h4>
                    <ul>
                        {fillouts &&
                            fillouts.map((question) => {
                                return (
                                    <div className={styles.question}>
                                        <li>
                                            <b>{question.questionLabel}</b>
                                            {` ${question.questionAns}`}
                                        </li>
                                    </div>
                                );
                            })}
                    </ul>
                </div>
                <div className={styles.refImagesTitle}>
                    <b>Reference images:</b>
                </div>
                <div className={styles.refImages}>
                    {referenceImages &&
                        referenceImages.map((refImg) => {
                            return <img className={styles.refImg} src={refImg.imageURL} alt={refImg.imageID}></img>;
                        })}
                </div>
            </div>
        </div>
    );
};

export default OriginalOrderComponent;
