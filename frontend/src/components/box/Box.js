import styles from './Box.module.css';

const Box = ({ classNames, children, pad = 4, width, borderColor}) => {
    return (
        <div className={`${styles.box} radius-2 pad-${pad} ${classNames}`} style={{ width: `${width}`, borderColor: `${borderColor}` }}>
            {children}
        </div>
    );
};

export default Box;
