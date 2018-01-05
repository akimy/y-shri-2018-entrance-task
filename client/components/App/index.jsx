import React from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import Header from '../Header';
import Navigation from '../Navigation';
import Workplace from '../Workplace';
import Favicon from './favicon.png';
import EditMeetingContainer from '../../containers/EditMeetingContainer';
import CreateMeetingContainer from '../../containers/CreateMeetingContainer';

const App = props => (
  <main>
    <Header {...props} />
    {props.stage === 'workplace' && <Navigation />}
    {props.stage === 'workplace' && <Workplace />}
    {props.stage === 'editMeeting' && <EditMeetingContainer />}
    {props.stage === 'createMeeting' && <CreateMeetingContainer {...props} />}
  </main>
);

App.propTypes = {
  stage: PropTypes.string.isRequired,
};

export default App;
