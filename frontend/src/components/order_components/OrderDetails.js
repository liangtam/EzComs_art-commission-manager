import styles from './OrderDetails.module.css'
import { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
const OrderDetails = () => {

    const { id } = useParams();
    const [order, setOrder] = useState('');
    const [fillouts, setFillouts] = useState([]);


    const fetchOrder = async () => {
        const response = await fetch('http://localhost:4000/api/orders/' + id);
        
        if (response.ok) {
            const json = await response.json();
            setOrder(json);
            console.log("Fetched order: ", json);
        } else {
            console.log("response not ok");
        }
    }

    useEffect(() => {
        fetchOrder();
    }, [])

    useEffect(() => {
        let questions = [];
        if (Array.isArray(order.fillouts)) {
            for (let i = 0; i < order.fillouts.length; i++) {
                const question = JSON.parse(order.fillouts[i]);
                console.log(question);
                questions.push(question);
            }
        }
        setFillouts(questions);
    }, [order])

    return (
        <div className={styles.order_details}>
            <h3><strong>Client name: </strong>{order && order.clientName}</h3>
            <p><strong>Client contact: </strong>  { order && order.clientContact}</p>
            <p><strong>Request: </strong> {order && order.requestDetail}</p>
            <p><strong>Requested on: </strong> {order && order.dateReqqed}</p>
            <p><strong>Deadline:</strong> {order && order.deadline}</p>

            <div className={styles.fillouts}>
                <h4>Form fillouts:</h4>
                {fillouts && fillouts.map((question) => {
                    return <div className={styles.question}>
                        <li>
                            <ul><b>{question.questionLabel + ": "}</b>
                                {question.questionAns}
                            </ul>
                        </li>
                    </div> 
                })}
            </div>
        </div>
    )
}

export default OrderDetails;
