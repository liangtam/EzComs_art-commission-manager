import styles from './PageContainer.module.css';
import PageContent from './PageContent';

const PageContainer = ({children}) => {

    return (
        <div className={`${styles.pageContainer} w-100`}>
            {children}
        </div>
    )
}


export default PageContainer;