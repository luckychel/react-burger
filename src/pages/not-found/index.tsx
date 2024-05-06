import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

const NotFound404: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Упссс! 404 ошибка :(</h1>
          <p>Запрашиваемая страница отсутствует!</p>
          <br />
          <br />
          <p>Проверь адрес или попробуй вернуться <Link to='/' className={styles.link}>на главную</Link></p>
        </div>
      </div>
    </div>
  );
}

export default NotFound404;