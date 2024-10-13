import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput.jsx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  createBlogs,
  getABlog,
  resetState,
  updateABlog,
} from "../features/blogs/blogSlice";
import { getCategories } from "../features/bcategory/bcategorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];
  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.bCategory.bCategories);
  const blogState = useSelector((state) => state.blogs);

  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    blogName,
    blogDesc,
    blogCategory,
    blogImages,
    updatedBlog,
  } = blogState;

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfully!");
    }
    if (isSuccess && updatedBlog) {
      toast.success("Blog Updated Successfully!");
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  // Synchronize image state with formik
  useEffect(() => {
    if (imgState.length > 0) {
      formik.setFieldValue(
          "images",
          imgState.map((i) => ({ public_id: i.public_id, url: i.url }))
      );
    }
  }, [imgState]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      category: blogCategory || "",
      images: blogImages || [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateABlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogs(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  const handleImageDrop = (acceptedFiles) => {
    dispatch(uploadImg(acceptedFiles));
  };

  const handleImageDelete = (publicId) => {
    dispatch(delImg(publicId));
  };

  return (
      <div>
        <h3 className="mb-4 title">
          {getBlogId !== undefined ? "Edit" : "Add"} Blog
        </h3>

        <div className="">
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4">
              <CustomInput
                  type="text"
                  label="Enter Blog Title"
                  name="title"
                  onChng={formik.handleChange("title")}
                  onBlr={formik.handleBlur("title")}
                  val={formik.values.title}
              />
            </div>
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <select
                name="category"
                onChange={formik.handleChange("category")}
                onBlur={formik.handleBlur("category")}
                value={formik.values.category}
                className="form-control py-3  mt-3"
                id=""
            >
              <option value="">Select Blog Category</option>
              {bCatState.map((i, j) => (
                  <option key={j} value={i.title}>
                    {i.title}
                  </option>
              ))}
            </select>
            <div className="error">
              {formik.touched.category && formik.errors.category}
            </div>
            <ReactQuill
                theme="snow"
                className="mt-3"
                name="description"
                onChange={formik.handleChange("description")}
                value={formik.values.description}
            />
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
            <div className="bg-white border-1 p-5 text-center mt-3">
              <Dropzone onDrop={handleImageDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
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
              {getBlogId !== undefined ? "Edit" : "Add"} Blog
            </button>
          </form>
        </div>
      </div>
  );
};

export default AddBlog;
