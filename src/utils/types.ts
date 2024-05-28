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

export type TOrder = {
  ingredients: TIngredientItem[];
  _id: string;
  owner: TOrderOwner;
  status: 'done' | 'pending' | 'created';
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
}

export type TOrderOwner = {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type TServerResponse<T> = {
    success: boolean;
} & T;
  
export type TRefreshResponse = TServerResponse<{
    refreshToken: string;
    accessToken: string;
}>;
  
export type TIngredientsResponse = TServerResponse<{
  data: TIngredientItem[];
}>;

export type TOrderResponse = TServerResponse<{
  order: TOrder;
}>;

export type TUserResponse = TServerResponse<{
  user: TUser;
}>;

export type TIngredientsState = Readonly<{
  itemsRequest: boolean;
  itemsFailed: boolean;
  listIngredients: Array<TIngredientItem | null>;
  currentIngredient: TIngredientItem | null;
  isDraggingBun: boolean;
  isDraggingIng: boolean;
}>;

export type TBurgerState = Readonly<{
  itemsRequest: boolean;
  itemsFailed: boolean;
  bun: TIngredientItem | null;
  burgerIngredients: Array<TIngredientItem | null>;
  orderNumber: number;
}>;

export type TUserState = Readonly<{
  user: TUser | null;
  isAuthChecked: boolean;
  isRequest: boolean;
  isFailed: boolean;
}>;
  
export type TWsState = {
  connected: boolean;
  orders: TOrder[];
};

export type TWsUserState = {
    connected: boolean;
  orders: TOrder[]
};