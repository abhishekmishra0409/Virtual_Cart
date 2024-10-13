import React from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/User/UserSlice.js';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Define Yup validation schema
    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Email / Phone / Username is required')
            .test(
                'valid-email-phone-username',
                'Must be a valid email, phone number, or username',
                (value) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const phoneRegex = /^[0-9]{10}$/;
                    return (
                        emailRegex.test(value) || phoneRegex.test(value) || value.length > 0
                    );
                }
            ),
        password: Yup.string().required('Password is required'),
    });

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            agree: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm, setSubmitting, setErrors }) => {
            dispatch(loginUser(values))
                .unwrap()
                .then(() => {
                    navigate("/accounts");
                    resetForm();
                })
                .catch((error) => {
                    setErrors({ email: 'Login failed. Please try again.' });
                    setSubmitting(false);
                });
        },
    });

    return (
        <main className="main">
            <section className="shop-template mt-5">
                <Container>
                    <Row className="mb-5">
                        <Col lg={{ span: 5, offset: 1 }}>
                            <h3>Member Login</h3>
                            <p className="text-gray-500">Welcome back!</p>
                            <Form className="mt-4 mb-4" onSubmit={formik.handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="font-sm color-gray-700">
                                        Email *
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        placeholder="mail@gmail.com"
                                        className="rounded-lg py-3"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.email && !!formik.errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="font-sm color-gray-700">Password *</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="******************"
                                        className="rounded-lg py-3"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.password && !!formik.errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Row className="mb-1">
                                    <Col lg={6}>
                                        <Form.Group className="mb-3 d-flex align-items-center">
                                            <Form.Check
                                                type="checkbox"
                                                id="agree"
                                                name="agree"
                                                className="me-2"
                                                checked={formik.values.agree}
                                                onChange={formik.handleChange}
                                            />
                                            <Form.Label
                                                htmlFor="agree"
                                                className="mb-0 flex font-sm color-gray-500 font-medium"
                                            >
                                                Remember me
                                            </Form.Label>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} className="text-end">
                                        <Form.Group>
                                            <a href="/forgot-password" className="font-sm color-gray-500 no-underline">
                                                Forgot your password?
                                            </a>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group>
                                    <button
                                        type="submit"
                                        className="font-md-bold btn btn-buy py-3"
                                        disabled={formik.isSubmitting}
                                    >
                                        {formik.isSubmitting ? 'Signing In...' : 'Sign In'}
                                    </button>
                                </Form.Group>

                                <div className="text-center mt-3">
                                    <span className="color-gray-500 font-medium">Don't have an account?</span>
                                    <a href="/register" className="color-brand-3 font-medium no-underline">
                                        Sign Up
                                    </a>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
};
