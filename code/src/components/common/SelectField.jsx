import React from 'react';
import PropTypes from 'prop-types';

const SelectField = props => {

    const defaultOption = [<option key={`default_${props.identifier}`} value={''}>{props.emptyOptionLabel}</option>];
    const providedOptions = props.options.map((option, key) => <option key={key} value={option.value}>{option.name}</option>);
    const options = defaultOption.concat(providedOptions);

    return (
        <div className={props.wrapperClassName}>
            <label htmlFor={props.identifier}>{props.label}</label>
            <select id={props.identifier} value={props.value} onChange={props.onChange}>
                {options}
            </select>
        </div>
    );
};

SelectField.propTypes = {
    wrapperClassName: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    emptyOptionLabel: PropTypes.string.isRequired,
    identifier: PropTypes.string.isRequired,
};

export default SelectField;