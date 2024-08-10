import axios from 'axios';

const API = axios.create({
    baseURL: 'http://34.124.217.226:3000/admin',
    //   withCredentials: true,
    // credentials: 'include'
});

// Add a request interceptor
API.interceptors.request.use((req) => {
    // Add Header Authorization
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        req.headers.authorization = `${accessToken}`;
    }

    //   const language = localStorage.getItem('i18nextLng') ?? 'vi';
    //   req.headers['accept-language'] = language;

    //   let uid = localStorage.getItem('uid');
    //   if (!uid) {
    //     uid = Date.now();
    //     localStorage.setItem('uid', uid);
    //   }
    //   req.headers.uid = uid;

    return req;
});

// Add a response interceptor
axios.interceptors.response.use(
    // eslint-disable-next-line arrow-body-style
    (res) => {
        // do something with response data
        return res;
    },
    (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
    }
);

export const apiInstance = API;


// ----------------------------User (staff) --------------------------
export const getAllUsers = () => API.get('/user');
export const getUser = (identity) => API.get(`/user/${identity}`);
export const createUser = (newUser) => API.post('/user', newUser);
export const updateUser = (identity, updatedUser) => API.put(`/user/${identity}`, updatedUser);
export const deleteUser = (identity) => API.delete(`/user/${identity}`);

