import React, { Component } from 'react';

class EditMeetingContainer extends Component {
  constructor() {
    super();

    this.state = {
      some: 'Редактирование встречи',
    };
  }
  render() {
    return (
      <div>
        {this.state.some}
      </div>
    );
  }
}

export default EditMeetingContainer;

