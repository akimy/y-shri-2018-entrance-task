import React, { Component } from 'react';
import Workplace from '../components/Workplace';

class WorkplaceContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      floors: [],
      rooms: [
        {
          title: 'Поле непаханное',
          floor: 2,
          id: 1,
          capacity: 8,
        },
        {
          title: 'Голубая луна',
          floor: 2,
          id: 2,
          capacity: 5,
        },
        {
          title: 'Сиреневая газель',
          floor: 5,
          id: 5,
          capacity: 2,
        },
        {
          title: 'Зеленая башня',
          floor: 5,
          id: 4,
          capacity: 4,
        },
        {
          title: 'Темная пещера',
          floor: 2,
          id: 3,
          capacity: 10,
        },
        {
          title: 'Мрачный механик',
          floor: 8,
          id: 6,
          capacity: 2,
        },
      ],
    };
    this.morphRoomsToFloorsArray = this.morphRoomsToFloorsArray.bind(this);
  }

  componentWillMount() {
    this.morphRoomsToFloorsArray(this.state.rooms);
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
      <Workplace {...this.state} />
    );
  }
}

export default WorkplaceContainer;
