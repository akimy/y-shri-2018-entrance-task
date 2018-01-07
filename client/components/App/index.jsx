import React from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import Header from '../Header';
import WorkplaceContainer from '../../containers/WorkplaceContainer';
import Favicon from './favicon.png';
import EditMeetingContainer from '../../containers/EditMeetingContainer';
import CreateMeetingContainer from '../../containers/CreateMeetingContainer';
import ModalCreated from '../ModalCreated';

const App = props => (
  <main>
    <Header {...props} />
    {props.stage === 'workplace' && props.modalCreated &&
    <ModalCreated toggleModalCreated={props.toggleModalCreated} />}
    {props.stage === 'workplace' && <WorkplaceContainer />}
    {props.stage === 'editMeeting' && <EditMeetingContainer />}
    {props.stage === 'createMeeting' && <CreateMeetingContainer {...props} />}
  </main>
);

App.propTypes = {
  stage: PropTypes.string.isRequired,
  modalCreated: PropTypes.bool.isRequired,
  toggleModalCreated: PropTypes.func.isRequired,
};

export default App;
