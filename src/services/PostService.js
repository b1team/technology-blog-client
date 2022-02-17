import axios from "axios";
import authHeader from "./AuthHeader.js";

const API_URL = "http://127.0.0.1:8080/api/v1/post";

class PostService {
    createPost(data) {
        return axios.post(API_URL + "/create", data, { headers: authHeader() });
    }
    updatePost(data) {
        return axios.put(API_URL + "/update/" + data.id, data, { headers: authHeader() })
    }
    deletePost() {
        return axios.delete(API_URL + "/delete/:id", { headers: authHeader() });
    }
    getSlug(slug) {
        return axios.get(API_URL + "/get/" + slug, { headers: authHeader() });
    }
    getAllPosts() {
        return axios.post(API_URL + "/all", { headers: authHeader() });
    }
    getAllPostsForUser() {
        return axios.post(API_URL + "/all/:user_id", { headers: authHeader() });
    }
    getTopTags() {
        return axios.get("http://127.0.0.1:8080/api/v1/tag/all", { headers: authHeader() });
    }
    getPostwithTag(data) {
        return axios.get(API_URL + "/tags/" + data, { headers: authHeader() });
    }
}

export default new PostService();
