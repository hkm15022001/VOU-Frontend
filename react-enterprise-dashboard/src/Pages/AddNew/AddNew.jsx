/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createGame, createUser, uploadGameImage } from '../../api';
import Input from '../../Components/Input/Input';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import noImage from '../../Images/photo-camera.png';
import './New.scss';

function AddNew({ inputs, titlee, type }) {
    
    const navigate = useNavigate();
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
                name: '',
                type: '',
                exchange_allow: '',
                tutorial: '',
                images: ''
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
    // const image = false;

    // Dynamically change the data for different pages
    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === 'exchange_allow') {
            newValue = value === 'true';
        };
        setUserInp({ ...userInp, [name]: newValue });
    }

    const callAPI = async (call, type) => {
        try {
            const response = await call(userInp);
            setLoading(false);
            navigate(`/${type}s`);
        } catch (error) {
            setLoading(false);
    
            if (error.response) {
                console.error('Response error:', error.response);
                toast.error(`Error creating ${type}: ${error.response.data?.message || 'Please try again!'}`);
            } else {
                toast.error(`Error creating ${type}. Please try again!`);
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            let imagePath = '';
    
            if (file) {
                const uploadResponse = await uploadGameImage(file);
                imagePath = uploadResponse.data.data; 
            }
    
            const updatedUserInp = { ...userInp, images: imagePath };
            console.log(updatedUserInp)
            switch (type) {
                case 'USER':
                    await callAPI(createUser, 'user');
                    break;
                case 'GAME':
                    await callAPI(() => createGame(updatedUserInp), 'game');
                    break;
                default:
                    break;
            }
        } catch (error) {
            setLoading(false);
            console.error('Error during submission:', error);
    
            if (error.response) {
                console.error('Response error:', error.response);
                toast.error(`Error creating ${type}: ${error.response.data?.message || 'Please try again!'}`);
            } else {
                toast.error(`Error creating ${type}. Please try again!`);
            }
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
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default AddNew;
