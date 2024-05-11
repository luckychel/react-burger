import { FC, CSSProperties } from 'react';
import imgloader from '../../images/loader.gif';
import styles from './PreLoader.module.css'

interface IPreLoaderProps {
    style?: CSSProperties;
} 

export const PreLoader: FC<IPreLoaderProps> = ({ style }) => {
    return (
        <div className={styles.loader_main_content} style={style}>
            <p className="text text_type_main-default pb-4">Подождите...</p>
            <img src={imgloader} alt="Загрузка..."></img>
        </div>)
}