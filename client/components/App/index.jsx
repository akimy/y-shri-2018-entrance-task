import React from 'react';
import PropTypes from 'prop-types';
import './App.scss';
import Header from '../Header';
import Favicon from './favicon.png';
import ModalCreated from '../ModalCreated';
import SummaryDialog from '../SummaryDialog';
import WorkplaceContainer from '../../containers/WorkplaceContainer';
import CreateMeetingContainer from '../../containers/CreateMeetingContainer';


const App = props => (
  <main
    onScroll={() => { props.closeSummaryDialog(); }}
    onClick={() => { props.closeSummaryDialog(); }}
  >
    <Header {...props} />
    {props.stage.name === 'workplace' && props.modalCreated &&
    <ModalCreated
      toggleModalCreated={props.toggleModalCreated}
      modalCreatedContent={props.modalCreatedContent}
    />}
    {props.stage.name === 'workplace' &&
    <WorkplaceContainer
      toggleSummaryDialog={props.toggleSummaryDialog}
      changeStageTo={props.changeStageTo}
    />}
    {props.stage.name === 'createMeeting' &&
    <CreateMeetingContainer
      {...props}
      setModalCreatedContent={props.setModalCreatedContent}
    />}
    {props.summaryDialogOpened &&
    <SummaryDialog
      {...props.summaryDialogContent}
      coords={props.summaryDialogCoords}
      handleEditMeeting={props.handleEditMeeting}
    />}
  </main>
);

App.propTypes = {
  stage: PropTypes.objectOf(PropTypes.any).isRequired,
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
  setModalCreatedContent: PropTypes.func.isRequired,
  changeStageTo: PropTypes.func.isRequired,
  handleEditMeeting: PropTypes.func.isRequired,
  modalCreatedContent: PropTypes.shape({
    dateEnd: PropTypes.string,
    dateStart: PropTypes.string,
    room: PropTypes.shape({
      floor: PropTypes.number,
      title: PropTypes.string,
    }),
  }),
};

App.defaultProps = {
  summaryDialogCoords: {},
  modalCreatedContent: {
    dateStart: '',
    dateEnd: '',
    room: {
      floor: 0,
      title: '',
    },
  },
};

export default App;
