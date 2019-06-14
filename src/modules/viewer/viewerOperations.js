import { normalize } from 'normalizr';
import * as actions from './viewerActions';
import Api, { schemas } from '../../api';
import { viewerServices } from '.';

export function fetchViewer() {
  return async function fetchViewerThunk(dispatch) {
    try {
      dispatch(actions.fetchViewer.start());

      const result = await Api.Viewer.get();
      const viewer = viewerServices.avatarColorSetter(result.data);
      const { entities } = normalize(viewer, schemas.user);

      dispatch(actions.fetchViewer.success({ viewer, entities }));
    } catch (err) {
      dispatch(actions.fetchViewer.error(err));
    }
  };
}
