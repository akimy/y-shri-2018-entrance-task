import React, { Component } from 'react';
import fetch from '../shared/apolloFetch';
import Workplace from '../components/Workplace';

class WorkplaceContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      floors: [],
    };

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

  render() {
    return (
      <Workplace
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default WorkplaceContainer;
