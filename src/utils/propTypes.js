import PropTypes from 'prop-types';

export const burgerConstructorType = {
    data: PropTypes.arrayOf(PropTypes.shape({  
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
    }))
};

export const burgerIngridientsType = {
    tabs: PropTypes.arrayOf(PropTypes.shape({ 
        name: PropTypes.string,
        type: PropTypes.string
    })),
    data: PropTypes.arrayOf(PropTypes.shape({  
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
    }))
};


