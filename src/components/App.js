import React from 'react';

import './App.scss';
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