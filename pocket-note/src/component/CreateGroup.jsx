import React, { useContext, useState } from "react";
import style from "../assets/css/creategroup.module.css";
import { GroupContext } from "../context/GroupContext";

const CreateGroup = ({visible,setVisible}) => {
  const { group, updateGroup } = useContext(GroupContext);
  const [groupName, setGroupName] = useState("");
  const [groupcolor, setGroupColor] = useState("");

  const colorOptions = [
    "rgba(179, 139, 250, 1)",
    "rgba(255, 121, 242, 1)",
    "rgba(67, 230, 252, 1)",
    "rgba(241, 149, 118, 1)",
    "rgba(0, 71, 255, 1)",
    "rgba(102, 145, 255, 1)",
  ];

  const handleSubmit = () => {
    setVisible(false);
      updateGroup({"name":groupName,"color":groupcolor})
      setGroupName("");
      setGroupColor("");
  }
  return (
    <div>
      <h3 className={style.title}>Create New Group</h3>
      <div style={{ display: "flex",alignItems:"center",padding:"10px 0px" }}>
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
            className={`${style.coloroption} ${groupcolor === color ? style.increasesize: style.normalsize}`}
          />
        ))}
      </div>
      <button type="submit" className={`${style.submit} roboto-400`} onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default CreateGroup;
