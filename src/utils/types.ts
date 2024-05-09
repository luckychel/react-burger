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

export type TIngredientItem = Pick<IIngredientItem, keyof IIngredientItem>

export interface IDragDrop { dragIndex: number; dropIndex: number }

export type TMoveCard = (dragIndex: number, dropIndex: number ) => void;

export interface IDragObject { index: number }
  
export interface IIngredientDetails { header?: string; } 

export interface IModalProps {
    header?: string;
    onClose: (() => void) | undefined;
}

export type TUser = {
    name?: string;
    email?: string ; 
    password?: string;
    token?: string;
}

export interface ITokens {
    refreshToken?: string;
    accessToken?: string;
}

export interface IResponseBase {
    success: boolean;
    name?: string;
    message?: string;
}

export interface IResponse<T> extends IResponseBase, ITokens {
    data?: T;
    order?: T;
    user?:T;
}

export interface IOrder {
    ingredients: IIngredientItem[]
    _id: string
    owner: IOrderOwner
    status: string
    name: string
    createdAt: string
    updatedAt: string
    number: number
    price: number
  }
  
  export interface IOrderOwner {
    name: string
    email: string
    createdAt: string
    updatedAt: string
  }