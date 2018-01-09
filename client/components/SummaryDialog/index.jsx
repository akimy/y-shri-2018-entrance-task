import React from 'react';
import PropTypes from 'prop-types';
import './SummaryDialog.scss';
import EditIcon from './edit.svg';

const SummaryDialog = (props) => {
  let { x, y } = props.coords;
  let offset = 0;
  if (x + 350 > window.innerWidth) {
    offset = 140;
    x = window.innerWidth - 350;
  } else {
    x += (props.coords.width / 2) - 169;
  }
  y += 27;

  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const start = new Date(props.dateStart);
  const end = new Date(props.dateEnd);

  const dateString = (
    <div className="summary-dialog__date">{`${start.getDay()} ${months[start.getMonth()]} 
    ${start.getHours()}:${start.getMinutes() < 10 ? '0' : ''}${start.getMinutes()}–
    ${end.getHours()}:${end.getMinutes() < 10 ? '0' : ''}${end.getMinutes()} · ${props.room.title}`}
    </div>);

  return (
    <div
      className="summary-dialog"
      style={{ top: y, left: x }}
      onClick={(e) => {
      e.stopPropagation();
        console.log('Lol!');
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
            <span className="summary-dialog__users-count">{`и еще ${props.users.length - 1} участников`}</span>
          </div>
        </div>
        <div className="summary-dialog__icons-container">
          <div
            role="button"
            tabIndex="0"
            onKeyDown={e => console.log('lol')}
            className="summary-dialog__edit-icon-wrapper"
            title="Редактировать встречу"
            onClick={(e) => {
            e.stopPropagation();
              console.log('Lol!');
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
  room: PropTypes.objectOf(PropTypes.array).isRequired,
  title: PropTypes.string.isRequired,
};

export default SummaryDialog;