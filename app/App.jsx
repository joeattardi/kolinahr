import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Column from './components/Column';
import Title from './components/Title';

export default class App extends React.Component {
  render() {
    return (
      <div id="container">
        <Header />
        <div className="main-content">
          <Title title="Logic Model for Fedora Server Planning (Flock 2016)" />
          <div id="column-container">
            <Column name="Inputs" /> 
            <Column name="Activities" /> 
            <Column name="Outputs" /> 
            <Column name="Outcomes" /> 
            <Column name="Impact" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
