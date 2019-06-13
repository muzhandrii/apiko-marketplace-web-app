import { handleActions, combineActions } from '@letapp/redux-actions';
import * as actions from './viewerActions';
import { authActions } from '../auth';

const INITIAL_STATE = {
  fetchViewer: { isLoading: false, error: null, isError: false },
  user: null,
};

export default handleActions(
  {
    [actions.fetchViewer.start]: (state) => ({
      ...state,
      fetchViewer: {
        ...state.fetchViewer,
        isLoading: true,
        error: null,
        isError: false,
      },
    }),
    [combineActions(
      actions.fetchViewer.success,
      authActions.login.success,
      authActions.register.success,
    )]: (state, action) => ({
      ...state,
      fetchViewer: { ...state.fetchViewer, isLoading: false },
      user: action.payload.viewer,
    }),
    [actions.fetchViewer.error]: (state, action) => ({
      ...state,
      fetchViewer: {
        ...state.fetchViewer,
        isLoading: false,
        error: action.payload,
        isError: true,
      },
    }),
    [actions.logout]: (state) => ({
      ...state,
      user: null,
    }),
  },
  INITIAL_STATE,
);
