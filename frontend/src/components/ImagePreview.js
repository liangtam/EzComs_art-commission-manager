import React from "react";
import styles from './ImagePreview.module.css';

const ImagePreview = ({image, refImgs, setRefImgs, handleDeleteImg}) => {
    return (
        <div className={styles.image}>
            <img src={image} height="50"></img>
            <button onClick={(e) => handleDeleteImg(e, image)}>Delete</button>
        </div>
    )

}

export default ImagePreview;