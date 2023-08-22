import { useState, useEffect } from "react";

const OriginalOrder = ({origOrder}) => {

    const [order, setOrder] = useState(origOrder);
    const [fillouts, setFillouts] = useState([]);

    useEffect = (() => {
        setOrder(origOrder);
    }, []);

    useEffect = (() => {
        if (order != undefined && order != null) {
            setFillouts(parseFillouts(order.fillouts));
        }
    }, [order]);

    
    const parseFillouts = (fillouts) => {
        let parsedFillouts = [];
        for (let i = 0; i < fillouts.length; i++) {
            parsedFillouts.push(JSON.parse(fillouts[i]))
        }
        return parsedFillouts;
    }

    <div className={styles.order_details}>
    <h3><strong>Client name: </strong>{order && order.clientName}</h3>
    <p><strong>Client contact: </strong>  { order && order.clientContact}</p>
    <p><strong>Request: </strong> {order && order.requestDetail}</p>
    <p><strong>Requested on: </strong> {order && order.dateReqqed}</p>
    <p><strong>Deadline:</strong> {order && order.deadline}</p>
    <div className={styles.status}>
        
    </div>

    <div className={styles.fillouts}>
        <h4>Form fillouts:</h4>
        {fillouts && fillouts.map((question) => {
            return <div className={styles.question}>
                <ul>
                    <li><b>{question.questionLabel + ": "}</b>
                        {question.questionAns}
                    </li>
                </ul>
            </div> 
        })}
    </div>
    <div><b>Reference images: </b></div>
    <div className={styles.images}>
        {order && order.referenceImages.map((refImgURL) => {
            return <img className={styles.refImg} id={refImgURL + order.id} src={refImgURL.imageURL}></img>
        } )}
    </div>

</div>
}

export default OriginalOrder;

