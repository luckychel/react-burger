import React from 'react'
import { IngredientsType, TotalSumType } from '../utils/propTypes'

export const IngredientsContext = React.createContext(null);
export const TotalSumContext = React.createContext(null);

IngredientsContext.Provider.propTypes = IngredientsType;
TotalSumContext.Provider.propTypes = TotalSumType;