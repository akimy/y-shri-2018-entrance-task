import React from 'react';
import PropTypes from 'prop-types';
import CreateMeetingFooter from '../CreateMeetingFooter';
import InputField from '../InputField';
import DatePick from '../DatePick';
import './CreateMeeting.scss';
import CloseIcon from './close.svg';

const CreateMeeting = props => (
  <section className="create-meeting">
    <div className="create-meeting__content-wrapper">
      <div className="create-meeting__content">
        <div className="row">
          <h3 className="meeting__label">Новая встреча</h3>
          <span className="meeting__clear-icon-wrapper" title="Очистить изменения">
            <img className="meeting__clear-icon" src={CloseIcon} alt="Очистить изменения" />
          </span>
        </div>
        <div className="row_align-end">
          <InputField id="theme" placeholder="О чем будете говорить?" label="Тема" />
          <DatePick />
        </div>
        <div className="row">
          <InputField id="users" placeholder="Например, Тор Одинович" label="Участники" />
        </div>
      </div>
    </div>
    <CreateMeetingFooter accept={props.acceptCreating} decline={props.declineCreating} />
  </section>
);

CreateMeeting.propTypes = {
  acceptCreating: PropTypes.func.isRequired,
  declineCreating: PropTypes.func.isRequired,
};

export default CreateMeeting;
