import { withState, withHandlers, compose } from 'recompose';
import { connect } from 'react-redux';
import ProductCard from './ProductCardView';
import { productsOperations } from '../../modules/products';

const mapDispatchToProps = {
  saveProduct: productsOperations.saveProduct,
  removeFromSaved: productsOperations.removeFromSaved,
};

const enhancer = compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withState('isImageError', 'imageToggle', false),
  withHandlers({
    imageErrorHandler: ({ imageToggle }) => () => {
      imageToggle(true);
    },
    saveHandler: ({ saveProduct, removeFromSaved, product }) => (event) => {
      event.preventDefault();
      if (product.saved) {
        removeFromSaved(product);
      } else {
        saveProduct(product);
      }
    },
  }),
);

export default enhancer(ProductCard);
