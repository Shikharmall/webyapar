var express = require("express");
var user_route = express();
const multer = require("multer");
const path = require("path");

//const isDDAdmin = require("../middleware/isDDAdmin");
//const isLogin = require("../middleware/isLogin");

const userController = require("../controllers/User/userController");

const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // specify the upload directory
  },
  filename: function (req, file, cb) {
    // generate a unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Create multer instance with the storage configuration
const upload = multer({ storage: storage });

// api for register user

user_route.post("/registerUser", userController.registerUser);

// api for user updation

user_route.patch(
  "/updateUserDetail",
  upload.single("image"),
  userController.updateUserDetail
);

// api for login User

user_route.post("/loginUser", userController.loginUser);

// api for login Admin

user_route.post("/loginAdmin", userController.loginAdmin);

// api for getting user details

user_route.get("/getUserDetails", userController.getUserDetails);

// api for getting all user details

user_route.get("/getAllUserDetails", userController.getAllUserDetails);

// api for user verification

user_route.patch("/verifyUser", userController.verifyUser);

// api for user deletion

user_route.delete("/deleteUser", userController.deleteUser);

module.exports = user_route;
