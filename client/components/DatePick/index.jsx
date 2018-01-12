import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
            <MuiThemeProvider>
              <DatePicker
                ref={ref => this.datePickerRef = ref}
                defaultDate={new Date()}
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
          <MuiThemeProvider>
            <TimePicker
              ref={ref => this.timeStart = ref}
              id="time-start"
              format="24hr"
              defaultTime={new Date()}
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
          <MuiThemeProvider>
            <TimePicker
              ref={ref => this.timeEnd = ref}
              id="time-end"
              format="24hr"
              defaultTime={new Date((new Date()).getTime() + (60 * (60 * 1000)))}
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
};
export default DatePick;
