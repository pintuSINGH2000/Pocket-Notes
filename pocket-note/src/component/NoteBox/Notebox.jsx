import { useEffect, useRef, useState } from "react";
import style from "./notebox.module.css";
import { IoSend } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import PropTypes from "prop-types";
import { addNote, getAllNote } from "../../api/note";
import CircularLoader from "../CircularLoader/CircularLoader";
import Note from "../Note/Note";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "react-toastify";

const Notebox = ({ currentGroup, setCurrentGroup, searchNote }) => {
  const [note, setNote] = useState("");
  const [allNote, setAllNote] = useState([]);
  const [loader, setLoader] = useState(false);
  const [processing, setProcessing] = useState(false);
  const words = currentGroup.name.split(" ");
  const ref = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const homepageUrl = window?.location?.origin;
  const [isInitial, setIsInitial] = useState(true);

  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleShare = () => {
    navigator.clipboard
      .writeText(homepageUrl + "/group/" + currentGroup._id)
      .then(() => {
        toggleShowMenu();
        toast.success("Group Link copied to Clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };


  useEffect(() => {
    if (isInitial && ref.current) {
      const timer = setTimeout(() => {
        ref.current.scrollTop = ref.current.scrollHeight;
        setIsInitial(false); 
      }, 100); 
      return () => clearTimeout(timer);
    }
  }, [allNote]);

  var name = words[0][0];
  if (words.length > 1) {
    name += words[1][0];
  }

  const handleSend = async () => {
    if (processing) return;
    if(!isInitial){
      setIsInitial(true);
    }
    setProcessing(true);
    const res = await addNote({ note: note, folder: currentGroup._id });
    console.log(res);
    if (res) {
      setAllNote([...allNote, res]);
      setNote("");
    }
    setProcessing(false);
  };

  useEffect(() => {
    const getNote = async () => {
      setLoader(true);
      const res = await getAllNote(currentGroup._id);
      if (res) {
        setAllNote(res?.notes);
      }
      setLoader(false);
    };
    getNote();
    setShowMenu(false);
  }, [currentGroup]);
  return (
    <>
      <div className={style.header}>
        <div className={style.leftHeader}>
          <IoIosArrowRoundBack
            className={`${style.back}`}
            onClick={() => setCurrentGroup(null)}
          />
          <div
            style={{ backgroundColor: currentGroup.color }}
            className={`${style.profile} roboto-500`}
          >
            {name}
          </div>
          <div className={`${style.name} roboto-500`}>{currentGroup.name}</div>
        </div>
        <div className={style.rightHeader}>
          {" "}
          <BsThreeDots
            className={`${style.menuIcon} cursor-pointer`}
            onClick={() => toggleShowMenu()}
          />
          {showMenu && (
            <div className={`${style.menu} poppins-500 bg-white`}>
              <div onClick={handleShare} className="cursor-pointer">
                Share
              </div>
            </div>
          )}
        </div>
      </div>
      {loader ? (
        <div className={`${style.loader} flexbox-center`}>
          <CircularLoader />
        </div>
      ) : (
        <>
          <div className={style.notecontainer} ref={ref}>
            {allNote.map((note, index) => (
              <Note
                note={note}
                key={note._id}
                isSearchNote={note._id === searchNote._id}
              />
            ))}
          </div>
          <div className={style.footer}>
            <div className={style.textcontainer}>
              <textarea
                className={`${style.input} roboto-400`}
                placeholder="Enter your text here..........."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
              <button
                className={`${style.send} flexbox-center`}
                disabled={note.length < 1}
                style={{
                  color:
                    note.length < 1
                      ? "rgba(171, 171, 171, 1)"
                      : "rgba(0, 31, 139, 1)",
                }}
                onClick={handleSend}
              >
                {processing ? (
                  <div className={style.spinner}></div>
                ) : (
                  <IoSend />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

Notebox.propTypes = {
  currentGroup: PropTypes.object.isRequired,
  setCurrentGroup: PropTypes.func.isRequired,
};
export default Notebox;
