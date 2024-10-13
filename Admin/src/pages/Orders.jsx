import React, { useEffect, useState } from "react";
import { Table, Spin, Alert, Select, Button } from "antd"; // Import Select and Button
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getOrders, updateOrderStatus } from "../features/auth/authSlice"; // Import updateOrderStatus action

const { Option } = Select;

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
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
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Local state for error handling
  const [status, setStatus] = useState({}); // Local state for status changes

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await dispatch(getOrders());
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchOrders();
  }, [dispatch]);

  const orderState = useSelector((state) => state.auth.orders || []);

  if (loading) {
    return <Spin size="large" />; // Show loading spinner
  }

  if (error) {
    return <Alert message={error} type="error" showIcon />; // Show error message
  }

  const handleChangeStatus = (orderId, newStatus) => {
    setStatus((prev) => ({ ...prev, [orderId]: newStatus })); // Store the new status
  };

  const handleUpdateStatus = async (orderId) => {
    const newStatus = status[orderId];
    if (newStatus) {
      try {
        const updatedOrder = await dispatch(updateOrderStatus({ orderId, status: newStatus }));
        setStatus((prev) => ({ ...prev, [orderId]: undefined }));
        window.location.reload(); // Reload the page

      } catch (error) {
        console.error("Failed to update order status:", error);
      }
    }
  };

  const data1 = orderState.map((order, index) => ({
    key: index + 1,
    name: `${order.orderby.firstname} ${order.orderby.lastname}`,
    product: (
        <Link to={`/admin/order/${order._id}`}>
          View Orders
        </Link>
    ),
    amount: order.paymentIntent.amount,
    date: new Date(order.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    status: (
        <Select
            defaultValue={order.orderStatus}
            style={{ width: 120 }}
            onChange={(newStatus) => handleChangeStatus(order._id, newStatus)}
        >
          {["Not Processed", "Processing", "Cancel", "Delivered"].map((statusOption) => (
              <Option key={statusOption} value={statusOption}>
                {statusOption}
              </Option>
          ))}
        </Select>
    ),
    action: (
        <Button
            type="primary"
            onClick={() => handleUpdateStatus(order._id)}
        >
          Update
        </Button>
    ),
  }));

  return (
      <div>
        <h3 className="mb-4 title">Orders</h3>
        <Table columns={columns} dataSource={data1} />
      </div>
  );
};

export default Orders;
