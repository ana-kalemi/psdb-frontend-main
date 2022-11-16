import { GET_TYPE_ENCOUNTER, GET_TYPE_ENCOUNTER_ERROR } from "../types";
import EncounterAPI from "../../api/encounters";

export const getEncounters = (param) => async (dispatch) => {
    const { data } = await EncounterAPI.getAll(param);
    try {
        dispatch({
            type: GET_TYPE_ENCOUNTER,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_TYPE_ENCOUNTER_ERROR,
            payload: "error message",
        });
    }
};
