const User = require("../../models/User/userModel");

const bcrypt = require("bcrypt");

//bcrypting the password

const securePasswordGenerate = async (password) => {
  try {
    const passwordhash = bcrypt.hash(password, 10);
    return passwordhash;
  } catch (error) {
    console.log(error.message);
  }
};

//registering the user

const registerUser = async (req, res) => {
  try {
    const { user_id, password } = req.body;

    // generate secure password by bycrpting it
    const spassword = await securePasswordGenerate(password);

    const userData = new User({
      name: "N/A",
      user_id: user_id,
      password: spassword,
      isAdmin: false,
      isVerified: false,
      image: "N/A",
    });

    const userDataSaved = await userData.save();

    if (userDataSaved) {
      return res.status(201).json({ status: "success", data: userDataSaved });
    }
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//user updating details

const updateUserDetail = async (req, res) => {
  try {
    const { user_id, name } = req.body;
    const image = req.file.filename;

    const userUpdateData = await User.findOneAndUpdate(
      { user_id: user_id },
      {
        $set: {
          name: name,
          image: image,
        },
      },
      { new: true }
    );

    if (userUpdateData) {
      return res.status(201).json({ status: "success", data: userUpdateData });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//logging by admin dashboard

const loginAdmin = async (req, res) => {
  try {
    const { user_id, password } = req.body;

    // Find the user by email
    const userData = await User.findOne({ user_id: user_id });

    if (!userData) {
      return res
        .status(404)
        .json({ status: "failed", message: "Credential Wrong." });
    }

    const matchPassword = await bcrypt.compare(password, userData.password);

    if (!matchPassword) {
      return res
        .status(404)
        .json({ status: "failed", message: "Password Not Matched" });
    }

    if (!userData.isAdmin) {
      return res.status(404).json({ status: "failed", message: "Not Admin." });
    }

    return res.status(200).json({
      status: "success",
      data: { user_id: userData._id },
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//logging the user to game dashboard

const loginUser = async (req, res) => {
  try {
    const { user_id, password } = req.body;

    // Find the user by email
    const userData = await User.findOne({ user_id: user_id });

    if (!userData) {
      return res
        .status(404)
        .json({ status: "failed", message: "Credential Wrong." });
    }

    const matchPassword = await bcrypt.compare(password, userData.password);

    if (!matchPassword) {
      return res
        .status(404)
        .json({ status: "failed", message: "Password Not Matched" });
    }

    return res.status(200).json({
      status: "success",
      data: { user_id: userData._id },
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//get user details

const getUserDetails = async (req, res) => {
  try {
    const { user_id } = req.query;

    const user = await User.findOne({ user_id: user_id });

    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User Not Exit" });
    }

    return res.json(user);

    //return res.status(200).json({ status: "success", data: userData });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};


//get all users details

const getAllUserDetails = async (req, res) => {
  try {
    // Find the user by email
    const users = await User.find().sort();

    res.json(users);

    //return res.status(200).json({ status: "success", data: userData });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//verify user

const verifyUser = async (req, res) => {
  try {
    const { user_id } = req.query;

    const userVerifiedData = await User.updateOne(
      { user_id: user_id },
      {
        $set: {
          isVerified: true,
        },
      },
      { new: true }
    );

    return res.status(201).json({ status: "success", data: userVerifiedData });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//delete user

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.query;
    const userData = await User.deleteOne({ user_id: user_id });

    return res.status(200).json({ status: "success", data: userData });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

module.exports = {
  registerUser,
  updateUserDetail,
  loginAdmin,
  loginUser,
  getUserDetails,
  getAllUserDetails,
  verifyUser,
  deleteUser,
};
