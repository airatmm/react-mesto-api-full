import PopupWithForm from "./PopupWithForm";
import React, {useEffect} from "react";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar, isLoading}) => {

    const avatar = React.useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatar.current.value,
        });
    }
    useEffect(() => {
        avatar.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
            <input
                ref={avatar}
                id="avatar"
                placeholder="Ссылка на картинку"
                type="url"
                className="popup__input popup__input_avatar"
                name="avatar"
                required/>
            <span className="popup__error avatar-error"/>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;