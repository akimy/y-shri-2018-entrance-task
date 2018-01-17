import React from 'react';
import PropTypes from 'prop-types';
import RoomsList from '../RoomsList';
import InteractiveArea from '../InteractiveArea';
import Calendar from '../Calendar';
import './Workplace.scss';

const Workplace = props => (
  <main className="workplace">
    <div className="workplace__left-column">
      <Calendar
        setCalendarDate={props.setCalendarDate}
        handleCalendarLeftArrowClick={props.handleCalendarLeftArrowClick}
        handleCalendarRightArrowClick={props.handleCalendarRightArrowClick}
        calendarDate={props.calendarDate}
      />
      <RoomsList floors={props.floors} hoveredRoomId={props.hoveredRoomId} />
    </div>
    <div className="workplace__right-column">
      <div className="workplace__scroll-container">
        <InteractiveArea
          floors={props.floors}
          toggleSummaryDialog={props.toggleSummaryDialog}
          handleTimelineMouseIn={props.handleTimelineMouseIn}
          handleTimelineMouseOut={props.handleTimelineMouseOut}
          handleTimelineMouseMove={props.handleTimelineMouseMove}
          handleTimelineClick={props.handleTimelineClick}
          hoveredRoomId={props.hoveredRoomId}
          pointerXCord={props.pointerXCord}
          calendarDate={props.calendarDate}
        />
      </div>
    </div>
  </main>
);

Workplace.propTypes = {
  floors: PropTypes.arrayOf(PropTypes.object),
  toggleSummaryDialog: PropTypes.func.isRequired,
  handleTimelineMouseIn: PropTypes.func.isRequired,
  handleTimelineMouseOut: PropTypes.func.isRequired,
  handleTimelineMouseMove: PropTypes.func.isRequired,
  handleTimelineClick: PropTypes.func.isRequired,
  hoveredRoomId: PropTypes.string,
  pointerXCord: PropTypes.number,
  setCalendarDate: PropTypes.func.isRequired,
  calendarDate: PropTypes.instanceOf(Date).isRequired,
  handleCalendarLeftArrowClick: PropTypes.func.isRequired,
  handleCalendarRightArrowClick: PropTypes.func.isRequired,
};

Workplace.defaultProps = {
  floors: [],
  hoveredRoomId: null,
  pointerXCord: 0,
};

export default Workplace;
