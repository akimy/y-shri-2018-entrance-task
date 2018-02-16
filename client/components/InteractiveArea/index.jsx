import React from 'react';
import PropTypes from 'prop-types';
import './InteractiveArea.scss';

const currentDate = new Date();

/** Display current
 * Function for boundary cases (From 8AM to 11PM)
 * @returns bool
 */

const displayCurrent = (calendar, current) => {
  if (current.getHours() < 8 || current.getHours() > 24) {
    return false;
  }
  const currDateValue = current.getDate() + current.getMonth() * 30 + current.getFullYear() * 360;
  const calendarDateValue = calendar.getDate() + calendar.getMonth() * 30 +
   calendar.getFullYear() * 360;
  return currDateValue === calendarDateValue;
};


/**
 * Function for translate click event cord to chosed Date
 * @param {float} x
 * @returns {Date} event date
 */
const cordToTime = (x, calendarDate) => {
  const hour = 0.0173913 * x + 3.23913;
  const date = calendarDate;
  date.setHours(0);
  date.setMinutes(0);
  return new Date(date.getTime() + hour * 60 * 60 * 1000);
};

/**
 * @param {Number} val timeline hour
 * @returns {Number} x cord for layout greed
 */
const calculateXCord = val => ((val - 8) * 57.5) + 28.75;

/**
 * @param {Date} dateStart
 * @returns {Number} left x cord for event
 */
const calculateXCordForEvent = dateStart =>
  ((new Date(dateStart).getHours() - 8) * 57.5) +
  (new Date(dateStart).getMinutes() * 57.5 / 60) + 28.75;

const calculatePointStatus = (curr, date) => {
  const currDateValue = curr.getDate() + curr.getMonth() * 30 + curr.getFullYear() * 360;
  const calendarDateValue = date.getDate() + date.getMonth() * 30 + date.getFullYear() * 360;

  if (currDateValue > calendarDateValue) {
    return 'before';
  } else if (currDateValue < calendarDateValue) {
    return 'after';
  }
  return 'today';
};

const getPermissionForCreateEvent = (date, pointStatus, clientX) =>
  ((clientX > calculateXCordForEvent(date) + 245) && pointStatus === 'today') && clientX < 1140
   || (pointStatus === 'after' && clientX < 1140);

const getTimeLineLabelClass = (pointStatus, val) => {
  switch (pointStatus) {
    case 'before': return 'timeline__hour-label_faded';
    case 'after': return 'timeline__hour-label';
    case 'today': {
      if (val > new Date().getHours()) {
        return 'timeline__hour-label';
      }
      return 'timeline__hour-label_faded';
    }
    default: return '';
  }
};

