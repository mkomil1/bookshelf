import axios from "axios";
import { getItem } from "../helpers/persistance-storage";

// base Url
axios.defaults.baseURL = "https://0001.uz";

const addUserUrl = "signup";
const getUserUrl = "myself";
const addBookUrl = "books";
const getBooksUrl = (value) => `books/${value}`;
const deleteBooksUrl = (id) => `books/${id}`;

export const fetchUserInfo = async (header) => {
  return await axios.get(getUserUrl, {
    headers: header,
  });
};

export const postUserInfo = (data) => {
  return axios.post(addUserUrl, data);
};

export const fetchBooks = async (value, header) => {
  return await axios.get(getBooksUrl(value), {
    headers: header,
  });
};

export const postBook = async (header, data) => {
  return await axios.post(addBookUrl, data, {
    headers: header,
  });
};

export const fetchUserBooks = async (header) => {
  return await axios.get(addBookUrl, { headers: header });
};

// export const editBook = async (id, header) => {
//   return await axios.patch()
// }

export const deleteBook = async (id, header) => {
  return await axios.delete(deleteBooksUrl(id), { headers: header });
};
