import React from 'react';
import PropTypes from 'prop-types';
import './InputField.scss';

const InputField = props => (
  <div className="input-field">
    <label htmlFor={props.id} className="input-field__label">
      {props.label}
    </label>
    <input id={props.id} className="input-field__control" placeholder={props.placeholder} />
  </div>
);

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

InputField.defaultProps = {
  placeholder: '',
};

export default InputField;
