import React, {useState , useEffect} from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {
    AiOutlineDashboard,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiOutlineBgColors,
} from "react-icons/ai";
import {RiCouponLine} from "react-icons/ri";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link} from "react-router-dom";
import {Outlet} from "react-router-dom";
import {ImBlog} from "react-icons/im";
import {IoIosNotifications} from "react-icons/io";
import {FaClipboardList, FaBloggerB, FaSignOutAlt} from "react-icons/fa";
import {SiBrandfolder} from "react-icons/si";
import {BiCategoryAlt} from "react-icons/bi";
import {Layout, Menu, theme, message} from "antd";
import {useNavigate,} from "react-router-dom";
import {useDispatch} from "react-redux";
import { logout } from "../features/auth/authSlice";


const {Header, Sider, Content} = Layout;
const MainLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);


    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, );

    const handleSignOut = () => {
        dispatch(logout())
            .unwrap()
            .then(() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate("/", { replace: true });
                message.success("Logout Successfully!");
            })
            .catch((error) => {
                console.error("Logout failed:", error);
                message.error("Logout failed");
            });
    };
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user)

    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        <Layout /* onContextMenu={(e) => e.preventDefault()} */>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h2 className="text-white fs-5 text-center py-3 mb-0">
                        <span className="sm-logo">VC</span>
                        <span className="lg-logo">Virtual Cart</span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[""]}
                    onClick={({key}) => {
                        if (key == "signout") {
                            handleSignOut();
                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: "",
                            icon: <AiOutlineDashboard className="fs-4"/>,
                            label: "Dashboard",
                        },
                        {
                            key: "customers",
                            icon: <AiOutlineUser className="fs-4"/>,
                            label: "Customers",
                        },
                        {
                            key: "Catalog",
                            icon: <AiOutlineShoppingCart className="fs-4"/>,
                            label: "Catalog",
                            children: [
                                {
                                    key: "product",
                                    icon: <AiOutlineShoppingCart className="fs-4"/>,
                                    label: "Add Product",
                                },
                                {
                                    key: "list-product",
                                    icon: <AiOutlineShoppingCart className="fs-4"/>,
                                    label: "Product List",
                                },
                                {
                                    key: "brand",
                                    icon: <SiBrandfolder className="fs-4"/>,
                                    label: "Brand",
                                },
                                {
                                    key: "list-brand",
                                    icon: <SiBrandfolder className="fs-4"/>,
                                    label: "Brand List ",
                                },
                                {
                                    key: "category",
                                    icon: <BiCategoryAlt className="fs-4"/>,
                                    label: "Category",
                                },
                                {
                                    key: "list-category",
                                    icon: <BiCategoryAlt className="fs-4"/>,
                                    label: "Category List",
                                },
                                {
                                    key: "color",
                                    icon: <AiOutlineBgColors className="fs-4"/>,
                                    label: "Color",
                                },
                                {
                                    key: "list-color",
                                    icon: <AiOutlineBgColors className="fs-4"/>,
                                    label: "Color List",
                                },
                            ],
                        },
                        {
                            key: "orders",
                            icon: <FaClipboardList className="fs-4"/>,
                            label: "Orders",
                        },
                        {
                            key: "marketing",
                            icon: <RiCouponLine className="fs-4"/>,
                            label: "Marketing",
                            children: [
                                {
                                    key: "coupon",
                                    icon: <ImBlog className="fs-4"/>,
                                    label: "Add Coupon",
                                },
                                {
                                    key: "coupon-list",
                                    icon: <RiCouponLine className="fs-4"/>,
                                    label: "Coupon List",
                                },
                            ],
                        },
                        {
                            key: "blogs",
                            icon: <FaBloggerB className="fs-4"/>,
                            label: "Blogs",
                            children: [
                                {
                                    key: "blog",
                                    icon: <ImBlog className="fs-4"/>,
                                    label: "Add Blog",
                                },
                                {
                                    key: "blog-list",
                                    icon: <FaBloggerB className="fs-4"/>,
                                    label: "Blog List",
                                },
                                {
                                    key: "blog-category",
                                    icon: <ImBlog className="fs-4"/>,
                                    label: "Add Blog Category",
                                },
                                {
                                    key: "blog-category-list",
                                    icon: <FaBloggerB className="fs-4"/>,
                                    label: "Blog Category List",
                                },
                            ],
                        },
                        {
                            key: "enquiries",
                            icon: <FaClipboardList className="fs-4"/>,
                            label: "Enquiries",
                        },
                        {
                            key: "signout",
                            icon: <FaSignOutAlt className="fs-5"/>,
                            label: "SignOut",
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="d-flex justify-content-between ps-1 pe-5"
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: "trigger",
                            onClick: () => setCollapsed(!collapsed),
                        }
                    )}
                    <div className="d-flex gap-4 align-items-center">
                        <div className=" align-items-center">
                            <div>
                                {user ? (
                                    <>
                                        <h5 className="mb-0">{user.firstname}</h5>
                                        <p className="mb-0">{user.email}</p>
                                    </>
                                ) : (
                                    <p>User data not available</p>
                                )}
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <ToastContainer
                        position="top-right"
                        autoClose={250}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        theme="light"
                    />
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;
