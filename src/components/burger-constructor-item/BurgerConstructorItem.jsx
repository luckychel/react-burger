import React, { useRef } from 'react'
import styles from './BurgerConstructorItem.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { useDispatch } from 'react-redux'
import { deleteItem } from '../../services/actions';
import { useDrag, useDrop } from 'react-dnd'

function BurgerConstructorItem({ id, item, index, moveCard}) {
  
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [{ handlerId, isHover }, drop] = useDrop({
    accept: 'ingredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isHover: monitor.isOver(),
      }
    },
    hover(item, monitor) {
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

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

  const [{ isDragging }, drag] = useDrag({
    type: 'ingredient',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

    return (
      <div className={`${styles.ingredient}`} ref={ref} style={{opacity}} data-handler-id={handlerId} >
        <div className={styles.move}>
          <DragIcon type="primary"/>
        </div>
        <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              isLocked={false} 
              extraClass={isHover ? styles.isHoverIngredient : ''} 
              handleClose={() => dispatch(deleteItem(item))}/>
      </div>
    )
}

export default BurgerConstructorItem;