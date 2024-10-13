import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';

export const FiltersModal = ({ show, handleClose }) => {
    const brands = [
        'Apple', 'Samsung', 'Baseus', 'Remax', 'Handtown', 'Elecom', 'Razer', 'Auto Focus', 'Nillkin', 'Logitech', 'ChromeBook'
    ];

    const specialOffers = [
        'On sale', 'FREE shipping', 'Big deals', 'Shop Mall'
    ];

    const readyToShip = [
        '1 business day', '1–3 business days', 'in 1 week', 'Shipping now'
    ];

    const orderingOptions = [
        'Accepts gift cards', 'Customizable', 'Can be gift-wrapped', 'Installment 0%'
    ];

    const materials = [
        'Nylon (8)', 'Tempered Glass (5)', 'Liquid Silicone Rubber (5)', 'Aluminium Alloy (3)'
    ];

    const ratings = [
        { stars: 5, label: '(5 stars)' },
        { stars: 4, label: '(4 stars)' },
        { stars: 3, label: '(3 stars)' },
        { stars: 2, label: '(2 stars)' },
        { stars: 1, label: '(1 star)' }
    ];

    const productTags = [
        'Games', 'Electronics', 'Video', 'Cellphone', 'Indoor', 'VGA Card', 'USB', 'Lightning', 'Camera'
    ];

    return (
        <Modal show={show} onHide={handleClose} size="xl" centered>
            <Modal.Header closeButton className={"align-items-center"}>
                <Modal.Title className="modal-title color-gray-1000 filters-icon">Advanced Filters</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-30">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Brands Section */}
                    <div >
                        <h6 className="text-gray-900 mb-0">Brands</h6>
                        <ul className="list-checkbox">
                            {brands.map((brand, index) => (
                                <li key={index}>
                                    <label className="inline-flex items-center ">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="ml-2 text-sm">{brand}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Special Offers Section */}
                    <div>
                        <h6 className="text-gray-900 mb-2">Special offers</h6>
                        <ul className="space-y-2">
                            {specialOffers.map((offer, index) => (
                                <li key={index}>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="ml-2 text-sm">{offer}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>

                        <h6 className="text-gray-900 mb-2 mt-6">Ready to ship in</h6>
                        <ul className="space-y-2">
                            {readyToShip.map((time, index) => (
                                <li key={index}>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="ml-2 text-sm">{time}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ordering Options Section */}
                    <div>
                        <h6 className="text-gray-900 mb-2">Ordering options</h6>
                        <ul className="space-y-2">
                            {orderingOptions.map((option, index) => (
                                <li key={index}>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="ml-2 text-sm">{option}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>

                        <h6 className="text-gray-900 mb-2 mt-6">Rating</h6>
                        <ul className="space-y-2">
                            {ratings.map((rating, index) => (
                                <li key={index}>
                                    <a href="#" className="flex items-center space-x-2 no-underline">
                                        {[...Array(5)].map((_, starIndex) => (
                                            <img
                                                key={starIndex}
                                                src={`assets/imgs/template/icons/star${starIndex < rating.stars ? '' : '-gray'}.svg`}
                                                alt={`${rating.stars} stars`}
                                            />
                                        ))}
                                        <span className="ml-2 text-sm text-gray-500">{rating.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Material and Tags Section */}
                    <div>
                        <h6 className="text-gray-900 mb-2">Material</h6>
                        <ul className="space-y-2">
                            {materials.map((material, index) => (
                                <li key={index}>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className="form-checkbox" />
                                        <span className="ml-2 text-sm">{material}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>

                        <h6 className="text-gray-900 mb-4 mt-6">Product tags</h6>
                        <div className="flex flex-wrap gap-2">
                            {productTags.map((tag, index) => (
                                <a key={index} href="#" className="btn btn-border">
                                    {tag}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-content-start pl-6">
                <Button variant="primary" className="bg-blue-500 hover:bg-blue-600">
                    Apply Filter
                </Button>
                <Button variant="secondary" onClick={handleClose} className="text-gray-500">
                    Reset Filter
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
