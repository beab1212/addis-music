import axios from "axios";

const HOME_URL = "http://localhost:5000/api/v1";
// const HOME_URL = "http://192.168.1.3:5000/api/v1";


export default axios.create({
    baseURL: HOME_URL,
    headers: { "Content-Type": "application/json" },
});

export const axiosPrivate = axios.create({
    baseURL: HOME_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
