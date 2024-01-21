const getTokenFromCookie = require("../utils/getTokenFromCookie");
const verifyToken = require("../utils/verifyToken");
const User = require("../models/User/userModel");

const isDDAdmin = async (req, res, next) => {
  try {
    const token = getTokenFromCookie(req);

    const decodedUser = verifyToken(token);

    if (!decodedUser) {
      return res
        .status(401)
        .json({ error: "Invalid/Expired Token, Please Login Again" });
    }

    const userData = await User.findById({ _id: decodedUser.id });

    if (!userData) {
      return res
        .status(401)
        .json({ error: "User does not exist, Please Login Again" });
    }

    if (!userData.isAdmin) {
      return res
        .status(403)
        .json({ error: "Access denied. User is not an admin." });
    }

    next();
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in isDDAdmin middleware:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = isDDAdmin;
