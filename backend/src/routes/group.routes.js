import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { 
  createGroup, 
  addMemberToGroup,
  removeMemberFromGroup,
  getGroupMessages
} from "../controllers/group.controller.js";

const router = express.Router();

router.post("/", protectRoute, createGroup);
router.post("/:groupId/members/:userId", protectRoute, addMemberToGroup);
router.delete("/:groupId/members/:userId", protectRoute, removeMemberFromGroup);
router.get("/:groupId/messages", protectRoute, getGroupMessages);

export default router;