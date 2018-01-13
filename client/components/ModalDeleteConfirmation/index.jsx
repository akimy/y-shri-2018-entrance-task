import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Girl from './emoji1.png';
import './ModalDeleteConfirmation.scss';

const ModalDeleteConfirmation = props => (
  <div className="modal__mask">
    <div className="modal__wrapper">
      <div className="modal__container">
        <div className="modal__image-wrapper">
          <img className="modal__image_created" src={Girl} alt="Ой!" />
        </div>
        <div className="modal__label">
          Встреча будет
        </div>
        <div className="modal__label">
          удалена безвозвратно
        </div>
        <div className="modal__button-container">
          <div className="modal__button-container_inner">
            <Button
              className="decline-button"
              label="Отмена"
              onClick={{ func: () => props.closeModalDeleteConfirmation(), arg: '' }}
            />
            <div style={{ width: '16px' }} />
            <Button
              className="decline-button"
              label="Удалить"
              onClick={{ func: () => props.acceptDeleting(), arg: '' }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

ModalDeleteConfirmation.propTypes = {
  acceptDeleting: PropTypes.func.isRequired,
  closeModalDeleteConfirmation: PropTypes.func.isRequired,
};

export default ModalDeleteConfirmation;
