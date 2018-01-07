import React from 'react';
import PropTypes from 'prop-types';
import './RoomsList.scss';

const RoomsList = ({ floors }) => {
  const floorsJsx = floors.map(el => (
    <div key={el.floor} className="floor">
      <div className="floor__number">{`${el.floor} ЭТАЖ`}</div>
      {el.rooms.map(room => (
        <div key={room.id}>
          <div className="floor__room-title">{room.title}</div>
          <div className="floor__room-capacity">{`до ${room.capacity} человек`}</div>
        </div>))}
    </div>
  ));
  return (
    <div className="rooms-list">
      {floorsJsx}
    </div>
  );
};

RoomsList.propTypes = {
  floors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RoomsList;
