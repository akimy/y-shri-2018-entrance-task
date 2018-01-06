import React from 'react';
import PropTypes from 'prop-types';
import './SelectMembersScroll.scss';

const SelectMembersScroll = ({ members, addUserToSelected, ...props }) => {
  const membersJsx = members.map(member => (
    <div
      tabIndex="0"
      role="button"
      key={member.id}
      className="select-scroll__member-container"
      onClick={() => { addUserToSelected(member); }}
      onKeyDown={(e) => {
        if (e.keyCode === 40) {
          e.preventDefault();
          e.target.nextSibling.focus();
        } else if (e.keyCode === 38) {
          e.preventDefault();
          e.target.previousSibling.focus();
        } else if ((e.keyCode === 32) || (e.keyCode === 13)) {
          addUserToSelected(member);
        }
      }}
    >
      <img className="select-scroll__avatar" src={member.avatarUrl} alt={`Изображение пользователя ${member.login}`} />
      <span className="select-scroll__login">{`${member.login} ⸱`}</span>
      <span className="select-scroll__floor">{`${member.floor} этаж`}</span>
    </div>
  ));
  return (
    <div className="select-scroll" ref={props.listRef} >
      {membersJsx.length ? membersJsx :
      <div className="select-scroll__member-container">
        <div className="select-scroll__login" style={{ marginLeft: '15px' }}>
          Все возможные участники в сборе. Намечается крупная вечеринка!
        </div>
      </div> }
    </div>
  );
};

SelectMembersScroll.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  addUserToSelected: PropTypes.func.isRequired,
};

export default SelectMembersScroll;
