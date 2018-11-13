import React from 'react';
import PropTypes from 'prop-types';

const TextField = props => (
    <div className={props.wrapperClassName}>
        <label htmlFor={props.identifier}>{props.label}</label>
        <input id={props.identifier} placeholder={props.placeholder} type="text" value={props.value} onChange={props.onChange} />
    </div>
);

TextField.propTypes = {
    wrapperClassName: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    identifier: PropTypes.string.isRequired,
};

export default TextField;