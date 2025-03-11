import React from 'react';

function Header({ fullName, groupNumber, variantNumber }) {
    return (
        <header className="bg-light p-3 mb-3 border-bottom">
            <div className="container">
                <h4>
                    {fullName} — группа {groupNumber}, вариант {variantNumber}
                </h4>
            </div>
        </header>
    );
}

export default Header;
