export interface IIngredientItem {
    _id: string,
    type: string,
    name: string,
    price: number,
    calories: number,
    carbohydrates: number,
    fat: number,
    proteins: number,
    image: string,
    image_large: string,
    image_mobile?: string,
    uniqkey?: string | undefined
};

export type TIngredientItem = Omit<IIngredientItem, "uniqkey">

export interface IDragDrop { dragIndex: number; dropIndex: number }

export type TMoveCard = (dragIndex: number, dropIndex: number ) => void;

export interface IDragObject { index: number }
  
