import React, { Component } from 'react';
import App from '../components/App';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCreated: false,
      summaryDialogOpened: false,
      summaryDialogContent: {},
      stage: 'workplace',
    };

    this.closeSummaryDialog = this.closeSummaryDialog.bind(this);
    this.toggleSummaryDialog = this.toggleSummaryDialog.bind(this);
    this.toggleModalCreated = this.toggleModalCreated.bind(this);
    this.changeStageTo = this.changeStageTo.bind(this);
  }

  toggleModalCreated() {
    this.setState(state => (state.modalCreated ? { modalCreated: false } : { modalCreated: true }));
  }

  changeStageTo(nextStage) {
    this.setState({ stage: nextStage });
  }

  toggleSummaryDialog(coords, event) {
    this.setState(() => ({ summaryDialogContent: event, summaryDialogCoords: coords }), () => {
      this.setState({ summaryDialogOpened: true });
    });
  }

  closeSummaryDialog() {
    this.setState({ summaryDialogOpened: false });
  }

  render() {
    return (
      <App
        {...this.state}
        closeSummaryDialog={this.closeSummaryDialog}
        toggleModalCreated={this.toggleModalCreated}
        toggleSummaryDialog={this.toggleSummaryDialog}
        changeStageTo={this.changeStageTo}
      />
    );
  }
}

export default AppContainer;
