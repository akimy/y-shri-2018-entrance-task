import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import './ModalCreated.scss';
import Fanfare from './emoji2.png';

const ModalCreated = ({ toggleModalCreated }) => (
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
            14 декабря, 15:00 – 17:00
          </div>
          <div className="modal__text">
            Готем · 4 этаж
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

ModalCreated.propTypes = {
  toggleModalCreated: PropTypes.func.isRequired,
};

export default ModalCreated;
