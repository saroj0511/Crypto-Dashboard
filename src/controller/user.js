
const User = require("../models/user"); 


async function getUsers(req, res) {
  try {
    // Only allow admins to access user data
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied, admin only." });
    }

    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Delete a user (Only accessible to Admins)
async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    // Ensure only admins can delete users
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied, admin only." });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Update user's role (Only accessible to Admins)
async function updateUserRole(req, res) {
  const { id, role } = req.body; // { id, role } in request body

  try {
    // Ensure only admins can change user roles
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied, admin only." });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true } // Return updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User role updated successfully", user });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getUsers, deleteUser, updateUserRole };
