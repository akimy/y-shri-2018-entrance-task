import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import './ModalSwapConfirmation.scss';

const ModalSwapConfirmation = (props) => {
  const users = props.swapData.event.users.map(u => u.login);
  return (
    <div className="modal__mask">
      <div className="modal__wrapper">
        <div className="modal__container">
          <div className="modal__label">
          Подтвердите действие
          </div>
          <div className="modal__text-container">
            <div className="modal__text_swap">
              {`Событие "${props.swapData.event.title}" будет перенесено из комнаты "${props.swapData.event.room.title}"
                в комнату "${props.swapData.room.title}". Вы же не забудете
                предупредить ${users.join(', ')} об этом?`}
            </div>
          </div>
          <div className="modal__button-container_swap">
            <div className="modal__button-container_inner">
              <Button
                className="decline-button modal__button_margin-right"
                label="Отмена"
                onClick={{ func: () => props.closeSwapConfirmationModal(), arg: '' }}
              />
              <Button
                className="accept-button"
                label="Подтвердить"
                onClick={{ func: () => props.confirmEventsSwapAndCreate(), arg: '' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalSwapConfirmation.propTypes = {
  closeSwapConfirmationModal: PropTypes.func.isRequired,
  confirmEventsSwapAndCreate: PropTypes.func.isRequired,
  swapData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ModalSwapConfirmation;

