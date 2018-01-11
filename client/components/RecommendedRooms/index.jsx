import React from 'react';
import PropTypes from 'prop-types';
import './RecommendedRooms.scss';

const RecommendedRooms = (props) => {
  const getDateString = (start, end) => `${new Date(start).getHours()}:${new Date(start).getMinutes()} – 
  ${new Date(end).getHours()}:${new Date(end).getMinutes()}`;

  const roomsJsx = props.recommendations.map(recommendation => (
    <div
      tabIndex="0"
      role="button"
      className="recommended-rooms__tile"
      key={recommendation.room.id}
      onClick={() => props.selectRoom(recommendation)}
      onKeyDown={(e) => {
        if (e.keyCode !== 9) e.preventDefault();
        if (e.keyCode === 40) {
          e.target.nextSibling.focus();
        } else if (e.keyCode === 38) {
          e.target.previousSibling.focus();
        } else if ((e.keyCode === 32) || (e.keyCode === 13)) {
          props.selectRoom(recommendation);
        }
      }}
    >
      <span className="recommended-rooms__time">{getDateString(recommendation.date.start, recommendation.date.end)}</span>
      <span className="recommended-rooms__name-floor">{`${recommendation.room.title} ⸱ ${recommendation.room.floor} этаж`}</span>
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
  recommendations: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default RecommendedRooms;
