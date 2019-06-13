import React from 'react';
import { Switch, Route } from 'react-router-dom';
import T from 'prop-types';
import { Header, Footer, SearchBox } from '../../components';
import { routes } from '../router';
import { SellLink, InboxLink } from '../components';
import s from './Home.module.scss';
import LatestList from '../LatestList/LatestListContainer';
import Product from '../Product/ProductContainer';
import User from '../User/UserContainer';
import Search from '../Search/Search';
import Bookmarks from '../Bookmarks/BookmarksContainer';

function Home({ viewer }) {
  return (
    <>
      <Header light={false}>
        {viewer && <InboxLink />}
        <SellLink />
        <SearchBox />
      </Header>
      <div className={s.container}>
        <Switch>
          <Route exact path={routes.home} component={LatestList} />
          <Route exact path={routes.product} component={Product} />
          <Route exact path={routes.bookmarks} component={Bookmarks} />
          <Route path={routes.user} component={User} />
          <Route path={routes.search} component={Search} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

Home.propTypes = {
  viewer: T.object,
};

Home.defaultProps = {
  viewer: false,
};

export default Home;
