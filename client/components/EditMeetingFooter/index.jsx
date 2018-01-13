import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import './EditMeetingFooter.scss';

const CreateMeetingFooter = props => (
  <footer className="edit-meeting__footer">
    <div className="footer__buttons-container">
      <Button className="decline-button" label="Отмена" onClick={{ func: props.decline, arg: '' }} />
      <div style={{ width: '16px' }} />
      <Button className="decline-button" label="Удалить встречу" onClick={{ func: props.showDeleteConfirmation, arg: '' }} />
      <div style={{ width: '16px' }} />
      <Button
        className={props.ready ? 'decline-button' : 'decline-button_disabled'}
        label="Сохранить"
        onClick={{ func: props.accept, arg: '' }}
      />
    </div>
  </footer>
);

CreateMeetingFooter.propTypes = {
  ready: PropTypes.bool.isRequired,
  decline: PropTypes.func.isRequired,
  accept: PropTypes.func.isRequired,
  showDeleteConfirmation: PropTypes.func.isRequired,
};
export default CreateMeetingFooter;
