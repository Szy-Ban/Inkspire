const bcrypt = require("bcrypt");

const hashPassword = (schema) => {
    schema.pre('save', async function (next) {
        if (this.isNew || this.isModified('password')) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    });
}

module.exports = hashPassword;

