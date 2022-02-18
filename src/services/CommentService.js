import axios from "axios";
import authHeader from "./AuthHeader.js";

const API_COMMENT = "http://127.0.0.1:8080/api/v1/comment";

class CommentService {
    comment(data) {
        return axios.post(API_COMMENT + "/add", data, { headers: authHeader() });
    }

    getComment(data) {
        return axios.get(API_COMMENT + "/all/" + data, { headers: authHeader() });
    }
}

export default new CommentService();