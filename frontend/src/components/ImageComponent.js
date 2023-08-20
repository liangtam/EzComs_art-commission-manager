import { useState, useEffect } from "react";
import styles from './ImageComponent.module.css';

const ImageComponent = ({image, handleDeleteImage}) => {
    const imageURL = image.imageURL;
    console.log("img url: ", image)
    return (
        <div className={styles.imgComponent}>
            <img className={styles.img} src={imageURL}></img>
            <div className={styles.btns}>
                <button className={styles.deleteBtn} onClick={(e) => handleDeleteImage(e, image)}>Delete</button>
            </div>
        </div>
    )
}

export default ImageComponent;