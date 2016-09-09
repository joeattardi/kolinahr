import React from 'react';
import { connect } from 'react-redux';

import Header from './components/Header';
import Footer from './components/Footer';
import Notification from './components/Notification';
import { getUser } from './actions';

class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.getUser();
    }
  }

  render() {
    return (
      <div id="container">
        <Header user={this.props.user} />
        <Notification />
        <div className="main-content">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  getUser: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { getUser })(App);
