import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from './close.svg';
import './ChosedMembers.scss';


const ChosedMembers = ({ members, ...props }) => {
  const jsxMembers = members.map(user =>
    (
      <div className="chosed-members__container" key={user.id} >
        <img className="chosed-members__avatar" src={user.avatarUrl} alt={`Изображение пользователя ${user.login}`} />
        <span className="chosed-members__login">{user.login}</span>
        <span
          tabIndex="0"
          role="button"
          className="chosed-members__icon-wrapper"
          title={`Убрать пользователя ${user.login}`}
          onClick={() => props.removeUserFromSelected(user.id)}
          onKeyPress={() => props.removeUserFromSelected(user.id)}
        >
          <img className="meeting__clear-icon" src={CloseIcon} alt={`Убрать пользователя ${user.login}`} />
        </span>
      </div>
    ));

  return (
    <div className="chosed-members">
      {jsxMembers}
    </div>
  );
};

ChosedMembers.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeUserFromSelected: PropTypes.func.isRequired,
};

export default ChosedMembers;
