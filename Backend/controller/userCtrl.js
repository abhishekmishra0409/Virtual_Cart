const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshtoken");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("/emailCtrl");

// Create a new user
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists");
  }
});

// Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      address: findUser?.address,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// admin login

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findAdmin = await User.findOne({ email });
  if (findAdmin.role !== "admin") throw new Error("Not Authorised");
  if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

// logout functionality

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204); // forbidden
  }
  await User.findOneAndUpdate(refreshToken, {
    refreshToken: "",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204); // forbidden
});

// Update a user

const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// save user Address

const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  const { street, city, state, pincode, country } = req.body;

  if (!street || !city || !state || !pincode || !country) {
    res.status(400);
    throw new Error(
      "All address fields (street, city, state, pincode, and country) are required."
    );
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: {
          street,
          city,
          state,
          pincode,
          country,
        },
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all users

const getallUser = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find().populate("wishlist");
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user
const getaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const getaUser = await User.findById(id);
    res.json({
      getaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single user

const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaUser = await User.findByIdAndDelete(id);
    res.json({
      deleteaUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockusr);
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

const userCart = asyncHandler(async (req, res) => {
  const { productId, quantity, price, color } = req.body;
  const userId = req.user._id;

  try {
    // Find if the user already has a cart
    let cart = await Cart.findOne({ userId: userId });

    // If no cart exists, create a new cart for the user
    if (!cart) {
      cart = new Cart({
        userId: userId,
        products: [],
        cartTotal: 0,
      });
    }

    // Create a product object to add/update
    const newProduct = {
      productId: productId,
      quantity,
      price,
      color: color,
    };

    // Find if the product already exists in the cart
    const existingProductIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex > -1) {
      // If the product exists, update its quantity
      cart.products[existingProductIndex].quantity = quantity; // Set the new quantity
    } else {
      // If the product doesn't exist, add it to the cart
      cart.products.push(newProduct);
    }

    // Recalculate the cart total
    cart.cartTotal = cart.products.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0); // Start with 0 as the initial total

    // Save the updated cart
    await cart.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cart,
      cartTotal: cart.cartTotal, // Return updated total
    });
  } catch (error) {
    console.error(error); // Log the error
    res
      .status(500)
      .json({ message: "Error updating the cart", error: error.message });
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    // Find the cart for the user and populate the products
    const cart = await Cart.findOne({ userId: _id }).populate(
      "products.productId"
    );

    // If the cart doesn't exist, return a message
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart); // Return the cart
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error retrieving cart", error: error.message });
  }
});

const deleteCartProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.params;

  validateMongoDbId(_id);
  validateMongoDbId(productId);

  try {
    // Find the cart for the user
    const cart = await Cart.findOne({ userId: _id });

    // If no cart is found, return a 404 error
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the index of the product to remove
    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    // If product is not found in the cart, return an error
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove the product from the cart
    cart.products.splice(productIndex, 1);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Error removing product from cart",
        error: error.message,
      });
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user; // Get the user ID from the request
  validateMongoDbId(_id); // Validate the user ID
  try {
    // Remove the user's cart
    const cart = await Cart.findOneAndDelete({ userId: _id });

    // If the cart doesn't exist, return a message
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart emptied successfully", cart }); // Return the deleted cart
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error emptying cart", error: error.message });
  }
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon === null) {
    throw new Error("Invalid Coupon");
  }
  // const user = await User.findOne({_id});
  let { cartTotal } = await Cart.findOne({
    userId: _id,
  }).populate("products");
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);
  await Cart.findOneAndUpdate(
    { userId: _id },
    { totalAfterDiscount },
    { new: true }
  );
  res.json({ totalAfterDiscount, coupon });
});

const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;

  if (!_id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  validateMongoDbId(_id);

  try {
    if (!COD) {
      return res
        .status(400)
        .json({ message: "Cash on Delivery option is required" });
    }

    const userCart = await Cart.findOne({ userId: _id });
    if (!userCart || userCart.products.length === 0) {
      return res.status(404).json({ message: "Cart is empty or not found" });
    }

    // Log the products to identify issues
    // console.log("User Cart Products:", userCart.products);

    let finalAmount =
      couponApplied && userCart.totalAfterDiscount
        ? userCart.totalAfterDiscount
        : userCart.cartTotal;

    // Create a detailed products array for the order
    const detailedProducts = await Promise.all(
      userCart.products.map(async (item) => {
        // const product = await Product.findById(item.productId).populate('brand color');
        return {
          product: item.productId,
          price: item.price,
          color: item.color,
          count: item.quantity,
        };
      })
    );

    console.log(detailedProducts);

    const newOrder = await new Order({
      products: detailedProducts,
      paymentIntent: {
        method: "COD",
        amount: finalAmount,
        currency: "INR",
      },
      orderby: _id,
      orderStatus: "Processing",
    }).save();

    const update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.productId },
          update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
        },
      };
    });

    if (update.length > 0) {
      await Product.bulkWrite(update, {});
    } else {
      return res.status(400).json({ message: "No valid products to update" });
    }

    // Clear the cart after order is created
    await Cart.findOneAndUpdate(
      { userId: _id },
      { products: [], cartTotal: 0, totalAfterDiscount: 0 }
    );

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res
      .status(500)
      .json({ status: "fail", message: error.message, stack: error.stack });
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    // Find all orders by the user
    const userOrders = await Order.find({ orderby: _id })
      .populate({
        path: "products.product",
        select: "title price brand images",
        populate: {
          path: "brand",
          select: "title",
        },
      })
      .populate("orderby", "firstname lastname email mobile address")
      .populate("products.color", "title")

      .exec();

    if (!userOrders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.json(userOrders); // Return the orders to the client
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const alluserorders = await Order.find()
      .populate({
        path: "products.product",
        select: "title price brand",
        populate: {
          path: "brand",
          select: "title",
        },
      })
      .populate("orderby", "firstname lastname email mobile address")
      .populate("products.color", "title")

      .exec();
    res.json(alluserorders);
  } catch (error) {
    throw new Error(error);
  }
});
const getOrderByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params; // Extract order ID from request parameters
  validateMongoDbId(id); // Validate the MongoDB ID format

  try {
    const userOrder = await Order.findById(id) // Use findById to search by order ID
      .populate({
        path: "products.product",
        select: "title price brand",
        populate: {
          path: "brand",
          select: "title",
        },
      })
      .populate("orderby", "firstname lastname email mobile address")
      .populate("products.color", "title")
      .exec();

    if (!userOrder) {
      return res.status(404).json({ message: "Order not found." }); // Handle case when order is not found
    }

    res.json(userOrder); // Send the found order back as JSON
  } catch (error) {
    res.status(500).json({ message: error.message }); // Return error message
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateOrderStatus = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
      },
      { new: true }
    );
    res.json(updateOrderStatus);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderByUserId,
  deleteCartProduct,
};
