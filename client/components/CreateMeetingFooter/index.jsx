import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import './CreateMeetingFooter.scss';

const CreateMeetingFooter = props => (
  <footer className="create-meeting__footer">
    <div className="footer__buttons-container">
      <Button className="decline-button" label="Отмена" onClick={{ func: props.decline, arg: '' }} />
      <div style={{ width: '16px' }} />
      <Button
        className={props.ready ? 'accept-button' : 'accept-button_disabled'}
        label="Создать встречу"
        onClick={{ func: props.accept, arg: '' }}
      />
    </div>
  </footer>
);

CreateMeetingFooter.propTypes = {
  ready: PropTypes.bool.isRequired,
  decline: PropTypes.func.isRequired,
  accept: PropTypes.func.isRequired,
};
export default CreateMeetingFooter;
