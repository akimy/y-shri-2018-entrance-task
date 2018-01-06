import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Intl from 'intl';
import 'intl/locale-data/jsonp/ru';
import 'intl/locale-data/jsonp/ru-RU';
import {
  timeContainerStyles,
  timeTextFieldStyles,
  dateTextFieldStyles,
} from './pickerStyles';
import './DatePick.scss';
import CalendarIcon from './calendar.svg';

const DatePick = (props) => {
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
              mode="landscape"
              locale="ru-RU"
              DateTimeFormat={DateTimeFormat}
              cancelLabel="Отмена"
              id="date"
              textFieldStyle={{ ...dateTextFieldStyles }}
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
            id="time-start"
            format="24hr"
            cancelLabel="Отмена"
            autoOk
            style={{ ...timeContainerStyles }}
            textFieldStyle={{ ...timeTextFieldStyles }}
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
            id="time-end"
            format="24hr"
            cancelLabel="Отмена"
            autoOk
            style={{ ...timeContainerStyles }}
            textFieldStyle={{ ...timeTextFieldStyles }}
          />
        </MuiThemeProvider>
      </div>
    </div>
  );
};

export default DatePick;
