import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createEvent, uploadEventImage, getAllGames } from '../../api';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Input from '../../Components/Input/Input';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import noImage from '/Images/photo-camera.png';
import './New.scss';

function AddNew({ inputs, titlee, type }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [games, setGames] = useState([]); // State để lưu danh sách các game
    const initialInputValues = inputs.reduce((acc, curr) => {
        acc[curr.name] = '';
        return acc;
    }, {});
    const [userInp, setUserInp] = useState(initialInputValues);
    const [file, setFile] = useState('');

    // Lấy danh sách game khi component được mount
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await getAllGames();
                setGames(response.data.data); // Giả sử API trả về danh sách game trong `response.data`
            } catch (error) {
                toast.error('Failed to load games. Please try again!');
            }
        };

        fetchGames();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'voucher_num') {
            newValue = parseInt(value, 10);
        }
        setUserInp({ ...userInp, [name]: newValue });
    };

    const handleDateChange = (date, name) => {
        setUserInp({ ...userInp, [name]: date });
    };

    const callAPI = async (call, type,updatedUserInp) => {
        try {
            await call(updatedUserInp);
            setLoading(false);
            navigate(`/enterprise/${type}s`);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                toast.error(`Error creating ${type}: ${error.response.data?.message || 'Please try again!'}`);
            } else {
                toast.error(`Error creating ${type}. Please try again!`);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imagePath = '';

            if (file) {
                const uploadResponse = await uploadEventImage(file);
                imagePath = uploadResponse.data.data;
            }

            const updatedUserInp = { ...userInp, images: imagePath };
            await callAPI(createEvent, 'event',updatedUserInp);
        } catch (error) {
            setLoading(false);
            console.error('Error during submission:', error);
        }
    };

    return (
        <div className="add_new">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="new_page">
                <Navbar />

                <div className="new_page_main">
                    <div className="new_page_content">
                        <div className="image">
                            <p className="add_new_user">{titlee}</p>
                            <img src={file ? URL.createObjectURL(file) : noImage} alt="" />
                        </div>

                        <form onSubmit={handleSubmit} className="form">
                            <div className="form_inp">
                                <label htmlFor="file">
                                    Upload: <DriveFolderUploadIcon className="file_icon" />
                                </label>
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>

                            {inputs.map((detail) =>
                                detail.type === 'datepicker' ? (
                                    <div key={detail.id} className="form_inp">
                                        <label>{detail.label}</label>
                                        <DatePicker
                                            selected={userInp[detail.name]}
                                            onChange={(date) => handleDateChange(date, detail.name)}
                                            showTimeSelect
                                            dateFormat="Pp"
                                            placeholderText={detail.placeholder}
                                        />
                                    </div>
                                ) : detail.type === 'select' ? (
                                    <div key={detail.id} className="form_inp">
                                        <label>{detail.label}</label>
                                        <select
                                            name={detail.name}
                                            value={userInp[detail.name]}
                                            onChange={handleChange}
                                            required={detail.required}
                                        >
                                            <option value="">Select a game</option>
                                            {games.map((game) => (
                                                <option key={game.id} value={game.id}>
                                                    {game.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    <Input
                                        key={detail.id}
                                        {...detail}
                                        value={userInp[detail.name]}
                                        onChange={handleChange}
                                    />
                                )
                            )}

                            <button type="submit" className="submit_btn" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddNew;
