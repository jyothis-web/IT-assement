const express = require('express');
const router = express.Router();
const upload = require("../Config/multerConfig");
const path = require("path");
const authController = require('../controllers/authController');
const protectRoute = require('../helpers/protectedRoute')

// routing for register || post
router.post('/register', authController.registerController);

// // routing for login || get
 router.post('/login', authController.loginController);
 router.get('/Protected',protectRoute, authController.protectedRouteController);
 router.put('/update-user',protectRoute, authController.updateUserController);
 router.delete('/delete-user',protectRoute, authController.deleteUserController);

//  router.post('/UpdateProfileImage/:userId',  upload.single("file"), authController.UpdateProfileImage);
//  router.post('/create-message/:userId', authController.inboxController);

module.exports = router;