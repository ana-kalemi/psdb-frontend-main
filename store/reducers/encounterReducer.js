import { GET_TYPE_ENCOUNTER, GET_TYPE_ENCOUNTER_ERROR } from "../types";

const initState = {
  encounters: [],
  loading: true,
};

const encounterReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_TYPE_ENCOUNTER:
      return {
        ...state,
        encounters: action.payload,
        loading: false,
      };

    case GET_TYPE_ENCOUNTER_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default encounterReducer;
