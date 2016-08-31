import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Notification from './components/Notification';

export default function App(props) {
  return (
    <div id="container">
      <Header />
      <Notification />
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
