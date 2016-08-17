import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Header from './components/Header';
import Footer from './components/Footer';
import Column from './components/Column';
import Title from './components/Title';
import Canvas from './components/Canvas';

/* eslint-disable react/prefer-stateless-function */
class App extends React.Component {
  render() {
    return (
      <div id="container">
        <Header />
        <div className="main-content">
          <Title />
          <div id="column-container">
            <Column stateKey="inputs" name="Inputs" />
            <Canvas left="inputs" right="activities" />
            <Column stateKey="activities" name="Activities" />
            <Canvas left="activities" right="outputs" />
            <Column stateKey="outputs" name="Outputs" />
            <Canvas left="outputs" right="outcomes" />
            <Column stateKey="outcomes" name="Outcomes" />
            <Canvas left="outcomes" right="impact" />
            <Column stateKey="impact" name="Impact" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

/* eslint-disable new-cap */
export default DragDropContext(HTML5Backend)(App);
