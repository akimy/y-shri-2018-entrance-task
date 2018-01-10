import React from 'react';
import PropTypes from 'prop-types';
import './InteractiveArea.scss';

const currentDateTime = new Date();

/** Display current
 * Function for boundary cases (From 8AM to 11PM)
 * @returns bool
 */

const displayCurrent = () => !(currentDateTime.getHours() < 8 || currentDateTime.getHours() > 24);

/**
 * @param {Number} val timeline hour
 * @returns {Number} x cord for layout greed
 */
const calculateXCord = val => ((((val - 8) * 60) * 7) / 6) + 34.5;

/**
 * @param {DateTime} dateStart
 * @returns {Number} left x cord for event
 */
const calculateXCordForEvent = dateStart =>
  ((((((new Date(dateStart)).getHours() - 8) * 60) +
  (new Date(dateStart)).getMinutes()) * 7) / 6) + 34.5;


const InteractiveArea = ({ floors, ...props }) => {
  const [hour, min] = [currentDateTime.getHours(), currentDateTime.getMinutes()];
  const leftMarginForCurrent = calculateXCordForEvent(currentDateTime) - 25;

  const timeLineElements = [...Array(25).keys()].splice(8, 16).map(val => (
    <div key={val} className={val > hour ? 'timeline__hour-label' : 'timeline__hour-label_faded'}>
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
    x1={calculateXCordForEvent(currentDateTime)}
    y1="23"
    x2={calculateXCordForEvent(currentDateTime)}
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
          {el.rooms.map((room, j) => (
            <g key={room.id} transform={`translate(0, ${j * 52})`}>
              <rect x="0" y="0" width="100%" height="28" className="timeline__empty-track" />
              {room.events.map((event) => {
                let width = calculateXCordForEvent(event.dateEnd) -
                calculateXCordForEvent(event.dateStart);

                // End of the day
                if (width < 0) {
                  width = calculateXCord(24) - calculateXCordForEvent(event.dateStart);
                }
                const startEventCord = calculateXCordForEvent(event.dateStart);
                return (<rect
                  key={event.id}
                  x={startEventCord}
                  y="0"
                  width={width}
                  height="28"
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
            </g>))}
        </g>))}
    </g>
  );

  return (
    <div className="interactive-area">
      <div className="timeline">
        {displayCurrent() &&
        <div className="timeline__current-badge-container" style={{ left: `${leftMarginForCurrent}px` }}>
          <span className="timeline__current-badge-text">
            {`${hour}:${min < 10 ? '0' : ''}${min}`}
          </span>
        </div>}
        {timeLineElements}
      </div>
      <div className="graph-container">
        <svg className="graph">
          {floorsTracks}
          {displayCurrent() && currentLine}
          {verticalLines}
        </svg>
      </div>
    </div>
  );
};

InteractiveArea.propTypes = {
  floors: PropTypes.arrayOf(PropTypes.object),
  toggleSummaryDialog: PropTypes.func.isRequired,
};

InteractiveArea.defaultProps = {
  floors: [],
};

export default InteractiveArea;

