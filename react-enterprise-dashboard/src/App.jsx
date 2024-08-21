import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ColorContext } from './ColorContext/darkContext';
import Home from './Components/Home/Home';
import AddNew from './Pages/AddNew/AddNew';
import EventDetails from './Pages/EventDetail/EventDetail.jsx';
import Lists from './Pages/Lists/Lists';
import Profile from './Pages/Profile/Profile.jsx'
import './app.scss';

// Dynamicaly change the data for different pages(replaceable)
const eventInpDetails = [
    {
        id: 1,
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Name of Event',
        required: true,
        errorMsg: 'Name of Event is required!',
    },
    {
        id: 2,
        name: 'voucher_num',
        label: 'Voucher Number',
        type: 'number',
        placeholder: 'Voucher Number',
        required: true,
        errorMsg: 'Voucher Number is required!',
    },
    {
        id: 3,
        name: 'start_time',
        label: 'Start Time',
        type: 'datepicker',
        placeholder: 'Select start time',
        required: true,
        errorMsg: 'Start time is required!',
    },
    {
        id: 4,
        name: 'end_time',
        label: 'End Time',
        type: 'datepicker',
        placeholder: 'Select end time',
        required: true,
        errorMsg: 'End time is required!',
    },
    {
        id: 5,
        name: 'game_id',
        label: 'Game',
        type: 'select',
        placeholder: 'Select game',
        required: true,
        errorMsg: 'Game selection is required!',
    },
];

function App() {
    // color state management using react context
    const { darkMode } = useContext(ColorContext);

    return (
        <div className={darkMode ? 'App dark' : 'App'}>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="events">
                        <Route index element={<Lists type="events" />} />
                        <Route path=":eventId" element={<EventDetails />} />
                        <Route
                            path="addnew"
                            element={
                                <AddNew
                                    inputs={eventInpDetails}
                                    titlee="Add New Event"
                                    type="EVENT"
                                />
                            }
                        />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
