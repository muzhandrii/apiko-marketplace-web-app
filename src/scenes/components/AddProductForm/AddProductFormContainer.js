import { compose, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, generatePath } from 'react-router-dom';
import { routes } from '../../router';
import { productsOperations } from '../../../modules/products';
import { viewerSelectors } from '../../../modules/viewer';
import AddProductForm from './AddProductFormView';
import Api from '../../../api';

function mapStateToProps(state) {
  return {
    isLoading: state.products.addProduct.isLoading,
    viewer: viewerSelectors.getViewer(state),
  };
}

const mapDispatchToProps = {
  addProduct: productsOperations.addProduct,
};

const enhancer = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('isImageLoading', 'imageLoadingHandler', false),
  withHandlers({
    handleAddProduct: ({ addProduct, history, viewer }) => async (body) => {
      const data = {
        title: body.title.trim(),
        location: body.location.trim(),
        description: body.location.trim() && 'no description', // bug on server
        photos: body.photos,
        price: body.price.trim(),
      };
      if (viewer) {
        try {
          const resp = await addProduct(data);
          history.push(generatePath(routes.product, { id: resp.result }));
        } catch (err) {
          throw err;
        }
      } else {
        history.push({
          pathname: routes.register,
          state: { product: data },
        });
      }
    },
    handleImageLoader: ({ imageLoadingHandler }) => async (event) => {
      imageLoadingHandler(true);
      const file = event.target.files[0];
      const data = new FormData();
      data.append('image', file);
      try {
        const result = await Api.Images.upload(data);
        imageLoadingHandler(false);
        return result.data;
      } catch (error) {
        imageLoadingHandler(false);
      }
    },
  }),
);

export default enhancer(AddProductForm);
