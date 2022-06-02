import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {useContext} from "react";

const Card = ({card, onCardClick, onCardLike, onCardDeleteClick}) => {
    const currentUser = useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (`cards__delete ${isOwn ? 'cards__delete_type_visible' : 'cards__delete_type_hidden'}`);

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (`cards__like ${isLiked ? 'cards__like_active' : ''}`);

    const handleClick = () => {
        onCardClick(card);
    }

    const handleLikeClick = () => {
        onCardLike(card);
    }

    const handleDeleteClick = () => {
        onCardDeleteClick(card);
    }

    return (
        <li className="cards__item">
            <button type="button" className={cardDeleteButtonClassName } onClick={handleDeleteClick}/>
            <img className="cards__images" src={card.link} alt={card.name} onClick={handleClick}/>
            <div className="cards__content">
                <h2 className="cards__caption">{card.name}</h2>
                <div>
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
                    <p className="cards__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;
