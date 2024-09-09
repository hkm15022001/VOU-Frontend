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
export const getAllEventsForEnterPrise = () => API.get('/event');
export const getAllEvents = () => API.get('/event/all');
export const getEvent = (identity) => API.get(`/event/${identity}`);
export const createEvent = (newEvent) => API.post('/event', newEvent);
export const updateEvent = (identity, updatedEvent) => API.put(`/event/${identity}`, updatedEvent);
export const deleteEvent = (identity) => API.delete(`/event/${identity}`);
// ----------------------------Enterprise--------------------------
export const getAllEnterprises = () => API.get('/user/enterprise/all');
export const getEnterprise = () => API.get(`/user/enterprise`);
export const updateEnterprise = (payload) => API.put(`/user/enterprise`, payload);
export const createEnterprise = (newEnterprise) => API.post('/user/enterprise', newEnterprise);
export const getVoucherByEvent = (id) => API.get(`/event/${id}/voucher`)
export const deleteVoucher = (id) => API.delete(`/event/voucher/${id}`)
export const createVoucher = (eventId, payload) => API.post(`/event/${eventId}/voucher`, payload);
export const getTotalAttendancesByEventIDInWeek = (id) => API.get(`/user/enterprise/statistic/total_attendances_by_event_id_in_week/${id}`)
export const getAttendancesInWeek
    = () => API.get(`/user/enterprise/statistic/total_attendances_in_week`)
export const getEventPercent = () => API.get(`/user/enterprise/statistic/event_percent`)



// ----------------------------EndUser--------------------------
// export const getAllEndUsers = () => API.get('/user/enduser');
export const getEndUser = () => API.get(`/user/enduser`);
export const createEndUser = (newEndUser) => API.post('/user/enduser', newEndUser);
export const verifyPhone = () => API.get(`/user/enduser`);
export const sendOtp = (phone) => API.post(`/user/sendOTP`, phone)
export const addEventToFavourite = (eventId) => API.get(`/user/event/${eventId}/favorite/add`)
export const getAttendedEvents = () => API.get(`/user/event`)
export const attendEvent = (id) => API.post(`/user/event/${id}`)
export const playEvent = (id, payload) => API.post(`/user/playevent/${id}`, payload)
export const addTurnToUser = (eventId) => API.post(`/user/addturn/${eventId}`, { turn: 3 })
export const getAllTurns = (id) => API.get(`/user/event/${id}`)
export const getVouchers = (eventId) => API.get(`/event/${eventId}/voucher`)
export const tradeVoucherGacha = (payload) => API.post(`/user/tradevoucher/gacha`, payload)
export const tradeVoucherQuiz = (payload) => API.post(`/user/tradevoucher/quiz`, payload)

export const getFavouriteEvents = () => API.get(`/user/event/favorite`)
export const deleteFavouriteEvent = (event_id) => API.get(`/user/event/${event_id}/favorite/remove`)


export const getMyItems = () => API.get(`/item`)
export const addItems = (payload) => API.post(`/item`, payload)
export const giveItem = (payload) => API.post(`/item/trade`, payload)

export const getItemLists = (gameId) => API.get(`/item/list/game/${gameId}`)

export const deleteAttendedEvent = (id) => API.delete(`/user/event/${id}`)




// export const updateEnterprise = (identity, updatedEnterprise) => API.put(`/enterprise/${identity}`, updatedEnterprise);
// export const deleteEnterprise = (identity) => API.delete(`/enterprise/${identity}`);
// ---------------------------- Auth --------------------------
export const login = (payload) => API.post('/user/login', payload);
// ---------------------------- Statistics --------------------------
export const getCountAllUsers = () => API.get('/user/admin/statistic/total_users');
export const getCountAllGames = () => API.get('/user/admin/statistic/total_games');
export const getCountAllEnterprises = () => API.get('/user/admin/statistic/total_enterprises');
export const getCountAllEndUsers = () => API.get('/user/admin/statistic/total_end_users');
export const getStatisticUsers = () => API.get('/user/admin/statistic/total_new_end_users_in_week')
export const getStatisticEnterprises = () => API.get('/user/admin/statistic/total_new_enterprises_in_week')


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

export const uploadVoucherImage = (file) => {
    const formData = new FormData();
    formData.append('image', file);

    return API.post('/image/voucherimage/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

