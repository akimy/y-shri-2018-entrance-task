import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Intl from 'intl';
import 'intl/locale-data/jsonp/ru';
import 'intl/locale-data/jsonp/ru-RU';
import {
  timeContainerStyles,
  dateTextFieldStyles,
} from './pickerStyles';
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
      <div>
        <div className="input-field">
          <span className="input-field__label" style={{ cursor: 'default' }}>
      Дата
          </span>
          <div className="calendar-input">
            <MuiThemeProvider muiTheme={muiTheme}>
              <DatePicker
                ref={ref => this.datePickerRef = ref}
                defaultDate={this.props.dateStart}
                minDate={new Date()}
                onChange={(invalid, date) => { this.props.setDate(date); }}
                mode="landscape"
                locale="ru-RU"
                DateTimeFormat={DateTimeFormat}
                cancelLabel="Отмена"
                id="date"
                textFieldStyle={{ ...dateTextFieldStyles }}
                onMouseOver={(e) => { e.target.parentNode.style.boxShadow = 'inset 0 0 0 2px rgba(0, 125, 255, 0.25)'; }}
                onMouseOut={(e) => { e.target.parentNode.style.boxShadow = 'inset 0 0 0 2px #e9ecef'; }}
                onFocus={() => { this.datePickerRef.openDialog(); }}
              />
            </MuiThemeProvider>
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
          <MuiThemeProvider muiTheme={muiTheme}>
            <TimePicker
              ref={ref => this.timeStart = ref}
              id="time-start"
              format="24hr"
              defaultTime={this.props.timeStart}
              onChange={(first, time) => this.props.setTimeStart(time)}
              cancelLabel="Отмена"
              autoOk
              textFieldStyle={{ ...timeContainerStyles }}
              onMouseOver={(e) => { e.target.parentNode.style.boxShadow = 'inset 0 0 0 2px rgba(0, 125, 255, 0.25)'; }}
              onMouseOut={(e) => { e.target.parentNode.style.boxShadow = 'inset 0 0 0 2px #e9ecef'; }}
            />
          </MuiThemeProvider>
        </div>
        <div className="input-field">
          <div className="input-field__label" style={{ width: '22px' }} />
          <div className="calendar__separator" />
        </div>
        <div className="input-field">
          <span className="input-field__label" style={{ cursor: 'default' }}>
        Конец
          </span>
          <MuiThemeProvider muiTheme={muiTheme}>
            <TimePicker
              ref={ref => this.timeEnd = ref}
              id="time-end"
              format="24hr"
              defaultTime={this.props.timeEnd}
              onChange={(first, time) => this.props.setTimeEnd(time)}
              cancelLabel="Отмена"
              autoOk
              onMouseOver={(e) => { e.target.parentNode.style.boxShadow = 'inset 0 0 0 2px rgba(0, 125, 255, 0.25)'; }}
              onMouseOut={(e) => { e.target.parentNode.style.boxShadow = 'inset 0 0 0 2px #e9ecef'; }}
              textFieldStyle={{ ...timeContainerStyles }}
            />
          </MuiThemeProvider>
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
