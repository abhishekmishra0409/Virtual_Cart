import React, {useState} from "react";

export const Notification = () => {
    const notifications = [
        {
            img: 'assets/imgs/page/account/img-1.png',
            title: 'COD payment confirmed',
            order: '220914QR92BXNH',
        },
        {
            img: 'assets/imgs/page/account/img-2.png',
            title: 'COD payment confirmed',
            order: '220914QR92BXNH',
        },
        {
            img: 'assets/imgs/page/account/img-3.png',
            title: 'COD payment confirmed',
            order: '220914QR92BXNH',
        },
        {
            img: 'assets/imgs/page/account/img-4.png',
            title: 'COD payment confirmed',
            order: '220914QR92BXNH',
        },
        // Add more items if needed
    ];

    const itemsPerPage = 2; // Number of notifications per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total pages
    const totalPages = Math.ceil(notifications.length / itemsPerPage);

    // Get notifications for the current page
    const indexOfLastNotification = currentPage * itemsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - itemsPerPage;
    const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification);

    // Handler for page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="tab-pane fade active show" id="tab-notification" role="tabpanel"
                 aria-labelledby="tab-notification">
                <div className="list-notifications">
                    {currentNotifications.map((notification, index) => (
                        <div className="item-notification" key={index}>
                            <div className="image-notification">
                                <img src={notification.img} alt="Ecom"/>
                            </div>
                            <div className="info-notification">
                                <h5 className="mb-5">{notification.title}</h5>
                                <p className="font-md color-brand-3">
                                    Order<span className="font-md-bold"> {notification.order}</span> has
                                    been confirmed. Please check the
                                    estimated delivery time in the order details section!
                                </p>
                            </div>
                            <div className="button-notification">
                                <a className="btn btn-buy w-auto" href="#">View Details</a>
                            </div>
                        </div>
                    ))}
                </div>
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link page-prev"
                                    onClick={() => handlePageChange(currentPage - 1)}></button>
                        </li>
                        {Array.from({length: totalPages}, (_, i) => (
                            <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                                key={i}>
                                <button
                                    className={`bg-amber-0 w-8 h-9 rounded border text-blue-950 hover:bg-amber-500 ${currentPage === i + 1 ? "bg-amber-500" : ""}`}
                                    onClick={() => handlePageChange(i + 1)}>
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link page-next"
                                    onClick={() => handlePageChange(currentPage + 1)}></button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}