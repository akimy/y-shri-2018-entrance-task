import React, { Component } from 'react';
import App from '../components/App';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCreated: false,
      summaryDialogOpened: false,
      summaryDialogContent: {},
      stage: {
        name: 'workplace',
        payload: {
          purpose: '',
          body: '',
        },
      },
    };

    this.handleEditMeeting = this.handleEditMeeting.bind(this);
    this.setModalCreatedContent = this.setModalCreatedContent.bind(this);
    this.closeSummaryDialog = this.closeSummaryDialog.bind(this);
    this.toggleSummaryDialog = this.toggleSummaryDialog.bind(this);
    this.toggleModalCreated = this.toggleModalCreated.bind(this);
    this.changeStageTo = this.changeStageTo.bind(this);
  }

  setModalCreatedContent(content) {
    this.setState(() => ({ modalCreatedContent: content.createEvent }), () => {
      this.toggleModalCreated();
    });
  }

  handleEditMeeting() {
    this.setState(() => ({ summaryDialogOpened: false }), () => {
      this.changeStageTo('createMeeting', {
        purpose: 'edit',
        body: this.state.summaryDialogContent,
      });
    });
  }


  toggleModalCreated() {
    this.setState(state => (state.modalCreated ? { modalCreated: false } : { modalCreated: true }));
  }

  changeStageTo(nextStageName, payload) {
    this.setState({ stage: { name: nextStageName, payload } });
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
        handleEditMeeting={this.handleEditMeeting}
        closeSummaryDialog={this.closeSummaryDialog}
        toggleModalCreated={this.toggleModalCreated}
        toggleSummaryDialog={this.toggleSummaryDialog}
        changeStageTo={this.changeStageTo}
        setModalCreatedContent={this.setModalCreatedContent}
      />
    );
  }
}

export default AppContainer;
