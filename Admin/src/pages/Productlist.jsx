import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct,resetState } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal.jsx";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
    render: (colors) => (
        <span>
        {colors.map((color) => (
            <span key={color._id} style={{ backgroundColor: color.title, padding: '0 5px', borderRadius: '3px', marginRight: '5px' }}>
            {color.title}
          </span>
        ))}
      </span>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false); // State for modal visibility
  const [productId, setProductId] = useState(""); // State for the selected product ID

  const showModal = (id) => {
    setOpen(true);
    setProductId(id); // Set the selected product ID for deletion
  };

  const hideModal = () => {
    setOpen(false); // Hide modal
  };

  useEffect(() => {
    dispatch(getProducts()); // Fetch products on mount
  }, [dispatch]);

  const productState = useSelector((state) => state.product.products);
  const data1 = productState.map((product, index) => ({
    key: index + 1,
    title: product.title,
    brand: product.brand.title,
    category: product.category.title,
    color: product.color,
    price: `${product.price}`,
    action: (
        <>
          <Link to={`/admin/product/${product._id}`} className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(product._id)}
          >
            <AiFillDelete />
          </button>
        </>
    ),
  }));

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };

  return (
      <div>
        <h3 className="mb-4 title">Products</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
            hideModal={hideModal}
            open={open}
            performAction={() => deleteProductHandler(productId)}
            title="Are you sure you want to delete this product?"
        />
      </div>
  );
};

export default Productlist;
