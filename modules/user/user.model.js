const { default: mongoose } = require("mongoose");
const addressSchema = require("./schema/address");
const hashPassword = require("../utils/hashPassword-bcrypt");
const comparePasswordBcrypt = require('../utils/verifyPassword-bcrypt');

const addressSchema = new mongoose.Schema({
    type: { type: String, enum: ["home", "work", "other"], default: "home" },
    postalCode: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    address: { type: String, required: true },
    cityId: { type: Number, required: true }
},
    { _id: false }
);

const userSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, },
    firstName: { type: String },
    lastName: { type: String },
    googleId: { type: String, default: null },
    addresses: { type: [addressSchema] },
    role: { type: mongoose.Types.ObjectId, ref: "Role" },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    try {
        user.password = await hashPassword(user.password);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await comparePasswordBcrypt(candidatePassword, this.password)
};

const User = mongoose.model("User", userSchema);
module.exports = User;