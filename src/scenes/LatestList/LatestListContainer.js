import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import LatestList from './LatestListView';
import { productsOperations, productsSelectors } from '../../modules/products';

function mapStateToProps(state) {
  return {
    list: productsSelectors.getLatest(state),
    isLoading: state.products.latest.isLoading,
  };
}

const mapDispatchToProps = {
  fetchLatest: productsOperations.fetchLatest,
};

const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchLatest();
    },
  }),
);

export default enhancer(LatestList);
