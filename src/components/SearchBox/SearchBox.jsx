import React from 'react';
import cn from 'classnames';
import s from './SearchBox.module.scss';
import { Button } from '../../atoms';

function SearchBox() {
  return (
    <div className={s.searchBox}>
      <div className={s.inputWrap}>
        <img
          src="/images/icons/search.svg"
          className={s.search__img}
          alt="search"
        />
        <input
          type="text"
          placeholder="Search products by name"
          className={cn(s.search, s.input)}
        />
      </div>
      <div className={s.inputWrap}>
        <img
          src="/images/icons/location.svg"
          className={s.location__img}
          alt="location"
        />
        <input
          type="text"
          placeholder="Location"
          className={cn(s.location, s.input)}
        />
      </div>
      <Button primaryClass="search-btn">SEARCH</Button>
    </div>
  );
}

export default SearchBox;
