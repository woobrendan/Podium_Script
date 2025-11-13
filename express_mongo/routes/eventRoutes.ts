import controller from "../controllers/event_controller";
import express from "express";

const router = express.Router();

router.get("/", controller.getAllEvents);
// router.get("/:eventId", controller.getEventById);
router.get("/:year", controller.getEventByYear);
router.patch("/:eventId", controller.updateEvent);

export = router;
