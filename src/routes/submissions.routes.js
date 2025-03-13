
import { verifyJWT } from '../middleware/verifyJWT.middleware.js';
import { createSubmission, getSubmissions, deleteSubmissions } from '../controllers/submission.controllers.js';
import express from 'express';
import { upload } from '../middleware/multer.middleware.js';

const router= express.Router();

router.route("/create-submission/:hackathonId/:teamId").post(verifyJWT,upload.single("banner"),createSubmission);
router.route("/fetch-submissions/:hackathonId").get(verifyJWT,getSubmissions);
router.route("/delete-submissions/:hackathonId").post(verifyJWT,deleteSubmissions)

export default router;