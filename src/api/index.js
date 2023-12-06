import axios from "axios";
import { getItem } from "../helpers/persistance-storage";

// base Url
axios.defaults.baseURL = "https://0001.uz";

const addUserUrl = "signup";
const getUserUrl = "myself";

export const fetchUserInfo = (header) => {
  return axios.get(getUserUrl, {
    headers: header,
  });
};

export const postUserInfo = (data) => {
  return axios.post(addUserUrl, data);
};
