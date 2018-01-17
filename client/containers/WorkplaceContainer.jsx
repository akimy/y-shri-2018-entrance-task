import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetch from '../shared/apolloFetch';
import Workplace from '../components/Workplace';

class WorkplaceContainer extends Component {
  constructor() {
    super();
    this.state = {
      floors: [],
      pointerXCord: null,
      hoveredRoomId: null,
    };

    this.calculateDays = this.calculateDays.bind(this);
    this.mapFadedRooms = this.mapFadedRooms.bind(this);
    this.setCalendarDate = this.setCalendarDate.bind(this);
    this.handleTimelineClick = this.handleTimelineClick.bind(this);
    this.handleTimelineMouseIn = this.handleTimelineMouseIn.bind(this);
    this.handleTimelineMouseOut = this.handleTimelineMouseOut.bind(this);
    this.handleTimelineMouseMove = this.handleTimelineMouseMove.bind(this);
    this.morphRoomsToFloorsArray = this.morphRoomsToFloorsArray.bind(this);
    this.handleCalendarLeftArrowClick = this.handleCalendarLeftArrowClick.bind(this);
    this.handleCalendarRightArrowClick = this.handleCalendarRightArrowClick.bind(this);
  }

  componentWillMount() {
    this.setState({ calendarDate: new Date() });

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
            room {
              title
              capacity,
              floor,
              id
            }
            users {
              id
              login
              avatarUrl
            }
          }
        }
      }`,
    }).then((res) => {
      this.setState(() => ({ rooms: res.data.rooms }));
      this.morphRoomsToFloorsArray(res.data.rooms);
    });
  }

  setCalendarDate(calendarDate) {
    this.setState(() => ({ calendarDate }), () => {
      this.morphRoomsToFloorsArray(this.state.rooms);
    });
  }

  /** Function for translate Date object to count of the days
   * @argument {Date} date dateObject
   * @returns {Number} count of days
  */
  calculateDays(date) {
    return (date.getDate() + date.getMonth() + date.getFullYear());
  }

  /** Function function that fade the room label
   * @argument {Object} rooms rooms with associated events
   * @returns {Promise} rooms list with bool property 'faded'
   */
  mapFadedRooms(rooms) {
    const { calendarDate } = this.state;
    const currentDate = new Date();

    return new Promise((resolve) => {
      const roomsWithFaded = rooms.map((room) => {
        if (this.calculateDays(calendarDate) < this.calculateDays(currentDate)) {
          Object.assign(room, { faded: true });
        } else if (this.calculateDays(calendarDate) === this.calculateDays(currentDate)) {
          const currentEvents = room.events.filter((event) => {
            const roomEventStart = new Date(event.dateStart).getTime();
            const roomEventEnd = new Date(event.dateEnd).getTime();
            return !((new Date().getTime() > roomEventEnd) ||
            (new Date(new Date().setHours(23)).getTime() < roomEventStart));
          });

          let faded = false;
          let cur = new Date().getTime() + 1000 * 60 * 5;
          const curArr = [];

          if (currentEvents.length) {
            while (cur < new Date(new Date().setHours(23)).getTime()) {
              curArr.push(cur);
              cur += 1000 * 60 * 60;
            }

            faded = curArr.reduce((acc, el) => {
              if (!acc) {
                return acc;
              }
              const temp2 = currentEvents.reduce((_acc, event) => {
                const roomEventStart = new Date(event.dateStart).getTime();
                const roomEventEnd = new Date(event.dateEnd).getTime();
                if (!((el > roomEventEnd) || ((el + 1000 * 60 * 60) < roomEventStart))) {
                  //  Segment intersection appear!
                  return true;
                }
                return _acc;
              }, false);
              return temp2;
            }, true);
          }

          Object.assign(room, { faded });
        } else {
          Object.assign(room, { faded: false });
        }
        return room;
      });

      resolve(roomsWithFaded);
    });
  }

  /**
   * Function for transform data structure from rooms list to floors with nested relative rooms
   * @param {rooms[]} roomsWithoutFaded rooms list from CWM lifecycle method
   */
  morphRoomsToFloorsArray(roomsWithoutFaded) {
    this.mapFadedRooms(roomsWithoutFaded).then((rooms) => {
      const roomsSorted = rooms.sort((first, second) =>
        (first.floor > second.floor ? -1 : 1));

      const floors = [];
      let currentFloor = null;
      let temp = {};

      roomsSorted.forEach((room, index, arr) => {
        if (index === 0) {
          currentFloor = room.floor;
          temp = { floor: room.floor, rooms: Array(room) };
        } else if (currentFloor === room.floor) {
          temp.rooms.push(room);
        } else {
          floors.push(temp);
          currentFloor = room.floor;
          temp = { floor: room.floor, rooms: Array(room) };
        }
        if (index === (arr.length - 1)) {
          floors.push(temp);
        }
      });

      this.setState({ floors });
    });
  }

  handleTimelineMouseIn(roomId) {
    this.setState({ hoveredRoomId: roomId });
  }

  handleTimelineMouseOut() {
    this.setState({ hoveredRoomId: null });
  }

  handleTimelineMouseMove(xCord) {
    this.setState({ pointerXCord: (xCord - 245) });
  }

  handleTimelineClick(date, room) {
    this.props.changeStageTo('createMeeting', {
      purpose: 'createFromTimeline',
      body: { date, room },
    });
  }

  handleCalendarLeftArrowClick() {
    this.setState(state => ({
      calendarDate: new Date((state.calendarDate).getTime()
      - 1000 * 60 * 60 * 24),
    }), () => {
      this.morphRoomsToFloorsArray(this.state.rooms);
    });
  }

  handleCalendarRightArrowClick() {
    this.setState(state => ({
      calendarDate: new Date((state.calendarDate).getTime()
      + 1000 * 60 * 60 * 24),
    }), () => {
      this.morphRoomsToFloorsArray(this.state.rooms);
    });
  }

  render() {
    return (
      <Workplace
        {...this.state}
        {...this.props}
        setCalendarDate={this.setCalendarDate}
        handleTimelineMouseIn={this.handleTimelineMouseIn}
        handleTimelineMouseOut={this.handleTimelineMouseOut}
        handleTimelineMouseMove={this.handleTimelineMouseMove}
        handleTimelineClick={this.handleTimelineClick}
        handleCalendarLabelClick={this.handleCalendarLabelClick}
        handleCalendarLeftArrowClick={this.handleCalendarLeftArrowClick}
        handleCalendarRightArrowClick={this.handleCalendarRightArrowClick}
      />
    );
  }
}

WorkplaceContainer.propTypes = {
  changeStageTo: PropTypes.func.isRequired,
};

export default WorkplaceContainer;
