import React, { useState, useEffect } from "react";
import {  useDispatch } from "react-redux";
import { updateUser, addAddress } from "../../features/User/UserSlice.js"; 

export const UserSetting = () => {
    const dispatch = useDispatch();

    // Get the initial data from local storage
    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;


    // Form states
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        mobile: "",
        email: "",
    });

    const [addressData, setAddressData] = useState({
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
    });

    // Load initial data from Redux store
    useEffect(() => {
        if (user) {
            setUserData(prevState => ({
                ...prevState,
                firstname: prevState.firstname || user.firstname || "",
                lastname: prevState.lastname || user.lastname || "",
                mobile: prevState.mobile || user.mobile || "",
                email: prevState.email || user.email || "",
            }));

            setAddressData(prevState => ({
                ...prevState,
                street: prevState.street || user.address?.street || "",
                city: prevState.city || user.address?.city || "",
                state: prevState.state || user.address?.state || "",
                pincode: prevState.pincode || user.address?.pincode || "",
                country: prevState.country || user.address?.country || "",
            }));
        }

    }, []);


    const handleUserChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddressChange = (e) => {
        setAddressData({
            ...addressData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUserSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(userData));
        const updatedUser = { ...user, ...userData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        dispatch(addAddress(addressData));
        const updatedUser = {
            ...user,
            address: { ...addressData },
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    return (
        <div className="tab-pane fade show active" id="tab-setting" role="tabpanel" aria-labelledby="tab-setting">
            <div className="row">
                {/* Contact Information */}
                <div className="col-lg-6 mb-20">
                    <h5 className="font-md-bold color-brand-3">Contact Information</h5>
                    <form onSubmit={handleUserSubmit}>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        name="firstname"
                                        className="form-control font-sm"
                                        type="text"
                                        placeholder="First name *"
                                        value={userData.firstname}
                                        onChange={handleUserChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        name="lastname"
                                        className="form-control font-sm"
                                        type="text"
                                        placeholder="Last name *"
                                        value={userData.lastname}
                                        onChange={handleUserChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <input
                                        name="mobile"
                                        className="form-control font-sm"
                                        type="tel"
                                        placeholder="Phone Number *"
                                        value={userData.mobile}
                                        onChange={handleUserChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <input
                                        name="email"
                                        className="form-control font-sm"
                                        type="email"
                                        placeholder="Email *"
                                        value={userData.email}
                                        onChange={handleUserChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group mt-20">
                                    <input className="btn btn-buy w-auto font-md-bold" type="submit" value="Save Contact Info" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Shipping Address */}
                <div className="col-lg-6 mb-20">
                    <h5 className="font-md-bold color-brand-3">Shipping Address</h5>
                    <form onSubmit={handleAddressSubmit}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <input
                                        name="street"
                                        className="form-control font-sm"
                                        type="text"
                                        placeholder="Address *"
                                        value={addressData.street}
                                        onChange={handleAddressChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        name="city"
                                        className="form-control font-sm"
                                        type="text"
                                        placeholder="City *"
                                        value={addressData.city}
                                        onChange={handleAddressChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        name="state"
                                        className="form-control font-sm"
                                        type="text"
                                        placeholder="State *"
                                        value={addressData.state}
                                        onChange={handleAddressChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        name="pincode"
                                        className="form-control font-sm"
                                        type="text"
                                        placeholder="Pincode *"
                                        value={addressData.pincode}
                                        onChange={handleAddressChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <input
                                        name="country"
                                        className="form-control font-sm"
                                        type="text"
                                        placeholder="Country *"
                                        value={addressData.country}
                                        onChange={handleAddressChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group mt-20">
                                    <input className="btn btn-buy w-auto font-md-bold" type="submit" value="Save Shipping Address" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
