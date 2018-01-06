import React from 'react';
import PropTypes from 'prop-types';
import './SelectedRoom.scss';
import CloseIcon from './closeSelectedRoomIcon.svg';

const SelectedRoom = props => (
  <div className="selected-room">
    <div className="selected-room__label">
      Ваша переговорка
    </div>
    <div className="selected-room__tile">
      <span className="selected-room__time">16:00–16:30</span>
      <span className="selected-room__name-floor">{`${props.label} ⸱ ${props.floor} этаж`}</span>
      <div className="selected-room__close-icon-wrapper" title="Отменить выбор">
        <img src={CloseIcon} className="selected-room__close-icon" alt="Отменить выбор" />
      </div>
    </div>
  </div>
);

SelectedRoom.propTypes = {
  label: PropTypes.string.isRequired,
  floor: PropTypes.number.isRequired,
};

export default SelectedRoom;

