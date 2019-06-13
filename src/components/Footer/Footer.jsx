import React from 'react';
import { Link } from 'react-router-dom';
import s from './Footer.module.scss';
import { routes } from '../../scenes/router';

function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.content}>
        <span>Copyright</span>
        <span>&#9400;</span>
        <span>2017.</span>
        <Link className={s.link} to={routes.privacy}>
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
