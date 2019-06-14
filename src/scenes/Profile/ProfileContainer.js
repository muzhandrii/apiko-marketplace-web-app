import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Profile from './ProfileView';
import { viewerSelectors } from '../../modules/viewer';

function mapStateToProps(state) {
  return {
    viewer: viewerSelectors.getViewer(state),
  };
}

const enhancer = compose(
  withRouter,
  connect(mapStateToProps),
);

export default enhancer(Profile);
