import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ColorContext } from './ColorContext/darkContext';
import Home from './Components/Home/Home';
import AddNew from './Pages/AddNew/AddNew';
import BlogDetail from './Pages/BlogDetail/BlogDetail';
import GameDetail from './Pages/GameDetail/GameDetail';
import Lists from './Pages/Lists/Lists';
import Login from './Pages/Login/Login';
import UserDetailsPage from './Pages/UserDetail/UserDetailsPage';
import './app.scss';

// Dynamicaly change the data for different pages(replaceable)
const userInpDetails = [
    {
        id: 2,
        name: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'John23',
        required: true,
        pattern: '^[A-Za-z0-9]{3,12}$',
        errorMsg: 'Username should be 3-12 characters & should not include any special character!',
    },
    {
        id: 3,
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'John Smith',
        required: true,
        pattern: '^[A-Za-z]{1,20}$',
        errorMsg: 'Name is required!',
    },
    {
        id: 4,
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'example@email.com',
        required: true,
        errorMsg: 'Enter a valid email!',
    },
    {
        id: 5,
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Password',
        required: true,
        pattern: '^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,20}$',
        errorMsg:
            'Password should be 6-20 characters and include at last 1 num, 1 letter, 1 special character!',
    },
    {
        id: 6,
        name: 'phone',
        label: 'Phone',
        type: 'text',
        placeholder: 'Phone',
        required: true,
        errorMsg: 'Phone is required!',
    },
    {
        id: 7,
        label: "Role",
        type: "select",
        name: "role",
        options: [
            { label: 'Admin', value: 'admin' },
            { label: 'End User', value: 'end_user' },
            { label: 'Enterprise', value: 'enterprise' },
        ],
        errorMsg: "Please select an option",
        required: true,
    }
];
const gameInpDetails = [
    {
        id: 2,
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Name of Game',
        required: true,
        errorMsg: 'Name of Game is required!',
    },
    {
        id: 3,
        name: 'type',
        label: 'Type',
        type: 'text',
        placeholder: 'Type of Game',
        required: true,
        errorMsg: 'Type of Game is required!',
    },
    {
        id: 4,
        label: "Exchange Allow",
        type: "select",
        name: "exchange_allow",
        options: [
            { label: 'True', value: true },
            { label: 'False', value: false },
        ],
        errorMsg: "Please select an option",
        required: true,
    },
    {
        id: 5,
        name: 'tutorial',
        label: 'Tutorial',
        type: 'text',
        placeholder: 'Tutorial',
        required: true,
        errorMsg: 'Tutorial is required!',
    },
];
const blogInputs = [
    {
        id: 1,
        name: 'title',
        label: 'Title',
        type: 'text',
        placeholder: 'Blog title',
        required: true,
        errorMsg: 'Title is required!',
    },
    {
        id: 2,
        name: 'description',
        label: 'Description',
        type: 'text',
        placeholder: 'Blog description',
        required: true,
        errorMsg: 'Description is required!',
    },
    {
        id: 3,
        name: 'tags',
        label: 'Tags',
        type: 'text',
        placeholder: 'Travel, Communication',
        required: true,
        errorMsg: 'Tag is required!',
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
                        <Route path="login" element={<Login />} />
                        {/* nested routes */}
                        <Route path="users">
                            <Route index element={<Lists type="users" />} />
                            <Route path=":userId" element={<UserDetailsPage  />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNew
                                        inputs={userInpDetails}
                                        titlee="Add New User"
                                        type="USER"
                                    />
                                }
                            />
                        </Route>

                        <Route path="events" element={<Lists type="events" />} />

                        {/* nested routes */}
                        <Route path="games">
                            <Route index element={<Lists type="games" />} />
                            <Route path=":gameId" element={<GameDetail />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNew
                                        inputs={gameInpDetails}
                                        titlee="Add New Game"
                                        type="GAME"
                                    />
                                }
                            />
                        </Route>

                        <Route path="enterprise">
                            <Route index element={<Lists type="enterprise" />} />
                            <Route path=":blogId" element={<BlogDetail />} />
                            <Route
                                path="addnew"
                                element={
                                    <AddNew inputs={blogInputs} titlee="Add New Blog" type="BLOG" />
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
        </div>
    );
}

export default App;
