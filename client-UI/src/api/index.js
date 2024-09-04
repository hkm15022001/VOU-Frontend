import axios from 'axios';
export const BackEndAddress = import.meta.env.VITE_API_URL;
const API = axios.create({
    baseURL: BackEndAddress,
    //   withCredentials: true,
    // credentials: 'include'
});

API.interceptors.request.use((req) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        req.headers.authorization = `${accessToken}`;
    }

    return req;
});

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
export const getAllEventsForEnterPrise = () => API.get('/event');
export const getAllEvents = () => API.get('/admin/event');
export const getEvent = (identity) => API.get(`/event/${identity}`);
export const createEvent = (newEvent) => API.post('/event', newEvent);
export const updateEvent = (identity, updatedEvent) => API.put(`/event/${identity}`, updatedEvent);
export const deleteEvent = (identity) => API.delete(`/event/${identity}`);
// ----------------------------Enterprise--------------------------
export const getAllEnterprises = () => API.get('/admin/enterprise');
export const getEnterprise = () => API.get(`/enterprise`);
export const createEnterprise = (newEnterprise) => API.post('/enterprise', newEnterprise);
// ----------------------------EndUser--------------------------
export const getAllEndUsers = () => API.get('/enduser');
export const getEndUser = () => API.get(`/enduser`);
export const createEndUser = (newEndUser) => API.post('/enduser', newEndUser);
export const verifyPhone = () => API.get(`/enduser`);
export const sendOtp = (phone) => API.post(`/enduser/sendOTP`, phone)
export const addEventToFavourite = (eventId) => API.get(`/enduser/event/${eventId}/favorite/add`)
export const getAttendedEvents = () => API.get(`/enduser/event`)
export const attendEvent = (id) => API.post(`/enduser/event/${id}`)
export const playEvent = (id, payload) => API.post(`/enduser/playevent/${id}`,  payload)
export const addTurnToUser = (eventId) => API.post(`/enduser/addturn/${eventId}`,{turn:3})
export const getAllTurns = (id) => API.get(`/enduser/event/${id}`)
export const getVouchers = (eventId) => API.get(`/event/${eventId}/voucher`)
export const tradeVoucherGacha = (payload) => API.post(`/enduser/tradevoucher/gacha`,  payload)
export const tradeVoucherQuiz = (payload) => API.post(`/enduser/tradevoucher/quiz`,  payload)

export const getFavouriteEvents = () => API.get(`/enduser/event/favorite`)
export const deleteFavouriteEvent = (event_id) => API.get(`/enduser/event/${event_id}/favorite/remove`)


export const getMyItems = () => API.get(`/enduser/item`)
export const addItems = (payload) => API.post(`/enduser/item`,payload)

export const getItemLists = (gameId) => API.get(`/enduser/itemList/${gameId}`)

export const getEventDetails = (id) => API.get(`/enduser/itemList/${id}`)
export const deleteAttendedEvent = (id) => API.delete(`/enduser/event/${id}`)

deleteAttendedEvent



// export const updateEnterprise = (identity, updatedEnterprise) => API.put(`/enterprise/${identity}`, updatedEnterprise);
// export const deleteEnterprise = (identity) => API.delete(`/enterprise/${identity}`);
// ---------------------------- Auth --------------------------
export const login = (payload) => API.post('/auth/login', payload);
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

export const uploadEventImage = (file) => {
    const formData = new FormData();
    formData.append('image', file);

    return API.post('/image/event/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
