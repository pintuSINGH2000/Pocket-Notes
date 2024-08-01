import  { useState } from "react";
import style from "./creategroup.module.css";
import PropTypes from 'prop-types';
import { createFolder } from "../../api/note";
import Spinner from "../Spinner/Spinner";

const CreateGroup = ({ setVisible,group,setGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [groupcolor, setGroupColor] = useState("");
  const [groupNameErr, setGroupNameErr] = useState(null);
  const [groupColorErr, setGroupColorErr] = useState(null);
  const [loader,setloader] = useState(false);

  const colorOptions = [
    "rgba(179, 139, 250, 1)",
    "rgba(255, 121, 242, 1)",
    "rgba(67, 230, 252, 1)",
    "rgba(241, 149, 118, 1)",
    "rgba(0, 71, 255, 1)",
    "rgba(102, 145, 255, 1)",
  ];

  const handleSubmit = async () => {
    console.log("pintu");
    var isValid = true;
    if (groupName.trim().length === 0) {
      setGroupNameErr("Group name cannot be empty.");
      isValid = false;
    } else if(group?.some((gr) => gr.name === groupName.trim())){
      setGroupNameErr(groupName+" is already Added");
      isValid=false;
    }else{
      setGroupNameErr(null);
    }
    if (groupcolor.trim().length === 0) {
      setGroupColorErr("Please select a color.");
      isValid = false;
    } else {
      setGroupColorErr(null);
    }
    if (!isValid) return;
    setloader(true);
    const res = await createFolder({name:groupName,color:groupcolor});
    console.log(res);
    if(res){
      console.log(group);
      setGroup([...group,res]);
    }
    setloader(false);
    setVisible(false);
    setGroupName("");
    setGroupColor("");
  };
  return (
    <div>
      <h3 className={style.title}>Create New Group</h3>
      <div
        style={{ display: "flex", alignItems: "center", padding: "10px 0px" }}
      >
        <div className={`${style.name} roboto-500`}>Group Name</div>
        <input
          type="text"
          id="group-name"
          name="group-name"
          placeholder="Enter group name"
          value={groupName}
          onChange={() => setGroupName(event.target.value)}
          required
          className={`${style.input} roboto-400`}
        />
      </div>
      {groupNameErr && <div className={`${style.grouperror} error dm-sans`}>{groupNameErr}</div>}
      <div className={style.colorinput}>
        <div className={`${style.name} roboto-500`}>Select a color</div>
        {colorOptions.map((color) => (
          <div
            key={color}
            onClick={() => {
              setGroupColor(color);
            }}
            style={{
              backgroundColor: color,
            }}
            className={`${style.coloroption} ${
              groupcolor === color ? style.increasesize : style.normalsize
            }`}
          />
        ))}
      </div>
      {groupColorErr && <div className={`${style.grouperror} error dm-sans`}>{groupColorErr}</div>}
      <button
        className={`${style.submit} roboto-400 flexbox-center`}
        onClick={handleSubmit}
      >
        {loader?<Spinner />:"Create"}
      </button>
    </div>
  );
};

CreateGroup.propTypes = {
  setVisible: PropTypes.func,
  group: PropTypes.array.isRequired,
  setGroup: PropTypes.func.isRequired,
};

export default CreateGroup;
