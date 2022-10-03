import React from "react";

import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatarClick}>
          <img
            id="avatar-image"
            className="profile__avatar-image"
            alt="avatar"
            src={currentUser.avatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__info-name"> {currentUser.name}</h1>
          <p className="profile__info-descriptor"> {currentUser.about}</p>
          <button
            type="button"
            className="profile__info-edit-button"
            aria-label="edit-profile-info"
            onClick={props.onEditProfileClick}
          ></button>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="add-post"
          onClick={props.onAddPlaceClick}
        ></button>
      </section>

      <section className="posts-grid">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              name={card.name}
              link={card.link}
              likes={card.likes.length}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
