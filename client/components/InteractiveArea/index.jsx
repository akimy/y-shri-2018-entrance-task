import React from 'react';
import './InteractiveArea.scss';

const calculateXCord = val => (((val * 60) * 7) / 6) + 34.5;

const InteractiveArea = () => {
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
          <line
            x1={leftMarginForCurrent + 25}
            y1="23"
            x2={leftMarginForCurrent + 25}
            y2="100%"
            className="timeline__current-line"
          />
          {verticalLines}
        </svg>
      </div>
    </div>
  );
};

export default InteractiveArea;

