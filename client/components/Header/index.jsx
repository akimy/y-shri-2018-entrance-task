import React from 'react';
import PropTypes from 'prop-types';
import Logo from './logo.svg';
import './Header.scss';
import Button from '../Button';

const Header = props => (
  <header className="header">
    {/* eslint-disable */
    // todo: image event interaction rule
    }
    <img
      className="header__logo"
      src={Logo}
      alt="Логотип компании"
      onClick={() => { props.changeStageTo('workplace', {}); }}
    />
    {/* eslint-enable */}
    <div className="header__button-container">
      {props.stage.name === 'workplace' &&
      <Button
        className="accept-button"
        label="Создать встречу"
        onClick={{
          func: props.changeStageTo,
          arg: ['createMeeting', {
            purpose: 'createNew',
            body: null,
          }],
        }
      }
      /> }
    </div>
  </header>
);

Header.propTypes = {
  changeStageTo: PropTypes.func.isRequired,
  stage: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Header;
