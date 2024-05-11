import {createContext} from 'react'
import { IngredientsType, TotalSumType } from './propTypes'

export const IngredientsContext = createContext(null);
export const TotalSumContext = createContext(null);

IngredientsContext.Provider.propTypes = IngredientsType;
TotalSumContext.Provider.propTypes = TotalSumType;