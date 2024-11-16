import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchColor, fetchCategories } from "../../features/User/UserSlice.js";

export const SideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchColor());
    }, [dispatch]);

    const { categories , color, isLoading, isError } = useSelector((state) => state.auth);


    // Manually set price filters with gte and lte
    const priceFilters = [
        { label: "0 - ₹10000", gte: 0, lte: 10000 },
        { label: "₹10000 - ₹20000", gte: 10000, lte: 20000 },
        { label: "₹20000 - ₹40000", gte: 20000, lte: 40000 },
        { label: "₹40000 - ₹60000", gte: 40000, lte: 60000 },
        { label: "₹60000 - ₹80000", gte: 60000, lte: 80000 },
        { label: "Over ₹100000", gte: 100000, lte: Infinity },
    ];

    const [activeFilter, setActiveFilter] = useState(null);

    // Handle filter selection (Price or Color)
    const handleFilterSelection = (type, gte = null, lte = null, color = null) => {
        if (type === 'price') {
            setActiveFilter({ type, gte, lte });
            navigate(`?gte=${gte}&lte=${lte}`);
        } else if (type === 'color') {
            setActiveFilter({ type, color });
            navigate(`?color=${color}`);
        }
    };

    const colors = color || [];
    const categoriess = categories || [];
    // console.log(colors)

    if (isLoading) return <div>Loading filters...</div>;
    if (isError) return <div>Error loading filters</div>;

    return (
        <>
            {/* categoriess Section */}
            <div className="sidebar-border mb-0">
                <div className="sidebar-head">
                    <h6 className="color-gray-900">Product categoriess</h6>
                </div>
                <div className="sidebar-content">
                    <ul className="list-nav-arrow">
                        {categoriess.map((category) => (
                            <li key={category._id}>
                                <a href={`/shop/category/${category._id}`} className={"no-underline"}>
                                    {category.title}

                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Price Filters Section */}
            <div className="sidebar-border mb-40">
                <div className="sidebar-head">
                    <h6 className="color-gray-900">Products Filter</h6>
                </div>
                <div className="sidebar-content">
                    <h6 className="color-gray-900 mt-10 mb-10">Price</h6>
                    <ul className="list-checkbox">
                        {priceFilters.map((filter, index) => (
                            <li key={index}>
                                <label className="cb-container">
                                    {/* Render as an anchor tag */}
                                    <a
                                        href={`/shop/price/${filter.gte}/${filter.lte}`}
                                        className="text-small no-underline"

                                    >
                                        <input
                                            type="radio"
                                            checked={activeFilter?.type === 'price' && activeFilter.gte === filter.gte && activeFilter.lte === filter.lte}
                                        />
                                        <span className="text-small">{filter.label}</span>
                                        <span className="checkmark"></span>
                                    </a>
                                </label>
                            </li>
                        ))}
                    </ul>

                    {/* Color Filters Section */}
                    <h6 className="color-gray-900 mt-20 mb-10">Colors</h6>
                    <ul className="list-color">
                        {colors.map((color) => (
                            <li key={color._id}>
                                <a
                                    href={`/shop/color/${color._id}`}
                                    className="color-circle"
                                    style={{backgroundColor: color.title}}
                                    onClick={() => handleFilterSelection('color', null, null, color.title)}
                                >
                                </a>
                                {/*<span>{color.title}</span> */}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};
