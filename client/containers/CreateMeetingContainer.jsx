import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateMeeting from '../components/CreateMeeting';

class CreateMeetingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: 'Создание встречи',
    };

    this.declineCreating = this.declineCreating.bind(this);
    this.acceptCreating = this.acceptCreating.bind(this);
  }

  declineCreating() {
    this.props.changeStageTo('workplace');
  }

  acceptCreating() {
    console.info('accepting');
  }

  render() {
    return (
      <CreateMeeting
        {...this.state}
        declineCreating={this.declineCreating}
        acceptCreating={this.acceptCreating}
      />
    );
  }
}

CreateMeetingContainer.propTypes = {
  changeStageTo: PropTypes.func.isRequired,
};

export default CreateMeetingContainer;

