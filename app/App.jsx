import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import SaveButton from './components/SaveButton';
import Header from './components/Header';
import Footer from './components/Footer';
import Column from './components/Column';
import Title from './components/Title';
import Canvas from './components/Canvas';
import ErrorBanner from './components/ErrorBanner';
import EmptyBanner from './components/EmptyBanner';

class App extends React.Component {
  render() {
    return (
      <div id="container">
        <Header />
        <div className="main-content">
          <div id="title-area">
            <Title />
            <SaveButton />
          </div>
          <ErrorBanner />
          <EmptyBanner />
          <div id="column-container">
            <Column stateKey="inputs" name="Inputs" linkKey="activities" />
            <Canvas left="inputs" right="activities" />
            <Column stateKey="activities" name="Activities" linkKey="outputs" />
            <Canvas left="activities" right="outputs" />
            <Column stateKey="outputs" name="Outputs" linkKey="outcomes" />
            <Canvas left="outputs" right="outcomes" />
            <Column stateKey="outcomes" name="Outcomes" linkKey="impact" />
            <Canvas left="outcomes" right="impact" />
            <Column stateKey="impact" name="Impact" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
