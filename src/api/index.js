import axios from 'axios';

const API = axios.create({
    baseURL: 'http://34.124.217.226:7000',
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
export const getAllUsers = () => API.get('/admin/user');
export const getUser = (identity) => API.get(`/admin/user/${identity}`);
export const createUser = (newUser) => API.post('/admin/user', newUser);
export const updateUser = (identity, updatedUser) => API.put(`/admin/user/${identity}`, updatedUser);
export const deleteUser = (identity) => API.delete(`/admin/user/${identity}`);
// ----------------------------Games--------------------------
export const getAllGames = () => API.get('/admin/game');
export const getGame = (identity) => API.get(`/admin/game/${identity}`);
export const createGame = (newGame) => API.post('/admin/game', newGame);
export const updateGame = (identity, updatedGame) => API.put(`/admin/game/${identity}`, updatedGame);
export const deleteGame = (identity) => API.delete(`/admin/game/${identity}`);
// ----------------------------Events--------------------------
export const getAllEvents = () => API.get('/admin/event');
export const getEvent = (identity) => API.get(`/event/${identity}`);
export const createEvent = (newEvent) => API.post('/event', newEvent);
export const updateEvent = (identity, updatedEvent) => API.put(`/event/${identity}`, updatedEvent);
export const deleteEvent = (identity) => API.delete(`/event/${identity}`);
// ----------------------------Enterprise--------------------------
export const getAllEnterprises = () => API.get('/admin/enterprise');
// export const getEnterprise = (identity) => API.get(`/enterprise/${identity}`);
// export const createEnterprise = (newEnterprise) => API.post('/enterprise', newEnterprise);
// export const updateEnterprise = (identity, updatedEnterprise) => API.put(`/enterprise/${identity}`, updatedEnterprise);
// export const deleteEnterprise = (identity) => API.delete(`/enterprise/${identity}`);
// ---------------------------- Auth --------------------------
// export const getAllUsers = () => API.get('/login');
// ---------------------------- Statistics --------------------------
export const getCountAllUsers = () => API.get('/admin/statistic/total_users');
export const getCountAllGames = () => API.get('/admin/statistic/total_games');
export const getCountAllEnterprises = () => API.get('/admin/statistic/total_enterprises');
export const getCountAllEndUsers = () => API.get('/admin/statistic/total_end_users');
export const getStatisticUsers = () => API.get('/admin/statistic/total_new_end_users_in_week')
export const getStatisticEnterprises = () => API.get('/admin/statistic/total_new_enterprises_in_week')


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
