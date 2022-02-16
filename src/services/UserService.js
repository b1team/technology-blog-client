import axios from "axios";
import authHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/api/v1/user/";
const API_URL_POST = "http://localhost:8080/api/v1/post";
class UserService {
  getPublicContent() {
    return axios.get(API_URL_POST + "/all");
  }

  getUserBoard(data) {
    return axios.get(API_URL_POST + "/all/" + data, { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "moderator-board", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin-board", { headers: authHeader() });
  }
}

export default new UserService();
