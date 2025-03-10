import {Router} from 'express';
import { verifyJWT } from '../middleware/verifyJWT.middleware.js';
import { upload } from '../middleware/multer.middleware.js';
import { addRound, getHackathonDetails, registerHackathon,getSubmissionsForHackathon, announceWinnersAndNextRound  } from '../controllers/hackathon.controllers.js';
import {verifyHackathonOwner} from '../middleware/VerifyOwner.middleware.js'

const router = Router();

router.route("/create").post(verifyJWT,registerHackathon);
router.route("/:name").get(verifyJWT,verifyHackathonOwner,getHackathonDetails);
//router.route("/:name/update").put(verifyJWT,);
//router.route("/:name/delete").delete(verifyJWT,);
router.route("/:name/rounds/add").post(verifyJWT,verifyHackathonOwner,addRound);
//router.route("/:name/rounds/:roundsId/update").put(verifyJWT,);
//router.route("/:name/rounds/:roundsId/delete").delete(verifyJWT,);
router.route("/:name/submissions").get(verifyJWT,verifyHackathonOwner,getSubmissionsForHackathon);
//router.route("/:name/rounds/:roundsId/judge").post(verifyJWT,);
router.route("/:name/announce-winners").post(verifyJWT,verifyHackathonOwner,announceWinnersAndNextRound);
//router.route("/:name/rewards/distribute").post(verifyJWT,);


export default router