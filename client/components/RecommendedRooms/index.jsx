import React from 'react';
import PropTypes from 'prop-types';
import './RecommendedRooms.scss';

const RecommendedRooms = (props) => {
  const roomsJsx = props.rooms.map(room => (
    <div
      tabIndex="0"
      role="button"
      className="recommended-rooms__tile"
      key={room.id}
      onClick={() => props.selectRoom(room)}
      onKeyDown={(e) => {
        if (e.keyCode !== 9) e.preventDefault();
        if (e.keyCode === 40) {
          e.target.nextSibling.focus();
        } else if (e.keyCode === 38) {
          e.target.previousSibling.focus();
        } else if ((e.keyCode === 32) || (e.keyCode === 13)) {
          props.selectRoom(room);
        }
      }}
    >
      <span className="recommended-rooms__time">16:00–16:30</span>
      <span className="recommended-rooms__name-floor">{`${room.label} ⸱ ${room.floor} этаж`}</span>
    </div>
  ));

  return (
    <div className="recommended-rooms">
      <div className="recommended-rooms__label">
      Рекомендованные переговорки
      </div>
      {roomsJsx}
    </div>
  );
};

RecommendedRooms.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecommendedRooms;
