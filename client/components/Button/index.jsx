import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ onClick, label, className }) => (
  <button className={className} onClick={onClick}>
    {label}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Button;

