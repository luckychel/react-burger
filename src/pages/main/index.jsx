
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor'
import styles from './main.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Main() {

  return (
    <>
        <DndProvider backend={HTML5Backend}>
            <main className={styles.app}>
                <div className={styles.main_content}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </div>
            </main>
        </DndProvider>
    </>
);
}

export default Main;