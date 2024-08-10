import React from 'react';
import './UserDetails.scss';

function UserDetails({ user }) {
    return (
        <div className="user-details">
            <h2>User Details</h2>
            <div className="details">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Status:</strong> {user.status}</p>
            </div>
        </div>
    );
}

export default UserDetails;
