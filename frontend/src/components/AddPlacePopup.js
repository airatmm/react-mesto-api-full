import PopupWithForm from "./PopupWithForm";
import {useEffect, useState} from "react";

const AddPlacePopup = ({isOpen, onClose, onAddPlace, isLoading}) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');


    const handleNameChange = (evt) => {
        setName(evt.target.value);
    }

    const handleLinkChange = (evt) => {
        setLink(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onAddPlace({
            name,
            link
        });
    }
// очищение инпутов, но почему-то не работает, жду ответа в слаке
    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    return (
        <PopupWithForm
            name="card"
            title="Новое место"
            buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <input onChange={handleNameChange}
                   value={name}
                   id="cardtitle"
                   placeholder="Название"
                   type="text"
                   className="popup__input popup__input_card_name"
                   name="name"
                   required minLength="2"
                   maxLength="30"/>
            <span className="popup__error cardtitle-error"/>
            <input onChange={handleLinkChange}
                   value={link} id="cardurl"
                   placeholder="Ссылка на картинку"
                   type="url"
                   className="popup__input popup__input_card_url"
                   name="link"
                   required/>
            <span className="popup__error cardurl-error"/>
        </PopupWithForm>
    )
}

export default AddPlacePopup;