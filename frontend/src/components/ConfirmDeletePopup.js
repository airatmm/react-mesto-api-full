import PopupWithForm from "./PopupWithForm";
import React from "react";

const ConfirmDeletePopup = ({isOpen, onClose, onCardDelete}) => {

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onCardDelete();
        onClose();
    }

    return (
        <PopupWithForm
            name="delete"
            title="Вы уверены"
            buttonText="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        </PopupWithForm>
    )
}

export default ConfirmDeletePopup;

