import React, { useContext, useState } from "react";
import style from "../assets/css/notebox.module.css";
import { IoSend } from "react-icons/io5";
import { GroupContext } from "../context/GroupContext";
import { IoIosArrowRoundBack } from "react-icons/io";
import moment from "moment";

const Notebox = ({ currentGroup, group, updateGroup,setCurrentGroup }) => {
  const [note, setNote] = useState("");
  const words = currentGroup.name.split(" ");
  var name = words[0][0];
  if (words.length > 1) {
    name += words[1][0];
  }

  const handleSend = () => {
    currentGroup.notes.push({
      note: note,
      currentDate: moment().format("D MMM YYYY"),
      currentTime: moment().format("hh:mm A"),
    });
    const updatedItems = group.map((item) =>
      item.id === currentGroup.id ? { ...currentGroup } : item
    );
    updateGroup(updatedItems);
    setNote("");
  };
  return (
    <>
      <div className={style.header}>
        <IoIosArrowRoundBack  className={`${style.back}`} onClick={()=>setCurrentGroup(null)} />
        <div
          style={{ backgroundColor: currentGroup.color }}
          className={`${style.profile} roboto-500`}
        >
          {name}
        </div>
        <div className={`${style.name} roboto-500`}>{currentGroup.name}</div>
      </div>
      <div className={style.notecontainer}>
        {currentGroup?.notes?.map((note, index) => (
          <div className={style.notes} key={index}>
            {note.note}
            <div className={style.datetime}>{note.currentDate}  <span className={style.ellipse}></span> {note.currentTime}</div>
          </div>
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
            className={style.send}
            disabled={note.length < 1}
            style={{
              color:
                note.length < 1
                  ? "rgba(171, 171, 171, 1)"
                  : "rgba(0, 31, 139, 1)",
            }}
            onClick={handleSend}
          >
            <IoSend />
          </button>
        </div>
      </div>
    </>
  );
};

export default Notebox;
