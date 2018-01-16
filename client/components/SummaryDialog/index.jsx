import React from 'react';
import PropTypes from 'prop-types';
import './SummaryDialog.scss';
import EditIcon from './edit.svg';
import { monthsPlural } from '../../shared/months';

const getPlural = (val) => {
  if (val === 1) {
    return 'участник';
  } else if ((val >= 2) && (val <= 4)) {
    return 'участника';
  }

  return 'участников';
};

const SummaryDialog = (props) => {
  let { x, y } = props.coords;
  let offset = 0;
  if (x + 350 > window.innerWidth) {
    x = window.innerWidth - 350;
    offset = props.coords.x - x - 150;
  } else {
    x += (props.coords.width / 2) - 169;
  }
  y += 27;

  if (window.innerWidth < 900) {
    offset = -1 * (window.innerWidth / 2 - (props.coords.x + props.coords.width / 2));
  }

  const start = new Date(props.dateStart);
  const end = new Date(props.dateEnd);

  const dateString = (
    <div className="summary-dialog__date">{`${start.getDate()} ${monthsPlural[start.getMonth()]} 
    ${start.getHours()}:${start.getMinutes() < 10 ? '0' : ''}${start.getMinutes()}–
    ${end.getHours()}:${end.getMinutes() < 10 ? '0' : ''}${end.getMinutes()} · ${props.room.title}`}
    </div>);

  return (
    <div
      role="dialog"
      className="summary-dialog"
      style={{ top: y, left: x }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="summary-dialog__span-container">
        <svg className="summary-dialog__span" style={{ left: offset }}>
          <polygon points="7,0 0,10 14,10" className="summary-dialog__polygon" />
        </svg>
      </div>
      <div className="summary-dialog__wrapper">
        <div className="summary-dialog__container">
          <div className="summary-dialog__title">
            {props.title}
          </div>
          {dateString}
          <div className="summary-dialog__users">
            <img
              className="summary-dialog__user-avatar"
              src={props.users[0].avatarUrl}
              alt="Изображение пользователя"
            />
            <span className="summary-dialog__user-login">{`${props.users[0].login}`}</span>
            {(props.users.length - 1) !== 0 &&
            <span className="summary-dialog__users-count">{`и еще ${(props.users.length - 1)} ${getPlural(props.users.length - 1)}`}</span>}
          </div>
        </div>
        <div className="summary-dialog__icons-container">
          <div
            role="button"
            tabIndex="0"
            onKeyDown={(e) => {
              e.stopPropagation();
              if ((e.keyCode === 32) || (e.keyCode === 13)) {
                props.handleEditMeeting();
              }
            }}
            className="summary-dialog__edit-icon-wrapper"
            title="Редактировать встречу"
            onClick={(e) => {
              e.stopPropagation();
              props.handleEditMeeting();
            }}
          >
            <img className="summary-dialog__edit-icon" src={EditIcon} alt="Редактировать встречу" />
          </div>
        </div>
      </div>
    </div>
  );
};

SummaryDialog.propTypes = {
  coords: PropTypes.objectOf(PropTypes.array).isRequired,
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  room: PropTypes.objectOf(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
  handleEditMeeting: PropTypes.func.isRequired,
};

export default SummaryDialog;
