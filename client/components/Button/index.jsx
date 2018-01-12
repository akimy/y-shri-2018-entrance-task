import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ onClick, label, className }) => (
  <button className={className} onClick={() => onClick.func(...onClick.arg)}>
    {label}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.shape({
    func: PropTypes.func.isRequired,
    arg: PropTypes.any.isRequired,
  }),
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

Button.defaultProps = {
  onClick: { func: () => {}, arg: '' },
};

export default Button;
