import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

export default function App(props) {
  return (
    <div id="container">
      <Header />
      <div className="main-content">
        {props.children}
      </div>
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.object.isRequired
};
