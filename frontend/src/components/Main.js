import React, {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Card from './Card';

const Main = (
    {
        cards,
        onEditAvatar,
        onEditProfile,
        onAddPlace,
        onCardClick,
        onCardLike,
        onCardDeleteClick
    }
) => {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar" onClick={onEditAvatar}>
                    {currentUser.avatar && <img className="profile__image" src={currentUser.avatar} alt="Аватар"/>}
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button className="button profile__button profile__button_action_edit" type="button"
                            onClick={onEditProfile}/>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button className="button profile__button profile__button_action_add" type="button"
                        onClick={onAddPlace}/>
            </section>
            <section className="cards">
                <ul className="cards__list">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDeleteClick={onCardDeleteClick}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;