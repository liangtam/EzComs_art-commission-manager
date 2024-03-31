import styles from './PageContainer.module.css';

const PageContent = ({children}) => {
    return <div className={`${styles.pageContent}`}>
        {children}
    </div>
}

export default PageContent;