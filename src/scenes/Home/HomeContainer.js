import { connect } from 'react-redux';
import Home from './HomeView';
import { viewerSelectors } from '../../modules/viewer';

function mapStateToProps(state) {
  return {
    viewer: viewerSelectors.getViewer(state),
  };
}

const enhancer = connect(mapStateToProps);

export default enhancer(Home);
