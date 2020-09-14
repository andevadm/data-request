import React from 'react';

import '../styles/App.scss';
import Header from './Header';
import Footer from './Footer';
import DataContainer from './DataContainer';

export default function App() {
  return (
    <div className="App">
      <Header />
      <DataContainer />
      <Footer />
    </div>
  );
}