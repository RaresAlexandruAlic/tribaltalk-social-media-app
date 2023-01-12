import { addFriend, getUser, getUserFriends, removeFriend, removeUser, updateUser } from '../controllers/userController.js';

import express from 'express';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get("/:id", getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

router.patch("/:id", verifyToken, updateUser);
router.patch("/:id/:friendId", verifyToken, addFriend);

router.delete("/:id", verifyToken, removeUser);


export default router;
