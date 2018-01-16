import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Intl from 'intl';
import 'intl/locale-data/jsonp/ru';
import 'intl/locale-data/jsonp/ru-RU';
import './DatePick.scss';
import CalendarIcon from './calendar.svg';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#007dff',
    primary2Color: '#007dff',
    primary3Color: '#007dff',
    pickerHeaderColor: '#007dff',
  },
});

class DatePick extends Component {
  render() {
    const { DateTimeFormat } = Intl;
    return (
      <div className="date-picker">
        <div className="input-field">
          <span className="input-field__label" style={{ cursor: 'default' }}>
      Дата
          </span>
          <div
            className="date-picker__date-input-field"
            role="listbox"
            tabIndex="0"
            onClick={() => { this.datePickerRef.openDialog(); }}
          >
            <span className="date-picker__input-fields-content">12 декабря 2018 г.</span>
            <div className="calendar__hidden-instance">
              <MuiThemeProvider muiTheme={muiTheme}>
                <DatePicker
                  ref={ref => this.datePickerRef = ref}
                  defaultDate={this.props.dateStart}
                  minDate={new Date('Sun Jan 14 2018 19:47:14 GMT+0500 (+05)')}
                  onChange={(invalid, date) => { this.props.setDate(date); }}
                  mode="portrait"
                  locale="ru-RU"
                  DateTimeFormat={DateTimeFormat}
                  cancelLabel="Отмена"
                  id="date"
                />
              </MuiThemeProvider>
            </div>
            <div className="datepicker-icon__wrapper" title="Выбор даты">
              <img
                src={CalendarIcon}
                className="calendar-input__icon"
                alt="Выбор даты"
              />
            </div>
          </div>
        </div>
        <div className="date-picker__time-inputs-container">
          <div className="input-field">
            <span className="input-field__label" style={{ cursor: 'default' }}>
        Начало
            </span>
            <div
              className="date-picker__time-input-field"
              role="listbox"
              tabIndex="0"
              onClick={() => { this.timeStart.openDialog(); }}
            >
              <span className="date-picker__input-fields-content">19:31</span>
              <div className="calendar__hidden-instance">
                <MuiThemeProvider muiTheme={muiTheme}>
                  <TimePicker
                    ref={ref => this.timeStart = ref}
                    id="time-start"
                    format="24hr"
                    defaultTime={this.props.timeStart}
                    onChange={(first, time) => this.props.setTimeStart(time)}
                    cancelLabel="Отмена"
                    autoOk
                  />
                </MuiThemeProvider>
              </div>
            </div>
          </div>
          <div className="datepicker__separator-container">
            <div className="datepicker__separator" />
          </div>
          <div className="input-field">
            <span className="input-field__label" style={{ cursor: 'default' }}>
        Конец
            </span>
            <div
              className="date-picker__time-input-field"
              role="listbox"
              tabIndex="0"
              onClick={() => { this.timeStart.openDialog(); }}
            >
              <span className="date-picker__input-fields-content">20:51</span>
              <div className="calendar__hidden-instance">
                <MuiThemeProvider muiTheme={muiTheme}>
                  <TimePicker
                    ref={ref => this.timeEnd = ref}
                    id="time-end"
                    format="24hr"
                    defaultTime={this.props.timeEnd}
                    onChange={(first, time) => this.props.setTimeEnd(time)}
                    cancelLabel="Отмена"
                    autoOk
                  />
                </MuiThemeProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DatePick.propTypes = {
  setDate: PropTypes.func.isRequired,
  setTimeStart: PropTypes.func.isRequired,
  setTimeEnd: PropTypes.func.isRequired,
  dateStart: PropTypes.instanceOf(Date).isRequired,
  timeStart: PropTypes.instanceOf(Date).isRequired,
  timeEnd: PropTypes.instanceOf(Date).isRequired,
};

export default DatePick;
