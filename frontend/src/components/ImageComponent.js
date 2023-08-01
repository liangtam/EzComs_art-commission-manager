import { useState, useEffect } from "react";
import styles from './ImageComponent.module.css';

const ImageComponent = ({imageURL, handleDeleteImage}) => {
    return (
        <div className={styles.imgComponent}>
            <img className={styles.img} src={imageURL}></img>
            <div className={styles.btns}>
                <button className={styles.deleteBtn} onClick={(e) => handleDeleteImage(e, imageURL)}>Delete</button>
            </div>
        </div>
    )
}

export default ImageComponent;