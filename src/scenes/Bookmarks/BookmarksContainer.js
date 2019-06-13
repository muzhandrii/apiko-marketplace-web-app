import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Bookmarks from './BookmarksView';
import { productsOperations, productsSelectors } from '../../modules/products';

function mapStateToProps(state) {
  return {
    savedList: productsSelectors.getSaved(state),
  };
}

const mapDispatchToProps = {
  fetchSaved: productsOperations.fetchSaved,
};

const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.fetchSaved();
    },
  }),
);

export default enhancer(Bookmarks);
