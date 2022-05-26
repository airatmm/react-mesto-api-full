import React from 'react';

const HeaderInfoMobile = ({email, onSignOut, isHeaderInfoOpened}) => {
    const headerInfoMobileClassName =
        `header__info-mobile
    ${isHeaderInfoOpened
            ? 'header__info-mobile_opened'
            : 'header__info-mobile_closed'}`;
    return (
        <div className={headerInfoMobileClassName}>
            <p className="header__email">{email}</p>
            <button className="header__link header__link_signout" onClick={onSignOut}>Выйти</button>
        </div>
    )
}

export default HeaderInfoMobile;