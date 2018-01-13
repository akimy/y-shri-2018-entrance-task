import Intl from 'intl';
import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LeftArrow from './leftArrow.svg';
import RightArrow from './rightArrow.svg';
import './Calendar.scss';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#007dff',
    primary2Color: '#007dff',
    primary3Color: '#007dff',
    pickerHeaderColor: '#007dff',
  },
});

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
