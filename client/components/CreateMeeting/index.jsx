import React from 'react';
import PropTypes from 'prop-types';
import CreateMeetingFooter from '../CreateMeetingFooter';
import EditMeetingFooter from '../EditMeetingFooter';
import InputField from '../InputField';
import DatePick from '../DatePick';
import ChosedMembers from '../ChosedMembers';
import RecommendedRooms from '../RecommendedRooms';
import SelectedRoom from '../SelectedRoom';
import SelectMembersScroll from '../SelectMembersScroll';
import ModalDeleteConfirmation from '../ModalDeleteConfirmation';
import ModalSwapConfirmation from '../ModalSwapConfirmation';
import './CreateMeeting.scss';
import CloseIcon from './close.svg';


const getLabel = (purpose) => {
  switch (purpose) {
    case 'edit': return 'Редактирование встречи';
    default: return 'Новая встреча';
  }
};

const CreateMeeting = props => (
  <section
    className="create-meeting"
    onClick={
    () => { props.selectingMembersTurningOff(); }
  }
  >
    {props.modalDeleteConfirmationOpened &&
    <ModalDeleteConfirmation
      closeModalDeleteConfirmation={props.closeModalDeleteConfirmation}
      acceptDeleting={props.acceptDeleting}
    />}
    {props.swapConfirmationOpened &&
    <ModalSwapConfirmation
      closeSwapConfirmationModal={props.closeSwapConfirmationModal}
      confirmEventsSwapAndCreate={props.confirmEventsSwapAndCreate}
      swapData={props.swapData}
    />}

    <main className="create-meeting__content-wrapper">
      <div className="create-meeting__content">
        <div className="meeting__date-time-settings">
          <div className="row">
            <h3 className="meeting__label">{getLabel(props.purpose)}</h3>
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
          <div className="row_align-end">
            <div className="meeting__theme-container">
              <InputField
                id="theme"
                placeholder="О чем будете говорить?"
                label="Тема"
                value={props.theme}
                onChange={props.handleChangeTheme}
              />
            </div>
            <DatePick
              dateStart={props.date}
              timeStart={props.timeStart}
              timeEnd={props.timeEnd}
              setDate={props.setDate}
              setTimeStart={props.setTimeStart}
              setTimeEnd={props.setTimeEnd}
            />
          </div>
        </div>
        <div className="row_align-top">
          <div className="column column_mobile-separators">
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
            { props.recommendations.length !== 0 && !props.selectedRoom &&
            <RecommendedRooms
              recommendations={props.recommendations}
              selectRoom={props.selectRoom}
            />}
            { props.selectedRoom && props.showSelectedRoom &&
            <SelectedRoom
              title={props.selectedRoom.room.title}
              floor={props.selectedRoom.room.floor}
              cancelSelectedRoom={props.cancelSelectedRoom}
              date={props.selectedRoom.date}
            /> }
            {props.error &&
            <div className="create-meeting__error">{props.error}</div>}
          </div>
        </div>
      </div>
    </main>
    { props.recommendations.length !== 0 && !props.selectedRoom &&
    <div className="meeting__mobile-instruction">Выберите переговорку</div>}
    {props.purpose === 'edit' &&
    <div
      className="meeting__mobile-delete-container"
      onClick={() => { props.showDeleteConfirmation(); }}
    >
      <span className="meeting__mobile-delete-text">Удалить встречу</span>
    </div>}
    {props.purpose !== 'edit' &&
    <CreateMeetingFooter
      ready={!!props.selectedRoom && (props.selectedUsers.length !== 0) && (props.theme !== '')}
      accept={props.acceptCreating}
      decline={props.declineCreating}
    />}
    {props.purpose === 'edit' &&
    <EditMeetingFooter
      showDeleteConfirmation={props.showDeleteConfirmation}
      ready={!!props.selectedRoom && (props.selectedUsers.length !== 0) && (props.theme !== '')}
      accept={props.acceptEventEditing}
      decline={props.declineCreating}
    />}

  </section>
);

CreateMeeting.propTypes = {
  filteredUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  recommendations: PropTypes.arrayOf(PropTypes.any).isRequired,
  setDate: PropTypes.func.isRequired,
  setTimeStart: PropTypes.func.isRequired,
  setTimeEnd: PropTypes.func.isRequired,
  selectedRoom: PropTypes.shape({
    date: PropTypes.objectOf(PropTypes.any),
    room: PropTypes.objectOf(PropTypes.any),
    swap: PropTypes.any,
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
  timeStart: PropTypes.instanceOf(Date).isRequired,
  timeEnd: PropTypes.instanceOf(Date).isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  closeModalDeleteConfirmation: PropTypes.func.isRequired,
  acceptDeleting: PropTypes.func.isRequired,
  showDeleteConfirmation: PropTypes.func.isRequired,
  modalDeleteConfirmationOpened: PropTypes.bool.isRequired,
  closeSwapConfirmationModal: PropTypes.func.isRequired,
  confirmEventsSwapAndCreate: PropTypes.func.isRequired,
  swapConfirmationOpened: PropTypes.bool.isRequired,
  acceptEventEditing: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  showSelectedRoom: PropTypes.bool,
  swapData: PropTypes.shape({
    event: PropTypes.objectOf(PropTypes.any),
    room: PropTypes.objectOf(PropTypes.any),
  }),
  purpose: PropTypes.string.isRequired,
};

CreateMeeting.defaultProps = {
  selectedUsers: [],
  selectedRoom: null,
  showSelectedRoom: true,
  swapData: {
    event: {},
    room: {},
  },
};

export default CreateMeeting;
