import React, { useEffect, useState } from "react";
import style from "./shareGroup.module.css";
import { useParams } from "react-router-dom";
import { getAllNote } from "../../api/note";
import CircularLoader from "../CircularLoader/CircularLoader";
import Note from "../Note/Note";

const ShareGroup = () => {
  const [processing, setProcessing] = useState(false);
  const { groupId } = useParams();
  const [notes, setNotes] = useState([]);
  const [currentGroup, setCurrentGroup] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const getNoteData = async () => {
      setProcessing(true);
      const res = await getAllNote(groupId);
      if (res) {
        setCurrentGroup(res?.folder);
        setNotes(res?.notes);
        setUser(res?.user);
        const words = res?.folder.name.split(" ");
        var name = words[0][0];
        if (words.length > 1) {
          name += words[1][0];
        }
        setName(name);
      }
      setProcessing(false);
    };
    getNoteData();
  }, []);

  return (
    <div className={`${style.container}`}>
      <div className={style.logo}>
        <h1 className={`${style.title} poppins-700`}>Pocket Note</h1>
      </div>
      {processing ? (
        <div className={`${style.loader} flexbox-center`}>
          <CircularLoader />
        </div>
      ) : (
        <>
          <div className={style.groupcontainer}>
            <div className={style.header}>
              <div
                style={{ backgroundColor: currentGroup.color }}
                className={`${style.profile} roboto-500`}
              >
                {name}
              </div>
              <div className={`${style.name} roboto-500`}>
                {currentGroup.name}
              </div>

              <div className={style.user}>{user.name}</div>
            </div>
            <div className={style.notecontainer}>
              {notes?.map((note, index) => (
                <Note note={note} key={note._id} isPublic={true} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareGroup;
