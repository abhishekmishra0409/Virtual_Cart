import React, {useState} from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn} from 'react-icons/fa';

export const Footer = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    return (
        <>
            <section className="section-box box-newsletter mt-50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-7 col-sm-12">
                            <h3 className="color-white">Subscribe &amp; Get <span
                                className="color-warning">10%</span> Discount</h3>
                            <p className="font-lg color-white">
                                Get E-mail updates about our latest shop and <span className="font-lg-bold">special offers.</span>
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-5 col-sm-12">
                            <div className="box-form-newsletter mt-15">
                                <form className="form-newsletter" onSubmit={handleSubmit}>
                                    <input
                                        type="email"
                                        className="input-newsletter font-xs"
                                        value={email}
                                        onChange={handleEmailChange}
                                        placeholder="Your email address"
                                        required
                                    />
                                    <button type="submit" className="btn btn-brand-2">Sign Up</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="footer pt-5">
                <div className="">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 width-25 mb-30">
                                <h4 className="mb-30 text-gray-800">Contact</h4>
                                <div className="text-md mb-20 text-gray-700">
                                    <strong className="font-md-bold">Address:</strong> 502 New Palasia, Indore, Madhya
                                    Pradesh, MP 452001, India

                                </div>
                                <div className="text-md mb-20 text-gray-700">
                                    <strong className="font-md-bold">Phone:</strong> (+91) 1800198198

                                </div>
                                <div className="text-md mb-20 text-gray-700">
                                    <strong className="font-md-bold">E-mail:</strong> contact@virtualcart.com
                                </div>
                                <div className="text-md mb-20 text-gray-700">
                                    <strong className="font-md-bold">Hours:</strong> 8:00 - 17:00, Mon - Sat
                                </div>
                                <div className="mt-30">
                                    <a className="icon-socials icon-facebook no-underline" href="#"/>
                                    <a className="icon-socials icon-instagram no-underline" href="#"/>
                                    <a className="icon-socials icon-twitter no-underline" href="#"/>
                                    <a className="icon-socials icon-linkedin no-underline" href="#"/>
                                </div>
                            </div>
                            <div className="col-lg-3 width-20 mb-30">
                                <h4 className="mb-30 text-gray-800">Quick Links</h4>
                                <ul className="menu-footer space-y-2">
                                    <li><a className="no-underline text-gray-700" href="#">Laptops</a>
                                    </li>
                                    <li><a className="no-underline text-gray-700" href="#">Headphones</a>
                                    </li>
                                    <li><a className="no-underline text-gray-700" href="#">Tablets</a>
                                    </li>
                                    <li><a className="no-underline text-gray-700" href="#">Watches</a></li>
                                    <li><a className="no-underline text-gray-700" href="#">Gaming</a></li>
                                    <li><a className="no-underline text-gray-700" href="#">Camera</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-3 width-16 mb-30">
                                <h4 className="mb-30 text-gray-800">Company</h4>
                                <ul className="menu-footer space-y-2">
                                    <li><a className="no-underline text-gray-700" href="/blog">Our Blog</a></li>
                                    <li><a className="no-underline text-gray-700" href="/term">Plans & Pricing</a></li>
                                    <li><a className="no-underline text-gray-700" href="/term">Cookie Policy</a></li>
                                    <li><a className="no-underline text-gray-700" href="/blog">News & Events</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-3 width-16 mb-30">
                                <h4 className="mb-30 text-gray-800">My account</h4>
                                <ul className="menu-footer space-y-2">
                                    <li><a className="no-underline text-gray-700" href="#">FAQs</a></li>
                                    <li><a className="no-underline text-gray-700" href="#">Community</a></li>
                                    <li><a className="no-underline text-gray-700" href="#">Contact
                                        Us</a></li>
                                    <li><a className="no-underline text-gray-700" href="#">Support Center</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-3 width-23">
                                <h4 className="mb-30 text-gray-800">App & Payment</h4>
                                <div>
                                    <p className="text-md text-gray-700">Download our Apps and get extra 15% Discount on
                                        your first Order…!</p>
                                    <div className="mt-20">
                                        <a className="mr-10" href="#"><img src="/assets/imgs/template/appstore.png"
                                                                           alt="Ecom"/></a>
                                        <a href="#"><img src="/assets/imgs/template/google-play.png" alt="Ecom"/></a>
                                    </div>
                                    <p className="text-md text-gray-700 mt-20 mb-10">Secured Payment Gateways</p>
                                    <img src="/assets/imgs/template/payment-method.png" alt="Ecom"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
};
