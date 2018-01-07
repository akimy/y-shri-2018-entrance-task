import React from 'react';
import LeftArrow from './leftArrow.svg';
import RightArrow from './rightArrow.svg';
import './Calendar.scss';


const Calendar = () => (
  <div className="calendar">
    <div className="calendar__content">
      <div className="calendar__icon-wrapper" title="Предыдущий день">
        <img className="calendar__icon" src={LeftArrow} alt="Предыдущий день" />
      </div>
      <span className="calendar__current-date-text">19 дек · сегодня</span>
      <div className="calendar__icon-wrapper" title="Следующий день">
        <img className="calendar__icon" src={RightArrow} alt="Следующий день" />
      </div>
    </div>
  </div>
);

export default Calendar;
