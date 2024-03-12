import styles from './NoDataPlaceholder.module.css';

const NoDataPlaceholder = ({ message, src, className }) => {
    return (
        <div className={`flex-col gap-3 justify-content-center align-items-center text-grey-300 mart-3 ${className}`}>
            <h2>{message}</h2>
            <img className={`${styles.noDataImg} pad-3 border-box`} src={src} alt="No data"/>
        </div>
    );
};

export default NoDataPlaceholder;
