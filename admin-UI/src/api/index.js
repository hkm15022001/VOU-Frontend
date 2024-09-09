import axios from 'axios';
export const BackEndAddress = import.meta.env.VITE_API_URL
const API = axios.create({
    baseURL: BackEndAddress,
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


// ----------------------------User (staff) --------------------------
export const getAllUsers = () => API.get('/user');
export const getUser = (identity) => API.get(`/user/${identity}`);
export const createUser = (newUser) => API.post('/user', newUser);
export const updateUser = (identity, updatedUser) => API.put(`/user/${identity}`, updatedUser);
export const deleteUser = (identity) => API.delete(`/user/${identity}`);
// ----------------------------Games--------------------------
export const getAllGames = () => API.get('/game');
export const getGame = (identity) => API.get(`/game/${identity}`);
export const createGame = (newGame) => API.post('/game', newGame);
export const updateGame = (identity, updatedGame) => API.put(`/game/${identity}`, updatedGame);
export const deleteGame = (identity) => API.delete(`/game/${identity}`);
// ----------------------------Events--------------------------
export const getAllEvents = () => API.get('/event/all');
export const getEvent = (identity) => API.get(`/event/${identity}`);
export const createEvent = (newEvent) => API.post('/event', newEvent);
export const updateEvent = (identity, updatedEvent) => API.put(`/event/${identity}`, updatedEvent);
export const deleteEvent = (identity) => API.delete(`/event/${identity}`);
// ----------------------------Enterprise--------------------------
export const getAllEnterprises = () => API.get('/user/enterprise/all');
// export const getEnterprise = (identity) => API.get(`/enterprise/${identity}`);
// export const createEnterprise = (newEnterprise) => API.post('/enterprise', newEnterprise);
// export const updateEnterprise = (identity, updatedEnterprise) => API.put(`/enterprise/${identity}`, updatedEnterprise);
// export const deleteEnterprise = (identity) => API.delete(`/enterprise/${identity}`);
// ---------------------------- Auth --------------------------
export const login = (payload) => API.post('/user/login', payload);
// ---------------------------- Statistics --------------------------
export const getCountAllUsers = () => API.get('/user/statistic/total_users');
export const getCountAllGames = () => API.get('/user/statistic/total_games');
export const getCountAllEnterprises = () => API.get('/user/statistic/total_enterprises');
export const getCountAllEndUsers = () => API.get('/user/statistic/total_end_users');
export const getStatisticUsers = () => API.get('/user/statistic/total_new_end_users_in_week')
export const getStatisticEnterprises = () => API.get('/user/statistic/total_new_enterprises_in_week')


// ----------------------------image --------------------------
export const getGameImage = (identity) => API.get(`/image/game/${identity}`);

export const uploadGameImage = (file) => {
    const formData = new FormData();
    formData.append('image', file);

    return API.post('/image/game/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
