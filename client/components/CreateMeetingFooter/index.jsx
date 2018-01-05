import React from 'react';
import Button from '../Button';
import './CreateMeetingFooter.scss';

const CreateMeetingFooter = props => (
  <footer className="create-meeting__footer">
    <div className="footer__buttons-container">
      <Button className="decline-button" label="Отмена" onClick={{ func: props.decline, arg: '' }} />
      <div style={{ width: '16px' }} />
      <Button className="accept-button" label="Создать встречу" onClick={{ func: props.accept, arg: '' }} />
    </div>
  </footer>
);

export default CreateMeetingFooter;
