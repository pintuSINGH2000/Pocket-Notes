import React, { useEffect, useState } from "react";
import styles from "./shareNote.module.css";
import CircularLoader from "../CircularLoader/CircularLoader";
import { useParams } from "react-router-dom";
import { getNote } from "../../api/note";
import moment from "moment";

const ShareNote = () => {
  const [processing, setProcessing] = useState(false);
  const { noteId } = useParams();
  const [note, setNote] = useState("");
  const [user,setUser] = useState("");

  useEffect(() => {
    const getNoteData = async () => {
      setProcessing(true);
      const res = await getNote(noteId);
      if (res) {
        setNote(res?.note);
        setUser(res?.user);
      }
      setProcessing(false);
    };
    getNoteData();
  }, []);
  return (
    <div className={`${styles.container}`}>
      <div className={styles.logo}>
        <h1 className={`${styles.title} poppins-700`}>Pocket Note</h1>
      </div>
      {processing ? (
        <div className={`${styles.spinner} flexbox-center`}>
          <CircularLoader />
        </div>
      ) : (
        <div className={`${styles.cardContainer} flexbox-center roboto-400`}>
          <div className={styles.card}>
            {note?.note}
            <div className={`${styles.noteFooter} roboto-500`}>
                <div>Created by : <span style={{textTransform:"capitalize"}}>{user.name}</span></div>
              <div className={styles.datetime}>
                {" "}
                {moment.utc(note?.createdAt).format("D MMM YYYY")}{" "}
                <span className={styles.ellipse}></span>{" "}
                {moment
                  .utc(note?.createdAt)
                  .tz("Asia/Kolkata")
                  .format("hh:mm a")}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareNote;
