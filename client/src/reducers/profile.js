import { GET_PROFILE, PROFILE_ERROR,CLEAR_PROFILE } from "../actions/types";
const initalState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  edit:false,
  error: {},
};

export default function (state = initalState, action) {
  const { type, payload,edit } = action;
  debugger
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        edit:edit,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload.msg,
        loading: false,
      };
      case CLEAR_PROFILE:
        return {
          ...state,
          profile:null,
          repos:[],
          loading:false
        }
    default:
      return state;
  }
}
