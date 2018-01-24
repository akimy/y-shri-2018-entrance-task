import Intl from 'intl';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LeftArrow from './leftArrow.svg';
import RightArrow from './rightArrow.svg';
import './Calendar.scss';
import { monthsPlural } from '../../shared/months';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#007dff',
    primary2Color: '#007dff',
    primary3Color: '#007dff',
    pickerHeaderColor: '#007dff',
  },
});

class Calendar extends Component {
  render() {
    const { DateTimeFormat } = Intl;

    const getDateString = (date) => {
      const currentDate = new Date();
      const currDateValue = currentDate.getDate() + currentDate.getMonth() * 30 +
      currentDate.getFullYear() * 360;
      const calendarDateValue = date.getDate() + date.getMonth() * 30 + date.getFullYear() * 360;
      const diff = currDateValue - calendarDateValue;
      let monthString = monthsPlural[new Date(date).getMonth()];
      switch (diff) {
        case 0: monthString = `${monthString.slice(0, 3)} · сегодня`; break;
        case -1: monthString = `${monthString.slice(0, 3)} · завтра`; break;
        case 1: monthString = `${monthString.slice(0, 3)} · вчера`; break;
        default:
      }
      return `${date.getDate()} ${monthString}`;
    };

    return (
      <div className="calendar">
        <div className="calendar__hidden-instance">
          <MuiThemeProvider muiTheme={muiTheme}>
            <DatePicker
              ref={el => this.datePicker = el}
              defaultDate={new Date()}
              minDate={new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30 * 1.5)}
              maxDate={new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30 * 1.5)}
              onChange={(invalid, date) => { this.props.setCalendarDate(date); }}
              mode={window.innerWidth < 900 ? 'portrait' : 'landscape'}
              locale="ru-RU"
              DateTimeFormat={DateTimeFormat}
              cancelLabel="Отмена"
              id="date"
            />
          </MuiThemeProvider>
        </div>
        <div className="calendar__content">
          <div
            className="calendar__icon-wrapper"
            title="Предыдущий день"
            tabIndex="0"
            role="button"
            onClick={() => this.props.handleCalendarLeftArrowClick()}
            onKeyDown={(e) => {
                if ((e.keyCode === 32) || (e.keyCode === 13)) {
                  this.props.handleCalendarLeftArrowClick();
                }
              }
            }
          >
            <img className="calendar__icon" src={LeftArrow} alt="Предыдущий день" />
          </div>
          <div className="calendar__current-date-container">
            <span
              tabIndex="0"
              role="button"
              className="calendar__current-date-text"
              onClick={() => { this.datePicker.openDialog(); }}
              onKeyDown={(e) => {
                if ((e.keyCode === 32) || (e.keyCode === 13)) {
                  this.datePicker.openDialog();
                }
              }
            }
            >
              {getDateString(this.props.calendarDate)}
            </span>
          </div>
          <div
            className="calendar__icon-wrapper"
            title="Следующий день"
            tabIndex="0"
            role="button"
            onClick={() => this.props.handleCalendarRightArrowClick()}
            onKeyDown={(e) => {
                if ((e.keyCode === 32) || (e.keyCode === 13)) {
                  this.props.handleCalendarRightArrowClick();
                }
              }
            }
          >
            <img className="calendar__icon" src={RightArrow} alt="Следующий день" />
          </div>
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  setCalendarDate: PropTypes.func.isRequired,
  handleCalendarLeftArrowClick: PropTypes.func.isRequired,
  handleCalendarRightArrowClick: PropTypes.func.isRequired,
  calendarDate: PropTypes.instanceOf(Date).isRequired,
};

export default Calendar;
