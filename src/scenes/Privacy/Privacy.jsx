import React from 'react';
import { Header, Footer } from '../../components';
import { SellLink } from '../components';

export default function Privacy() {
  return (
    <>
      <Header light>
        <SellLink />
      </Header>
      <div className="main">
        <h1>Privacy Policy</h1>
      </div>
      <Footer />
    </>
  );
}
