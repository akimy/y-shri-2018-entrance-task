import React from 'react';
import './DatePick.scss';
import CalendarIcon from './calendar.svg';

const DatePick = props => (
  <div>
    <div className="input-field">
      <span className="input-field__label" style={{ cursor: 'default' }}>
      Дата
      </span>
      <div className="calendar-input">
        <div className="calendar-input__text">
            29 декабря 2017
        </div>
        <div className="calendar-input__wrapper" title="Выбор даты">
          <img
            src={CalendarIcon}
            className="calendar-input__icon"
            alt="Выбор даты"
          />
        </div>
      </div>
    </div>
    <div className="input-field">
      <span className="input-field__label" style={{ cursor: 'default' }}>
        Начало
      </span>
      <div className="time-input">
        <div className="calendar-input__text">
            18:00
        </div>
      </div>
    </div>
    <div className="input-field">
      <div className="input-field__label" style={{ width: '18px' }} />
      <div className="separator" />
    </div>
    <div className="input-field">
      <span className="input-field__label" style={{ cursor: 'default' }}>
        Конец
      </span>
      <div className="time-input">
        <div className="calendar-input__text">
            19:45
        </div>
      </div>
    </div>
  </div>
);

export default DatePick;
