import React from 'react';
import PropTypes from 'prop-types';
import './SelectedRoom.scss';
import CloseIcon from './closeSelectedRoomIcon.svg';

const SelectedRoom = (props) => {
  const dateStartHours = new Date(props.date.start).getHours();
  const dateStartMinutes = new Date(props.date.start).getMinutes();
  const dateEndHours = new Date(props.date.end).getHours();
  const dateEndMinutes = new Date(props.date.end).getMinutes();
  const dateString = `${dateStartHours}:${dateStartMinutes < 10 ? '0' : ''}${dateStartMinutes}–
  ${dateEndHours}:${dateEndMinutes < 10 ? '0' : ''}${dateEndMinutes}`;
  return (
    <div className="selected-room">
      <div className="selected-room__label">
      Ваша переговорка
      </div>
      <div className="selected-room__tile">
        <span className="selected-room__time">{dateString}</span>
        <span className="selected-room__name-floor">{`${props.title} ⸱ ${props.floor} этаж`}</span>
        <div
          role="button"
          tabIndex="0"
          className="selected-room__close-icon-wrapper"
          title="Отменить выбор"
          onClick={() => props.cancelSelectedRoom()}
          onKeyDown={(e) => {
            if ((e.keyCode === 32) || (e.keyCode === 13)) {
              e.preventDefault();
              props.cancelSelectedRoom();
            }
          }
        }
        >
          <img src={CloseIcon} className="selected-room__close-icon" alt="Отменить выбор" />
        </div>
      </div>
    </div>
  );
};

SelectedRoom.propTypes = {
  title: PropTypes.string.isRequired,
  floor: PropTypes.number.isRequired,
  cancelSelectedRoom: PropTypes.func.isRequired,
  date: PropTypes.shape({
    end: PropTypes.number,
    start: PropTypes.number,
  }).isRequired,
};

export default SelectedRoom;

