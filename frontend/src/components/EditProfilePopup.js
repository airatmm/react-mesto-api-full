import PopupWithForm from "./PopupWithForm";
import React, {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const EditProfilePopup = (
    {
        isOpen,
        onClose,
        onUpdateUser,
        isLoading
    }
) => {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [isOpen, currentUser]);

    const handleNameChange = (evt) => {
        setName(evt.target.value);
    }

    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value);
    }

    const handleSubmit = (evt) => {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <input
                id="title"
                value={name || ''}
                onChange={handleNameChange}
                placeholder="Имя"
                type="text"
                className="popup__input popup__input_type_title"
                name="name"
                required minLength="2" maxLength="40"/>
            <span className="popup__error title-error"/>
            <input
                id="description"
                value={description || ''}
                onChange={handleDescriptionChange}
                placeholder="О себе" type="text"
                className="popup__input popup__input_type_description" name="description" required
                minLength="2"
                maxLength="200"/>
            <span className="popup__error description-error"/>
        </PopupWithForm>
    );
}

export default EditProfilePopup