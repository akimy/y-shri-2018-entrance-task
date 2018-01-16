import React from 'react';
import PropTypes from 'prop-types';
import './RoomsList.scss';

const RoomsList = ({ floors, hoveredRoomId }) => {
  const floorsJsx = floors.map(el => (
    <div key={el.floor} className="floor">
      <div className="floor__number">{`${el.floor} ЭТАЖ`}</div>
      {el.rooms.map(room => (
        <div key={room.id}>
          <div className={hoveredRoomId === room.id ? 'floor__room-title_hovered' :
          room.faded ? 'floor__room-title_faded' : 'floor__room-title'}
          >
            {room.title}
          </div>
          <div className={room.faded ? 'floor__room-capacity_faded' : 'floor__room-capacity'}>{`до ${room.capacity} человек`}</div>
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
  hoveredRoomId: PropTypes.string,
  floors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

RoomsList.defaultProps = {
  hoveredRoomId: null,
};

export default RoomsList;
