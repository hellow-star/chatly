import express from 'express';
import { login, signup, logout, updateProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

 router.get("/check-auth", protectRoute, (req, res) => {
     res.status(200).json({ message: "Authenticated", user: req.user });
 });

export default router;