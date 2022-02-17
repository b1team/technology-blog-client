import axios from "axios";
import authHeader from "./AuthHeader.js";

const API_URL = "http://127.0.0.1:8080/api/v1/user";
const API_URL_POST = "http://127.0.0.1:8080/api/v1/post";
class UserService {
  // update user profile
  updateUser(data) {
    return axios.put(API_URL + "/update/" + data.id, data, {
      headers: authHeader(),
    });
  }

  getPublicContent() {
    return axios.get(API_URL_POST + "/all");
  }

  getUserBoard(data) {
    return axios.get(API_URL_POST + "/all/" + data, { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "/moderator-board", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "/admin-board", { headers: authHeader() });
  }

  updateProfile(data) {
    return axios.put(API_URL + "/update/profile", data, { headers: authHeader() });
  }

  getUserById(data) {
    return axios.get(API_URL + "/" + data, { headers: authHeader() });
  }
}

export default new UserService();
