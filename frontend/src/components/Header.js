import React from 'react';
import {Link, useLocation/*, Route, Switch*/} from 'react-router-dom';
import logo from '../images/logo.svg';
import HeaderInfo from "./HeaderInfo";
import Hamburger from "./Hamburger";

const Header = ({ email, onSignOut, loggedIn,  isHeaderInfoOpened, onHamburgerClick}) => {
    const {pathname} = useLocation();
    const linkText = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
    const linkPath = `${pathname === '/sign-in' ? 'sign-up' : 'sign-in'}`;

    return (
        <header className="header">
            <div className="header__content">
                <img className="header__logo" src={logo} alt="Логотип"/>
                {loggedIn ?
                    <>
                        <HeaderInfo email={email} onSignOut={onSignOut} />
                        <Hamburger isHeaderInfoOpened={isHeaderInfoOpened} onHamburgerClick={onHamburgerClick}/>
                    </>
                    : <Link to={linkPath} className="link header__link">{linkText}</Link>}
            </div>
        </header>
    );
}

export default Header;
