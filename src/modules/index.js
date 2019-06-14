import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import app from './app';
import auth from './auth';
import viewer from './viewer';
import products from './products';
import entities from './entities';
import chats from './chats';
import messages from './messages';

const viewerPersistConfig = {
  key: 'viewer',
  storage,
  blacklist: ['fetchViewer'],
};

export default combineReducers({
  app,
  viewer: persistReducer(viewerPersistConfig, viewer),
  auth,
  products,
  entities,
  chats,
  messages,
});
