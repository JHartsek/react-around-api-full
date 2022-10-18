import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Header from './Header.js';
import Main from './Main.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmDeletePopup from './ConfirmDeletePopup.js';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer.js';
import Api from '../utils/api.js';
import * as auth from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ProtectedRoute from './ProtectedRoute.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [token, setToken] = React.useState(localStorage.getItem('jwt'))
  const [currentPage, setCurrentPage] = React.useState('login');
  const [device, setDevice] = React.useState('computer');
  const [email, setEmail] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [registrationStatus, setRegistrationStatus] = React.useState('');
  const [cardForDeletion, setCardForDeletion] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});

  const history = useHistory();

  const apiOptions = {
    baseUrl: "https://api.around-the-us-hartsek.students.nomoredomainssbs.ru",
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`
  }
  };

  const api = new Api(apiOptions); 
  
  React.useEffect(() => {
    setToken(localStorage.getItem('jwt'))
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentPage('home');
          const userEmail = res.email;
          setEmail(userEmail);
          history.push('/');
          loadInitialContent();
          getScreenWidth();
        })
        .catch((err) => console.log(err));
    };
  }, [history, token]);

  function getScreenWidth() {
    if(window.innerWidth <= 525) {
      setDevice('phone')
    }
  }

  function loadInitialContent() {
    api
      .getInitialData()
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleUpdateUser(info) {
    setIsLoading(true);
    api
      .editProfile(info.name, info.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateAvatar(info) {
    setIsLoading(true);
    api
      .updateAvatar(info['link-avatar'])
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({});
    setCardForDeletion({});
  }

  React.useEffect(() => {
    const closeByEsc = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEsc);

    return () => document.removeEventListener('keydown', closeByEsc);
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((userId) => userId === currentUser._id);
    setIsLoading(true);

    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard
            )
          );
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else if (isLiked) {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard
            )
          );
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  function handelCardDelete(card) {
    setIsConfirmDeletePopupOpen(true);
    setCardForDeletion(card);
  }

  function handleConfirmCardDelete() {
    setIsLoading(true)
    api
      .deletePost(cardForDeletion._id)
      .then(() => {
        const updatedCards = cards.filter(
          (card) => card._id !== cardForDeletion._id
        );
        setCards(updatedCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true)
    api
      .addPost(card.title, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleSignUp(email, password) {
    setIsLoading(true);
    auth
      .register(email, password)
      .then(() => {
        setRegistrationStatus('success');
      })
      .catch((err) => {
        setRegistrationStatus('failure');
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
        setIsLoading(false);
      })
  }

  function handleLogIn(email, password) {
    setIsLoading(true);
    auth
      .login(email, password)
      .then((res) => {
        setToken(res.token)
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        setCurrentPage('home');
        setEmail(email);
        setCurrentUser(res);
        loadInitialContent();
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleSignUpClick() {
    setCurrentPage('signup');
  }

  function handleLoginClick() {
    setCurrentPage('login');
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setToken('');
    setCurrentUser({})
    setCurrentPage('login');
    setIsLoggedIn(false);
  }

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          currentPage={currentPage}
          device={device}
          onSignUpClick={handleSignUpClick}
          onLoginClick={handleLoginClick}
          onLogoutClick={handleLogout}
          email={email}
        />
        <Switch>
          <Route path='/around-react/signin'>
            <Login
              onLoginSubmit={handleLogIn}
              currentPage={currentPage}
              onLinkClick={handleSignUpClick}
              isLoading={isLoading}
            />
          </Route>
          <Route path='/around-react/signup'>
            <Register
              onSignUp={handleSignUp}
              currentPage={currentPage}
              onLinkClick={handleLoginClick}
              isLoading={isLoading}
            />
            <InfoTooltip
              isOpen={isInfoToolTipOpen}
              status={registrationStatus}
              onClose={closeAllPopups}
            />
          </Route>
          <ProtectedRoute isLoggedIn={isLoggedIn} path='/'>
            <Main
              onEditAvatarClick={handleEditAvatarClick}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onCardClick={handleCardClick}
              card={selectedCard}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handelCardDelete}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              isLoading={isLoading}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isLoading}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              isLoading={isLoading}
              onClose={closeAllPopups}
              onAddPlaceSubmit={handleAddPlaceSubmit}
            />

            <ConfirmDeletePopup
              isOpen={isConfirmDeletePopupOpen}
              isLoading={isLoading}
              onClose={closeAllPopups}
              onConfirmCardDelete={handleConfirmCardDelete}
            />

            <ImagePopup
              isOpen={isImagePopupOpen}
              onClose={closeAllPopups}
              card={selectedCard}
            />
          </ProtectedRoute>
        </Switch>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
