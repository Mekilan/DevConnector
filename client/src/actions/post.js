import axios from "axios";
import { setAlert } from "./alert";
import { ADD_POST, DELETE_POST, GET_POST, POST_ERROR, UPDATE_LIKES,SINGLE_POST,ADD_COMMENT,REMOVE_COMMENT } from "./types";

export const Getposts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/post");
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/like/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/post/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("Post removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/post/`,formData,config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};
export const getSinglePost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/${id}`);
    dispatch({
      type: SINGLE_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};


export const addComment = (postId,formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/post/comment/${postId}`,formData,config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

export const deleteComment = (postId,commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/post/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};