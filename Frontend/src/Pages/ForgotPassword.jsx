import {Col, Container, Form, Row} from "react-bootstrap";
import React from "react";

export const ForgotPassword = () => {
    return (
        <>
            <main className="main">
                <section className="shop-template mt-5">
                    <Container>
                        <Row className="mb-5">
                            <Col lg={{span: 5, offset: 1}}>
                                <h3>Reset Password</h3>
                                <p className="text-gray-500">We will send you an email for reset your password.</p>
                                <Form className="mt-4 mb-4">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="font-sm color-gray-700">Email
                                            *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="stevenjob@gmail.com"
                                            className="rounded-lg py-3"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <button
                                            type="submit"
                                            className="font-md-bold btn btn-buy py-3"
                                        >
                                            Submit
                                        </button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </main>
        </>
    )
}