import { compose, withState, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Profile from './ProfileView';
import { viewerActions, viewerSelectors } from '../../modules/viewer';
import Api from '../../api';

function mapStateToProps(state) {
  return {
    viewer: viewerSelectors.getViewer(state),
  };
}
// TODO: finish
// const mapDispatchToProps = {
// };

const enhancer = compose(
  withRouter,
  connect(
    mapStateToProps,
    // mapDispatchToProps,
  ),
);

export default enhancer(Profile);
