import PropTypes from 'prop-types';

const ingredientType = {
    data: PropTypes.shape({
        success: PropTypes.bool,
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
          })),
    })
};

export default ingredientType;