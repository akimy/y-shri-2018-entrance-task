import React from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import Header from '../Header';
import WorkplaceContainer from '../../containers/WorkplaceContainer';
import Favicon from './favicon.png';
import EditMeetingContainer from '../../containers/EditMeetingContainer';
import CreateMeetingContainer from '../../containers/CreateMeetingContainer';
import ModalCreated from '../ModalCreated';
import SummaryDialog from '../SummaryDialog';

const App = props => (
  <main
    onScroll={() => { props.closeSummaryDialog(); }}
    onClick={() => { props.closeSummaryDialog(); }}
  >
    <Header {...props} />
    {props.stage === 'workplace' && props.modalCreated &&
    <ModalCreated toggleModalCreated={props.toggleModalCreated} />}
    {props.stage === 'workplace' && <WorkplaceContainer toggleSummaryDialog={props.toggleSummaryDialog} />}
    {props.stage === 'editMeeting' && <EditMeetingContainer />}
    {props.stage === 'createMeeting' && <CreateMeetingContainer {...props} />}
    {props.summaryDialogOpened && <SummaryDialog {...props.summaryDialogContent} coords={props.summaryDialogCoords} />}
  </main>
);

App.propTypes = {
  stage: PropTypes.string.isRequired,
  modalCreated: PropTypes.bool.isRequired,
  toggleModalCreated: PropTypes.func.isRequired,
  toggleSummaryDialog: PropTypes.func.isRequired,
  summaryDialogOpened: PropTypes.bool.isRequired,
  summaryDialogContent: PropTypes.shape({
    dateStart: PropTypes.string,
    dateEnd: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    users: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  summaryDialogCoords: PropTypes.objectOf(PropTypes.any),
  closeSummaryDialog: PropTypes.func.isRequired,
};

App.defaultProps = {
  summaryDialogCoords: {},
};

export default App;
