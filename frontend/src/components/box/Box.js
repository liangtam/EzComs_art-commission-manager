import styles from './Box.module.css';

const Box = ({classNames, children, pad}) => {
    return (
        <div className={`${styles.box} radius-2 pad-${pad} ${classNames}`}>
            {children}
        </div>
    )
}

export default Box;