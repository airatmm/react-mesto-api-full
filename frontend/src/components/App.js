import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch, useHistory, useLocation} from 'react-router-dom';
import Header from './Header';
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from "./Register";
import InfoTooltip from './InfoTooltip'
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import HeaderInfoMobile from "./HeaderInfoMobile";
import loader from '../images/loader.svg';
import successAuth from '../images/success.svg';
import failAuth from '../images/fail.svg';

const App = () => {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [cardDelete, setCardDelete] = useState({});
    const [isLoading, setIsLoading] = useState(false); // процесс загрузки, сохранения и тд (Сохранение...)
    const [data, setData] = useState({
        email: ""
    });
    //хуки вместо классов
    //useState - предоставляет функциональным компонентам доступ к состоянию React
    //объявляем переменную состояния []
    const [infoToolTip, setInfoToolTip] = useState({
        open: false,
        status: false
    });
    const [message, setMessage] = useState({
        pathIcon: loader,
        text: ''
    });
    const [loggedIn, setLoggedIn] = useState(false);
    const [isHeaderInfoOpened, setIsHeaderInfoOpened] = useState(false);
    const history = useHistory(); // предоставляет доступ к history, используем для навигации (React Router)
    const location = useLocation();

// открытие попапов кликом
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }
// попап подтверждения удаления
    const handleConfirmDeleteCard = (card) => {
        setIsConfirmDeletePopupOpen(true);
        setCardDelete(card);
    }
// закрыть все попапы
    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmDeletePopupOpen(false);
        setSelectedCard(null);
        setInfoToolTip({
            open: false,
            status: false
        });
        // setMessage({
        //     pathIcon: loader,
        //     text: ''
        // });
    }
// лайк карточки
    const handleCardLike = (card) => {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                // map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
            })
            .catch((err) => console.log(`Ошибка ${err}`));
    }
// удаление карточки
    const handleCardDelete = () => {
        api.deleteCard(cardDelete._id)
            .then(() => {
                //filter() создаёт новый массив со всеми элементами, прошедшими проверку, задаваемую в передаваемой функции
                // результатом всегда будет массив, true - записываем в результат, false - игнорируется
                const newCards = cards.filter((c) => c._id !== cardDelete._id);
                setCards(newCards);
            })
            .catch(err => {
                console.log(`Ошибка при удалении карточки: ${err} `)
            })
    }
// обновление юзер инфо, редактирование профиля
    const handleUpdateUser = (info) => {
        setIsLoading(true);
        api.editProfile(info)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(`Ошибка обновления профиля ${err}`))
            .finally(() => setIsLoading(false));
    }
// редактирование аватара
    const handleUpdateAvatar = (avatar) => {
        setIsLoading(true);
        api.changeUserAvatar(avatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(`Ошибка обновления аватара ${err}`))
            .finally(() => setIsLoading(false));
    }
// добавить новую карточку
    const handleAddPlaceSubmit = (newCard) => {
        setIsLoading(true);
        api.addNewCard(newCard)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(`Ошибка добавления новой карточки ${err}`))
            .finally(() => setIsLoading(false));
    }
// запусается после разметки и отрисовки
// и перерендерится при логине (зависимость)
    useEffect(() => {
        //if (loggedIn) { // нужна ли проверка, нужно же загрузить один раз при рендере
            Promise.all([
                api.getCards(),
                api.getUserInfo()
            ])
                .then(([cards, info]) => {
                    setCards(cards);
                    setCurrentUser(info);
                })
                .catch((err) => console.log(`Ошибка загрузки данных с сервера (cards или userInfo) ${err}`));
       // }
    }, [loggedIn]);

    // было /сохранение токена в localstorage/
    // сейчас просто устанавливаем данные
    const checkRes = (data) => {
        if (data) {
            //setToken(res.jwt);
            setData({
                email: data.email
            });
            // setLoggedIn(true);
            // history.replace({pathname: "/"});
        }
    };

    useEffect(() => {
            auth.getContent()
                .then((data) => {
                    if (data && data.email) {
                        setLoggedIn(true);
                        checkRes(data);
                        history.push("/");
                    } else {
                        history.push("/sign-in")
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setLoggedIn(false);
                    setData({
                        email: ""
                    });
                });
         // }
    }, [loggedIn, history]); // зависимость от хистори и loggedIn


// выход
    const handleSignOut = () => {
        auth.signout();
        setLoggedIn(false);
        setData({
            email: null
        });
        //removeToken();
        history.push('/sign-in');
        setIsHeaderInfoOpened(false)
    }
// логин
    const handleLogin = (email, password) => {
        setIsLoading(true);
        auth.authorize(email, password)
            .then((data) => {
                checkRes(data)
                setLoggedIn(true);
                history.push('/');
            })
            .catch((err) => {
                console.error(err)
                setInfoToolTip({
                    open: true,
                    status: false
                });
                setMessage({pathIcon: failAuth, text: 'Что-то пошло не так! Попробуйте ещё раз.'});

            })
            .finally(() => {
                setIsLoading(false);
            });
    };
// регистрация
    const handleRegister = (email, password) => {
        setIsLoading(true);
        auth.register(email, password)
            .then((data) => {
                checkRes(data)
                setMessage({pathIcon: successAuth, text: 'Вы успешно зарегистрировались!'});
                history.replace({pathname: '/sign-in'})
                setInfoToolTip({
                    open: true,
                    status: true
                });
            })
            .catch((err) => {
                console.error(err)
                setInfoToolTip({
                    open: true,
                    status: false
                });
                setMessage({pathIcon: failAuth, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Открытие/закрытие инфо пользователя в мобильной версии
    const openHeaderInfo = () => {
        setIsHeaderInfoOpened(!isHeaderInfoOpened);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <>
                {(loggedIn && isHeaderInfoOpened)
                    && (<HeaderInfoMobile
                        email={data.email}
                        onSignOut={handleSignOut}
                        isHeaderInfoOpened={isHeaderInfoOpened}
                    />)}

                <Header
                    loggedIn={loggedIn}
                    onSignOut={handleSignOut}
                    email={data.email}
                    isHeaderInfoOpened={isHeaderInfoOpened}
                    onHamburgerClick={openHeaderInfo}
                    locaction={location}
                />
                <Switch>
                    <ProtectedRoute
                        exact path="/"
                        loggedIn={loggedIn}
                        component={Main}
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDeleteClick={handleConfirmDeleteCard}
                    />
                    <Route path='/sign-in'>
                        <Login
                            onLogin={handleLogin}
                            isLoading={isLoading}
                        />
                    </Route>
                    <Route path='/sign-up'>
                        <Register
                            onRegister={handleRegister}
                            isLoading={isLoading}
                        />
                    </Route>
                    <Route>
                        {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
                    </Route>

                </Switch>
                <Footer/>

                <InfoTooltip
                    infoToolTip={infoToolTip}
                    onClose={closeAllPopups}
                    message={message}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isLoading={isLoading}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                />

                <ConfirmDeletePopup
                    isOpen={isConfirmDeletePopupOpen}
                    onClose={closeAllPopups}
                    onCardDelete={handleCardDelete}
                >
                </ConfirmDeletePopup>

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                >
                </ImagePopup>
            </>
        </CurrentUserContext.Provider>
    );
}

export default App;
