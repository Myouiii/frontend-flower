import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log('BASE_URL: ', BASE_URL);
//const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjNmNjAzOWY0OGE1M2U4MjJiNWZiYyIsImFkbWluIjp0cnVlLCJpYXQiOjE2Njg4ODg3MjksImV4cCI6MTY3MTkxMjcyOX0.6GEheFKNsqH87aQwugs0CYu4JLNuGa6whHNItgdqrho";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
