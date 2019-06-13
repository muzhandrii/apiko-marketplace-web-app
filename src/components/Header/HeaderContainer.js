import { compose, withState, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './HeaderView';
import { viewerActions, viewerSelectors } from '../../modules/viewer';
import Api from '../../api';

function mapStateToProps(state) {
  return {
    viewer: viewerSelectors.getViewer(state),
  };
}

const mapDispatchToProps = {
  logout: viewerActions.logout,
};

const enhancer = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withState('isPopoverVisible', 'popoverToggle', false),
  withHandlers({
    handleLogout: (props) => () => {
      Api.Auth.logout();
      props.logout();
    },
    handlePopoverToggle: (props) => () => {
      props.popoverToggle(!props.isPopoverVisible);
    },
  }),
);

export default enhancer(Header);
