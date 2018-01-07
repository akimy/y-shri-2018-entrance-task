import React, { Component } from 'react';
import App from '../components/App';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCreated: false,
      stage: 'workplace',
    };

    this.toggleModalCreated = this.toggleModalCreated.bind(this);
    this.changeStageTo = this.changeStageTo.bind(this);
  }

  toggleModalCreated() {
    this.setState(state => (state.modalCreated ? { modalCreated: false } : { modalCreated: true }));
  }

  changeStageTo(nextStage) {
    this.setState({ stage: nextStage });
  }

  render() {
    return (
      <App
        {...this.state}
        toggleModalCreated={this.toggleModalCreated}
        changeStageTo={this.changeStageTo}
      />
    );
  }
}

export default AppContainer;
