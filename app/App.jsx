import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Column from './components/Column';
import Title from './components/Title';

export default function App() {
  return (
    <div id="container">
      <Header />
      <div className="main-content">
        <Title />
        <div id="column-container">
          <Column stateKey="inputs" name="Inputs" />
          <Column stateKey="activities" name="Activities" />
          <Column stateKey="outputs" name="Outputs" />
          <Column stateKey="outcomes" name="Outcomes" />
          <Column stateKey="impact" name="Impact" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
