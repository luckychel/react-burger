import { useState, useRef, FC } from 'react'
import styles from './BurgerConstructorItem.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { RemoveItemAction } from '../../services/actions';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'

import { TIngredientItem, TMoveCard, IDragObject } from '../../utils/types';
import { useAppDispatch } from '../../services/hooks';

const BurgerConstructorItem: FC<{ id?: string, ingredient: TIngredientItem; index: number, moveCard: TMoveCard}> = ({ ingredient, id, index, moveCard}) => {

  const [handlerId, setHandlerId] = useState<string | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  const [, drop] = useDrop<IDragObject, unknown>({
    accept: 'ingredient',
    collect(monitor) {
       setHandlerId(monitor.getHandlerId() as string);
    },
    hover(item: IDragObject, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging, draggingItem }, drag] = useDrag({
    type: 'ingredient',
    item: () => {
        return { id, index }
    },
    collect: (monitor) => {
      return {
        draggingItem: monitor.getItem(),
        isDragging: monitor.isDragging(),
      }
    },
    end: (item, monitor) => {
      //console.log('end = ' + item.id)
    }
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

    return (
      <div className={`${styles.ingredient}`} ref={ref} style={{opacity}} data-handler-id={handlerId} >
        <div className={styles.move}>
          <DragIcon type="primary"/>
        </div>
        <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
              isLocked={false} 
              extraClass={draggingItem && draggingItem.id === ingredient.uniqkey ? styles.isHoverIngredient : ''} 
              handleClose={() => dispatch(RemoveItemAction(ingredient))}/>
      </div>
    )
}

export default BurgerConstructorItem;