import { useState, useEffect } from "react";
import styles from './ImageComponent.module.css';

const ImageComponent = ({image, handleDeleteImage}) => {
    const imageURL = image.imageURL;
    //console.log("img: ", image)
    return (
        <div className={styles.imageComponent}>
            <div className={styles.imageContent}>
            <img className={styles.img} src={imageURL}></img>
            <div className={styles.btns}>
                <button className={`xBtn ${styles.imageDeleteBtn}`} onClick={(e) => handleDeleteImage(e, image)}>                    <svg xmlns="http://www.w3.org/2000/svg" width="76" height="77" viewBox="0 0 76 77" fill="none">
                        <path
                            d="M38.2756 76.0469C59.0422 76.0469 75.8771 59.212 75.8771 38.4455C75.8771 17.6787 59.0422 0.843994 38.2756 0.843994C17.5089 0.843994 0.674179 17.6787 0.674179 38.4455C0.674179 59.212 17.5089 76.0469 38.2756 76.0469Z"
                            fill="black"
                        />
                        <path
                            d="M27.6426 49.0809L38.2779 38.4457M38.2779 38.4457L48.9131 27.8104M38.2779 38.4457L27.6426 27.8104M38.2779 38.4457L48.9131 49.0809"
                            stroke="white"
                            stroke-width="5.64022"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    </button>
            </div>
            </div>
            
        </div>
    )
}

export default ImageComponent;