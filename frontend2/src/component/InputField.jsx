import React from 'react';

export default function InputField({ label, type, value, onChange, placeholder }) {
    return (
        <div className="input-field">
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
