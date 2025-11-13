import express from "express";
import controller from "../controllers/api_entry_controller";

const router = express.Router();

// api/entries ....

router.post("/", controller.createEntry);
router.get("/", controller.getAllEntries);
router.get("/events", controller.getEntriesByEvent);
router.get("/events/:event", controller.getEntryByEvent);
router.get("/:entryId", controller.getEntryById);
router.patch("/:entryId", controller.updateEntry);
router.delete("/:entryId", controller.deleteEntry);

export = router;
