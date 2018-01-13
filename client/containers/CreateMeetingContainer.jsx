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
      editingMode: false,
      modalDeleteConfirmationOpened: false,
      swapConfirmationOpened: false,
    };

    this.acceptEventEditing = this.acceptEventEditing.bind(this);
    this.closeSwapConfirmationModal = this.closeSwapConfirmationModal.bind(this);
    this.confirmEventsSwapAndCreate = this.confirmEventsSwapAndCreate.bind(this);
    this.showSwapConfirmationModal = this.showSwapConfirmationModal.bind(this);
    this.closeModalDeleteConfirmation = this.closeModalDeleteConfirmation.bind(this);
    this.acceptDeleting = this.acceptDeleting.bind(this);
    this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
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

    const { body, purpose } = this.props.stage.payload;
    if (purpose === 'createFromTimeline') {
      this.setState({
        date: new Date(body.date),
        timeStart: new Date(body.date),
        timeEnd: new Date((new Date(body.date)).getTime() + (60 * (60 * 1000))),
      });
    } else if (purpose === 'createNew') {
      this.setState({
        date: new Date(),
        timeStart: new Date(),
        timeEnd: new Date((new Date()).getTime() + (60 * (60 * 1000))),
      });
    } else if (purpose === 'edit') {
      this.setState({
        date: new Date(body.dateStart),
        timeStart: new Date(body.dateStart),
        timeEnd: new Date(body.dateEnd),
        theme: body.title,
        editingMode: true,
        selectedUsers: body.users,
        selectedRoom: {
          date: {
            start: new Date(body.dateStart).getTime(),
            end: new Date(body.dateEnd).getTime(),
          },
          room: body.room,
        },
      });
    }
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
          if (this.props.stage.payload.purpose === 'edit') {
            if (this.props.stage.payload.body.id === event.id) {
              return acc;
            }
          }
          if ((date.start > roomEventEnd) || (date.end < roomEventStart)) {
            return acc;
          }
          return false;
        }, true)));

      if (freeRooms.length === 0) { // If all rooms for time interval currently is busy
        const hashMap = {};
        let roomsAvailableViaSwap = roomsWithSufficientCapacity.filter((room, i, rooms) =>
          room.events.filter(event => !((date.start > new Date(event.dateEnd).getTime()) ||
         (date.end < new Date(event.dateStart).getTime())))
            .reduce((acc, event) => {
              const _start = new Date(event.dateStart).getTime();
              const _end = new Date(event.dateEnd).getTime();
              const usersCount = event.users.length;

              const targetsForSwap = rooms.filter(_room =>
                _room.capacity > usersCount).filter(_room =>
                _room.events.reduce((_acc, _event) => {
                  const _roomEventStart = new Date(_event.dateStart).getTime();
                  const _roomEventEnd = new Date(_event.dateEnd).getTime();
                  if ((_start > _roomEventEnd) || (_end < _roomEventStart)) {
                    return _acc;
                  }
                  return false;
                }, true));

              const optimizedSwapsList = targetsForSwap.sort((first, second) =>
                (this.countFloorSteps(first, event.users) >
                this.countFloorSteps(second, event.users) ? 1 : -1));

              if (optimizedSwapsList.length !== 0) {
                hashMap[room.id] = { roomId: optimizedSwapsList[0].id, eventId: event.id };
                return acc;
              }
              return false;
            }, true));

        roomsAvailableViaSwap = roomsAvailableViaSwap.map((el) => {
          Object.assign(el, { swap: { ...hashMap[el.id] } });
          return el;
        });

        if (roomsAvailableViaSwap.length !== 0) {
          roomsAvailableViaSwap.forEach((room) => {
            recommendations.push({
              date: { start: date.start, end: date.end },
              room,
              swap: room.swap,
            });
          });
        }
      } else {
        const sortedRooms = freeRooms.sort((first, second) =>
          (this.countFloorSteps(first, members) > this.countFloorSteps(second, members) ? 1 : -1));
        sortedRooms.forEach((room) => {
          recommendations.push({ date: { start: date.start, end: date.end }, room, swap: null });
        });
      }
    }

    this.setState(() => ({ recommendations }), () => {
      this.setState({ selectedRoom: null });
    });
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

  countFloorSteps(room, users) {
    return users.reduce((acc, user) => acc += Math.abs(user.homeFloor - room.floor), 0);
  }


  closeModalDeleteConfirmation() {
    this.setState({ modalDeleteConfirmationOpened: false });
  }

  acceptDeleting() {
    const variables = {
      id: this.props.stage.payload.body.id,
    };
    fetch({
      query: `
      mutation removeEditingEvent($id:ID!){
        removeEvent(id:$id){
          id
          title
        }
      }`,
      variables,
    }).then(() => {
      this.props.changeStageTo('workplace', '');
    });
  }

  showDeleteConfirmation() {
    this.setState({ modalDeleteConfirmationOpened: true });
  }

  showError(message) {
    this.setState({ error: message });
  }

  tryToGetRecommendation() {
    const {
      selectedUsers,
      timeStart,
      timeEnd,
      date,
    } = this.state;

    // There's at least one selected user & 15 min interval before start and end of the meeting
    if ((selectedUsers.length !== 0) &&
    (((timeEnd.getTime() - timeStart.getTime()) > 9e5))) {
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
                homeFloor
              }
              room {
                id
                capacity
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
      this.setState(() => ({ selectedRoom: null }), () => {
        this.setState({ recommendations: [] });
      });
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

  showSwapConfirmationModal(swapData) {
    this.setState(() => ({ swapData }), () => {
      this.setState({ swapConfirmationOpened: true });
    });
  }

  closeSwapConfirmationModal() {
    this.setState({ swapConfirmationOpened: false });
  }

  confirmEventsSwapAndCreate() {
    const { eventId, roomId } = this.state.selectedRoom.swap;
    const variables = {
      eventId,
      roomId,
    };
    fetch({
      query: `
      mutation MoveEvent($eventId: ID!,$roomId:ID!) {
        changeEventRoom(id:$eventId, roomId:$roomId) {
          id
        }
      }`,
      variables,
    }).then(() => {
      this.setState((state) => {
        const { selectedRoom } = state;
        selectedRoom.swap = null;
        return { selectedRoom };
      }, () => {
        this.acceptCreating();
      });
    });
  }

  cancelSelectedRoom() {
    this.setState(() => ({ selectedRoom: null }), () => {
      this.tryToGetRecommendation();
    });
  }

  acceptCreating() {
    const { selectedRoom, theme, selectedUsers } = this.state;
    if (selectedRoom.swap) {
      fetch({
        query: `{
          event(id:${selectedRoom.swap.eventId}) {
            title
            users {
              login
            }
            room {
              title
            }
          }
          room(id:${selectedRoom.swap.roomId}) {
            title
          }
        }`,
      }).then((res) => {
        this.showSwapConfirmationModal(res.data);
      });
    } else if (selectedRoom && theme && !selectedRoom.swap) {
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
        this.props.toggleModalCreated();
        this.props.changeStageTo('workplace', '');
      });
    }
  }

  acceptEventEditing() {
    const { selectedRoom, theme } = this.state;
    if (selectedRoom && theme) {
      const variables = {
        input: {
          title: theme,
          dateStart: new Date(selectedRoom.date.start),
          dateEnd: new Date(selectedRoom.date.end),
        },
        id: this.props.stage.payload.body.id,
      };
      fetch({
        query: `
        mutation UpdateEvent($input: EventInput!, $id:ID!) {
          updateEvent(input:$input, id:$id) {
            id
          }
        }`,
        variables,
      }).then(() => {
        this.props.changeStageTo('workplace', '');
      });
    }
  }

  selectingMembersTurningOn() {
    this.filterUsers('');
    this.setState({ selectingMembers: true });
  }

  declineCreating() {
    this.props.changeStageTo('workplace', '');
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
        if (this.state.selectedRoom) {
          if (this.state.selectedRoom.room.capacity < this.state.selectedUsers.length) {
            this.tryToGetRecommendation();
          }
        } else {
          this.tryToGetRecommendation();
        }
      });
    });
  }

  render() {
    return (
      <CreateMeeting
        {...this.state}
        listRef={el => this.listElement = el}
        purpose={this.props.stage.payload.purpose}
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
        closeModalDeleteConfirmation={this.closeModalDeleteConfirmation}
        acceptDeleting={this.acceptDeleting}
        showDeleteConfirmation={this.showDeleteConfirmation}
        closeSwapConfirmationModal={this.closeSwapConfirmationModal}
        confirmEventsSwapAndCreate={this.confirmEventsSwapAndCreate}
        acceptEventEditing={this.acceptEventEditing}
      />
    );
  }
}

CreateMeetingContainer.propTypes = {
  changeStageTo: PropTypes.func.isRequired,
  toggleModalCreated: PropTypes.func.isRequired,
  stage: PropTypes.objectOf(PropTypes.any).isRequired,
  setModalCreatedContent: PropTypes.func.isRequired,
};

export default CreateMeetingContainer;
