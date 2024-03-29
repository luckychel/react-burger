import PropTypes from 'prop-types';

export const Ingredient = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string
}).isRequired

export const BurgerConstructorType = {
    data: PropTypes.arrayOf(Ingredient)
};

export const BurgerIngridientsType = {
    tabs: PropTypes.arrayOf(PropTypes.shape({ 
        name: PropTypes.string,
        type: PropTypes.string
    })),
    data: PropTypes.arrayOf(Ingredient)
};

export const ModalOverlayType = {
    onClose: PropTypes.func.isRequired
};

export const ModalType = {
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

export const IngredientsType = PropTypes.arrayOf(Ingredient);

export const TotalSumType = {
    totalSum: PropTypes.number
}