import React, { useState } from 'react';
import CustomButton from '../../Components/Button/Button';
import Input from '../../Components/Input/Input';

function UserDetailsEdit({ onSave, onCancel, user }) {
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        password: user.password || '',
        phone: user.phone || '',
        role: user.role || '',
        status: user.status || ''
    });
            console.log("Form data: ", formData)

    // useEffect(() => {
    //     console.log("User: ", user)
    //     setFormData({
    //         name: user.name,
    //         email: user.email,
    //         password: user.password,
    //         phone: user.phone,
    //         role: user.role,
    //         status: user.status
    //       });
    // }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log
            await onSave(formData);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="user-details-edit">
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    <Input
                        key={key}
                        name={key}
                        lable={key.charAt(0).toUpperCase() + key.slice(1)}
                        type={(key === 'role' || key === 'status') ? 'select' : 'text'} // Assuming 'role' is a select type
                        value={formData[key]}
                        onChange={handleChange}
                        options={key === 'role' ? [
                            { label: 'Admin', value: 'admin' },
                            { label: 'End User', value: 'end_user' },
                            { label: 'Enterprise', value: 'enterprise' }
                        ] : key === 'status' ? [
                            { label: 'Active', value: 'active' },
                            { label: 'Inactive', value: 'inactive' }
                        ] : []}
                    />
                ))}
                <div style= {{marginTop: 20}}>
                    <CustomButton  type={"submit"} content={"Save"} ></CustomButton>
                    <CustomButton type={"submit"} content={"Cancel"} onClickHandle={onCancel} ></CustomButton>
                </div>
                
            </form>
        </div>
    );
}

export default UserDetailsEdit;
