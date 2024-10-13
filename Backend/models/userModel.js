const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
      address: {
          street: { type: String,  },
          city: { type: String, },
          state: { type: String, },
          pincode: { type: String,  },
          country: { type: String, },
      },
    role: {
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
      type: String,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createPasswordResetToken = async function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
  return resettoken;
};

//Export the model
module.exports = mongoose.model("User", userSchema);
