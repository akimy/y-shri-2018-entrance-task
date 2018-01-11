import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import './ModalCreated.scss';
import Fanfare from './emoji2.png';
import { monthsPlural } from '../../shared/months';

const ModalCreated = ({ toggleModalCreated, modalCreatedContent }) => {
  const start = new Date(modalCreatedContent.dateStart);
  const end = new Date(modalCreatedContent.dateEnd);
  const timeString = `${start.getDay()} ${monthsPlural[start.getMonth()]},
  ${start.getHours()}:${start.getMinutes() < 10 ? '0' : ''}${start.getMinutes()} – ${end.getHours()}:${end.getMinutes() < 10 ? '0' : ''}${end.getMinutes()}`;

  return (
    <div className="modal__mask">
      <div className="modal__wrapper">
        <div className="modal__container">
          <div className="modal__image-wrapper">
            <img className="modal__image_created" src={Fanfare} alt="Ура!" />
          </div>
          <div className="modal__label">
          Встреча создана!
          </div>
          <div className="modal__text-container">
            <div className="modal__text">
              {timeString}
            </div>
            <div className="modal__text">
              {`${modalCreatedContent.room.title} · ${modalCreatedContent.room.floor} этаж`}
            </div>
          </div>
          <Button
            className="accept-button"
            label="Хорошо"
            onClick={{ func: () => toggleModalCreated(), arg: '' }}
          />
        </div>
      </div>
    </div>
  );
};

ModalCreated.propTypes = {
  toggleModalCreated: PropTypes.func.isRequired,
  modalCreatedContent: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ModalCreated;
