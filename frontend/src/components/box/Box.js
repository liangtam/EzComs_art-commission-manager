import styles from './Box.module.css';

const Box = ({ classNames, children, pad = 4, width, minWidth, borderColor}) => {
    return (
        <div className={`${styles.box} radius-2 pad-${pad} ${classNames}`} style={{ width: `${width}`, borderColor: `${borderColor}`, minWidth: `${minWidth}` }}>
            {children}
        </div>
    );
};

export default Box;
