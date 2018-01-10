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
      onClick={(e) => {
        e.stopPropagation();
        addUserToSelected(member);
      }}
      onKeyDown={(e) => {
        if (e.keyCode !== 9) e.preventDefault();
        if (e.keyCode === 40) {
          e.target.nextSibling.focus();
        } else if (e.keyCode === 38) {
          e.target.previousSibling.focus();
        } else if ((e.keyCode === 32) || (e.keyCode === 13)) {
          addUserToSelected(member);
        }
      }}
    >
      <img className="select-scroll__avatar" src={member.avatarUrl} alt={`Изображение пользователя ${member.login}`} />
      <span className="select-scroll__login">{`${member.login} ⸱`}</span>
      <span className="select-scroll__floor">{`${member.homeFloor} этаж`}</span>
    </div>
  ));
  return (
    <div className="select-scroll" ref={props.listRef} >
      {membersJsx.length ? membersJsx :
      <div
        role="button"
        className="select-scroll__member-container"
        onClick={() => props.selectingMembersTurningOff()}
        tabIndex="0"
        onKeyDown={() => props.selectingMembersTurningOff()}
      >
        <div className="select-scroll__none" style={{ marginLeft: '15px' }}>
          Нет подходящих участников!
        </div>
      </div> }
    </div>
  );
};

SelectMembersScroll.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  addUserToSelected: PropTypes.func.isRequired,
  selectingMembersTurningOff: PropTypes.func.isRequired,
  listRef: PropTypes.func.isRequired,
};

export default SelectMembersScroll;
