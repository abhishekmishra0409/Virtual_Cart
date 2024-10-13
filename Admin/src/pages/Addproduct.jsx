import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState, getProductById, updateProduct } from "../features/product/productSlice";

const schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  color: yup
      .array()
      .min(1, "Pick at least one color")
      .required("Color is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get product ID from URL params
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);
  const [dropzoneFiles, setDropzoneFiles] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);

  const { isSuccess, isError, createdProduct, updatedProduct, productDetails } = newProduct;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");
      dispatch(resetState());
      formik.resetForm();
      setColor([]);
      setImages([]);
      setDropzoneFiles([]);
      navigate('/admin/product');
    }

    if (isSuccess && updatedProduct) {
      toast.success("Product Updated Successfully!");
      dispatch(resetState());
      navigate('/admin/product');
    }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, createdProduct, updatedProduct, dispatch, navigate]);

  const coloropt = colorState.map(i => ({
    value: i._id,
    label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: i.title,
                marginRight: "10px",
                borderRadius: "50%",
                border: "1px solid #ccc",
              }}
          />
          {i.title}
        </div>
    ),
  }));

  const imgopt = imgState.map(i => ({
    public_id: i.public_id,
    url: i.url,
  }));

  const initialColors = productDetails?.color ? productDetails.color.map(color => color._id) : [];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productDetails?.title || "",
      description: productDetails?.description || "",
      price: productDetails?.price || "",
      brand: productDetails?.brand._id || "",
      category: productDetails?.category._id || "",
      tags: productDetails?.tags || "",
      color: initialColors,
      quantity: productDetails?.quantity || "",
      images: productDetails?.images || [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const productData = { ...values, images: imgopt };

      if (id) {
        dispatch(updateProduct({ productId: id, updatedData: productData }));
      } else {
        dispatch(createProducts(productData));
      }

      formik.resetForm();
      setColor([]);
      setImages([]);
      setDropzoneFiles([]);
    },
  });


  const handleColors = (selectedColors) => {
    setColor(selectedColors);
    formik.setFieldValue("color", selectedColors);
  };

  const handleImageDrop = (acceptedFiles) => {
    setDropzoneFiles(acceptedFiles);
    dispatch(uploadImg(acceptedFiles));
  };

  const handleImageDelete = (publicId) => {
    dispatch(delImg(publicId));
  };

  return (
      <div>
        <h3 className="mb-4 title">{id ? "Edit" : "Add"} Product</h3>
        <div>
          <form
              onSubmit={formik.handleSubmit}
              className="d-flex gap-3 flex-column"
          >
            <CustomInput
                type="text"
                label="Enter Product Title"
                name="title"
                onChng={formik.handleChange("title")}
                onBlr={formik.handleBlur("title")}
                val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <div>
              <ReactQuill
                  theme="snow"
                  name="description"
                  onChange={(value) => formik.setFieldValue("description", value)}
                  value={formik.values.description}
              />
            </div>
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
            <CustomInput
                type="number"
                label="Enter Product Price"
                name="price"
                onChng={formik.handleChange("price")}
                onBlr={formik.handleBlur("price")}
                val={formik.values.price}
            />
            <div className="error">
              {formik.touched.price && formik.errors.price}
            </div>
            <select
                name="brand"
                onChange={formik.handleChange("brand")}
                onBlur={formik.handleBlur("brand")}
                value={formik.values.brand}
                className="form-control py-3 mb-3"
            >
              <option value="">Select Brand</option>
              {brandState.map((i, j) => (
                  <option key={j} value={i._id}>
                    {i.title}
                  </option>
              ))}
            </select>
            <div className="error">
              {formik.touched.brand && formik.errors.brand}
            </div>
            <select
                name="category"
                onChange={formik.handleChange("category")}
                onBlur={formik.handleBlur("category")}
                value={formik.values.category}
                className="form-control py-3 mb-3"
            >
              <option value="">Select Category</option>
              {catState.map((i, j) => (
                  <option key={j} value={i._id}>
                    {i.title}
                  </option>
              ))}
            </select>
            <div className="error">
              {formik.touched.category && formik.errors.category}
            </div>
            <select
                name="tags"
                onChange={formik.handleChange("tags")}
                onBlur={formik.handleBlur("tags")}
                value={formik.values.tags}
                className="form-control py-3 mb-3"
            >
              <option value="" disabled>
                Select Tag
              </option>
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
              <option value="special">Special</option>
            </select>
            <div className="error">
              {formik.touched.tags && formik.errors.tags}
            </div>
            <Select
                mode="multiple"
                allowClear
                className="w-100"
                placeholder="Select colors"
                value={color}
                onChange={handleColors}
                options={coloropt}
            />
            <div className="error">
              {formik.touched.color && formik.errors.color}
            </div>
            <CustomInput
                type="number"
                label="Enter Product Quantity"
                name="quantity"
                onChng={formik.handleChange("quantity")}
                onBlr={formik.handleBlur("quantity")}
                val={formik.values.quantity}
            />
            <div className="error">
              {formik.touched.quantity && formik.errors.quantity}
            </div>
            <div className="bg-white border-1 p-5 text-center">
              <Dropzone
                  onDrop={handleImageDrop}
              >
                {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>
                          Drag 'n' drop some files here, or click to select files
                        </p>
                      </div>
                    </section>
                )}
              </Dropzone>
            </div>
            <div className="showimages d-flex flex-wrap gap-3">
              {imgState.map((i, j) => (
                  <div className="position-relative" key={j}>
                    <button
                        type="button"
                        onClick={() => handleImageDelete(i.public_id)}
                        className="btn-close position-absolute"
                        style={{ top: "10px", right: "10px" }}
                    ></button>
                    <img src={i.url} alt="" width={200} height={200} />
                  </div>
              ))}
            </div>
            <button
                className="btn btn-success border-0 rounded-3 my-5"
                type="submit"
            >
              {id ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      </div>
  );
};

export default Addproduct;
