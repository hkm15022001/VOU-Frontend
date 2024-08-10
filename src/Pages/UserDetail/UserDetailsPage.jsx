// UserDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../api'; // Cập nhật import updateUser
import CustomButton from '../../Components/Button/Button';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import UserDetailsEdit from '../UserEdit/ UserDetailsEdit';
import UserDetails from './UserDetails';
// import './UserDetailsPage.scss';

function UserDetailsPage() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser(userId);
                setUser(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const handleSave = async (updatedUser) => {
        try {
            console.log(updatedUser)
            await updateUser(userId, updatedUser);
            setUser(updatedUser);
            setEditing(false);
            navigate('/users'); // Điều hướng về trang danh sách người dùng
        } catch (error) {
            setError(error);
        }
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancel = () => {
        setEditing(false);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="details">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="detail_page_main">
                <Navbar />
                <div className="user-page">
                    {editing ? (
                        <UserDetailsEdit  onSave={handleSave} onCancel={handleCancel} user={{
                            name: user.name,
                            email: user.email,
                            password: user.password,
                            phone: user.phone,
                            role: user.role,
                            status: user.status
                          }}/>
                    ) : (
                        <>
                            <UserDetails user={user} />
                            <CustomButton type={"button"} content={"Edit"} onClickHandle={handleEdit}></CustomButton>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDetailsPage;