const InteractiveArea = ({ floors, ...props }) => {
  const leftMarginForCurrent = calculateXCordForEvent(currentDate) - 25;

  const pointStatus = calculatePointStatus(currentDate, props.calendarDate);

  const timeLineElements = [...Array(25).keys()].splice(8, 16).map(val => (
    <div key={val} className={getTimeLineLabelClass(pointStatus, val)}>
      {`${val}:00`}
    </div>));

  const verticalLines = [...Array(16).keys()].map(val => (
    <line
      key={val + 8}
      x1={calculateXCord(val + 8)}
      y1="46"
      x2={calculateXCord(val + 8)}
      y2="100%"
      className="timeline__vertical-lines"
    />
  ));

  const currentLine = (<line
    x1={calculateXCordForEvent(currentDate)}
    y1="23"
    x2={calculateXCordForEvent(currentDate)}
    y2="100%"
    className="timeline__current-line"
  />);


  /* Tracks layout explanation:
  Zero point for Y-axis marked in location of first-floor label + height distance
  from that to the first-room: 82 + 20.8 = 102.8px;
    For each floor block we'll increase the Y value by previousFloorsCount * 43px
  (floor label & padding) and AllPreviousRoomsCount * 49px - (summary rooms
  blocks height).
    For each room block we'll increment Y value by roomsCountInsed * 49px (in case
  of previous rooms summary height inside that block) */

  let previousRoomsCount = 0;
  const floorsTracks = (
    <g transform="translate(0, 102.8)">
      {floors.map((el, i) => (
        <g key={el.floor} transform={`translate(0, ${(i * 43) + (52 * previousRoomsCount)})`}>
          {previousRoomsCount += el.rooms.length}
          {el.rooms.map((room, j) => {
            const pointerEnabled = props.hoveredRoomId === room.id && props.pointerXCord < 900 && pointStatus !== 'before';

            return (
              <g key={room.id} transform={`translate(0, ${j * 52})`}>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  className="timeline__empty-track"
                  onMouseMove={(e) => {
                    if (getPermissionForCreateEvent(currentDate, pointStatus, e.clientX)) {
                      if (e.target.style.cursor !== 'none') {
                        e.target.style.cursor = 'none';
                      }
                      props.handleTimelineMouseIn(room.id);
                      props.handleTimelineMouseMove(e.clientX);
                    } else {
                      if (e.target.style.cursor === 'none') {
                        e.target.style.cursor = 'default';
                      }
                      props.handleTimelineMouseOut();
                    }
                }}
                  onClick={(e) => {
                    if (window.innerWidth < 900 && (props.calendarDate.getTime() > new Date().getTime())) {
                      props.handleTimelineClick(props.calendarDate, room);
                    } else if (getPermissionForCreateEvent(currentDate, pointStatus, e.clientX)) {
                    props.handleTimelineClick(cordToTime(e.clientX, props.calendarDate), room);
                  }
                }}
                  onMouseOut={() => { props.handleTimelineMouseOut(); }}
                />
                {room.events.map((event) => {
                let width = calculateXCordForEvent(event.dateEnd) -
                calculateXCordForEvent(event.dateStart);

                // 00-08 AM
                if (width < 0) {
                  width = calculateXCord(24) - calculateXCordForEvent(event.dateStart);
                }
                const startEventCord = calculateXCordForEvent(event.dateStart);
                return (
                ((width > 0) && (calculatePointStatus(props.calendarDate, new Date(event.dateStart)) === 'today')) &&
                <rect
                  key={event.id}
                  x={startEventCord}
                  y="0"
                  width={width}
                  className="timeline__event-track"
                  tabIndex="0"
                  onKeyDown={(e) => {
                    if ((e.keyCode === 32) || (e.keyCode === 13)) {
                      props.toggleSummaryDialog(e.target.getBoundingClientRect(), event);
                    }
                  }}
                  onClick={e => props.toggleSummaryDialog(e.target.getBoundingClientRect(), event)}
                />);
              })}
                {pointerEnabled &&
                <rect className="timeline__pointer" rx="2" ry="2" x="0" y="0" transform={`translate(${props.pointerXCord}, 0)`} />}
                {pointerEnabled &&
                <line className="timeline__pointer-icon" x1="28.5" x2="28.5" y1="8" y2="20" strokeWidth="2px" transform={`translate(${props.pointerXCord}, 0)`} stroke="white" />}
                {pointerEnabled &&
                <line className="timeline__pointer-icon" x1="22" x2="35" y1="14" y2="14" strokeWidth="2px" transform={`translate(${props.pointerXCord}, 0)`} stroke="white" />}
              </g>);
              })}
        </g>))}
    </g>
  );

  return (
    <div className="interactive-area">
      <div className="timeline">
        {displayCurrent(props.calendarDate, currentDate) &&
        <div className="timeline__current-badge-container" style={{ left: `${leftMarginForCurrent}px` }}>
          <span className="timeline__current-badge-text">
            {`${currentDate.getHours()}:${currentDate.getMinutes() < 10 ? '0' : ''}${currentDate.getMinutes()}`}
          </span>
        </div>}
        {timeLineElements}
      </div>
      <div className="graph-container">
        <svg className="graph">
          {floorsTracks}
          {displayCurrent(props.calendarDate, currentDate) && currentLine}
          {verticalLines}
        </svg>
      </div>
    </div>
  );
};

InteractiveArea.propTypes = {
  floors: PropTypes.arrayOf(PropTypes.object),
  calendarDate: PropTypes.instanceOf(Date).isRequired,
  toggleSummaryDialog: PropTypes.func.isRequired,
  handleTimelineMouseIn: PropTypes.func.isRequired,
  handleTimelineMouseOut: PropTypes.func.isRequired,
  handleTimelineMouseMove: PropTypes.func.isRequired,
  handleTimelineClick: PropTypes.func.isRequired,
  hoveredRoomId: PropTypes.string,
};

InteractiveArea.defaultProps = {
  floors: [],
  hoveredRoomId: '',
};

export default InteractiveArea;

