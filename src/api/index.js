import axios from 'axios';

const API = axios.create({
    baseURL: 'http://34.124.217.226:7000/admin',
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
API.interceptors.response.use(
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
        return Promise.reject(err);
    }
);

export const apiInstance = API;

export const BackEndAddress = 'http://34.124.217.226:7000'
// ----------------------------User (staff) --------------------------
export const getAllUsers = () => API.get('/user');
export const getUser = (identity) => API.get(`/user/${identity}`);
export const createUser = (newUser) => API.post('/user', newUser);
export const updateUser = (identity, updatedUser) => API.put(`/user/${identity}`, updatedUser);
export const deleteUser = (identity) => API.delete(`/user/${identity}`);
// ----------------------------User (staff) --------------------------
export const getAllGames = () => API.get('/game');
export const getGame = (identity) => API.get(`/game/${identity}`);
export const createGame = (newGame) => API.post('/game', newGame);
export const updateGame = (identity, updatedGame) => API.put(`/game/${identity}`, updatedGame);
export const deleteGame = (identity) => API.delete(`/game/${identity}`);
// ---------------------------- Auth --------------------------
// export const getAllUsers = () => API.get('/login');
// ---------------------------- Statistics --------------------------
export const getCountAllUsers = () => API.get('/statistic/total_users');
export const getCountAllGames = () => API.get('/statistic/total_games');
export const getCountAllEnterprises = () => API.get('/statistic/total_enterprises');
export const getCountAllEndUsers = () => API.get('/statistic/total_end_users');

// ----------------------------image --------------------------
export const uploadGameImage = () => API.get('/image/game');
export const getGameImage = (identity) => API.get(`/image/game/${identity}`);


