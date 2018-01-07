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
      <RoomsList floors={props.floors} />
    </div>
    <div className="workplace__right-column">
      <InteractiveArea floors={props.floors} />
    </div>
  </section>
);

Workplace.propTypes = {
  floors: PropTypes.arrayOf(PropTypes.object),
};

Workplace.defaultProps = {
  floors: [],
};

export default Workplace;
