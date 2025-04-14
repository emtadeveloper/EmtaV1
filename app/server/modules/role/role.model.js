const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    permissions: { type: [Number], default: [1, 2, 3] }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Role', roleSchema);