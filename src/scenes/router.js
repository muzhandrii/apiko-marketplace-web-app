import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import Home from './Home/HomeContainer';
import NotFound from './NotFound/NotFound';
import Auth from './Auth/Auth';
import Privacy from './Privacy/Privacy';
import Inbox from './Inbox/InboxContainer';
import Bookmarks from './Bookmarks/BookmarksView';
import Profile from './Profile/ProfileContainer';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import AddProduct from './AddProduct/AddProduct';
import AddProductModal from './AddProductModal/AddProductModal';

export const routes = {
  home: '/',
  auth: '/auth',
  login: '/auth/login',
  register: '/auth/register',
  passwordRestore: '/auth/recover',
  privacy: '/privacy',
  inbox: '/inbox',
  bookmarks: '/bookmarks',
  profile: '/profile',
  search: '/search',
  user: '/users/:id',
  product: '/listings/:id', // bug with modal gallery
  chat: '/inbox/:id',
  addProduct: '/products/new',
};

class ModalSwitch extends Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );
    return (
      <>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route
            exact
            path="/(users/.+|listings/.+|search/.+|bookmarks)?"
            component={Home}
          />
          <Route path={routes.auth} component={Auth} />
          <Route path={routes.privacy} component={Privacy} />
          <PrivateRoute path={routes.profile} component={Profile} />
          <PrivateRoute path={routes.bookmarks} component={Bookmarks} />
          <PrivateRoute path={routes.inbox} component={Inbox} />
          <Route path={routes.addProduct} component={AddProduct} />
          <Route component={NotFound} />
        </Switch>
        {isModal ? (
          <Route path={routes.AddProduct} component={AddProductModal} />
        ) : null}
      </>
    );
  }
}

function Router() {
  return (
    <BrowserRouter>
      <Route component={ModalSwitch} />
    </BrowserRouter>
  );
}

export default Router;
