import React from 'react';
import PropTypes from 'prop-types';
import './InteractiveArea.scss';

const calculateXCord = val => (((val * 60) * 7) / 6) + 34.5;

const InteractiveArea = ({ floors }) => {
  const currentDateTime = new Date();
  const [hour, min] = [currentDateTime.getHours(), currentDateTime.getMinutes()];
  const leftMarginForCurrent = (((hour * 60) + min) * 7) / 6;

  const timeLineElements = [...Array(25).keys()].map(val => (
    <div key={val} className={val > hour ? 'timeline__hour-label' : 'timeline__hour-label_faded'}>
      {`${val === 24 ? '0' : val}:00`}
    </div>));

  const verticalLines = [...Array(25).keys()].map(val => (
    <line
      key={val}
      x1={calculateXCord(val)}
      y1="46"
      x2={calculateXCord(val)}
      y2="100%"
      className="timeline__vertical-lines"
    />
  ));

  const currentLine = (<line
    x1={leftMarginForCurrent + 25}
    y1="23"
    x2={leftMarginForCurrent + 25}
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
        <g key={el.floor} transform={`translate(0, ${(i * 43) + (49 * previousRoomsCount)})`}>
          {previousRoomsCount += el.rooms.length}
          {el.rooms.map((room, j) => (
            <g key={room.id} transform={`translate(0, ${j * 49})`}>
              <rect x="0" y="0" width="100%" height="28" fill="#fff" />
            </g>))}
        </g>))}
    </g>
  );

  return (
    <div className="interactive-area">
      <div className="timeline">
        <div className="timeline__current-badge-container" style={{ left: `${leftMarginForCurrent}px` }}>
          <span className="timeline__current-badge-text">
            {`${hour}:${min < 10 ? '0' : ''}${min}`}
          </span>
        </div>
        {timeLineElements}
      </div>
      <div className="graph-container">
        <svg className="graph">

          {floorsTracks}

          {currentLine}
          {verticalLines}
        </svg>
      </div>
    </div>
  );
};

InteractiveArea.propTypes = {
  floors: PropTypes.arrayOf(PropTypes.object),
};

InteractiveArea.defaultProps = {
  floors: [],
};

export default InteractiveArea;

