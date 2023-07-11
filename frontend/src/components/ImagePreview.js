import React from "react";
import styles from './ImagePreview.module.css';

const ImagePreview = ({image, refImgs, setRefImgs, handleDeleteImg}) => {
    const imageURL = URL.createObjectURL(image);

    return (
        <div className={styles.image}>
            <img src={imageURL} width="100px" max-height="100px"></img>
            <button onClick={(e) => handleDeleteImg(e, image)}>Delete</button>
        </div>
    )

}

export default ImagePreview;