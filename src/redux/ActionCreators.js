import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../utils/baseUrl";

export const fetchComments = () => dispatch => {
  return fetch("http://localhost:3001/comments")
    .then(res => res.json())
    .then(res => dispatch(addComments(res)))
    .catch(err => dispatch(commentsFailed(err)));
};

export const commentsFailed = errmess => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComments = comments => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const fetchDishes = () => dispatch => {
  dispatch(dishesLoading());

  return fetch("http://localhost:3001/dishes")
    .then(res => res.json())
    .then(res => dispatch(addDishes(res)))
    .catch(error => dispatch(dishesFailed(error)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = errmess => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

export const addDishes = dishes => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

export const fetchPromos = () => dispatch => {
  dispatch(promosLoading());

  return fetch("http://localhost:3001/promotions")
    .then(res => res.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = errmess => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = promos => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

export const fetchLeaders = () => dispatch => {
  dispatch(leadersLoading());

  return fetch("http://localhost:3001/leaders")
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = errmess => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});

export const addLeaders = leaders => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

export const postFavorite = dishId => dispatch => {
  setTimeout(() => {
    dispatch(addFavorite(dishId));
  }, 2000);
};

export const addFavorite = dishId => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: dishId
});

export const addComment = comment => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});

export const postComment = (dishId, rating, author, comment) => dispatch => {
  const newComment = {
    author: author,
    comment: comment,
    dishId: dishId,
    rating: rating
  };
  newComment.date = new Date().toISOString();

  setTimeout(() => {
    dispatch(addComment(newComment));
  }, 2000);
};

export const deleteFavorite = dishId => ({
  type: ActionTypes.DELETE_FAVORITE,
  payload: dishId
});
