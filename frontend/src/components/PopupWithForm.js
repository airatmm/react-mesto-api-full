import {useCallback, useEffect} from "react";

const PopupWithForm = (
    {
        name,
        title,
        children,
        buttonText,
        isOpen,
        onClose,
        onSubmit,
        isLoading
    }
) => {

    const handleCloseByClick = (evt) => {
        if (evt.currentTarget === evt.target) {
            onClose();
        }
    }

    const handleEscClose = useCallback(({key}) => {
        if (key === 'Escape') {
            onClose()
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener('keydown', handleEscClose);
        return () => {
            document.removeEventListener('keydown', handleEscClose);
        }
    }, [handleEscClose, isOpen]);

    return (
        <div onClick={handleCloseByClick} className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__content">
                <button className={`popup__close popup__close_${name}`} type="button" onClick={onClose}/>
                <h2 className="popup__title">{title}</h2>
                <form onSubmit={onSubmit} className={`popup__form popup__form__${name}`} name="form_profile" noValidate>
                    {children}
                    <button type="submit" className="popup__button popup__button_edit_save"
                            name="save">{isLoading ? 'Сохранение...' : buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default  PopupWithForm;