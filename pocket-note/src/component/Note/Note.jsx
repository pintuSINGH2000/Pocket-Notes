import { useEffect, useRef, useState } from "react";
import style from "./note.module.css";

import PropTypes from "prop-types";
import moment from "moment";
import momentTimezone from "moment-timezone";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "react-toastify";

const Note = ({ note, isPublic, isSearchNote }) => {
  const [showMenu, setShowMenu] = useState(false);
  const homepageUrl = window?.location?.origin;
  const noteRefs = useRef({});
  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleShare = () => {
    navigator.clipboard
      .writeText(homepageUrl + "/note/" + note._id)
      .then(() => {
        toggleShowMenu();
        toast.success("Link copied to Clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  useEffect(() => {
    if (isSearchNote && noteRefs.current) {
      noteRefs.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isSearchNote]);
  
  return (
    <>
      <div className={`${style.notes} roboto-400`} ref={noteRefs}>
        {!isPublic && (
          <>
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
          </>
        )}
        {note.note}
        <div className={`${style.datetime} roboto-500`}>
          {" "}
          {moment.utc(note.createdAt).format("D MMM YYYY")}{" "}
          <span className={style.ellipse}></span>{" "}
          {moment.utc(note.createdAt).tz("Asia/Kolkata").format("hh:mm a")}
        </div>
      </div>
    </>
  );
};

Note.propTypes = {
  note: PropTypes.object.isRequired,
  isPublic: PropTypes.bool
};
export default Note;
