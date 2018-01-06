import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateMeeting from '../components/CreateMeeting';

class CreateMeetingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectingMembers: false,
      selectedUsers: [],
      filteredUsers: [],
      theme: '',
      userSearchInput: '',
    };

    this.handleFocusList = this.handleFocusList.bind(this);
    this.handleChangeTheme = this.handleChangeTheme.bind(this);
    this.addUserToSelected = this.addUserToSelected.bind(this);
    this.removeUserFromSelected = this.removeUserFromSelected.bind(this);
    this.filterUsers = this.filterUsers.bind(this);
    this.selectingMembersTurningOff = this.selectingMembersTurningOff.bind(this);
    this.selectingMembersTurningOn = this.selectingMembersTurningOn.bind(this);
    this.declineCreating = this.declineCreating.bind(this);
    this.acceptCreating = this.acceptCreating.bind(this);
  }

  componentWillMount() {
    this.setState({
      rooms: [
        {
          label: 'Готем',
          floor: 1,
          id: 1,
        },
        {
          label: 'Поле непаханное',
          floor: 3,
          id: 2,
        },
        {
          label: 'Тёмная башня',
          floor: 5,
          id: 3,
        },
      ],
    });

    this.setState({
      users: [
        {
          login: 'Лекс Лютер',
          avatarUrl: 'http://lostfilm.info/images/news/24693.jpg',
          floor: 7,
          id: 1,
        },
        {
          login: 'Томас Андерсон',
          avatarUrl: 'https://upload.wikimedia.org/wikipedia/ru/thumb/4/4c/Neo2.jpg/220px-Neo2.jpg',
          id: 2,
          floor: 2,
        },
        {
          login: 'Дарт Вейдер',
          avatarUrl: 'http://drivejet.ru/wp-content/uploads/2017/11/d5db8e92_shutterstock_239338216.xxxlarge_2x-230x153.jpg',
          id: 3,
          floor: 8,
        },
        {
          login: 'veged',
          avatarUrl: 'https://avatars3.githubusercontent.com/u/15365?s=460&v=4',
          id: 4,
          floor: 4,
        },
        {
          login: 'alt-j',
          avatarUrl: 'https://avatars1.githubusercontent.com/u/3763844?s=400&v=4',
          id: 5,
          floor: 5,
        },
        {
          login: 'yeti-or',
          avatarUrl: 'https://avatars0.githubusercontent.com/u/1813468?s=460&v=4',
          id: 6,
          floor: 4,
        },
      ],
    });
  }

  addUserToSelected(user) {
    this.setState(state => ({ selectedUsers: state.selectedUsers.concat([user]) }), () => {
      this.setState({ selectingMembers: false });
    });
  }

  removeUserFromSelected(id) {
    const selected = this.state.selectedUsers.filter(user => user.id !== id);
    this.setState({ selectedUsers: selected });
  }

  filterUsers(value) {
    this.setState(() => ({ userSearchInput: value }), () => {
      const filtered = this.state.users.filter(user => user.login.match(new RegExp(value, 'i'))).filter(el => this.state.selectedUsers.filter(selected => selected.id === el.id).length === 0);
      this.setState({ filteredUsers: filtered });
    });
  }

  declineCreating() {
    this.props.changeStageTo('workplace');
  }

  acceptCreating() {
    console.info('accepting');
  }

  selectingMembersTurningOn() {
    this.filterUsers('');
    this.setState({ selectingMembers: true });
  }

  selectingMembersTurningOff() {
    // Evade blur event side effect i know this thing is not good, but currently dunno how to fix it
    // setTimeout(() => {
    //   this.setState({ selectingMembers: false });
    // }, 100);
  }

  handleChangeTheme(value) {
    this.setState({ theme: value });
  }

  handleFocusList() {
    this.listElement.firstChild.focus();
  }

  render() {
    return (
      <CreateMeeting
        listRef={el => this.listElement = el}
        {...this.state}
        declineCreating={this.declineCreating}
        acceptCreating={this.acceptCreating}
        selectingMembersTurningOn={this.selectingMembersTurningOn}
        selectingMembersTurningOff={this.selectingMembersTurningOff}
        filterUsers={this.filterUsers}
        addUserToSelected={this.addUserToSelected}
        removeUserFromSelected={this.removeUserFromSelected}
        handleChangeTheme={this.handleChangeTheme}
        handleFocusList={this.handleFocusList}
      />
    );
  }
}

CreateMeetingContainer.propTypes = {
  changeStageTo: PropTypes.func.isRequired,
};

export default CreateMeetingContainer;
