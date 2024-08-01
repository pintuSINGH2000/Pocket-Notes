import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const createFolder = async (folderData) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = JSON.parse(token);
    console.log(folderData);
    const res = await axios.post(`${backendUrl}note/create-folder`, folderData);
    toast.success(res?.data?.message);
    return res?.data?.folder;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const addNote = async (noteData) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = JSON.parse(token);
    const res = await axios.post(`${backendUrl}note/add-note`, noteData);
    toast.success(res?.data?.message);
    return res?.data?.note;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const getFolders = async () => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = JSON.parse(token);
    const res = await axios.get(`${backendUrl}note/get-all-folder/`);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};

export const getAllNote = async (folderId) => {
  try {
    const res = await axios.get(`${backendUrl}note/get-all-note/${folderId}`);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};

export const getNote = async (noteId) => {
  try {
  
    const res = await axios.get(`${backendUrl}note/get-note/${noteId}`);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};

export const searchApi = async (query) => {
  try {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = JSON.parse(token);
    const res = await axios.get(`${backendUrl}note/search`,{ params: { query }});
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};


