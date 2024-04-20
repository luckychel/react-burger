import imgloader from '../../images/loader.gif';
import styles from './PreLoader.module.css'

export function PreLoader() {
    return (
        <div className={styles.loader_main_content}>
            <p className="text text_type_main-default">Подождите...</p>
            <img src={imgloader} alt="Загрузка..."></img>
        </div>)
}
