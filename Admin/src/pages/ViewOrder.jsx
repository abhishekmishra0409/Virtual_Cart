import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUser } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  // Local state for loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      await dispatch(getOrderByUser(userId));
      setLoading(false);
    };

    fetchOrder();
  }, [dispatch, userId]);

  // Check the Redux state
  const orderbyuser = useSelector((state) => state.auth.orderbyuser || []);

  console.log(orderbyuser)
  const products = orderbyuser?.products || [];

  // console.log(products)

  // Prepare data for table
  const data1 = products.map((order, index) => ({
    key: index + 1,
    name: order.product.title,
    brand: order.product.brand.title || "Unknown Brand",
    count: order.count,
    amount: order.product.price,
    color: (
        <div style={{display: "flex", alignItems: "center"}}>
          <div
              style={{
                width: "25px",
                height: "25px",
                backgroundColor: order.color.title,
                marginRight: "10px",
                borderRadius: "50%",
                border: "1px solid #ccc",
              }}
          />
        </div>
    ),
    date: new Date(orderbyuser.createdAt).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    action: (
        <Link to={`/edit/order/${order.product._id}`} className="fs-3 text-danger">
          <BiEdit/>
        </Link>
    ),
  }));

  if (loading) {
    return <Spin size="large"/>; // Show loading spinner
  }

  if (data1.length === 0) {
    return <div>No products found in this order.</div>;
  }

  return (
      <div>
        <h3 className="mb-4 title">View Order</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
  );
};

export default ViewOrder;
