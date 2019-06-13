import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { Provider, connect } from 'react-redux';
import { appOperations } from './modules/app';
import Router from './scenes/router';
import store from './store/store';

class App extends Component {
  constructor(props) {
    super(props);
    props.dispatch(appOperations.init());
  }

  render() {
    if (this.props.isLoading) {
      return <h1>Loading...</h1>;
    }
    return <Router />;
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.app.isLoading,
  };
}

const AppConnected = connect(mapStateToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <AppConnected />
  </Provider>,
  document.getElementById('root'),
);
