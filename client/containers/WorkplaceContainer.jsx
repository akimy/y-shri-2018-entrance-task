import React, { Component } from 'react';
import fetch from '../shared/apolloFetch';
import Workplace from '../components/Workplace';

class WorkplaceContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      floors: [],
      pointerXCord: null,
      hoveredRoomId: null,
    };

    this.handleTimelineClick = this.handleTimelineClick.bind(this);
    this.handleTimelineMouseIn = this.handleTimelineMouseIn.bind(this);
    this.handleTimelineMouseOut = this.handleTimelineMouseOut.bind(this);
    this.handleTimelineMouseMove = this.handleTimelineMouseMove.bind(this);
    this.morphRoomsToFloorsArray = this.morphRoomsToFloorsArray.bind(this);
  }

  componentWillMount() {
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

  morphRoomsToFloorsArray(rooms) {
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

  handleTimelineClick(date) {
    console.log(date);
  }

  render() {
    return (
      <Workplace
        {...this.state}
        {...this.props}
        handleTimelineMouseIn={this.handleTimelineMouseIn}
        handleTimelineMouseOut={this.handleTimelineMouseOut}
        handleTimelineMouseMove={this.handleTimelineMouseMove}
        handleTimelineClick={this.handleTimelineClick}
      />
    );
  }
}

export default WorkplaceContainer;
