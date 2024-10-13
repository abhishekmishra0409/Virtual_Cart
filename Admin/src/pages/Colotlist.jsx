import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteAColor, getColors } from "../features/color/colorSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal.jsx";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Color",
    dataIndex: "name",
    render: (colorCode) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Color box */}
          <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: colorCode,
                marginRight: "10px",
                borderRadius: "50%",
                border: "1px solid #ccc",
              }}
          />
          {/* Color code as text */}
          {colorCode}
        </div>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Colorlist = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  const colorState = useSelector((state) => state.color.colors);

  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      name: colorState[i].title, // Use the color code (from title) as the background and text
      action: (
          <>
            <Link
                to={`/admin/color/${colorState[i]._id}`}
                className="fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
                className="ms-3 fs-3 text-danger bg-transparent border-0"
                onClick={() => showModal(colorState[i]._id)}
            >
              <AiFillDelete />
            </button>
          </>
      ),
    });
  }

  const deleteColor = (e) => {
    dispatch(deleteAColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };

  return (
      <div>
        <h3 className="mb-4 title">Colors</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
        <CustomModal
            hideModal={hideModal}
            open={open}
            performAction={() => {
              deleteColor(colorId);
            }}
            title="Are you sure you want to delete this color?"
        />
      </div>
  );
};

export default Colorlist;
