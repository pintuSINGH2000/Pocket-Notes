const mongoose = require("mongoose");
const Folder = require("../models/folder");
const Note = require("../models/note");
const User = require("../models/user");

const createFolderController = async (req, res) => {
  try {
    const folderData = req.body;

    if(!folderData || !folderData.color || !folderData.name){
      return res.status(400).send({ errorMessage: "Bad request" });
    }
    const creator = req.creator;
    const folder = new Folder({
      name:folderData.name,
      color:folderData.color,
      creator
    });
    await folder.save();
    res
      .status(201)
      .send({ folder: folder, message: "Group created Successfully" });
  } catch (error) {
    return res.status(500).send({ errorMessage: "Internal server error" });
  }
};
const addNodeController = async (req, res) => {
  try {
    const noteData = req.body;
    const creator = req.creator;
    if(!noteData || !noteData.folder || !noteData.note){
      return res.status(400).send({ errorMessage: "Bad request" });
    }
    const folder = await Folder.findOne({ creator: creator, _id: noteData.folder });
    if (!folder) {
      return res.status(400).send({ errorMessage: "Bad request" });
    }

    const note = new Note({
      note:noteData.note,
      folder:noteData.folder,
      creator:creator
    });
    await note.save();
    
    res.status(201).send({
      note: note,
      message: "Note added Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ errorMessage: "Internal server error" });
  }
};

const getAllFolderController = async (req, res) => {
  try {
     const creator = req.creator;
    const folders = await Folder.find({ creator: creator });
    console.log(folders," ",creator);
    return res.status(200).send({ folders: folders });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllNoteController = async (req, res) => {
  try {
    const { folderId } = req.params;
    console.log(folderId);
    if(!folderId){
      return res.status(400).send({ errorMessage: "Bad request" });
    }
    const folder =await Folder.findById(folderId);
    if(!folder){
      return res.status(400).send({ errorMessage: "Bad request" });
    }
    const notes = await Note.find({ folder: folderId });
    const user = await User.findById(folder.creator,{name:1});
    return res.status(201).send({ folder:folder,notes: notes,user:user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getNoteController = async (req, res) => {
  try {
    const { noteId } = req.params;
    if(!noteId){
      return res.status(400).send({ errorMessage: "Bad request" });
    }
    const note = await Note.findById(noteId);
    if(!note){
      return res.status(400).send({ errorMessage: "Bad request" });
    }
    const user =await User.findById(note.creator,{name:1});
    return res.status(201).send({ note: note ,user:user});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const searchController = async (req,res) => {
   try{
    const { query } = req.query;
    const creator = req.creator;
    const regex = new RegExp(query, 'i'); 
    console.log(regex);
    const groups = await Folder.find({ name: regex, creator:creator });
    const notes = await Note.find({ note: regex ,creator:creator});
    return res.status(201).send({ groups: groups ,notes:notes});
   }catch(error){
    res.status(500).json({ error: "Internal Server Error" });
   }
}

module.exports = {
  createFolderController,
  addNodeController,
  getAllFolderController,
  getAllNoteController,
  getNoteController,
  searchController,

};
