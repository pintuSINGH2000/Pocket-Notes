const express = require("express");
const { verifyToken } = require("../Middleware/verifyToken");
const { createFolderController, searchController } = require("../controllers/note");
const { addNodeController } = require("../controllers/note");
const { getAllFolderController } = require("../controllers/note");
const { getAllNoteController } = require("../controllers/note");
const { getNoteController } = require("../controllers/note");
const router = express.Router();

router.post(
  "/create-folder",
  verifyToken,
  createFolderController
);
router.post("/add-note", verifyToken,addNodeController);
router.get("/get-all-folder",verifyToken, getAllFolderController);
router.get("/get-all-note/:folderId", getAllNoteController);
router.get("/get-note/:noteId",  getNoteController);
router.get("/search", verifyToken, searchController);

module.exports = router;
