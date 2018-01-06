import React from 'react';
import PropTypes from 'prop-types';
import CreateMeetingFooter from '../CreateMeetingFooter';
import InputField from '../InputField';
import DatePick from '../DatePick';
import ChosedMembers from '../ChosedMembers';
import RecommendedRooms from '../RecommendedRooms';
import SelectedRoom from '../SelectedRoom';
import SelectMembersScroll from '../SelectMembersScroll';
import './CreateMeeting.scss';
import CloseIcon from './close.svg';

const CreateMeeting = props => (
  <section className="create-meeting">
    <div className="create-meeting__content-wrapper">
      <div className="create-meeting__content">
        <div className="row">
          <h3 className="meeting__label">Новая встреча</h3>
          <span className="meeting__clear-icon-wrapper" title="Очистить изменения">
            <img className="meeting__clear-icon" src={CloseIcon} alt="Очистить изменения" />
          </span>
        </div>
        <div className="row_align-end" style={{ marginBottom: '24px' }}>
          <InputField
            id="theme"
            placeholder="О чем будете говорить?"
            label="Тема"
            value={props.theme}
            onChange={props.handleChangeTheme}
          />
          <DatePick />
        </div>
        <div className="row_align-top">
          <div className="column">
            <InputField
              id="users"
              placeholder="Например, Тор Одинович"
              label="Участники"
              handleFocusList={props.handleFocusList}
              value={props.userSearchInput}
              onFocus={props.selectingMembersTurningOn}
              onBlur={props.selectingMembersTurningOff}
              onChange={props.filterUsers}
            />

            {props.selectingMembers &&
            <SelectMembersScroll
              members={props.filteredUsers}
              addUserToSelected={props.addUserToSelected}
              listRef={props.listRef}
            />}

            {!props.selectingMembers &&
            <ChosedMembers
              members={props.selectedUsers}
              removeUserFromSelected={props.removeUserFromSelected}
            />}

          </div>
          <div className="column">
            <RecommendedRooms rooms={props.rooms} />
            <SelectedRoom label="Голубая лагуна" floor={4} />
          </div>
        </div>
      </div>
    </div>
    <CreateMeetingFooter accept={props.acceptCreating} decline={props.declineCreating} />
  </section>
);

CreateMeeting.propTypes = {
  filteredUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
  acceptCreating: PropTypes.func.isRequired,
  declineCreating: PropTypes.func.isRequired,
  selectingMembers: PropTypes.bool.isRequired,
  selectingMembersTurningOn: PropTypes.func.isRequired,
  selectingMembersTurningOff: PropTypes.func.isRequired,
  selectedUsers: PropTypes.arrayOf(PropTypes.any),
  filterUsers: PropTypes.func.isRequired,
  addUserToSelected: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  handleChangeTheme: PropTypes.func.isRequired,
  removeUserFromSelected: PropTypes.func.isRequired,
  userSearchInput: PropTypes.func.isRequired,
  handleFocusList: PropTypes.func.isRequired,
};

CreateMeeting.defaultProps = {
  selectedUsers: [],
};

export default CreateMeeting;
