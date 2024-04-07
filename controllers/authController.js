const usermodel = require("../models/userModel");
const {authSchema} =require('../helpers/validationSchema');
const jwt = require("jsonwebtoken");
const hashpassword = require("../helpers/authHelper");
const bcrypt = require("bcryptjs");


// for register
const registerController = async (req, res) => {
    try {
      
      const { name, email, password } = req.body;
  
      // validation
      if (!name) {
        return res.status(400).json({ mesage: "Name is required" });
      }
      if (!email) {
        return res.status(400).json({ mesage: "error: Email is required" });
      }
      if (!password) {
        return res.status(400).json({ mesage: "error: Password is required" });
      }
    //const result = await authSchema.validateAsync(req.body);
    //console.log(result);
  
      // user checking
      const existingUser = await usermodel.findOne({ email });
  
      // existing user checking
      if (existingUser) {
        return res.status(200).json({
          success: false,
          message: "Already registered, please login",
        });
      }
      const hashedPassword = await hashpassword(password);
  
      // save
      const user = new usermodel({ name, email, password:hashedPassword});
      await user.save();
  
      return res
        .status(201)
        .json({ success: true, message: "User registered successfully" });
    } catch (error) {
      // return console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error in registration",
        error: error.message,
      });
    }
  };
  
//for login
  const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      // Validation
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      // Find email
      const user = await usermodel.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Email is not registered",
        });
      }
  
      // Check password
      const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
  
      // Generate token
   const token = await jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET_REFRESH_TOKEN,
    { expiresIn: "7d" }
  );
  
      res.status(200).json({
        success: true,
        message: "Login successfully",       
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error in login",
        error: error.message,
      });
    }
  };

  const protectedRouteController = (req, res) => {
    try {
      res.status(200).json({
        success: true,
        message: "Access granted to protected route",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error in accessing protected route",
        error: error.message,
      });
    }
  };

  const updateUserController = async (req, res) => {
    try {
      const { email, password, newName, newPassword } = req.body;
  
      // Validation
      if (!email || !password || !newName || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Invalid request. Please provide email, password, newName, and newPassword",
        });
      }
  
      // Find user by email
      const user = await usermodel.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      // Check if the provided password is correct
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }
  
      // Update user data if the password is correct
      user.name = newName;
      user.password = await bcrypt.hash(newPassword, 10); 
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "User data updated successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error in updating user data",
        error: error.message,
      });
    }
  };
  
  const deleteUserController = async (req, res) => {
    try {
   
      const userId = req.userId;
  console.log(userId);
      // Find the user by ID and delete it
      await usermodel.findByIdAndDelete(userId);
  
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error in deleting user",
        error: error.message,
      });
    }
  };
  


  // for userinbox
  const inboxController = async (req, res) => {
    try {

      const { message, } = req.body;
      const userId = req.params.userId; // Assuming you have user information in the req.user after authentication
  
      // Update the user's message
      await usermodel.findByIdAndUpdate(userId, { message });
  
      return res.status(200).json({
        success: true,
        message: 'Message updated successfully',
        message,
      });

    } catch (error) {
      // return console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error in registration",
        error: error.message,
      });
    }
  };

  //for update profleimage
  const UpdateProfileImage = async (req, res) => {
    try {
      const file = req.file;
      const userId = req.params.userId; 

  // Find the existing user by userId
  const user = await usermodel.findById(userId);

  // Check if the user exists
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // Update the image-related fields
  user.image = {
    data: file.buffer,
    contentType: file.mimetype,
    imagePath: `uploads/${file.filename}`,
  };

  // Save the updated user
  await user.save();
  
      return res
        .status(201)
        .json({ success: true, message: "profile image updated successfully",user });
    } catch (error) {
      // return console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error in registration",
        error: error.message,
      });
    }
  };
  module.exports = { registerController,deleteUserController,protectedRouteController,loginController,  updateUserController,inboxController,UpdateProfileImage};