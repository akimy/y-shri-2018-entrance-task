import React from 'react';
import PropTypes from 'prop-types';
import './InputField.scss';

const InputField = ({ id, ...props }) => (
  <div className="input-field">
    <label htmlFor={id} className="input-field__label">
      {props.label}
    </label>
    <input
      id={id}
      className="input-field__control"
      value={props.value}
      placeholder={props.placeholder}
      onFocus={() => props.onFocus()}
      onBlur={() => props.onBlur()}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.keyCode === 40) {
          e.preventDefault();
          props.handleFocusList();
        }
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    />
  </div>
);

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  handleFocusList: PropTypes.func,
};

InputField.defaultProps = {
  handleFocusList: () => {},
  value: '',
  placeholder: '',
  onBlur: () => {},
  onFocus: () => {},
  onChange: () => {},
};

export default InputField;
