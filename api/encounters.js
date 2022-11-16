import axios from "axios";
import config from '../constant';

const EncounterAPI = {
  getAll: async (caption) => {
    try {
      const response = await axios.get(config.SERVER_URL + config.GET_ENCOUNTERS, {params:{caption:caption}});
      return response;
    } catch (error) {
      return error.response;
    }
  },
  get: async (eid) => {
    try {
        const response = await axios.get(config.SERVER_URL + config.GET_ENCOUNTER, { params: { eid: eid } });
        return response;
      } catch (error) {
        return error.response;
      }
  }
}

export default EncounterAPI;