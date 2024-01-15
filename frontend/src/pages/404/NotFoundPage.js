import ezcoms404 from '../../public/images/ezcoms_404.png';
import styles from './styles.module.css';
const NotFoundPage = () => {
    return (
        <div className="page-container flex-col justify-content-center align-items-center w-screen">
            <div className="flex-col justify-content-start gap-3">
                <h1 className="font-size-5">404 Not Found.</h1>
                <p className="font-size-2">The page you're looking for does not exist {'</3'} perhaps there is a typo?</p>
                <img className={styles.notFoundImg} src={ezcoms404} alt="404"></img>
            </div>
        </div>
    );
};

export default NotFoundPage;
