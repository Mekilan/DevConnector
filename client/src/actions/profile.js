import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.msg, status: err.response.status },
    });
  }
};

export const ProfileCreation =
  (formData,edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/profile", formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
        edit: edit,
      });
      dispatch(setAlert(edit ? "Profile Updated" : "Profile Created"));
    } catch (err) {
      const errors = err.response.data.msg;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }
    }
  };
