import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwner = props.card.owner._id === currentUser._id; 
  const isLiked = props.card.likes.some(user => user._id === currentUser._id)

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="posts-grid__post post">
      <div className="post__content">
        <img
          src={props.link}
          className="post__image"
          alt={props.name}
          onClick={handleClick}
        />
        <button
          type="button"
          className={`post__delete ${isOwner ? 'post__delete_visible' : 'post__delete_hidden'}`}
          aria-label="delete-post"
          onClick={handleDeleteClick}
        ></button>
      </div>
      <div className="post__caption">
        <h3 className="post__caption-text"> {props.name}</h3>
        <div className="post__caption-interactions">
          <button
            type="button"
            className={`post__caption-like__button ${isLiked && 'post__caption-like__button_active'}`}
            aria-label="like-post"
            onClick={handleLikeClick}
          ></button>
          <p className="post__caption-likes"> {props.likes} </p>
        </div>
      </div>
    </article>
  );
}

export default Card;
