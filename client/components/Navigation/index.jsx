import React from 'react';
import Calendar from '../Calendar';
import Timeline from '../Timeline';
import './Navigation.scss';

const Navigation = () => (
  <section className="navigation">
    <Calendar />
    <Timeline />
  </section>
);

export default Navigation;
