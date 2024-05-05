import { useState, useCallback, useMemo, FC } from 'react'
import styles from './BurgerConstructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import Modal from '../modal/Modal'
import OrderDetails from '../order-details/OrderDetails';
import BurgerBunItem from '../burger-bun-item/BurgerBunItem'
import BurgerConstructorItem from '../burger-constructor-item/BurgerConstructorItem'

import { useSelector, useDispatch } from 'react-redux'
import { addItem, replaceItems, clearBurger } from '../../services/actions';
import { useDrop } from 'react-dnd'

import { useNavigate, useLocation} from 'react-router-dom';
import { IIngredientItem } from '../../utils/types';

const BurgerConstructor: FC = () => {

   //Данные ингредиентов
   const bun: IIngredientItem = useSelector((store: any) => store.burger.bun); 
   const ingredients: [IIngredientItem] = useSelector((store: any) => store.burger.burgerIngredients); 

   //Данные для заказа в конструкторе
   const isDraggingIng: boolean = useSelector((store: any) => store.ingredients.isDraggingIng);

   const [isCreateOrderBtnDisabled, setCreateOrderBtnDisabled] = useState(true);
   const [orderItems, setOrderItems] = useState<string[]>([]);
   const [totalSum, setTotalSum] = useState(0);

   useMemo(() => {

      if (ingredients || bun) {
         let totalSumTemp = 0;
         if (ingredients && ingredients.length > 0) {
            totalSumTemp = ingredients?.map((i: any) => i.price)?.reduce((a: number, b: number) => a + b);
         }
         if (bun) {
            totalSumTemp += bun.price * 2;
         }
         setTotalSum(totalSumTemp);

         if (bun && ingredients && ingredients.length > 0)
            setCreateOrderBtnDisabled(false)
         else
            setCreateOrderBtnDisabled(true)
      }
   }, [bun, ingredients])

   const dispatch = useDispatch();

   //Модальное окно заказа
   const [isOpenOrderDetailsModal, setOrderDetailsOpenModal] = useState(false);

   //@ts-ignore
   const {user} = useSelector(store => store.user);
   const navigate = useNavigate();
   const location = useLocation();

   //отправляем заказ
   const handleOrderDetailsClick = () => {
       if (!user) {
         navigate('/login', { state: {from: location}});
         return
       }

      let ids: string[] = [];
      if (bun) 
         ids.push(bun._id)
      if (ingredients) 
         ids = ids.concat(ingredients.map(function (item) { return item._id; }));
      if (bun) 
         ids.push(bun._id)

      setOrderItems(ids);
      setOrderDetailsOpenModal(!isOpenOrderDetailsModal);
      
      dispatch(clearBurger());
   }
   
  const [{ isItemHover }, refItemDrop] = useDrop({
      accept: "item",
      collect: monitor => ({
         isItemHover: monitor.isOver(),
      }),
      drop(item) {
         dispatch(addItem(item));
      },
   });

   const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
      dispatch(replaceItems(dragIndex,hoverIndex))
    }, [dispatch])

   return (
      <section className={`${styles.constructor_main_content} ml-10`}>
         <div className={`${styles.container} pt-24`}>
            
         <BurgerBunItem pos="top" bun={bun} />

            <div className={`${styles.components} pl-5 pr-2 pt-2 pb-2 ${isDraggingIng && ingredients && ingredients.length > 0 ? styles.isHover : ''}`} ref={refItemDrop}>
            {
               ingredients && ingredients.length > 0 ?
                  ingredients.map((item, index) => 
                     (
                        <BurgerConstructorItem key={item.uniqkey} id={item.uniqkey} ingredient={item} index={index} moveCard={moveCard} />
                     )
                  ) : (
                     <div className={`constructor-element ${styles.custom_aligment} ${styles.custom_margin_left} ${isItemHover || isDraggingIng ? styles.isHover : ''}`}>
                        <span className={`constructor-element__row`}>
                           <span className={`constructor-element__text`}>Выберите начинку</span>
                        </span>
                     </div>
                  )
            }
            </div>

            <BurgerBunItem pos="bottom" bun={bun} />
            
      </div>
    
      <div className={`${styles.total} mt-10`}>
         <span className={`${styles.total_sum} mr-10 text_type_digits-medium`}>
            {totalSum} 
            <CurrencyIcon type="primary" />
         </span>
         <Button type="primary" size="large" htmlType='button' onClick={handleOrderDetailsClick} disabled={isCreateOrderBtnDisabled}>
            Оформить заказ
         </Button>
      </div>
    
      { 
         isOpenOrderDetailsModal && 
            <Modal onClose={() => setOrderDetailsOpenModal(false)}>
               <OrderDetails ids={orderItems} />
            </Modal>
      }
      </section>
  )
}

export default BurgerConstructor;