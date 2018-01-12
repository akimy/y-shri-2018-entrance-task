import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateMeeting from '../components/CreateMeeting';
import fetch from '../shared/apolloFetch';

class CreateMeetingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      timeStart: '',
      timeEnd: '',
      selectingMembers: false,
      selectedUsers: [],
      filteredUsers: [],
      recommendedRooms: [],
      selectedRoom: null,
      theme: '',
      userSearchInput: '',
    };

    this.getRecommendation = this.getRecommendation.bind(this);
    this.tryToGetRecommendation = this.tryToGetRecommendation.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setTimeStart = this.setTimeStart.bind(this);
    this.setTimeEnd = this.setTimeEnd.bind(this);
    this.cancelSelectedRoom = this.cancelSelectedRoom.bind(this);
    this.selectRoom = this.selectRoom.bind(this);
    this.handleFocusList = this.handleFocusList.bind(this);
    this.handleChangeTheme = this.handleChangeTheme.bind(this);
    this.addUserToSelected = this.addUserToSelected.bind(this);
    this.removeUserFromSelected = this.removeUserFromSelected.bind(this);
    this.filterUsers = this.filterUsers.bind(this);
    this.selectingMembersTurningOff = this.selectingMembersTurningOff.bind(this);
    this.selectingMembersTurningOn = this.selectingMembersTurningOn.bind(this);
    this.declineCreating = this.declineCreating.bind(this);
    this.acceptCreating = this.acceptCreating.bind(this);
  }

  componentWillMount() {
    fetch({
      query: `{
        users {
          id
          login
          avatarUrl
          homeFloor
        }
      }`,
    }).then((res) => {
      this.setState({ users: res.data.users });
    });

    this.setState({
      date: new Date(),
      timeStart: new Date(),
      timeEnd: new Date((new Date()).getTime() + (60 * (60 * 1000))),
    });
  }

  /**
 * @param {EventDate} date Дата планируемой встречи.
 * @param {Person[]} members Участники планируемой встречи.
 * @param {Object} db
 * @param {Event[]} db.events Список все встреч.
 * @param {Room[]} db.rooms Список всех переговорок.
 * @returns {Recommendation[]}
 */

  getRecommendation() {
    console.log('RECCOMENDATION');
  }

  setDate(date) {
    this.setState(() => ({ date }), () => {
      this.tryToGetRecommendation();
    });
  }

  setTimeStart(timeStart) {
    this.setState(() => ({ timeStart }), () => {
      this.tryToGetRecommendation();
    });
  }

  setTimeEnd(timeEnd) {
    this.setState(() => ({ timeEnd }), () => {
      this.tryToGetRecommendation();
    });
  }

  tryToGetRecommendation() {
    const { selectedUsers, timeStart, timeEnd } = this.state;
    if ((selectedUsers.length !== 0) &&
    (((timeEnd.getHours() - timeStart.getHours()) > 0))) {
      this.getRecommendation();
    }
  }

  selectingMembersTurningOff() {
    this.setState({ selectingMembers: false });
  }

  handleChangeTheme(value) {
    this.setState({ theme: value });
  }

  handleFocusList() {
    this.listElement.firstChild.focus();
  }

  selectRoom(room) {
    this.setState({ selectedRoom: room });
  }

  cancelSelectedRoom() {
    this.setState({ selectedRoom: null });
  }

  acceptCreating() {
    if (this.state.selectedRoom) {
      this.props.toggleModalCreated();
      this.props.changeStageTo('workplace');
    }
  }

  selectingMembersTurningOn() {
    this.filterUsers('');
    this.setState({ selectingMembers: true });
  }

  declineCreating() {
    this.props.changeStageTo('workplace');
  }

  filterUsers(value) {
    this.setState(() => ({ userSearchInput: value }), () => {
      const filtered = this.state.users
        .filter(user => user.login.match(new RegExp(value, 'i')))
        .filter(matched => this.state.selectedUsers
          .filter(selected => selected.id === matched.id).length === 0)
        .sort((a, b) => (a.login > b.login ? 1 : -1));

      this.setState({ filteredUsers: filtered });
    });
  }

  removeUserFromSelected(id) {
    const selected = this.state.selectedUsers.filter(user => user.id !== id);
    this.setState(() => ({ selectedUsers: selected }), () => {
      this.tryToGetRecommendation();
    });
  }

  addUserToSelected(user) {
    this.setState(state => ({ selectedUsers: state.selectedUsers.concat([user]) }), () => {
      this.setState(() => ({ selectingMembers: false, userSearchInput: '' }), () => {
        this.tryToGetRecommendation();
      });
    });
  }

  render() {
    return (
      <CreateMeeting
        listRef={el => this.listElement = el}
        {...this.state}
        declineCreating={this.declineCreating}
        acceptCreating={this.acceptCreating}
        selectingMembersTurningOn={this.selectingMembersTurningOn}
        selectingMembersTurningOff={this.selectingMembersTurningOff}
        filterUsers={this.filterUsers}
        addUserToSelected={this.addUserToSelected}
        removeUserFromSelected={this.removeUserFromSelected}
        handleChangeTheme={this.handleChangeTheme}
        handleFocusList={this.handleFocusList}
        selectRoom={this.selectRoom}
        cancelSelectedRoom={this.cancelSelectedRoom}
        setDate={this.setDate}
        setTimeStart={this.setTimeStart}
        setTimeEnd={this.setTimeEnd}
      />
    );
  }
}

CreateMeetingContainer.propTypes = {
  changeStageTo: PropTypes.func.isRequired,
  toggleModalCreated: PropTypes.func.isRequired,
};

export default CreateMeetingContainer;

