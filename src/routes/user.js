const express = require("express");
const authMiddleware = require("../utils/authMiddleware"); 
const userController = require("../controller/user");

const router = express.Router();

// Fetch all users (Only accessible by Admin)
router.get("/users", authMiddleware.authenticateToken, authMiddleware.authorizeRoles(["admin"]), userController.getUsers);

// Delete a user (Only accessible by Admin)
router.delete("/user/:id", authMiddleware.authenticateToken, authMiddleware.authorizeRoles(["admin"]), userController.deleteUser);

// Update a user's role (Only accessible by Admin)
router.put("/user/role", authMiddleware.authenticateToken, authMiddleware.authorizeRoles(["admin"]), userController.updateUserRole);

module.exports = router;

