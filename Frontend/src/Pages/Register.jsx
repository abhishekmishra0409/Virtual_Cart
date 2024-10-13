import React, {useState} from 'react';
import { Form, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {registerUser} from "../features/User/UserSlice.js";


export const Register = () => {
    const dispatch = useDispatch();
    const [mobile, setPhone] = useState("");

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        const regex = /^[0-9]{0,10}$/;

        if (regex.test(value)) {
            setPhone(value);
        }
    };
    // Validation Schema using Yup
    const validationSchema = Yup.object({
        firstname: Yup.string().required('First Name is required'),
        lastname: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        mobile: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
            .required('Phone is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        agree: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
    });

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            mobile: '',
            password: '',
            agree: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(registerUser(values))
                .unwrap()
                .then(() => {
                    resetForm();
                })
        },
    });


    return (
        <div className="container mt-5 ">
            <div className="row mx-4">
                {/* Registration Form Column */}
                <div className="col-lg-6">
                    <h3>Create an account</h3>
                    <p className="text-gray-500">Access to all features. No credit card required.</p>
                    <Form onSubmit={formik.handleSubmit} className="mt-4 mb-4">
                        <Row>
                            <Form.Group className="mb-3 col-md-6">
                                <Form.Label className="mb-1 font-sm color-gray-700">
                                    First Name *
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstname"
                                    placeholder="First Name"
                                    className="form-control py-2"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstname}
                                    isInvalid={formik.touched.firstname && formik.errors.firstname}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.firstname}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3 col-md-6">
                                <Form.Label className="mb-1 font-sm color-gray-700">
                                    Last Name *
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastname"
                                    placeholder="Last Name"
                                    className="form-control py-2"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastname}
                                    isInvalid={formik.touched.lastname && formik.errors.lastname}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.lastname}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label className="mb-1 font-sm color-gray-700">Email *</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="mail@gmail.com"
                                className="form-control py-2"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                isInvalid={formik.touched.email && formik.errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="mb-1 font-sm color-gray-700">Phone *</Form.Label>
                            <Form.Control
                                type="text"
                                name="mobile"
                                placeholder="+91"
                                className="form-control py-2"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.mobile}
                                isInvalid={formik.touched.mobile && formik.errors.mobile}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.mobile}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="mb-1 font-sm color-gray-700">Password *</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="******************"
                                className="form-control py-2"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                isInvalid={formik.touched.password && formik.errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Check
                                type="checkbox"
                                id="agree"
                                name="agree"
                                className="me-2"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                checked={formik.values.agree} // Use checked for checkboxes
                                isInvalid={formik.touched.agree && formik.errors.agree}
                            />
                            <Form.Label
                                htmlFor="agree"
                                className="mb-0 font-x color-gray-500 font-medium"
                                style={{ whiteSpace: 'nowrap', flexGrow: 1 }}
                            >
                                Do you agree to our terms and policy.
                            </Form.Label>
                            {formik.touched.agree && formik.errors.agree ? (
                                <Form.Control.Feedback
                                    type="invalid"
                                    className="d-block"
                                    style={{ flexBasis: '100%' }}
                                >
                                    {formik.errors.agree}
                                </Form.Control.Feedback>
                            ) : null}
                        </Form.Group>


                        <button type="submit" className="font-md-bold btn btn-buy py-3">
                            Sign Up
                        </button>
                    </Form>
                    <div className="text-center mt-3">
                        <span className="font-x color-gray-500 font-medium">Already have an account?</span>
                        <a href="/login" className="font-x color-brand-3 font-medium no-underline"> Sign In</a>
                    </div>
                </div>

                {/* Social Login Column */}
                <div className="col-lg-6 pt-65 pl-50">
                    <div className="text-center">
                        <h5>Use Social Network Account</h5>
                        <div className="d-flex flex-column mt-3">
                            <button
                                className="d-flex py-3 align-items-center justify-content-center btn btn-login font-md-bold color-brand-3 mb-15"
                            >
                                Sign up with <img src="assets/imgs/page/account/google.svg" alt="Google" className="ms-2"/>
                            </button>
                            <button
                                className="btn btn-login font-md-bold color-brand-3 mb-15"
                            >
                                Sign up with <span className="color-blue font-md-bold"> Facebook</span>
                            </button>
                            <button
                                className="d-flex py-3 align-items-center justify-content-center btn btn-login font-md-bold color-brand-3 mb-15"
                            >
                                Sign up with <img src="assets/imgs/page/account/amazon.svg" alt="Amazon" className="ms-2"/>
                            </button>
                        </div>
                        <div className="mt-3">
                            <span className="text-gray-900">Buying for work?</span>
                            <a href="#" className=" color-brand-1  no-underline"> Create a free business account</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
