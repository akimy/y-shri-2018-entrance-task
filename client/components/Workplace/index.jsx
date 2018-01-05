import React from 'react';
import RoomsList from '../RoomsList';
import InteractiveArea from '../InteractiveArea';
import './Workplace.scss';

const Workplace = () => (
  <section className="workplace">
    <RoomsList />
    <InteractiveArea />
  </section>
);

export default Workplace;
