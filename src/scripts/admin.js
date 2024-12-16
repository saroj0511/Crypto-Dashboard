const User = require("../models/user");
const bcrypt = require("bcrypt");

async function createAdminAccount() {
    try {
        const existingAdmin = await User.findOne({ email: "admin@test.com" });

        if (!existingAdmin) {
            const hashedPassword = bcrypt.hashSync("admin", 10); 
            const newAdmin = new User({
                email: "admin@test.com",
                name: "Admin",
                password: hashedPassword,
                role: "admin" // Explicitly set the role as "admin"
            });
            await newAdmin.save();
            console.log("Admin account created successfully");
        } else {
            console.log("Admin already exists");
        }
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = createAdminAccount;
