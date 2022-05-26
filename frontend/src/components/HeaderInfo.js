import React from 'react';

const HeaderInfo = ({email, onSignOut}) => {
    return (
        <div className="header__info">
            <p className="header__email">{email}</p>
            <button className="header__link header__link_signout" onClick={onSignOut}>Выйти</button>
        </div>
    )
}

export default HeaderInfo;