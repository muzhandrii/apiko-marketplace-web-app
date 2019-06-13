import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import User from './UserView';
import { productsSelectors, productsOperations } from '../../modules/products';

function mapStateToProps(state, { match }) {
  return {
    seller: productsSelectors.getSeller(state, match.params.id),
    sellerFetching: state.products.seller.isLoading,
    productsFetching: state.products.seller.isLoading,
    products: productsSelectors.getSellerProducts(state, match.params.id),
  };
}

const mapDispatchToProps = {
  fetchSeller: productsOperations.fetchSeller,
  fetchSellerProducts: productsOperations.fetchSellerProducts,
};

const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      if (!this.props.seller) {
        this.props.fetchSeller(this.props.match.params.id);
      }
      this.props.fetchSellerProducts(this.props.match.params.id);
    },
  }),
);

export default enhancer(User);
