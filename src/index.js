import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { appOperations } from './modules/app';
import { viewerSelectors } from './modules/viewer';
import Router from './scenes/router';
import { store, persistor } from './store/store';

class App extends Component {
  constructor(props) {
    super(props);
    props.dispatch(appOperations.init());
  }

  render() {
    if (this.props.viewer) {
      return <Router />;
    }
    if (this.props.isLoading) {
      return <h1>Loading...</h1>;
    }
    return <Router />;
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.app.isLoading,
    viewer: viewerSelectors.getViewer(state),
  };
}

const AppConnected = connect(mapStateToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<h1>Loading...</h1>} persistor={persistor}>
      <AppConnected />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
