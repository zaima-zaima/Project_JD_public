import axios from "axios";

const request = axios.create();

request.interceptors.response.use((response) => {
  if (response.data.code === 401) {
    localStorage.removeItem("token");
  }

  if (response.status === 200 && response.data.code === 0) {
    if (response.headers["authorization"]) {
      localStorage.setItem("token", response.headers["authorization"]);
    }
    return response.data.data;
  } else {
    return response.data;
  }
});

request.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers["authorization"] = token;
  }

  return request;
});

export default request;
