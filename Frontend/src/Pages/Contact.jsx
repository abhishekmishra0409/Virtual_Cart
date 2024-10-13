import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendContact, resetState } from "../features/Contact/contactSlice";

export const Contact = () => {
    const dispatch = useDispatch();
    const { isLoading, isSuccess, isError, message } = useSelector((state) => state.contact);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendContact({ name, email, mobile, comment }));
    };

    useEffect(() => {
        if (isSuccess) {
            // toast.success(message);
            dispatch(resetState());
            setName("");
            setEmail("");
            setMobile("");
            setComment("");
        }
        if (isError) {
            // toast.error(message);
            dispatch(resetState());
        }
    }, [isSuccess, isError, message, dispatch]);

    return (
        <section className="section-box shop-template mt-0">
            <Container>
                <div className="box-contact">
                    <Row>
                        <Col lg={6}>
                            <div className="contact-form">
                                <h3 className="color-brand-3 mt-4">Contact Us</h3>
                                <p className="font-sm color-gray-700 mb-4">
                                    Our team would love to hear from you!
                                </p>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formName" className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail" className="mb-3">
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formMobile" className="mb-3">
                                        <Form.Control
                                            type="tel"
                                            placeholder="Mobile number"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formComment" className="mb-3">
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Comment"
                                            rows={5}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button className="btn-buy" type="submit" disabled={isLoading}>
                                            {isLoading ? "Sending..." : "Send message"}
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="map">
                                <iframe
                                    title="Map"
                                    height="550"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src="https://maps.google.com/maps?width=100%25&amp;height=550&amp;hl=en&amp;q=indore+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                                >
                                    <a href="https://www.gps.ie/">gps devices</a>
                                </iframe>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>

            <div className="box-contact-support pt-80 pb-2 background-gray-50">
                <Container>
                    <Row>
                        <Col lg={3} className="text-center text-lg-start">
                            <h3 className="mb-2 font-bold">We'd love to hear from you</h3>
                            <p className="font-sm color-gray-700">Chat with our friendly team</p>
                        </Col>
                        <Col lg={3} className="text-center mb-3">
                            <div className="box-image mb-2 d-flex justify-content-center">
                                <img
                                    src="/assets/imgs/page/contact/chat.svg"
                                    alt="Ecom"
                                />
                            </div>
                            <h4 className="mb-2">Chat to sales</h4>
                            <p className="font-sm color-gray-700 mb-2">Speak to our team.</p>
                            <a
                                className="font-sm color-gray-900 no-underline"
                                href="mailto:sales@ecom.com"
                            >
                                sales@ecom.com
                            </a>
                        </Col>
                        <Col lg={3} className="text-center mb-3">
                            <div className="box-image mb-2 d-flex justify-content-center">
                                <img
                                    src="/assets/imgs/page/contact/call.svg"
                                    alt="Ecom"
                                />
                            </div>
                            <h4 className="mb-2">Call us</h4>
                            <p className="font-sm color-gray-700 mb-2">
                                Mon-Fri from 8am to 5pm
                            </p>
                            <a
                                className="font-sm color-gray-900 no-underline"
                                href="tel:+1(555)000-0000"
                            >
                                +1(555)000-0000
                            </a>
                        </Col>
                        <Col lg={3} className="text-center mb-3">
                            <div className="box-image mb-2 d-flex justify-content-center">
                                <img
                                    src="/assets/imgs/page/contact/map.svg"
                                    alt="Ecom"
                                />
                            </div>
                            <h4 className="mb-2">Visit us</h4>
                            <p className="font-sm color-gray-700 mb-2">Visit our office</p>
                            <span className="font-sm color-gray-900">
                                New Palasia new chappan Dukan
                                <br />
                                Indore, 452015, India
                            </span>
                        </Col>
                    </Row>
                </Container>
            </div>
        </section>
    );
};
