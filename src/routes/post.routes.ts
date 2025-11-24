import { Router } from "express"
import { getAllPost, getMyPost, savePost } from "../controller/PostController"
import { authenticate } from "../middleware/auth"
import { requireRole } from "../middleware/Role"
import { Role } from "../models/User"
import { upload } from "../middleware/upload"
import { generateContent } from "../controller/ai.controller"

const route = Router()

route.post(
  "/create",
  authenticate,
  requireRole([Role.ADMIN, Role.AUTHOR]),
  upload.single("image"), // form data key name
  savePost
)

route.get("/", getAllPost)

route.get(
  "/me",
  authenticate,
  requireRole([Role.ADMIN, Role.AUTHOR]),
  getMyPost
)

route.post("/ai/generate", generateContent)

export default route