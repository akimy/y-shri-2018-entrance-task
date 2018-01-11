import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateMeeting from '../components/CreateMeeting';
import fetch from '../shared/apolloFetch';

class CreateMeetingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      theme: '',
      error: '',
      timeEnd: '',
      timeStart: '',
      selectedUsers: [],
      filteredUsers: [],
      selectedRoom: null,
      userSearchInput: '',
      recommendations: [],
      selectingMembers: false,
    };

    this.countFloorSteps = this.countFloorSteps.bind(this);
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
 * @param {EventDate} date Date of planning meeting
 * @param {Person[]} members Members of meeting.
 * @param {Object} db Database fetch data (rooms with relations)
 * @returns {Recommendation[]} Rooms
 */
  getRecommendation(date, members, db) {
    const recommendations = [];
    const roomsWithSufficientCapacity = db.rooms.filter(room => room.capacity >= members.length);
    if (roomsWithSufficientCapacity.length === 0) {
      this.showError('У нас не существует комнат с достаточным количеством мест для вашей компании');
    } else {
      const freeRooms = roomsWithSufficientCapacity.filter(room =>
        (room.events.length === 0 ? true : room.events.reduce((acc, event) => {
          const roomEventStart = new Date(event.dateStart).getTime();
          const roomEventEnd = new Date(event.dateEnd).getTime();
          if ((date.start > roomEventEnd) || (date.end < roomEventStart)) {
            return acc;
          }
          return false;
        }, true)));
      if (freeRooms.length === 0) { // All rooms currently is busy

      } else {
        const sortedRooms = freeRooms.sort((first, second) =>
          (this.countFloorSteps(first, members) > this.countFloorSteps(second, members) ? 1 : -1));
        sortedRooms.splice(0, 3).forEach((room) => {
          recommendations.push({ date: { start: date.start, end: date.end }, room, swap: null });
        });
      }
    }

    this.setState({ recommendations });
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

  showError(message) {
    this.setState({ error: message });
  }

  countFloorSteps(room, users) {
    return users.reduce((acc, user) => acc += Math.abs(user.homeFloor - room.floor), 0);
  }

  tryToGetRecommendation() {
    this.cancelSelectedRoom();
    const {
      selectedUsers, timeStart, timeEnd, date,
    } = this.state;
    if ((selectedUsers.length !== 0) &&
    (((timeEnd.getHours() - timeStart.getHours()) > 0))) {
      fetch({
        query: `{
          rooms {
            id
            title
            capacity
            floor
            events {
              id
              title
              dateStart
              dateEnd
              users {
                id
              }
              room {
                id
              }
            }
          }
        }`,
      }).then((db) => {
        let timestampDate = date;
        timestampDate.setHours(0);
        timestampDate.setMinutes(0);
        timestampDate.setSeconds(0);
        timestampDate = timestampDate.getTime();

        let timestampStart = new Date(timeStart);
        timestampStart = timestampStart.getHours() * 60 * 60 * 1000
        + timestampStart.getMinutes() * 60 * 1000 + timestampStart.getSeconds() * 1000;

        let timestampEnd = new Date(timeEnd);
        timestampEnd = timestampEnd.getHours() * 60 * 60 * 1000
        + timestampEnd.getMinutes() * 60 * 1000 + timestampEnd.getSeconds() * 1000;

        const eventDate = {
          start: timestampDate + timestampStart,
          end: timestampDate + timestampEnd,
        };

        this.getRecommendation(eventDate, selectedUsers, db.data);
      });
    } else {
      this.setState({ recommendations: [] });
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

  selectRoom(recommendation) {
    this.setState({ selectedRoom: recommendation });
  }

  cancelSelectedRoom() {
    this.setState({ selectedRoom: null });
  }

  acceptCreating() {
    const { selectedRoom, theme, selectedUsers } = this.state;
    if (selectedRoom) {
      if (theme) {
        const usersIds = selectedUsers.map(el => Number(el.id));
        const roomId = Number(selectedRoom.room.id);
        const variables = {
          input: {
            title: theme,
            dateStart: new Date(selectedRoom.date.start),
            dateEnd: new Date(selectedRoom.date.end),
          },
          usersIds,
          roomId,
        };
        fetch({
          query: `
          mutation CreateEvent($input:EventInput!, $usersIds:[ID], $roomId:ID!) {
            createEvent(input:$input, usersIds:$usersIds, roomId:$roomId) {
              dateStart
              dateEnd
              room {
                title
                floor
              }
            }
          }`,
          variables,
        }).then((res) => {
          this.props.setModalCreatedContent(res.data);
        });
        this.props.toggleModalCreated();
        this.props.changeStageTo('workplace');
      } else {
        this.showError('Заполните поле "Тема"');
      }
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

