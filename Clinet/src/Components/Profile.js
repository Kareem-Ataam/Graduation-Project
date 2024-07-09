import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Foot from './Foot';
import { UpdatePassword, buyerAPI, sellerAPI } from '../Constants';

const Profile = () => {
    const [userType, setUserType] = useState('');
    const token = window.localStorage.getItem('token');
    const email = window.localStorage.getItem('email');
    const passRegex = /^(?=.*[^a-zA-Z0-9])(?=.*[a-z])(?=.*[A-Z])/;
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        shopName: '',
        email: '',
        governate: '',
        city: '',
        street: '',
        newPassword: '',
        oldPassword: ''
    });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const storedUserType = localStorage.getItem('user type') || 'buyer';
        setUserType(storedUserType);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    async function handleSellerSubmit(e) {
        e.preventDefault();
        const flag = profile.firstName && profile.lastName && profile.shopName && profile.governate && profile.city && profile.street && passRegex.test(profile.newPassword);
        if (!flag) return;
        console.log(email)
        try {
            const passConfirm = await axios.put(`${UpdatePassword}`, {
                email: email,
                oldPassword: profile.oldPassword,
                newPassword: profile.newPassword
            },{
                headers:{
                    Authorization:`Bearer ${token} `
                }
            });

            if (passConfirm.status === 200) {
                const res = await axios.put(`${sellerAPI}/${email}`, {
                    email: email,
                    governate: profile.governate,
                    city: profile.city,
                    street: profile.street,
                    fName: profile.firstName,
                    lName: profile.lastName,
                    shopName: profile.shopName,
                    newPassword: '',
                    oldPassword: ''
                }, {
                    headers: {
                        accept: 'text/plain',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.status === 200) {
                    setShowModal(true);
                    setTimeout(() => {
                        setShowModal(false);
                        window.location.pathname = "/";
                    }, 2000); // 2 seconds delay
                }
            }
        } catch (e) {
            console.log(e);
        }
    }


    async function handleBuyerSubmit(e) {
        e.preventDefault();
        console.log("test")
        
        const flag = profile.firstName && profile.lastName && passRegex.test(profile.newPassword);
        if (!flag) return;
         
        console.log(token)
        try {
            const passConfirm = await axios.put(`${UpdatePassword}`, {
                email: email,
                oldPassword: profile.oldPassword,
                newPassword: profile.newPassword
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });

            if (passConfirm.status === 200) {
                const res = await axios.put(`${buyerAPI}/${email}`, {
                    email: email,
                    pass: profile.newPassword,
                    fName: profile.firstName,
                    lName: profile.lastName,
                }, {
                    headers: {
                        accept: 'text/plain',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.status === 200) {
                    setShowModal(true);
                    setTimeout(() => {
                        setShowModal(false);
                        window.location.pathname = "/";
                    }, 2000); // 2 seconds delay
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    const renderProfileImage = () => {
        const character = userType === 'seller' ? 'S' : 'B';
        const color = userType === 'seller' ? '#249262' : '#b66b6b'; // Color based on user type

        return (
            <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
                <rect width="150" height="150" fill={color} />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    fontSize="100"
                    fill="white"
                    fontFamily="Arial, Helvetica, sans-serif"
                >
                    {character}
                </text>
            </svg>
        );
    };

    return (
        <>
            <NavBar />
            <div className="profile-container">
                <form className="profile-form" onSubmit={userType === 'seller' ? handleSellerSubmit : handleBuyerSubmit}>
                    <div className="profile-picture">
                        {renderProfileImage()}
                    </div>
                    <div className="profile-details">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={profile.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={profile.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Old Password:</label>
                            <input
                                type="password"
                                id="oldPassword"
                                name="oldPassword"
                                value={profile.oldPassword}
                                onChange={handleChange}
                            />

                            <label htmlFor="confirm">New Password:</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={profile.newPassword}
                                onChange={handleChange}
                            />
                        </div>
                        
                        {userType === 'seller' && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="shopName">Shop Name:</label>
                                    <input
                                        type="text"
                                        id="shopName"
                                        name="shopName"
                                        value={profile.shopName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="governate">Governate:</label>
                                    <input
                                        type="text"
                                        id="governate"
                                        name="governate"
                                        value={profile.governate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">City:</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={profile.city}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="street">Street:</label>
                                    <input
                                        type="text"
                                        id="street"
                                        name="street"
                                        value={profile.street}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}

                        <button type="submit">Update Profile</button>
                    </div>
                </form>
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                            <p>Profile updated successfully!</p>
                        </div>
                    </div>
                )}
            </div>
            <Foot />
        </>
    );
};

export default Profile;
