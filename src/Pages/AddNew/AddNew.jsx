/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUser } from '../../api';
import Input from '../../Components/Input/Input';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import noImage from '../../Images/photo-camera.png';
import './New.scss';

function AddNew({ inputs, titlee, type }) {
    const navigate = useNavigate();
    // const [popupMessage, setPopupMessage] = useState('');
    const [loading, setLoading] = useState(false); 

    let dynamicInpVal;

    // dynamically change the state values
    switch (type) {
        case 'USER':
            dynamicInpVal = {
                username: '',
                name: '',
                email: '',
                password: '',
                phone: '',
                role: '',
                status: 'inactive'
            };
            break;
        case 'GAME':
            dynamicInpVal = {
                title: '',
                description: '',
                category: '',
                price: '',
                stock: '',
            };
            break;
        case 'BLOG':
            dynamicInpVal = {
                title: '',
                description: '',
                tags: '',
            };
            break;
        default:
            break;
    }

    const [userInp, setUserInp] = useState(dynamicInpVal);
    const [file, setFile] = useState('');
    const image = false;

    // Dynamically change the data for different pages
    const handleChange = (e) => {
        setUserInp({ ...userInp, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Đặt loading khi bắt đầu gọi API
        console.log(userInp)
        createUser(userInp)
            .then(response => {
                setLoading(false); // Tắt loading sau khi API hoàn thành
                navigate('/users'); // Điều hướng về trang /users nếu thành công
            })
            .catch(error => {
                console.error('error when call API:', error);
                setLoading(false); // Tắt loading nếu có lỗi
                
                toast.error('Error creating user. Please try again!');
            });
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

                            {inputs.map((detail) => (
                                <Input
                                    key={detail.id}
                                    {...detail}
                                    value={userInp[detail.name]}
                                    onChange={handleChange}
                                />
                            ))}

                            <button type="submit" className="submit_btn" disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>

                        {/* Hiển thị popup nếu có lỗi */}
                        {/* {popupMessage && (
                            <div className="popup">
                                <p>{popupMessage}</p>
                                <button onClick={() => setPopupMessage('')}>Close</button>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddNew;
