import axios from "axios";
// base Url
axios.defaults.baseURL = "https://0001.uz";

export const apiRequest = async (method, url, data = null) => {
  const options = {
    method,
    url,
    data,
    headers
  };
  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
