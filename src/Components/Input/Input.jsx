import React, { useState } from 'react';
import './input.scss';

function Input(inpDetails) {
    const [focus, setFocus] = useState(false);
    const { label, onChange, type, errorMsg, options, ...detail } = inpDetails;

    const handleBlur = () => {
        setFocus(true);
    };

    return (
        <div className="input_component">
            <label>{label}</label>
            {type === 'select' ? (
                <select
                    className="input_field"
                    {...detail}
                    onChange={onChange}
                    onBlur={handleBlur}
                    onFocus={() => setFocus(true)}
                    focused={focus.toString()}
                >
                    <option value="" disabled>Select an option</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    className="input_field"
                    {...detail}
                    onChange={onChange}
                    onBlur={handleBlur}
                    onFocus={() => detail.name === 'password' && setFocus(true)}
                    focused={focus.toString()}
                    type={type}
                />
            )}
            <span>{errorMsg}</span>
        </div>
    );
}

export default Input;
