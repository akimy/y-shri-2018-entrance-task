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
  <section
    className="create-meeting"
    onClick={
    () => { props.selectingMembersTurningOff(); }
  }
  >
    <div className="create-meeting__content-wrapper">
      <div className="create-meeting__content">
        <div className="row">
          <h3 className="meeting__label">Новая встреча</h3>
          <span
            role="button"
            tabIndex="0"
            className="meeting__clear-icon-wrapper"
            title="Отмена"
            onKeyDown={(e) => {
              if ((e.keyCode === 32) || (e.keyCode === 13)) {
                props.declineCreating();
              }
            }}
            onClick={() => {
              props.declineCreating();
            }}
          >
            <img className="meeting__clear-icon" src={CloseIcon} alt="Отмена" />
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
          <DatePick
            setDate={props.setDate}
            setTimeStart={props.setTimeStart}
            setTimeEnd={props.setTimeEnd}
          />
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
              onChange={props.filterUsers}
            />

            {props.selectingMembers &&
            <SelectMembersScroll
              members={props.filteredUsers}
              addUserToSelected={props.addUserToSelected}
              listRef={props.listRef}
              selectingMembersTurningOff={props.selectingMembersTurningOff}
            />}
            <ChosedMembers
              members={props.selectedUsers}
              removeUserFromSelected={props.removeUserFromSelected}
            />
          </div>
          <div className="column">
            { props.recommendedRooms.length !== 0 && !props.selectedRoom &&
            <RecommendedRooms rooms={props.recommendedRooms} selectRoom={props.selectRoom} />}
            { props.selectedRoom &&
            <SelectedRoom
              title={props.selectedRoom.title}
              floor={props.selectedRoom.floor}
              cancelSelectedRoom={props.cancelSelectedRoom}
            /> }
          </div>
        </div>
      </div>
    </div>
    <CreateMeetingFooter accept={props.acceptCreating} decline={props.declineCreating} />
  </section>
);

CreateMeeting.propTypes = {
  filteredUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  recommendedRooms: PropTypes.arrayOf(PropTypes.any).isRequired,
  setDate: PropTypes.func.isRequired,
  setTimeStart: PropTypes.func.isRequired,
  setTimeEnd: PropTypes.func.isRequired,
  selectedRoom: PropTypes.shape({
    title: PropTypes.string.isRequired,
    floor: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }),
  selectRoom: PropTypes.func.isRequired,
  cancelSelectedRoom: PropTypes.func.isRequired,
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
  userSearchInput: PropTypes.string.isRequired,
  handleFocusList: PropTypes.func.isRequired,
  listRef: PropTypes.func.isRequired,
};

CreateMeeting.defaultProps = {
  selectedUsers: [],
  selectedRoom: null,
};

export default CreateMeeting;
