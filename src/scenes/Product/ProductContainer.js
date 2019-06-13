import { compose, lifecycle, withStateHandlers, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Product from './ProductView';
import { productsOperations, productsSelectors } from '../../modules/products';
import { viewerSelectors } from '../../modules/viewer';

function mapStateToProps(state, { match }) {
  return {
    product: productsSelectors.getProduct(state, match.params.id),
    owner: productsSelectors.getProductOwner(state, match.params.id),
    isLoading: state.products.product.isLoading,
    viewer: viewerSelectors.getViewer(state),
  };
}

const mapDispatchToProps = {
  fetchProduct: productsOperations.fetchProduct,
  saveProduct: productsOperations.saveProduct,
  removeFromSaved: productsOperations.removeFromSaved,
};

const enhancer = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withHandlers({
    saveHandler: ({ product, removeFromSaved, saveProduct }) => () => {
      if (product.saved) {
        removeFromSaved(product);
      } else {
        saveProduct(product);
      }
    },
  }),
  withStateHandlers(
    {
      isImageError: false,
      isModalOpen: false,
    },
    {
      imageErrorHandler: () => () => ({
        isImageError: true,
      }),
      toggleModal: ({ isModalOpen }) => () => ({
        isModalOpen: !isModalOpen,
      }),
    },
  ),
  lifecycle({
    componentDidMount() {
      if (!this.props.owner || !this.props.product) {
        this.props.fetchProduct(this.props.match.params.id);
      }
    },
  }),
);

export default enhancer(Product);
