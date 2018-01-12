import React from 'react';
import PropTypes from 'prop-types';
import RoomsList from '../RoomsList';
import InteractiveArea from '../InteractiveArea';
import Calendar from '../Calendar';
import './Workplace.scss';

const Workplace = props => (
  <section className="workplace">
    <div className="workplace__left-column">
      <Calendar />
      <RoomsList floors={props.floors} hoveredRoomId={props.hoveredRoomId} />
    </div>
    <div className="workplace__right-column">
      <InteractiveArea
        floors={props.floors}
        toggleSummaryDialog={props.toggleSummaryDialog}
        handleTimelineMouseIn={props.handleTimelineMouseIn}
        handleTimelineMouseOut={props.handleTimelineMouseOut}
        handleTimelineMouseMove={props.handleTimelineMouseMove}
        handleTimelineClick={props.handleTimelineClick}
        hoveredRoomId={props.hoveredRoomId}
        pointerXCord={props.pointerXCord}
      />
    </div>
  </section>
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
};

Workplace.defaultProps = {
  floors: [],
  hoveredRoomId: null,
  pointerXCord: 0,
};

export default Workplace;
